// Get reference to CSS stylesheet to alter square class
const stylesheet = document.styleSheets[0];
const squareRulesCSS = [...stylesheet.cssRules].find(
    (rule) => rule.selectorText === '.square'
);

const squareContainer = document.querySelector('.squares-container');
const newGridButton = document.querySelector('#new-grid');

function randomRange(min, max) {
    return Math.floor(Math.random() * (max-min)) + min;
}

function randomColor() {
    return `rgb(
        ${randomRange(0, 255)},
        ${randomRange(0, 255)},
        ${randomRange(0, 255)}
    )`;
}

function getNewGridSpec() {
    let keepGoing = true;
    let newGridSpec = parseInt(prompt('Please enter the number of squares you\'d like per side of new grid.', 16));

    while (keepGoing) {
        if (
            newGridSpec < 4 
            || newGridSpec > 100 
            || !Number.isInteger(newGridSpec)
        ) {
            newGridSpec = parseInt(prompt('Please enter a number between 4 and 100.', 16));
        } else {
            createGrid(newGridSpec);
            keepGoing = false;
        }
    }
}

function createGrid(num) {
    let squareWidth = (1/num) * 100;
    squareRulesCSS.style.setProperty("width", `${squareWidth}%`);
    squareRulesCSS.style.setProperty("height", `${squareWidth}%`);

    // Remove all squares from squareContainer
    squareContainer.replaceChildren();

    for (let i = 0; i < num*num; i++) {
        let square = document.createElement('div');
        square.classList.add('square');
        squareContainer.appendChild(square);
    }
}

newGridButton.addEventListener('click', getNewGridSpec);

squareContainer.addEventListener('mouseover', (event) => {
    event.target.style.backgroundColor = randomColor();
});

// Initialize grid with 16 squares
createGrid(16);