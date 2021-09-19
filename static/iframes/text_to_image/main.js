console.log('iframe :: text to image :: main.js');

class CanvasInfo {
    height = 200;
    width = 500;
}
class TextInfoModel {
    id = 0;
    text = 'Hello World';
    posLeft = 175;
    posTop = 98;
    fontSize = 30;
    fontFamily = 'Satisfy';
    rotateDegrees = 0;
}

const defaultCanvasInfo = new CanvasInfo();
const ti1 = new TextInfoModel();
const ti2 = new TextInfoModel();
ti2.posLeft += 20;
ti2.posTop += 20;
const defaultTextInfoArray = [ti1, ti2];

// fetch url parameters
let url = new URL(window.location.href);
let encodedCanvasInfo = url.searchParams.get('ci');
let encodedTextInfoArray = url.searchParams.get('tia');

// Decode 
let canvasInfo = decodeURIComponent(encodedCanvasInfo);
let textInfoArray = decodeURIComponent(encodedTextInfoArray);

if (encodedCanvasInfo) {
    canvasInfo = JSON.parse(canvasInfo);
} else {
    canvasInfo = defaultCanvasInfo;
}
if (encodedTextInfoArray) {
    console.log(textInfoArray);
    textInfoArray = JSON.parse(textInfoArray);
} else {
    textInfoArray = defaultTextInfoArray;
}

console.log(canvasInfo);
console.log(textInfoArray);

// setup canvas as per parameters
let canvas = document.getElementById('canvas');
canvas.width = canvasInfo.width;
canvas.height = canvasInfo.height;
let ctx = canvas.getContext('2d');

// add text elements
for (const textInfo of textInfoArray) {
    if (textInfo.rotateDegrees > 0) {
        ctx.rotate(textInfo.rotateDegrees * Math.PI / 180);
    }
    ctx.font = `${textInfo.fontSize}px "${textInfo.fontFamily}"`;
    ctx.fillText(textInfo.text, textInfo.posLeft, textInfo.posTop);
    ctx.resetTransform();
}
