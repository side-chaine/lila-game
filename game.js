let gameActive = false; // Игра не началась
let sixCount = 0; // Счетчик шестерок
const dice = document.getElementById('dice');
const counterDisplay = document.getElementById('six-counter');
const messageDisplay = document.getElementById('message'); // Элемент для сообщений

// Изначально скрываем счетчик
counterDisplay.style.display = 'none';

dice.addEventListener('click', () => {
    const result = Math.floor(Math.random() * 6) + 1;
    
    if (!gameActive) {
        // Игра не активна, ждем первую шестерку
        if (result === 6) {
            gameActive = true;
            messageDisplay.textContent = "Игра началась! Выпала первая шестерка.";
            counterDisplay.style.display = 'block'; // Показываем счетчик
            sixCount = 1; // Начинаем считать шестерки
            counterDisplay.textContent = `Шестерок: ${sixCount}`;
        } else {
            messageDisplay.textContent = "Бросай снова, ждем шестерку!";
        }
    } else {
        // Игра активна
        if (result === 6) {
            sixCount++;
            counterDisplay.textContent = `Шестерок: ${sixCount}`;
            if (sixCount === 3) {
                messageDisplay.textContent = "Хет-трик! Шестерки сгорели, бросай снова!";
                sixCount = 0;
                counterDisplay.style.display = 'none'; // Скрываем счетчик
            } else if (sixCount >= 4) {
                messageDisplay.textContent = "Флеш-рояль! Все шестерки сохраняются!";
            }
        } else {
            // Выпало число, отличное от 6
            if (sixCount > 0) {
                const totalMove = sixCount * 6 + result;
                messageDisplay.textContent = `Вы проходите ${totalMove} клеток.`;
                sixCount = 0;
                counterDisplay.style.display = 'none'; // Скрываем счетчик
            } else {
                messageDisplay.textContent = `Вы проходите ${result} клеток.`;
            }
        }
    }
}); 