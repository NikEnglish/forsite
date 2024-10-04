<?php
// server.php

// Функция для получения всех сообщений
function get_all_messages() {
    $messages = [];
    $file = fopen("messages.txt", "r");
    while (($line = fgets($file)) !== false) {
        $messages[] = explode(':', trim($line));
    }
    fclose($file);
    return $messages;
}

// Функция для добавления нового сообщения
function add_message($name, $email, $message) {
    file_put_contents("messages.txt", $name . ':' . $email . ':' . $message . "\n", FILE_APPEND);
}

// Функция для пометки сообщения как прочитанного
function mark_as_read($index) {
    global $messages;
    if ($index >= count($messages)) {
        return;
    }
    $messages[$index]['read'] = true;
    save_messages();
}

// Функция для удаления сообщения
function delete_message($index) {
    global $messages;
    if ($index >= count($messages)) {
        return;
    }
    unset($messages[$index]);
    save_messages();
}

// Функция для сохранения изменений в файл
function save_messages() {
    global $messages;
    $content = '';
    foreach ($messages as $message) {
        $content .= implode(':', $message) . "\n";
    }
    file_put_contents("messages.txt", $content);
}

// Обработчик AJAX-запросов
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['get-messages'])) {
    header('Content-Type: application/json');
    echo json_encode(get_all_messages());
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    switch ($_POST['action']) {
        case 'add-message':
            add_message($_POST['name'], $_POST['email'], $_POST['message']);
            break;
        case 'mark-as-read':
            mark_as_read($_POST['index']);
            break;
        case 'delete-message':
            delete_message($_POST['index']);
            break;
    }
    header('Content-Type: application/json');
    echo json_encode(['success' => true]);
} else {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid request']);
}
?>
