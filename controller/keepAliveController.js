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
  
module.exports = {
    makeConnection,
};
