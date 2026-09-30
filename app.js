let appData = {};
let currentMode = 'vocabulary';
let currentItem = null;
let score = 0;
let totalAttempts = 0;

// Elements
const questionDisplay = document.getElementById('questionDisplay');
const answerDisplay = document.getElementById('answerDisplay');
const categoryDisplay = document.getElementById('categoryDisplay');
const showAnswerBtn = document.getElementById('showAnswerBtn');
const gradingControls = document.getElementById('gradingControls');
const scoreDisplay = document.getElementById('scoreDisplay');
const totalDisplay = document.getElementById('totalDisplay');

// Fetch the JSON data
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        appData = data;
        loadNextQuestion();
    })
    .catch(error => {
        questionDisplay.textContent = "Error loading data. Make sure data.json exists.";
        console.error("Fetch error:", error);
    });

function setMode(mode) {
    currentMode = mode;
    // Update active button styling
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    loadNextQuestion();
}

function loadNextQuestion() {
    const items = appData[currentMode];
    if (!items || items.length === 0) return;

    // Pick a random item
    const randomIndex = Math.floor(Math.random() * items.length);
    currentItem = items[randomIndex];

    // Reset UI state
    answerDisplay.style.display = 'none';
    gradingControls.style.display = 'none';
    showAnswerBtn.style.display = 'block';

    // Populate text based on mode
    if (currentMode === 'vocabulary') {
        questionDisplay.textContent = currentItem.english;
        answerDisplay.textContent = currentItem.swedish;
        categoryDisplay.textContent = currentItem.category;
    } else {
        questionDisplay.textContent = currentItem.question;
        answerDisplay.textContent = currentItem.answer;
        categoryDisplay.textContent = "Practice";
    }
}

function showAnswer() {
    answerDisplay.style.display = 'block';
    showAnswerBtn.style.display = 'none';
    gradingControls.style.display = 'flex';
}

function grade(isCorrect) {
    totalAttempts++;
    if (isCorrect) {
        score++;
    }
    
    scoreDisplay.textContent = score;
    totalDisplay.textContent = totalAttempts;
    
    loadNextQuestion();
}
