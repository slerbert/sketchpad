const stylesheet = document.styleSheets[0];
const squareRulesCSS = [...stylesheet.cssRules].find(
    (rule) => rule.selectorText === '.square'
);

const squareContainer = document.querySelector('.squares-container');


function createGrid(num) {
    let squareWidth = (1/num) * 100;
    squareRulesCSS.style.setProperty("width", `${squareWidth}%`);
    squareRulesCSS.style.setProperty("height", `${squareWidth}%`);

    for (let i = 0; i < num*num; i++) {
        let square = document.createElement('div');
        square.classList.add('square');
        squareContainer.appendChild(square);
    }
}

createGrid(10);

