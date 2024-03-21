let visionId = null;

const sendChat = async (e) => {
    try {
        e.preventDefault();
        const message = e.target.elements.chat.value;
        const data = await fetchData("POST", "/send-message", {
            message,
            visionId,
        });
        e.target.elements.chat.value = "";
        handleMessages(data.messageDetails, "right");
    } catch (error) {
        toast("error", error.message);
    }
};

const handleMessages = (messageDetails, type) => {
    const chatHistory = document.querySelector(`[data-chat-history]`);
    const comment = createChatElement(messageDetails, type);
    chatHistory?.appendChild(comment);
    if (chatHistory) {
        chatHistory.scrollTop = chatHistory?.scrollHeight;
    }
};

const createChatElement = (messageDetails, type) => {
    const div = document.createElement("div");
    div.setAttribute("class", `chat-${type}`);
    div.innerHTML = `<p class="chat-text">${messageDetails.message}</p>
                    <div class="chat-details">
                        <span>${messageDetails.name}</span>
                        <span>${messageDetails.time}</span>
                    </div>`;

    return div;
};
const showInterest = () => {
    document.querySelector(`[data-interest]`).classList.remove("hide");
    document.querySelector(`[data-chat-show]`).classList.add("hide");
};
const showChatDiv = () => {
    document.querySelector(`[data-interest]`).classList.add("hide");
    document.querySelector(`[data-chat-show]`).classList.remove("hide");
};
const showIndividualChat = async (id) => {
    visionId = id;

    document.querySelector(`[data-homescreen]`).classList.add("hide");
    document.querySelector(`[data-individual]`).classList.remove("hide");
    const history = document.querySelector(`[data-chat-history]`);
    const data = await fetchData("GET", `/get-message/${id}`);
    if (data.status == "success") {
        const vision = data?.vision;
        if (vision) {
            const members = vision.interested.reduce(
                (acc, value) => acc + value.userId.name + ", ",
                ""
            );
            document.querySelector(`[chat-title-chat]`).textContent =
                vision.title;

            document.querySelector(`[chat-member-chat]`).textContent = members;
        }
        history.innerHTML = "";
        data?.messages?.forEach((element) => {
            const date = new Date(element.sendAt);
            const div = document.createElement("div");
            div.setAttribute(
                "class",
                element.userId._id == data.userId ? "chat-right" : "chat-left"
            );
            div.innerHTML = `<p class="chat-text">
                             ${element.message}
                            </p>
                            <div class="chat-details">
                                <span>${element.userId.name}</span
                                ><span>${
                                    date.toLocaleDateString() +
                                    " " +
                                    date.toLocaleTimeString('en-US')
                                }</span>
                            </div>
            `;
            history.appendChild(div);
            history.scrollTop = history.scrollHeight;
        });
    }
};
const gotoHomescreen = () => {
    document.querySelector(`[data-homescreen]`).classList.remove("hide");
    document.querySelector(`[data-individual]`).classList.add("hide");
};
