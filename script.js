const texts = [
    'Привет!',
    'Sleryfink, да это я...',
    'Тут могла быть твоя реклама', 
    '1201816800', 
    //`Nah I'd Win 🤞`,
    'Напиши мне...',
    'Дмитрий 100 рублей от вас📍',
    'Why...',
    'Sweet user',
    'I <3 ...'
];
let currentText = 0;
let currentChar = -8;
let isDeleting = false;
let recentTexts = [];

const typeTextElement = document.getElementById('type-text');
const bodyElement = document.body;

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

function type() {
    const currentString = texts[currentText];
    let displayedText;

    if (isDeleting) {
        displayedText = currentString.substring(0, currentChar--);
    } else {
        displayedText = currentString.substring(0, currentChar+++1);
    }

    typeTextElement.innerHTML = displayedText;

    let typingSpeed = isDeleting
        ? 50 + (currentString.length - currentChar) * 5
        : 150;

    const pauseBeforeDeleting = 1000;

    if (!isDeleting && currentChar === currentString.length) {
        isDeleting = true;
        setTimeout(type, pauseBeforeDeleting);
    }
    else if (isDeleting && currentChar === -1) {
        isDeleting = false;
        currentText = getRandomTextIndex();
        currentChar = 0;
        setTimeout(type, 500);
    } else {
        setTimeout(type, typingSpeed);
    }
}


function getRandomTextIndex() {
    let availableIndices = texts
        .map((_, index) => index) // Создаем массив всех индексов
        .filter(index => !recentTexts.includes(index)); // Исключаем последние три индекса

    if (availableIndices.length === 0) {
        recentTexts = [];
        availableIndices = texts.map((_, index) => index);
    }

    const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];

    recentTexts.push(randomIndex);
    if (recentTexts.length > 3) {
        recentTexts.shift();
    }

    return randomIndex;
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
