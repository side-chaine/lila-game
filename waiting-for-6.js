/**
 * Модуль ожидания шестерки для начала игры
 * Этот модуль отвечает за показ различных интересных сообщений
 * пока игрок пытается выбросить 6 для начала игры
 */
(function() {
    console.log(">>> Инициализация модуля ожидания шестерки");
    
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
    
    // Перехватываем функцию обработки броска кубика
    document.addEventListener('DOMContentLoaded', function() {
        console.log("Подготовка перехвата функции processGameLogic...");
        
        // Сохраняем оригинальную функцию
        let originalProcessGameLogic;
        
        if (typeof window.processGameLogic === 'function') {
            originalProcessGameLogic = window.processGameLogic;
            
            window.processGameLogic = function(diceValue) {
                console.log(`waiting-for-6: Выпало ${diceValue}, проверяем состояние игры...`);
                
                // Используем функцию из game-state-fixer.js для проверки состояния игры
                const gameStarted = typeof window.isGameStarted === 'function' 
                    ? window.isGameStarted() 
                    : window.gameStarted || window.currentPosition > 1;
                
                console.log(`waiting-for-6: Состояние игры - ${gameStarted ? 'НАЧАЛАСЬ' : 'НЕ НАЧАЛАСЬ'}, позиция: ${window.currentPosition}`);
                
                // Если игра не началась и выпало не 6, показываем случайную фразу
                if (!gameStarted && diceValue !== 6) {
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
                    
                    console.log(`waiting-for-6: Показано сообщение для неудачного броска #${failedRollCount}`);
                    return;
                }
                
                // Если выпала 6 и игра не началась, выводим радостное сообщение
                if (!gameStarted && diceValue === 6) {
                    const messageElement = document.querySelector('.message');
                    if (messageElement) {
                        messageElement.innerHTML = `<span style="color:#2ecc71">Выпало ${diceValue}! Поздравляем! Игра началась!</span>`;
                    }
                    
                    // Сбрасываем счетчик неудачных бросков
                    failedRollCount = 0;
                    
                    // Отмечаем, что игра началась
                    window.gameStarted = true;
                    if (window.gameState) {
                        window.gameState.started = true;
                    }
                    
                    console.log(`waiting-for-6: Выпала шестерка, игра начинается!`);
                }
                
                // Если игра началась или выпало 6, передаем управление оригинальной функции
                if (originalProcessGameLogic) {
                    originalProcessGameLogic(diceValue);
                }
            };
            
            console.log(">>> Функция processGameLogic успешно перехвачена для модуля ожидания шестерки");
        } else {
            console.warn("Функция processGameLogic не найдена, ожидание шестерки не будет работать");
        }
        
        // Находим и обновляем исходное сообщение о броске кубика
        const messageElement = document.querySelector('.message');
        if (messageElement && messageElement.textContent.includes('Бросьте кубик')) {
            messageElement.innerHTML = '<span style="color:#3498db">Бросайте кубик и ждите шестерку для начала приключения!</span>';
        }
    });
})(); 