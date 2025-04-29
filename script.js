// This is a direct replacement for your script.js file
// Keep all other functionality but fix accordion issues

// Tab functionality 
document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

        button.classList.add('active');

        const tabId = button.getAttribute('data-tab');
        if (tabId) {
            document.getElementById(tabId).classList.add('active');
        }

        button.classList.add('pulse');
        setTimeout(() => button.classList.remove('pulse'), 500);
    });
});

// Slideshow functionality
let slideIndex = 0;
const slides = document.querySelectorAll('.slide');

function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    slideIndex = (n + slides.length) % slides.length;
    slides[slideIndex].classList.add('active');
}

document.querySelector('.prev').addEventListener('click', () => showSlide(slideIndex - 1));
document.querySelector('.next').addEventListener('click', () => showSlide(slideIndex + 1));
setInterval(() => showSlide(slideIndex + 1), 5000);

// Theme toggle
const themeButton = document.getElementById('theme-button');
const body = document.body;

themeButton.addEventListener('click', () => {
    const isDark = body.style.backgroundColor === 'rgb(45, 45, 45)';

    body.style.backgroundColor = isDark ? '#f9f9f9' : 'rgb(45, 45, 45)';
    body.style.color = isDark ? '#333' : 'white';

    document.querySelectorAll('section').forEach(section => {
        section.style.backgroundColor = isDark ? 'white' : 'rgb(60, 60, 60)';
        section.style.color = isDark ? '#333' : 'white';
    });

    themeButton.textContent = isDark ? 'Toggle Dark Mode' : 'Toggle Light Mode';

    themeButton.classList.add('pulse');
    setTimeout(() => themeButton.classList.remove('pulse'), 500);
});

// PCR Simulation functionality
let cycle = 0;
const totalCycles = 30;
const stages = ['Denaturation 🔥', 'Annealing ❄️', 'Extension 🧬'];
const images = ['denaturation.png', 'annealing.png', 'extension.png'];
let currentStage = 0;

document.addEventListener("keydown", (event) => {
    const stageText = document.getElementById("pcr-stage");
    const cycleText = document.getElementById("cycle-count");
    const simDisplay = document.getElementById("simulation-display");
    const stageImg = document.getElementById("stage-image");
    
    // Display key pressed
    const keyValue = document.getElementById("key-value");
    if (keyValue) {
        keyValue.textContent = event.key;
        document.getElementById("key-indicator").style.display = "block";
        setTimeout(() => {
            document.getElementById("key-indicator").style.display = "none";
        }, 1000);
    }

    if (cycle >= totalCycles) {
        simDisplay.innerHTML = "<p>Simulation Complete ✅</p>";
        stageText.textContent = "Complete";
        if (stageImg) stageImg.style.display = "none";
        return;
    }

    // Update stage text and image
    if (stageText) stageText.textContent = stages[currentStage];
    if (stageImg) {
        stageImg.src = images[currentStage];
        stageImg.style.display = "block";
    }

    // Create or update the paragraph inside the simulation display
    let textP = simDisplay.querySelector('p');
    if (!textP) {
        textP = document.createElement('p');
        simDisplay.appendChild(textP);
    }
    textP.textContent = `Stage: ${stages[currentStage]}`;

    currentStage = (currentStage + 1) % stages.length;

    if (currentStage === 0) {
        cycle++;
        cycleText.textContent = cycle;
    }
});

// FIXED ACCORDION FUNCTIONALITY
// This is a direct fix that ensures the accordion works
document.addEventListener('DOMContentLoaded', function() {
    // Initialize accordions when the page loads
    initAccordions();
});

// Execute the initialization immediately as well, in case the page is already loaded
initAccordions();

function initAccordions() {
    document.querySelectorAll('.accordion-header').forEach(header => {
        // Remove previous event listeners to avoid duplicates
        const newHeader = header.cloneNode(true);
        header.parentNode.replaceChild(newHeader, header);
        
        newHeader.addEventListener('click', function() {
            const content = this.nextElementSibling;
            if (!content || !content.classList.contains('accordion-content')) {
                console.error('Accordion content not found', this);
                return;
            }
            
            const toggle = this.querySelector('.toggle');
            
            // Toggle active class
            content.classList.toggle('active');
            
            // Set max height based on content's scroll height
            if (content.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + 'px';
                if (toggle) toggle.textContent = '-';
            } else {
                content.style.maxHeight = '0';
                if (toggle) toggle.textContent = '+';
            }
        });
    });
    
    console.log('Accordions initialized:', document.querySelectorAll('.accordion-header').length);
}

// Reset simulation button
const resetButton = document.getElementById('reset-simulation');
if (resetButton) {
    resetButton.addEventListener('click', function() {
        cycle = 0;
        currentStage = 0;
        document.getElementById("cycle-count").textContent = "0";
        document.getElementById("pcr-stage").textContent = "Ready to begin";
        document.getElementById("simulation-display").innerHTML = "<p>Press a key to start simulation</p>";
        const stageImg = document.getElementById("stage-image");
        if (stageImg) stageImg.style.display = "none";
    });
}

// Secret feature with long press
const secretFeature = document.getElementById('secret-feature');
if (secretFeature) {
    let pressTimer;
    
    secretFeature.addEventListener('mousedown', function() {
        pressTimer = window.setTimeout(function() {
            document.body.classList.add('rainbow-mode');
            document.getElementById('notification').textContent = "You've unlocked rainbow mode!";
            document.getElementById('notification').classList.add('show');
            setTimeout(function() {
                document.getElementById('notification').classList.remove('show');
            }, 3000);
        }, 3000);
    });
    
    secretFeature.addEventListener('mouseup', function() {
        clearTimeout(pressTimer);
    });
    
    secretFeature.addEventListener('mouseleave', function() {
        clearTimeout(pressTimer);
    });
}

// Double-click on footer for surprise
document.querySelector('footer').addEventListener('dblclick', function() {
    this.classList.add('rainbow-mode');
    setTimeout(() => {
        this.classList.remove('rainbow-mode');
    }, 5000);
});