'use strict';

var gMeme;
var gMemesDATAs;

var gKeyWords ={
    funny: 0,
    cat: 0,
    baby: 0,
    happy: 0,
    animal: 0,
    child: 0,
    politics: 0,
    movie: 0,
    sports: 0,
    dog: 0,
    celebrity: 0,
    famous: 0,
    cute: 0,
    animation: 0,
    tv: 0,
};


function resetMemeValues(){
     gMeme = {
        selectedImg: 0,
        selectedLine: 0,
        imgSticker: 0,
        lines: [{
        txt: 'Your text',
        font: 'impact',
        align: 'center',
        color: 'white',
        fill: 'white',
        stroke: 'black',
        size: 40,
        pos: {x:200, y:55},
    },
    {
        txt: 'Your text',
        font: 'impact',
        align: 'center',
        color: 'white',
        fill: 'white',
        stroke: 'black',
        size: 40,
        pos: {x:200, y:360},
    }]
    }
    return gMeme;
}

var gImgs = [
    {id:1, url:'img/1.jpg', keywords:['politics', 'funny', 'famous']},
    {id:2, url:'img/2.jpg', keywords:['dog', 'cute', 'animal', 'happy']},
    {id:3, url:'img/3.jpg', keywords:['dog', 'baby', 'cute', 'animal', 'happy', 'child']},
    {id:4, url:'img/4.jpg', keywords:['cat', 'cute', 'animal', 'happy']},
    {id:5, url:'img/5.jpg', keywords:['child', 'cute', 'funny']},
    {id:6, url:'img/6.jpg', keywords:['movie', 'celebrity', 'tv']},
    {id:7, url:'img/7.jpg', keywords:['baby', 'cute', 'funny', 'child']},
    {id:8, url:'img/8.jpg', keywords:['movie', 'celebrity', 'tv']},
    {id:9, url:'img/9.jpg', keywords:['baby', 'cute', 'funny', 'child']},
    {id:10, url:'img/10.jpg', keywords:['politics', 'famous', 'funny']},
    {id:11, url:'img/11.jpg', keywords:['sports', 'funny']},
    {id:12, url:'img/12.jpg', keywords:['tv', 'famous']},
    {id:13, url:'img/13.jpg', keywords:['movie', 'celebrity', 'famous', 'tv']},
    {id:14, url:'img/14.jpg', keywords:['movie', 'celebrity', 'tv']},
    {id:15, url:'img/15.jpg', keywords:['movie', 'celebrity', 'famous', 'tv']},
    {id:16, url:'img/16.jpg', keywords:['movie', 'celebrity','famous', 'tv']},
    {id:17, url:'img/17.jpg', keywords:['politics', 'famous']},
    {id:18, url:'img/18.jpg', keywords:['animation', 'movie']},
];

// returns all images currently held in variable
function getImgs(){
    return gImgs;
}

// set the global meme to the selected index(user's choice)
function setMeme(imgId){
    gMeme.selectedImg = imgId;
}

// finds the right meme by index and return src
function getMemeImg(){
    const currImg = gImgs.findIndex((img) => gMeme.selectedImg === img.id);
    return gImgs[currImg].url;
}


function getMeme(){
    return gMeme;
}

function switchLine(lineIdx) {
    if (lineIdx || lineIdx === 0) gMeme.selectedLine = lineIdx;
    else gMeme.selectedLine = (gMeme.selectedLine === (gMeme.lines.length - 1)) ? 0 : gMeme.selectedLine + 1;
}

// returns value of selected line 
function editMeme() {
    if (gMeme.selectedLine > 0) return gMeme.lines[gMeme.selectedLine].txt;
}

// update text of selected line
function updateMemeTxt(txt, canvasW, canvasH, color, font) {
    if (gMeme.selectedLine < 0) {
        addNewLine(canvasW, canvasH, color, font);
        gMeme.selectedLine = gMeme.lines.length - 1;
    }
    gMeme.lines[gMeme.selectedLine].txt = txt;
}

// adds new line
function addNewLine(canvasW, canvasH) {
    var linesCount = gMeme.lines.length;
    if (linesCount && !gMeme.lines[linesCount - 1].txt) {
        gMeme.selectedLine = linesCount - 1;
        return;
    }
    const newLine = createNewLine(canvasW, canvasH);
    gMeme.lines.push(newLine);
    gMeme.selectedLine = linesCount++;
}

// creates new object for the lines array
function createNewLine(canvasW, canvasH) {
    var y = 55;
    const linesCount = gMeme.lines.length;
    if (linesCount === 1) y = 360;
    if (linesCount > 1) y = canvasH / 2;
    const newLine = {
        txt: 'Your text',
        font: 'impact',
        align: 'center',
        color: 'white',
        fill: 'white',
        stroke: 'black',
        size: 40,
        pos: {x:canvasW/2, y},
        selectedPos: {x:0, y:0}
    };
    return newLine;
}

// updateLineProp(key,val)
function updateLineProp(key,val){
    const selectedLine = gMeme.lines[gMeme.selectedLine]
    selectedLine[key] = val
}

// sets chosen color on texts
function setColor(color){
    const idx = gMeme.selectedLine;
    if (idx < 0) return;
    gMeme.lines[idx].color = color;
}

// changes font size 
function changeFontSize(size){
    const idx = gMeme.selectedLine;
    const currLine = gMeme.lines[idx];
    if(idx < 0) return;
    if(size > 0 && currLine.size > 100) return;
    if(size < 0 && currLine.size < 10) return; 
    gMeme.lines[idx].size += size * 2 ;
}


// toggle between existing lines
function toggleLines() {
    if (!gMeme.lines.length) return;
    if (gMeme.selectedLine === gMeme.lines.length - 1) {
        gMeme.selectedLine = 0;
        document.querySelector('[name=meme-line]').value = gMeme.lines[gMeme.selectedLine].txt;
        return;
    } 
    gMeme.selectedLine++;
    document.querySelector('[name=meme-line]').value = gMeme.lines[gMeme.selectedLine].txt;
}

// move lines up and down
function moveLine(key) {
    var idx = gMeme.selectedLine;
    key *= 6;
    if (idx >= 0) {
        gMeme.lines[idx].pos.y += key;
        return;
    }
}

// deletes selected lines
function deleteLine() {
    if(!gMeme.lines.length) return
    let idx = gMeme.selectedLine;
    if (idx >= 0) {
        gMeme.lines.splice(idx, 1);
        if (gMeme.lines.length) {
            gMeme.selectedLine = gMeme.lines.length - 1;
            return;
        }
        gMeme.selectedLine = -1;
    }
    gMeme.selectedLine = -1;
    gMeme.selectedLine = gMeme.lines.length - 1;
}

// changes alignment of texts
function changeAlign(key, canvasW){
    var idx = gMeme.selectedLine;
    if(idx < 0) return;
    const line = gMeme.lines[idx];
    line.align = key;
    if (key === 'left') line.pos.x = 10;
    else if (key === 'right') line.pos.x = 390;
    else line.pos.x = canvasW / 2;
}

function saveMeme(MemeData) {
    gMemesDATAs.push(MemeData);
    saveToStorage(MEMES, gMemesDATAs);
}