let messages = [];

function loadMessages() {
    // Загрузка сообщений из локального хранилища
    messages = JSON.parse(localStorage.getItem('messages')) || [];
    displayMessages();
}

function displayMessages() {
    const messagesDiv = document.getElementById('messages');
    messagesDiv.innerHTML = '';
    messages.forEach((msg, index) => {
        const msgElement = document.createElement('div');
        msgElement.className = 'message';
        msgElement.innerHTML = `
            <p><strong>${msg.name}</strong> (<em>${msg.email}</em>)</p>
            <p>${msg.message}</p>
            <button onclick="markAsRead(${index})">Прочитано</button>
            <button onclick="deleteMessage(${index})">Удалить</button>
        `;
        messagesDiv.appendChild(msgElement);
    });
}

function markAsRead(index) {
    messages[index].read = true;
    localStorage.setItem('messages', JSON.stringify(messages));
    displayMessages();
}

function deleteMessage(index) {
    messages.splice(index, 1);
    localStorage.setItem('messages', JSON.stringify(messages));
    displayMessages();
}

window.addEventListener('load', loadMessages);

// Функция для проверки новых сообщений на основном сайте
function checkNewMessages() {
    // Здесь должна быть логика проверки новых сообщений с основного сайта
    // Например, можно использовать AJAX запрос или fetch API
    // Для примера, мы будем просто добавлять новые сообщения каждые 5 секунд
    setTimeout(() => {
        const newMessage = {
            name: 'Новое сообщение',
            email: 'new@example.com',
            message: 'Это новое сообщение',
            read: false
        };
        messages.push(newMessage);
        localStorage.setItem('messages', JSON.stringify(messages));
        displayMessages();
        checkNewMessages(); // Повторная проверка через 5 секунд
    }, 5000);
}

checkNewMessages(); // Начало проверки новых сообщений

