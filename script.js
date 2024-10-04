$(document).ready(function() {
    // Функция для загрузки сообщений из сервера
    function loadMessages() {
        $.ajax({
            url: '/get-messages',
            method: 'GET',
            success: function(response) {
                const messagesDiv = $('#messages');
                messagesDiv.empty();
                
                $.each(response, function(index, message) {
                    const msgElement = $('<div>')
                        .addClass('message')
                        .html(`
                            <p><strong>${message.name}</strong> (<em>${message.email}</em>)</p>
                            <p>${message.message}</p>
                            <button onclick="markAsRead(${index})">Прочитано</button>
                            <button onclick="deleteMessage(${index})">Удалить</button>
                        `);
                    messagesDiv.append(msgElement);
                });
            },
            error: function(xhr, status, error) {
                console.error('Ошибка при загрузке сообщений:', error);
                alert('Произошла ошибка при загрузке сообщений. Попробуйте еще раз.');
            }
        });
    }

    // Функция для пометки сообщения как прочитанного
    function markAsRead(index) {
        $.ajax({
            url: '/mark-as-read',
            method: 'POST',
            data: { index: index },
            success: function(response) {
                loadMessages();
            },
            error: function(xhr, status, error) {
                console.error('Ошибка при пометке сообщения как прочитанного:', error);
                alert('Произошла ошибка при пометке сообщения как прочитанного.');
            }
        });
    }

    // Функция для удаления сообщения
    function deleteMessage(index) {
        $.ajax({
            url: '/delete-message',
            method: 'POST',
            data: { index: index },
            success: function(response) {
                loadMessages();
            },
            error: function(xhr, status, error) {
                console.error('Ошибка при удалении сообщения:', error);
                alert('Произошла ошибка при удалении сообщения.');
            }
        });
    }

    // Загрузка сообщений при загрузке страницы
    loadMessages();

    // Проверка новых сообщений каждые 30 секунд
    setInterval(loadMessages, 30000);
});
