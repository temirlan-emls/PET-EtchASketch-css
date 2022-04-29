//Create Grid

let form = document.querySelector(".my-form");
const paintMain = document.querySelector('.paint-main');

function gridGen (cellNum) {
    for (let i = 0; i < cellNum; i++) {
        const gridElem = document.createElement('div');
        gridElem.className = 'grid-elem :hover';
    
        paintMain.append(gridElem);
    }
}
function gridDel () {
    paintMain.innerHTML = '';
}


form.addEventListener("submit", function (e) {
    e.preventDefault() // This prevents the window from reloading

    let formdata = new FormData(this);
    let cells = formdata.get("my-input");
    let scale = 640/cells;
    


    if (0 <= cells && cells <= 100) {
        gridDel();
        gridGen (cells*cells);
        paint();
    
        paintMain.setAttribute('style', `
            display: grid;
    
            grid-template-columns: repeat(${cells}, ${scale}px);
            grid-template-rows: repeat(${cells}, ${scale}px);
        `)
    } else {
        alert('ERROR! Please enter number between 0 - 100');
    }
});


// Paint

function paint() {
    let children = paintMain.children;
    for (let i = 0; i < children.length; i++) {
        children[i].addEventListener('mouseenter', (e) => {e.target.classList.add("red")})
    }

}

//reset 

const resetBtn = document.querySelector('.reset');

resetBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let children = paintMain.children;
    for (let i = 0; i < children.length; i++) {
        children[i].classList.remove("red")
    }
})
// choose color 



gridGen(256);
paint();