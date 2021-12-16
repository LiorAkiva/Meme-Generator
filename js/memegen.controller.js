'use strict'

var gElCanvas;

function init(){
    renderGallery();
}

function openGallery(){
    document.querySelector('.meme-box').classList.add('hidden');
    document.querySelector('.gallery-box').classList.remove('hidden');

}

function renderGallery(){
    var imgs = getImgs();
    var strHTML='';
    imgs.forEach(img => {
        strHTML += `<img class="img" src="${img.url}" id="img-${img.id}" onclick="renderMeme(${img.id})" />`
    })
    document.querySelector('.gallery-imgs').innerHTML = strHTML;
}

function renderMeme(imgIdx){
    console.log('hi', imgIdx);
    document.querySelector('.gallery-box').classList.add('hidden');
    document.querySelector('.meme-box').classList.remove('hidden');
    // gElCanvas = document.getElementById('main-canvas');
}