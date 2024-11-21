// List of random objects
const objects = ["Rock", "Book", "Scissors", "Folder", "Paper", "Pencil", "Phone", "Apple", "Chair"];

// Select DOM elements
const prompt = document.getElementById("prompt");
const circleText = document.getElementById("circle-text");
const cooldownTimer = document.getElementById("cooldown-timer");
const status = document.getElementById("status");
const gridCells = document.querySelectorAll(".grid-cell"); // Select all grid cells

// Game variables
let round = 1; // Start from "1"
const totalRounds = Infinity; // Infinite rounds
let cooldown = 20; // Cooldown in seconds
let cooldownInterval = null;
let gameActive = true; // To prevent extra clicks during cooldown
let selectedCell = null; // Track selected cell

// Generate a random prompt
function getRandomPrompt() {
    const randomIndex = Math.floor(Math.random() * objects.length);
    return objects[randomIndex];
}

// Fill grid with randomised objects
function fillGrid() {
    // Shuffle the objects array to randomize the grid
    const shuffledObjects = [...objects].sort(() => Math.random() - 0.5);
    
    // Loop through grid cells and assign random objects
    gridCells.forEach((cell, index) => {
        cell.textContent = shuffledObjects[index] || '';
        cell.classList.remove('hidden'); // Make sure the cell is visible before selection
        cell.style.backgroundColor = "white"; // Reset color if needed
        cell.addEventListener('click', () => handleCellClick(cell, shuffledObjects[index]));
    });
}

// Start the cooldown timer
function startCooldown() {
    cooldown = 20; // Reset cooldown to 20 seconds
    cooldownTimer.textContent = `${cooldown}s`;

    // Clear any previous interval
    clearInterval(cooldownInterval);

    // Start the countdown
    cooldownInterval = setInterval(() => {
        cooldown--;
        cooldownTimer.textContent = `${cooldown}s`;

        if (cooldown <= 0) {
            clearInterval(cooldownInterval); // Stop countdown
            handleMiss(); // Automatically progress to the next round
        }
    }, 1000); // Decrease cooldown every second
}

// Handle player clicking on the grid cells
function handleCellClick(cell, object) {
    if (!gameActive) return; // Prevent clicks if the game isn't active

    // Check if the clicked cell matches the current prompt
    if (object === prompt.textContent) {
        cell.style.backgroundColor = "lightgreen"; // Mark as selected
        cell.classList.add('hidden'); // Hide selected box

        round++; // Increment the round
        circleText.textContent = `${round}`; // Show current round number

        // Update the prompt with fade-in effect
        setTimeout(() => {
            prompt.textContent = getRandomPrompt(); // Change prompt after selection
            prompt.style.animation = "fadeIn 1s ease-in-out"; // Apply fade-in animation
            fillGrid(); // Reset grid after prompt change
            startCooldown(); // Restart cooldown timer
        }, 1000); // Wait 1 second before changing the prompt
    } else {
        // Incorrect selection, trigger a 5-second delay before fade-out
        setTimeout(() => {
            prompt.style.animation = "fadeOut 1s ease-in-out"; // Apply fade-out effect
        }, 5000); // Wait 5 seconds before starting fade-out

        cell.style.backgroundColor = "red"; // Incorrect selection

        setTimeout(() => {
            cell.style.backgroundColor = "white"; // Reset cell color after some time
        }, 500); // Reset color after 500ms
    }
}

// Handle when player misses clicking before the timer ends
function handleMiss() {
    if (!gameActive) return; // Prevent actions if the game isn't active

    round++;
    circleText.textContent = `${round}`;

    // Update the prompt and restart the cooldown
    prompt.textContent = getRandomPrompt();
    fillGrid(); // Reset grid after prompt change
    startCooldown(); // Restart cooldown timer
}

// End the game
function endGame() {
    gameActive = false; // Disable interactions
    clearInterval(cooldownInterval); // Stop cooldown timer
    cooldownTimer.textContent = ""; // Clear the timer display
}

// Initialise the game
function initGame() {
    prompt.textContent = getRandomPrompt(); // Set initial prompt
    circleText.textContent = `${round}`; // Reset round
    gameActive = true; // Activate the game
    status.textContent = ""; // Clear status message
    selectedCell = null; // Reset selected cell tracker
    fillGrid(); // Fill grid with randomised objects
    startCooldown(); // Start initial cooldown
}

// Start the game
initGame();
