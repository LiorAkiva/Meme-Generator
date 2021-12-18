'use strict'


// opens gallery page 
function openGallery(){
    resetMemeValues();
    document.querySelector('[name=meme-line]').value = '';
    document.querySelector('.meme-box').classList.add('hidden');
    document.querySelector('.gallery-box').classList.remove('hidden');

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