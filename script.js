const texts = ["Sleryfink, да эт я)", "Мммммм", "тут могла быть ваша реклама)", "P1034071991 скинь денежку ;)", "Genial, ̶m̶i̶l̶i̶a̶r̶d̶a̶r̶, playboy, filantrop.", "Дмитрий 100 рублей от вас📍", "Sweet user", "1201816800", "Ya v shoke"];
let currentText = 0;
let currentChar = -8;
let isDeleting = false;
let previousTexts = []; // Массив для хранения последних двух текстов

const typeTextElement = document.getElementById('type-text');
const bodyElement = document.body; // Получаем доступ к элементу body

window.addEventListener('load', () => {
    document.body.classList.add('loaded');  // Добавляем класс для активации анимации
});

function getRandomTextIndex() {
    let availableIndexes = texts.map((_, index) => index).filter(index => !previousTexts.includes(index)); // Фильтруем последние два текста
    let randomIndex = Math.floor(Math.random() * availableIndexes.length);  // Возвращаем случайный индекс из оставшихся
    return availableIndexes[randomIndex];
}

function updatePreviousTexts() {
    previousTexts.push(currentText);
    if (previousTexts.length > 2) {
        previousTexts.shift(); // Убираем старые тексты, если их больше двух
    }
}

function type() {
    const currentString = texts[currentText];
    let displayedText;

    if (isDeleting) {
        displayedText = currentString.substring(0, currentChar--);  // Уменьшаем количество символов
    } else {
        displayedText = currentString.substring(0, currentChar+++1);  // Увеличиваем количество символов
    }

    typeTextElement.textContent = displayedText;

    // Скорость печатания/удаления
    const typingSpeed = isDeleting ? 150 : 150;
    const pauseBeforeDeleting = 1000;  // Задержка перед удалением текста

    if (!isDeleting && currentChar === currentString.length) {
        isDeleting = true;  // Начинаем удалять текст
        setTimeout(type, pauseBeforeDeleting);  // Задержка перед удалением
    } else if (isDeleting && currentChar === -1) {
        isDeleting = false;  // Начинаем печатать следующий текст
        updatePreviousTexts(); // Обновляем историю текстов
        currentText = getRandomTextIndex();  // Переход к случайному следующему тексту, который не был показан недавно
        setTimeout(type, 500);  // Пауза перед началом печатания нового текста
    } else {
        setTimeout(type, typingSpeed);  // Продолжаем печатать/удалять
    }
}

function toggleTheme() {
    if (bodyElement.classList.contains('light-theme')) {
        bodyElement.classList.remove('light-theme');
        bodyElement.classList.add('dark-theme');
    } else {
        bodyElement.classList.remove('dark-theme');
        bodyElement.classList.add('light-theme');
    }
}

// Событие на клик по тексту для смены темы
typeTextElement.addEventListener('click', toggleTheme);

// Запуск функции печатания
document.addEventListener('DOMContentLoaded', type);
