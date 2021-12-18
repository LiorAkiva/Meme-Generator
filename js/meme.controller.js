'use strict'

var gCanvas;
var gCtx;
var gCurrSize = 1;
var gCurrColor = 'white';
var gCurrFont = 'impact';
// var gStoreMoves =[];

function init(){
    renderGallery();
    resetMemeValues();
}

// opens gallery page 
function openGallery(){
    resetMemeValues();
    document.querySelector('[name=meme-line]').value = '';
    document.querySelector('.meme-box').classList.add('hidden');
    document.querySelector('.gallery-box').classList.remove('hidden');

}

// opens meme editing page
function openCanvas(){
    document.querySelector('.gallery-box').classList.add('hidden');
    document.querySelector('.meme-box').classList.remove('hidden');
}

// renders images on HTML page
function renderGallery(){
    var imgs = getImgs();
    var strHTML='';
    imgs.forEach(img => {
        strHTML += `<img class="img" src="${img.url}" onclick="clickedImg(${img.id})" />`
    })
    document.querySelector('.gallery-imgs').innerHTML = strHTML;
}

// sets clicked photo on current selected image
function clickedImg(imgIdx){
    setMeme(imgIdx);
    openCanvas();
    gCanvas = document.getElementById('main-canvas');
    gCtx = gCanvas.getContext('2d');
    // addEvListeners();
    renderMeme();
}

// renders meme on canvas - create new image and prints the selected img on it
function renderMeme(){
    const meme = new Image();
    meme.src = getMemeImg();
    meme.onload = () => {
        gCurrSize = meme.height / meme.width;
        // resizeCanvas();
        gCtx.drawImage(meme, 0, 0, gCanvas.width, gCanvas.height);
        setLineTxt();
    }

}


// function resizeCanvas(){
//     console.log();
// }

// fetches txt for each line and implements on image
function setLineTxt(){
    const meme = getMeme();
    var lines = meme.lines;
    lines.forEach((line, idx) => drawLine(line, idx))
}

// draw lines on image
function drawLine(line, idx){
    var {x, y} = line.pos;
    const meme = getMeme();
    var currLine = meme.lines[idx];
    gCtx.textAlign = currLine.align;
    gCtx.font = `${currLine.size}px ${currLine.font}`;
    gCtx.strokeStyle = currLine.stroke;
    gCtx.fillStyle = currLine.color;
    gCtx.fillText(currLine.txt, x, y);
    gCtx.strokeText(currLine.txt, x, y);
}



// edits input text on meme
function editMemeLine(elText){
    const txt = elText.value;
    updateMemeTxt(txt, gCanvas.width, gCanvas.height, gCurrColor, gCurrFont);
    renderMeme();
}

function updateMemeTxtInput() {
    document.querySelector('[name=meme-line]').value = editMeme();
}

function onAddLine(){
    addNewLine(gCanvas.width, gCanvas.height);
    document.querySelector('[name=meme-line]').value = 'Your text';
    renderMeme();
}

function onDeleteLine(){
    deleteLine();
    renderMeme();
}
// let's user select a color for text
function onSelectColor(elColor){
    const color = elColor.value;
    setColor(color);
    renderMeme();
}

// increase/decrease font size based on received key.
function onChangeFontSize(key){
    if(key === '+') changeFontSize(2);
    if(key === '-') changeFontSize(-2);
    renderMeme();
}

function onToggleLines(){
    toggleLines();
    renderMeme();
}

function onMoveLines(key){
    if(key === 'up') moveLine(-2);
    if(key === 'down') moveLine(2);
    renderMeme();
}

function onChangeAlign(key){
    changeAlign(key, gCanvas.width);
    renderMeme();
}


