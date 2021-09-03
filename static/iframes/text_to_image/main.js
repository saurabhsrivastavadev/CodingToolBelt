console.log('iframe :: text to image :: main.js');

// fetch url parameters
let url = new URL(window.location.href);
let canvasWidth = url.searchParams.get('w');
let canvasHeight = url.searchParams.get('h');
let text = url.searchParams.get('t');
let textPosTop = url.searchParams.get('tt');
let textPosLeft = url.searchParams.get('tl');
let textFont = url.searchParams.get('tf');

// setup canvas as per parameters
let canvas = document.getElementById('canvas');
canvas.width = canvasWidth;
canvas.height = canvasHeight;
let ctx = canvas.getContext('2d');
ctx.font = textFont;
ctx.fillText(text, textPosLeft, textPosTop);
