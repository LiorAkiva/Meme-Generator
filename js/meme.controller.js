'use strict'

var gCanvas;
var gCtx;
var gCurrSize = 1;
var gCurrColor = 'white';
var gCurrFont = 'impact';
// var gStoreMoves =[];

function init() {
    renderGallery();
    resetMemeValues();
}

// opens meme editing page
function openCanvas() {
    document.querySelector('.gallery-box').classList.add('hidden');
    document.querySelector('.meme-box').classList.remove('hidden');
}


// renders meme on canvas - create new image and prints the selected img on it
function renderMeme() {
    // get meme from service - img - lines - selectedline
    // GET MEME
    // DRAW IMG - (SELECTEDIMG)
    // DRAW LINES = FOR EACH DRAW LINE
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
function setLineTxt() {
    const meme = getMeme();
    var lines = meme.lines;
    lines.forEach((line, idx) => drawLine(line, idx))
}

// draw lines on image
function drawLine(line, idx) {
    // @CR
    const { pos: { x, y }, size, align, color, stroke,txt } = line
    //***/ */
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
function editMemeLine(val) {
    updateMemeTxt(val, gCanvas.width, gCanvas.height, gCurrColor, gCurrFont);
    renderMeme();
}

function updateMemeTxtInput() {
    document.querySelector('[name=meme-line]').value = editMeme();
}

function onAddLine() {
    addNewLine(gCanvas.width, gCanvas.height);
    document.querySelector('[name=meme-line]').value = 'Your text';
    renderMeme();
}

function onDeleteLine() {
    deleteLine();
    renderMeme();
}
// let's user select a color for text
function onSelectColor(val) {
    setColor(val);
    renderMeme();
}

// increase/decrease font size based on received key.
function onChangeFontSize(key) {
    if (key === '+') changeFontSize(2);
    else if (key === '-') changeFontSize(-2);
    renderMeme();
}

function onToggleLines() {
    toggleLines();
    renderMeme();
}

function onMoveLines(key) {
    if (key === 'up') moveLine(-2);
    if (key === 'down') moveLine(2);
    renderMeme();
}

function onChangeAlign(key) {
    changeAlign(key, gCanvas.width);
    renderMeme();
}


function addEvListeners(){
    addMouseListeners();
}

function addMouseListeners() {
    // console.log('todo')
    // gCanvas.addEventListener('mousedown', onDown)
    // gCanvas.addEventListener('mousemove', onMove)
    // gCanvas.addEventListener('mouseup', onUp)
 }

 function onShareMeme() {
    switchLine(-1);
    renderMeme();
    shareMeme();
 }

function onSaveMeme() {
    switchLine(-1);
    renderMeme();
    const MemeData = gCanvas.toDataURL();
    saveMeme(MemeData);
    openSavedMemes();
    renderSaved();
}

function onDownloadMeme(elLink) {
    switchLine(-1);
    renderMeme();
    const data = gCanvas.toDataURL();
    elLink.href = data;
    elLink.download = 'my-meme.jpg';
}