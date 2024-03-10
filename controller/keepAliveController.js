const asyncHandler = require("express-async-handler");

const clients = new Map();

const makeConnection = asyncHandler((req, res) => {
    const userId = req.session.userId;

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    clients.set(userId, res);

    req.on("close", () => {
        clients.delete(userId);
    });
});

const sendInterestNotification = async (userId, data) => {
    try {
        const res = clients.get(userId?.toString() || userId);
        if (res) {
            res.write("data: " + JSON.stringify(data) + "\n\n");
        }
        return true;
    } catch (error) {
        console.log(error.message);
    }
};

const sendMessageToclients = async (users, data) => {
    try {
        users.forEach((user) => {
            const res = clients.get(user);
            if(res){
                res.write("data: " + JSON.stringify(data) + "\n\n");
            }
            
        });
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = {
    makeConnection,
    sendInterestNotification,
    sendMessageToclients,
};
