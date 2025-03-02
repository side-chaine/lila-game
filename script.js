const board = [
    { number: 1, name: "Клетка 1", description: "Это клетка 1", position: { top: '300px', left: '0px' } },
    { number: 2, name: "Клетка 2", description: "Это клетка 2", position: { top: '300px', left: '50px' } },
    { number: 3, name: "Клетка 3", description: "Это клетка 3", position: { top: '300px', left: '100px' } },
    { number: 4, name: "Клетка 4", description: "Это клетка 4", position: { top: '300px', left: '150px' } },
    { number: 5, name: "Клетка 5", description: "Это клетка 5", position: { top: '300px', left: '200px' } },
    { number: 6, name: "Клетка 6", description: "Это клетка 6", position: { top: '300px', left: '250px' } },
    { number: 7, name: "Клетка 7", description: "Это клетка 7", position: { top: '300px', left: '300px' } },
    { number: 8, name: "Клетка 8", description: "Это клетка 8", position: { top: '300px', left: '350px' } },
    { number: 9, name: "Клетка 9", description: "Это клетка 9", position: { top: '300px', left: '400px' } },
    { number: 10, name: "Клетка 10", description: "Это клетка 10", position: { top: '250px', left: '0px' } },
    { number: 11, name: "Клетка 11", description: "Это клетка 11", position: { top: '250px', left: '50px' } },
    { number: 12, name: "Клетка 12", description: "Это клетка 12", position: { top: '250px', left: '100px' } },
    { number: 13, name: "Клетка 13", description: "Это клетка 13", position: { top: '250px', left: '150px' } },
    { number: 14, name: "Клетка 14", description: "Это клетка 14", position: { top: '250px', left: '200px' } },
    { number: 15, name: "Клетка 15", description: "Это клетка 15", position: { top: '250px', left: '250px' } },
    { number: 16, name: "Клетка 16", description: "Это клетка 16", position: { top: '250px', left: '300px' } },
    { number: 17, name: "Клетка 17", description: "Это клетка 17", position: { top: '250px', left: '350px' } },
    { number: 18, name: "Клетка 18", description: "Это клетка 18", position: { top: '250px', left: '400px' } },
    { number: 19, name: "Клетка 19", description: "Это клетка 19", position: { top: '200px', left: '0px' } },
    { number: 20, name: "Клетка 20", description: "Это клетка 20", position: { top: '200px', left: '50px' } },
    { number: 21, name: "Клетка 21", description: "Это клетка 21", position: { top: '200px', left: '100px' } },
    { number: 22, name: "Клетка 22", description: "Это клетка 22", position: { top: '200px', left: '150px' } },
    { number: 23, name: "Клетка 23", description: "Это клетка 23", position: { top: '200px', left: '200px' } },
    { number: 24, name: "Клетка 24", description: "Это клетка 24", position: { top: '200px', left: '250px' } },
    { number: 25, name: "Клетка 25", description: "Это клетка 25", position: { top: '200px', left: '300px' } },
    { number: 26, name: "Клетка 26", description: "Это клетка 26", position: { top: '200px', left: '350px' } },
    { number: 27, name: "Клетка 27", description: "Это клетка 27", position: { top: '200px', left: '400px' } },
    { number: 28, name: "Клетка 28", description: "Это клетка 28", position: { top: '150px', left: '0px' } },
    { number: 29, name: "Клетка 29", description: "Это клетка 29", position: { top: '150px', left: '50px' } },
    { number: 30, name: "Клетка 30", description: "Это клетка 30", position: { top: '150px', left: '100px' } },
    { number: 31, name: "Клетка 31", description: "Это клетка 31", position: { top: '150px', left: '150px' } },
    { number: 32, name: "Клетка 32", description: "Это клетка 32", position: { top: '150px', left: '200px' } },
    { number: 33, name: "Клетка 33", description: "Это клетка 33", position: { top: '150px', left: '250px' } },
    { number: 34, name: "Клетка 34", description: "Это клетка 34", position: { top: '150px', left: '300px' } },
    { number: 35, name: "Клетка 35", description: "Это клетка 35", position: { top: '150px', left: '350px' } },
    { number: 36, name: "Клетка 36", description: "Это клетка 36", position: { top: '150px', left: '400px' } },
    { number: 37, name: "Клетка 37", description: "Это клетка 37", position: { top: '100px', left: '0px' } },
    { number: 38, name: "Клетка 38", description: "Это клетка 38", position: { top: '100px', left: '50px' } },
    { number: 39, name: "Клетка 39", description: "Это клетка 39", position: { top: '100px', left: '100px' } },
    { number: 40, name: "Клетка 40", description: "Это клетка 40", position: { top: '100px', left: '150px' } },
    { number: 41, name: "Клетка 41", description: "Это клетка 41", position: { top: '100px', left: '200px' } },
    { number: 42, name: "Клетка 42", description: "Это клетка 42", position: { top: '100px', left: '250px' } },
    { number: 43, name: "Клетка 43", description: "Это клетка 43", position: { top: '100px', left: '300px' } },
    { number: 44, name: "Клетка 44", description: "Это клетка 44", position: { top: '100px', left: '350px' } },
    { number: 45, name: "Клетка 45", description: "Это клетка 45", position: { top: '100px', left: '400px' } },
    { number: 46, name: "Клетка 46", description: "Это клетка 46", position: { top: '50px', left: '0px' } },
    { number: 47, name: "Клетка 47", description: "Это клетка 47", position: { top: '50px', left: '50px' } },
    { number: 48, name: "Клетка 48", description: "Это клетка 48", position: { top: '50px', left: '100px' } },
    { number: 49, name: "Клетка 49", description: "Это клетка 49", position: { top: '50px', left: '150px' } },
    { number: 50, name: "Клетка 50", description: "Это клетка 50", position: { top: '50px', left: '200px' } },
    { number: 51, name: "Клетка 51", description: "Это клетка 51", position: { top: '50px', left: '250px' } },
    { number: 52, name: "Клетка 52", description: "Это клетка 52", position: { top: '50px', left: '300px' } },
    { number: 53, name: "Клетка 53", description: "Это клетка 53", position: { top: '50px', left: '350px' } },
    { number: 54, name: "Клетка 54", description: "Это клетка 54", position: { top: '50px', left: '400px' } },
    { number: 55, name: "Клетка 55", description: "Это клетка 55", position: { top: '0px', left: '0px' } },
    { number: 56, name: "Клетка 56", description: "Это клетка 56", position: { top: '0px', left: '50px' } },
    { number: 57, name: "Клетка 57", description: "Это клетка 57", position: { top: '0px', left: '100px' } },
    { number: 58, name: "Клетка 58", description: "Это клетка 58", position: { top: '0px', left: '150px' } },
    { number: 59, name: "Клетка 59", description: "Это клетка 59", position: { top: '0px', left: '200px' } },
    { number: 60, name: "Клетка 60", description: "Это клетка 60", position: { top: '0px', left: '250px' } },
    { number: 61, name: "Клетка 61", description: "Это клетка 61", position: { top: '0px', left: '300px' } },
    { number: 62, name: "Клетка 62", description: "Это клетка 62", position: { top: '0px', left: '350px' } },
    { number: 63, name: "Клетка 63", description: "Это клетка 63", position: { top: '0px', left: '400px' } },
    { number: 64, name: "Клетка 64", description: "Это клетка 64", position: { top: '-50px', left: '0px' } },
    { number: 65, name: "Клетка 65", description: "Это клетка 65", position: { top: '-50px', left: '50px' } },
    { number: 66, name: "Клетка 66", description: "Это клетка 66", position: { top: '-50px', left: '100px' } },
    { number: 67, name: "Клетка 67", description: "Это клетка 67", position: { top: '-50px', left: '150px' } },
    { number: 68, name: "Клетка 68", description: "Это клетка 68", position: { top: '-50px', left: '200px' } },
    { number: 69, name: "Клетка 69", description: "Это клетка 69", position: { top: '-50px', left: '250px' } },
    { number: 70, name: "Клетка 70", description: "Это клетка 70", position: { top: '-50px', left: '300px' } },
    { number: 71, name: "Клетка 71", description: "Это клетка 71", position: { top: '-50px', left: '350px' } },
    { number: 72, name: "Клетка 72", description: "Это клетка 72", position: { top: '-50px', left: '400px' } },
];

