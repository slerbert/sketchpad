const squareContainer = document.querySelector('.squares-container');
const newGridButton = document.querySelector('#new-grid');

// Get reference to CSS stylesheet to alter square class
const stylesheet = document.styleSheets[0];
const squareRulesCSS = [...stylesheet.cssRules].find(
    (rule) => rule.selectorText === '.square'
);

function isValidSpec(gridSpec) {
    let result = 
        gridSpec >= 2 
        && gridSpec <= 100 
        && Number.isInteger(gridSpec);

    return result;
}

function getNewGridSpec() {
    let newGridSpec = parseInt(prompt('Please enter the number of squares you\'d like per side of new grid.', 16));

    while (!isValidSpec(newGridSpec)) {
        newGridSpec = parseInt(prompt('Please enter a number between 2 and 100.', 16));
    }

    createGrid(newGridSpec);
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
    const squareOpacity = Number(event.target.style.opacity);

    if (squareOpacity < 1) {
        event.target.style.opacity = squareOpacity + 0.1;
    }

    event.target.style.backgroundColor = randomColor();
});

function randomIntBetween(min, max) {
    return Math.floor(Math.random() * (max-min)) + min;
}

function randomColor() {
    return `rgb(
        ${randomIntBetween(0, 255)},
        ${randomIntBetween(0, 255)},
        ${randomIntBetween(0, 255)}
    )`;
}

// Initialize grid with 16 squares
createGrid(16);