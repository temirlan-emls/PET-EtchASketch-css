const paintMain = document.querySelector('.paint-main');

function gridGen(cellNum) {
    paintMain.innerHTML = '';
    for (let i = 0; i < cellNum * cellNum; i++) {
        const gridElem = document.createElement('div');
        gridElem.classList.add('grid-elem');
        gridElem.dataset.index = i + 1;
        paintMain.append(gridElem);
    }
    paintMain.setAttribute(
        'style',
        `
        display: grid;
        grid-template-columns: repeat(${cellNum}, ${640 / cellNum}px);
        grid-template-rows: repeat(${cellNum}, ${640 / cellNum}px);`
    );
}

let tempCellArr = [];
let cellSet = [];
let cursorColor = '#e66465';
const paintHandler = (e) => {
    e.target.style.backgroundColor = cursorColor;
    tempCellArr.push(e.target.dataset.index);
};
function paint() {
    let children = paintMain.children;
    for (let i = 0; i < children.length; i++) {
        children[i].addEventListener('mouseenter', paintHandler);
    }
    tempCellArr = [];
    cellSet.push(tempCellArr);
}
function unPaint() {
    let children = paintMain.children;
    for (let i = 0; i < children.length; i++) {
        children[i].removeEventListener('mouseenter', paintHandler);
    }
}
paintMain.addEventListener('mousedown', () => {
    paint();
});
paintMain.addEventListener('mouseup', () => {
    unPaint();
});

let backButton = document.querySelector('.back');
backButton.addEventListener('click', () => {
    if (cellSet.length) {
        let lastDraw = cellSet[cellSet.length - 1].sort();
        let children = paintMain.children;
        let temp = 0;
        for (let i = 0; i < children.length; i++) {
            if (lastDraw[temp] === children[i].dataset.index) {
                children[i].style.backgroundColor = 'white';
                temp++;
            }
        }
        cellSet.pop();
    } else {
        paintMain.innerHTML = '';
        gridGen(64);
        alert('Draw something!');
    }
});

const cellNumber = document.querySelector('.my-form');
cellNumber.addEventListener('submit', function (e) {
    e.preventDefault(); // This prevents the window from reloading
    let formdata = new FormData(this);
    let cells = formdata.get('my-input');

    if (24 <= cells && cells <= 128) {
        gridGen(cells);
    } else {
        alert('ERROR! Please enter number between 24 - 128');
    }
});

let recentColors = [];
const cellColor = document.querySelector('.my-color');
const recentColorsB = document.querySelectorAll('.recentColor');
cellColor.addEventListener('submit', (e) => {
    e.preventDefault(); // This prevents the window from reloading

    cursorColor = e.target.children[0].value;
    if (!recentColors.includes(cursorColor)) {
        if (recentColors.length < 6) {
            recentColors.push(cursorColor);
        } else {
            recentColors.shift();
            recentColors.push(cursorColor);
        }
    }

    recentColorsB.forEach((item, index) => {
        item.style.backgroundColor = recentColors[index];
        item.dataset.color = recentColors[index];
    });
});
recentColorsB.forEach((el) => {
    el.addEventListener('click', () => {
        if (el.dataset.color && el.dataset.color !== undefined) {
            cursorColor = el.dataset.color;
            cellColor.children[0].value = el.dataset.color;
        }
    });
});

//reset
const resetBtn = document.querySelector('.reset');
resetBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let children = paintMain.children;
    for (let i = 0; i < children.length; i++) {
        children[i].style.backgroundColor = 'white';
    }
});

gridGen(64);