// Стрелки и змеи
const arrows = {
    4: 71,
    9: 70,
    21: 42,
    27: 60,
    51: 67,
};

const snakes = {
    72: 1,
    65: 46,
    56: 28,
    45: 24,
    37: 13,
};

const gameBoard = document.getElementById('game-board');
const diceResult = document.getElementById('dice-result');
const notification = document.getElementById('notification');
let currentPosition = 1;

// Создание игрового поля
function createBoard() {
    board.forEach(cell => {
        const cellDiv = document.createElement('div');
        cellDiv.className = 'cell';
        cellDiv.innerText = cell.number;
        cellDiv.style.top = cell.position.top;
        cellDiv.style.left = cell.position.left;
        cellDiv.dataset.cellNumber = cell.number;
        gameBoard.appendChild(cellDiv);
    });

    // Добавление фишки на клетку 1
    const playerPiece = document.createElement('div');
    playerPiece.className = 'player-piece';
    gameBoard.appendChild(playerPiece);
    updatePlayerPosition(playerPiece);
}

// Обновление позиции фишки
function updatePlayerPosition(playerPiece) {
    const cell = document.querySelector(`.cell[data-cell-number="${currentPosition}"]`);
    const rect = cell.getBoundingClientRect();
    const boardRect = gameBoard.getBoundingClientRect();
    const offsetX = rect.left - boardRect.left;
    const offsetY = rect.top - boardRect.top;
    playerPiece.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
}

// Движение игрока
function movePlayer(steps) {
    currentPosition += steps;
    if (currentPosition > 72) currentPosition = 72; // Ограничение по максимальному значению
    checkForSpecialCells();
    updatePlayerPosition(document.querySelector('.player-piece'));
    updateNotification();
}

// Проверка на стрелки и змеи
function checkForSpecialCells() {
    if (arrows[currentPosition]) {
        currentPosition = arrows[currentPosition];
    } else if (snakes[currentPosition]) {
        currentPosition = snakes[currentPosition];
    }
}

// Обновление уведомления
function updateNotification() {
    const cell = board[currentPosition - 1];
    notification.innerText = `${cell.name}: ${cell.description}`;
    notification.style.display = 'block';
    setTimeout(() => notification.style.display = 'none', 3000);
}

// Обработка броска кубика
document.getElementById('roll-dice').addEventListener('click', () => {
    const result = Math.floor(Math.random() * 6) + 1;
    diceResult.innerText = `Вы бросили: ${result}`;
    movePlayer(result);
});

// Загрузка изображения карты
document.getElementById('upload-map').addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('game-board').style.backgroundImage = `url(${e.target.result})`;
        };
        reader.readAsDataURL(file);
    }
});

createBoard(); 