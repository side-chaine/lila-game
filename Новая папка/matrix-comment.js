/**
 * Matrix Comment System
 * This script creates a visual effect similar to the Matrix movie for comments
 * Uses the line-art color scheme for regular display and can switch to classic green
 */

import { getCurrentColorScheme, getCurrentColorSchemeName } from './grid-system.js';

// Configuration settings
const config = {
    typingSpeed: { min: 10, max: 50 },      // Characters per second
    glowProbability: 0.05,                  // Probability of glow effect
    scramblingProbability: 0.02,            // Probability of scrambling effect
    greenModeProbability: 0.1,              // Probability of randomly triggering green mode
    greenModeKeyword: 'neo',                // Keyword to trigger green mode
    defaultDelayBetweenMessages: 1000,      // Default delay between messages (ms)
    characterSet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>/?',
};

// State for the matrix effect
const state = {
    isGreenMode: false,
    container: null,
    textArea: null,
    messages: [],
    isTyping: false,
    currentColorScheme: 0,
};

/**
 * Initialize the matrix comment system
 * @param {string} containerId - ID of the container element
 * @param {Array} messages - Array of messages to display
 */
function initMatrixComments(containerId, messages = []) {
    // Get or create container
    state.container = document.getElementById(containerId);
    if (!state.container) {
        console.error(`Container with ID ${containerId} not found`);
        return;
    }
    
    state.container.classList.add('matrix-comments-container');
    
    // Create text area
    state.textArea = document.createElement('div');
    state.textArea.classList.add('matrix-text-area');
    state.container.appendChild(state.textArea);
    
    // Set up messages
    state.messages = messages;
    
    // Setup color scheme based on current DL scheme
    updateColorScheme();
    
    // Listen for color scheme changes
    window.addEventListener('gridColorSchemeChanged', updateColorScheme);
    
    // Start displaying messages
    if (state.messages.length > 0) {
        displayNextMessage();
    }
}

/**
 * Update the color scheme based on DL color scheme
 */
function updateColorScheme() {
    state.currentColorScheme = getCurrentColorScheme();
    // If green mode is not active, use the current DL color scheme
    if (!state.isGreenMode) {
        const schemeName = getCurrentColorSchemeName();
        console.log(`Matrix comments using color scheme: ${schemeName}`);
    }
}

/**
 * Display the next message in the queue with matrix effect
 */
function displayNextMessage() {
    if (state.messages.length === 0 || state.isTyping) return;
    
    state.isTyping = true;
    const message = state.messages.shift();
    
    // Check if this message should trigger green mode
    if (message.text.toLowerCase().includes(config.greenModeKeyword) || Math.random() < config.greenModeProbability) {
        activateGreenMode();
    }
    
    // Create message container
    const messageElement = document.createElement('div');
    messageElement.classList.add('matrix-message');
    state.textArea.appendChild(messageElement);
    
    // Add header if provided
    if (message.author) {
        const header = document.createElement('div');
        header.classList.add('matrix-message-header');
        header.textContent = message.author;
        messageElement.appendChild(header);
    }
    
    // Create content container
    const contentElement = document.createElement('div');
    contentElement.classList.add('matrix-message-content');
    messageElement.appendChild(contentElement);
    
    // Add cursor
    const cursor = document.createElement('span');
    cursor.classList.add('matrix-cursor');
    contentElement.appendChild(cursor);
    
    // Type out the message
    typeMessage(message.text, contentElement, cursor, () => {
        state.isTyping = false;
        
        // Schedule next message
        const delay = message.delay || config.defaultDelayBetweenMessages;
        setTimeout(displayNextMessage, delay);
    });
}

/**
 * Type out a message with matrix effect
 * @param {string} text - Text to type
 * @param {HTMLElement} container - Container element
 * @param {HTMLElement} cursor - Cursor element
 * @param {Function} callback - Callback function when done
 */
function typeMessage(text, container, cursor, callback) {
    if (!text.length) {
        callback();
        return;
    }
    
    const char = text.charAt(0);
    const charElement = document.createElement('span');
    charElement.classList.add('matrix-char');
    charElement.textContent = char;
    
    // Insert char before cursor
    container.insertBefore(charElement, cursor);
    
    // Apply random effects
    if (Math.random() < config.glowProbability) {
        charElement.classList.add('glow');
    }
    
    if (Math.random() < config.scramblingProbability) {
        applyScrambleEffect(charElement);
    }
    
    // Calculate random typing speed
    const typingDelay = Math.floor(Math.random() * 
        (config.typingSpeed.max - config.typingSpeed.min) + 
        config.typingSpeed.min);
    
    // Continue with the rest of the text
    setTimeout(() => {
        typeMessage(text.substring(1), container, cursor, callback);
    }, typingDelay);
}

/**
 * Apply scrambling effect to a character
 * @param {HTMLElement} element - Character element
 */
function applyScrambleEffect(element) {
    element.classList.add('scrambling');
    
    // Generate random characters
    const generateRandomChar = () => {
        const randomIndex = Math.floor(Math.random() * config.characterSet.length);
        return config.characterSet.charAt(randomIndex);
    };
    
    // Set scramble data attribute
    const updateScramble = () => {
        element.setAttribute('data-scramble', generateRandomChar());
    };
    
    // Run scramble effect for a short period
    const intervalId = setInterval(updateScramble, 100);
    setTimeout(() => {
        clearInterval(intervalId);
        element.classList.remove('scrambling');
    }, 500 + Math.random() * 1000);
}

/**
 * Activate the classic green Matrix mode
 */
function activateGreenMode() {
    state.isGreenMode = true;
    state.container.classList.add('matrix-green-mode');
    
    // Set a timeout to return to normal mode
    setTimeout(() => {
        state.isGreenMode = false;
        state.container.classList.remove('matrix-green-mode');
    }, 10000 + Math.random() * 5000); // Between 10-15 seconds
}

/**
 * Add a new message to the queue
 * @param {Object} message - Message object with text and optional author and delay
 */
function addMatrixMessage(message) {
    state.messages.push(message);
    
    // If not currently typing, start the process
    if (!state.isTyping) {
        displayNextMessage();
    }
}

/**
 * Clear all messages and reset the container
 */
function clearMatrixMessages() {
    state.messages = [];
    state.isTyping = false;
    state.textArea.innerHTML = '';
}

// Export public API
export {
    initMatrixComments,
    addMatrixMessage,
    clearMatrixMessages,
    activateGreenMode
}; 