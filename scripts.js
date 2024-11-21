// List of objects to use in the game
const objects = ["Rock", "Book", "Scissors", "Folder", "Paper", "Pencil", "Phone", "Apple", "Chair"];

// Select DOM elements
const prompt = document.getElementById("prompt");
const cooldownTimer = document.getElementById("cooldown-timer");
const gridCells = document.querySelectorAll(".grid-cell"); // Select all grid cells

// Game variables
let cooldown = 30; // 30 seconds per round
let cooldownInterval = null;
let gameActive = true; // To prevent extra clicks during cooldown
let correctPrompt = ""; // Track the current prompt to match against

// Fill grid with random objects (this is the initial grid setup)
function fillGrid() {
    const gridItems = [];
    const randomIndex = Math.floor(Math.random() * objects.length);
    gridItems.push(objects[randomIndex]); // Add the correct prompt

    // Add random objects to fill the grid
    while (gridItems.length < gridCells.length) {
        const randomObject = objects[Math.floor(Math.random() * objects.length)];
        if (!gridItems.includes(randomObject)) {
            gridItems.push(randomObject);
        }
    }

    // Shuffle grid items to randomize their order
    gridItems.sort(() => Math.random() - 0.5);

    gridCells.forEach((cell, index) => {
        const object = gridItems[index];
        cell.textContent = object;
        cell.style.backgroundColor = "white"; // Reset background color
        cell.classList.remove("green"); // Remove any previous green class
        cell.classList.remove("red"); // Remove any previous red class
        cell.addEventListener('click', () => handleCellClick(cell, object)); // Attach click handler
    });
}

// Get a random object from the available list
function getRandomObject() {
    const randomIndex = Math.floor(Math.random() * objects.length);
    return objects[randomIndex];
}

// Start the cooldown timer
function startCooldown() {
    cooldown = 30; // Reset cooldown to 30 seconds
    cooldownTimer.textContent = `${cooldown}s`;

    clearInterval(cooldownInterval); // Clear any previous interval

    cooldownInterval = setInterval(() => {
        cooldown--;
        cooldownTimer.textContent = `${cooldown}s`;

        if (cooldown <= 0) {
            clearInterval(cooldownInterval); // Stop countdown
            handleMiss(); // Automatically progress to the next round if time runs out
        }
    }, 1000); // Decrease cooldown every second
}

// Handle player clicking on the grid cells
function handleCellClick(cell, object) {
    if (!gameActive) return; // Prevent clicks if the game isn't active

    // Compare the current prompt to the object text, ensuring case insensitivity
    if (object.toLowerCase() === correctPrompt.toLowerCase() && !cell.classList.contains('green')) {
        cell.style.backgroundColor = "lightgreen"; // Mark the cell as correct (green)
        cell.classList.add('green'); // Add green class to prevent further changes

        // After a correct answer, change the prompt to a new random object
        correctPrompt = getRandomObject();
        prompt.textContent = correctPrompt; // Update the prompt with new object

        // Fill the grid with new answers and shuffle
        fillGrid();
        
        // Restart the cooldown timer for the next round
        startCooldown();
    } else {
        // Incorrect selection
        cell.style.backgroundColor = "red"; // Mark the cell as incorrect (red)

        setTimeout(() => {
            cell.style.backgroundColor = "white"; // Reset color after some time
        }, 500); // Reset color after 500ms
    }
}

// Handle when player misses clicking before the timer ends
function handleMiss() {
    if (!gameActive) return; // Prevent actions if the game isn't active

    // Reset the game and start with a new prompt
    correctPrompt = getRandomObject();
    prompt.textContent = correctPrompt; // Update correct prompt
    fillGrid(); // Reset grid after prompt change
    startCooldown(); // Restart cooldown timer
}

// Reset the game after a round ends
function resetGame() {
    correctPrompt = getRandomObject(); // Set new prompt
    prompt.textContent = correctPrompt; // Update correct prompt
    fillGrid(); // Reset grid with new random objects
    startCooldown(); // Restart the timer for the new round
}

// Initialise the game
function initGame() {
    correctPrompt = getRandomObject(); // Set initial prompt
    prompt.textContent = correctPrompt; // Set initial prompt text
    gameActive = true; // Activate the game
    fillGrid(); // Fill grid with randomised objects
    startCooldown(); // Start initial cooldown
}

// Start the game
initGame();


