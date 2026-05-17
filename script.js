document.getElementById('feedbackForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Предотвращаем перезагрузку страницы

    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());
    const statusDiv = document.getElementById('formStatus');

    statusDiv.textContent = 'Отправка...';

    try {
        // Укажите URL вашего обработчика (PHP, Node.js и т.д.)
        const response = await fetch('/api/sendmail.php', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            statusDiv.textContent = 'Сообщение успешно отправлено!';
            this.reset(); // Очищаем форму
        } else {
            statusDiv.textContent = 'Ошибка сервера. Попробуйте позже.';
        }
    } catch (error) {
        statusDiv.textContent = 'Ошибка сети. Проверьте подключение.';
        console.error('Ошибка:', error);
    }
});