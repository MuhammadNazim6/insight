
const message = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const chatbox = document.getElementById('chatbox');
const chatsContainer = chatbox.querySelector('.chats');

message.addEventListener('keypress', (event) => {
    if (event.key == 'Enter') {
        event.preventDefault();
        sendMessage();
    }
});

sendButton.addEventListener('click', () => {
    sendMessage();
});

function sendMessage() {
    const messageContent = message.value.trim();

    if (messageContent !== '') {
        showChat('outgoing', messageContent, chatsContainer);
        message.value = '';
    }
}

function showChat(type, message, container) {
    const newChat = document.createElement('div');
    newChat.className = 'chat';
    newChat.classList.add(`chat-${type}`);

    const paragraph = document.createElement('p');
    paragraph.textContent = message;
    newChat.appendChild(paragraph);

    container.appendChild(newChat);
    container.scrollTop = container.scrollHeight;
}
