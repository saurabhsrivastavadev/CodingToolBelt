console.log('iframe :: text to image :: main.js');

class CanvasInfo {
    height = 200;
    width = 500;
}
class TextInfoModel {
    text = 'Hello World';
    posLeft = 175;
    posTop = 98;
    fontSize = 30;
    fontFamily = 'Satisfy';
}

const defaultCanvasInfo = new CanvasInfo();
const defaultTextInfo = new TextInfoModel();

// fetch url parameters
let url = new URL(window.location.href);
let encodedCanvasInfo = url.searchParams.get('ci');
let encodedTextInfo = url.searchParams.get('ti');

// Decode 
let canvasInfo = decodeURIComponent(encodedCanvasInfo);
let textInfo = decodeURIComponent(encodedTextInfo);

if (canvasInfo) {
    canvasInfo = JSON.parse(canvasInfo);
} else {
    canvasInfo = defaultCanvasInfo;
}
if (textInfo) {
    textInfo = JSON.parse(textInfo);
} else {
    textInfo = defaultTextInfo;
}

console.log(canvasInfo);
console.log(textInfo);

// setup canvas as per parameters
let canvas = document.getElementById('canvas');
canvas.width = canvasInfo.width;
canvas.height = canvasInfo.height;
let ctx = canvas.getContext('2d');
ctx.font = `${textInfo.fontSize}px "${textInfo.fontFamily}"`;
ctx.fillText(textInfo.text, textInfo.posLeft, textInfo.posTop);
