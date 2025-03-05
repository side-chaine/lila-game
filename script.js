// Инициализация переменных
let currentPosition = 1; // Начальная позиция фишки
let player; // Элемент фишки
let maketImage; // Элемент изображения макета
const rollButton = document.getElementById('rollButton');
const resultDisplay = document.getElementById('result');
const messageDisplay = document.getElementById('message');

// Координаты ячеек на макете (примерное положение центра каждой ячейки)
// Эти значения нужно будет настроить после тестирования
const cellPositions = {
    // Первый ряд (снизу)
    1: { x: 5, y: 90 },
    2: { x: 15, y: 90 },
    3: { x: 25, y: 90 },
    4: { x: 35, y: 90 },
    5: { x: 45, y: 90 },
    6: { x: 55, y: 90 },
    7: { x: 65, y: 90 },
    8: { x: 75, y: 90 },
    9: { x: 85, y: 90 }
    // Остальные ячейки можно добавить позже
};

// Массив с "змеями" и "лестницами" согласно макету
const specialMoves = {
    // Лестницы (взлеты): начальная позиция -> конечная позиция
    4: 71,
    9: 70,
    21: 42,
    27: 60,
    51: 67,
    
    // Змеи (падения): начальная позиция -> конечная позиция
    72: 1,
    65: 46,
    56: 28,
    45: 24,
    37: 13
};

// Инициализация игры при загрузке страницы
window.onload = function() {
    player = document.getElementById('player');
    maketImage = document.getElementById('maket');
    
    // Скрываем фишку, пока изображение не загрузится полностью
    player.style.display = 'none';
    
    // Когда изображение загрузится, начинаем игру
    maketImage.onload = function() {
        player.style.display = 'block';
        positionPlayerAt(1); // Начальная позиция
    };
    
    // Если изображение уже загружено (из кэша)
    if (maketImage.complete) {
        player.style.display = 'block';
        positionPlayerAt(1);
    }
    
    // Добавляем обработчик для кнопки
    rollButton.addEventListener('click', () => {
        rollButton.disabled = true; // Отключаем кнопку во время анимации
        
        const rolledNumber = rollDice(); // Бросаем кубик
        resultDisplay.innerText = `Выпало: ${rolledNumber}`; // Отображаем результат
        
        // Двигаем фишку с задержкой для лучшего визуального эффекта
        setTimeout(() => {
            movePlayer(rolledNumber); // Двигаем фишку
            
            // Включаем кнопку после завершения анимации
            setTimeout(() => {
                rollButton.disabled = false;
            }, 1000);
        }, 500);
    });
    
    // Выводим сообщение, если макет загрузился
    messageDisplay.innerText = "Макет загружен. Начните игру, бросив кубик!";
};

// Функция для броска кубика
function rollDice() {
    return Math.floor(Math.random() * 6) + 1; // Генерация случайного числа от 1 до 6
}

// Функция для перемещения фишки на конкретную клетку
function positionPlayerAt(position) {
    // Пока у нас только тестовая версия, позиционируем фишку где-то на изображении
    // В будущем нужно будет заполнить массив cellPositions точными координатами
    
    // Используем процентное соотношение для позиционирования
    const maketWidth = maketImage.clientWidth;
    const maketHeight = maketImage.clientHeight;
    
    // Тестовое позиционирование - позже нужно будет настроить для каждой клетки
    let xPercent = 10; // Начальное положение x (%)
    let yPercent = 90; // Начальное положение y (%) - внизу
    
    // Если у нас есть координаты для этой позиции
    if (cellPositions[position]) {
        xPercent = cellPositions[position].x;
        yPercent = cellPositions[position].y;
    }
    
    player.style.left = `${xPercent}%`;
    player.style.top = `${yPercent}%`;
    
    // Выводим отладочную информацию
    console.log(`Позиционирование фишки на клетке ${position}: x=${xPercent}%, y=${yPercent}%`);
}

// Функция для обновления позиции фишки
function movePlayer(steps) {
    let newPosition = currentPosition + steps; // Рассчитываем новую позицию
    
    // Проверка на выход за пределы
    if (newPosition > 72) {
        messageDisplay.innerText = "Вы победили!";
        // Ограничиваем позицию и не двигаем дальше
        return;
    }
    
    // Обновляем текущую позицию
    currentPosition = newPosition;
    
    // Обновление позиции фишки на игровом поле
    positionPlayerAt(currentPosition);
    
    // Проверка на специальные клетки (змеи и лестницы)
    setTimeout(() => {
        if (specialMoves[currentPosition]) {
            const isLadder = specialMoves[currentPosition] > currentPosition;
            const oldPosition = currentPosition;
            
            // Обновляем позицию согласно специальной клетке
            currentPosition = specialMoves[currentPosition];
            
            // Показываем сообщение
            if (isLadder) {
                messageDisplay.innerText = `Взлёт! С клетки ${oldPosition} на клетку ${currentPosition}`;
            } else {
                messageDisplay.innerText = `Змея! С клетки ${oldPosition} на клетку ${currentPosition}`;
            }
            
            // Плавно перемещаем фишку на новую позицию
            setTimeout(() => {
                positionPlayerAt(currentPosition);
            }, 500);
        } else {
            messageDisplay.innerText = `Вы на клетке ${currentPosition}`;
        }
    }, 800);
}