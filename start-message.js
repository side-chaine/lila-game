/**
 * Исправленный модуль сообщений о начале игры
 * Файл создан для исправления ошибки, когда игра требует бросить 6 даже после начала игры
 */
(function() {
    // Дождемся загрузки DOM
    document.addEventListener('DOMContentLoaded', function() {
        console.log("Инициализация модуля start-message...");
        
        // Коллекция фраз для ожидания 6-ки
        const waitingSixPhrases = [
            "Бросай снова, ждем шестерку!...",
            "Как говорил Тарантино: «Удача приходит к тем, кто бросает кубики до шестерки»",
            "Эй, игрок! Судьба ждет шестерку, чтобы запустить твое приключение",
            "Шестерка, где ты? Выходи, не стесняйся...",
            "Продолжай бросать! Шестерка уже разминается за кулисами",
            "Жизнь как кубик — иногда нужно несколько попыток, чтобы получить шестерку",
            "В этой игре, как в фильмах Тарантино — самое интересное начинается только после драматичного вступления",
            "Бросай с чувством, с толком, с расстановкой! Шестерка любит уверенных игроков",
            "Каждый бросок приближает тебя к шестерке... возможно",
            "Так близко к началу приключения, осталось только выбросить заветную шестерку!",
            "Давай, давай, шестерка! Мама нуждается в новой игре!",
            "Кубик, кубик на столе, кто выбросит шестерку всех скорее?",
            "Шестерка — это не просто число, это пропуск в мир игры!",
            "Терпение, игрок. Каждый мастер начинал с ожидания своей шестерки",
            "Говорят, если три раза произнести «шестерка» перед броском..."
        ];
        
        // Отслеживаем количество неудачных бросков для разных фраз
        let failedRollCount = 0;
        
        // Отслеживаем значение gameStarted для корректного отображения сообщений
        let originalProcessGameLogic;
        
        // Перехватываем функцию обработки броска кубика
        if (typeof window.processGameLogic === 'function') {
            originalProcessGameLogic = window.processGameLogic;
            window.processGameLogic = function(diceValue) {
                // Проверяем, началась ли игра
                const gameStarted = window.gameStarted || 
                                    window.currentPosition > 1 ||
                                    (window.currentPosition === 6); // Если фишка на 6, игра точно началась
                
                console.log(`start-message: Состояние игры - ${gameStarted ? 'НАЧАЛАСЬ' : 'НЕ НАЧАЛАСЬ'}, позиция: ${window.currentPosition}`);
                
                // Если игра не началась и выпало не 6, показываем сообщение
                if (!gameStarted && diceValue !== 6) {
                    console.log(`Выпало ${diceValue}, нужна 6 чтобы начать игру`);
                    
                    // Увеличиваем счетчик неудачных бросков
                    failedRollCount++;
                    
                    // Выбираем случайную фразу
                    const randomIndex = Math.floor(Math.random() * waitingSixPhrases.length);
                    const phrase = waitingSixPhrases[randomIndex];
                    
                    // Показываем стилизованное сообщение
                    const messageElement = document.querySelector('.message');
                    if (messageElement) {
                        // Выпадающий номер и основная фраза
                        messageElement.innerHTML = `<span style="color:#f1c40f">Выпало ${diceValue}.</span> ${phrase}`;
                        
                        // Если было много неудачных бросков, добавляем подбадривание
                        if (failedRollCount > 3 && failedRollCount % 3 === 0) {
                            messageElement.innerHTML += `<br><span style="font-size:0.9em; color:#3498db">Не сдавайся! Шестерка уже близко!</span>`;
                        }
                    }
                    return;
                }
                
                // Сбрасываем счетчик неудачных бросков
                failedRollCount = 0;
                
                // Если игра началась или выпало 6, передаем управление оригинальной функции
                if (originalProcessGameLogic) {
                    originalProcessGameLogic(diceValue);
                }
            };
            
            console.log("Функция processGameLogic успешно перехвачена для правильной обработки начала игры");
        } else {
            console.warn("Функция processGameLogic не найдена");
        }
        
        // Находим и обновляем исходное сообщение о броске кубика
        const messageElement = document.querySelector('.message');
        if (messageElement && messageElement.textContent.includes('Бросьте кубик')) {
            messageElement.innerHTML = 'Бросайте кубик и ждите шестерку для начала приключения!';
        }
    });
})(); 