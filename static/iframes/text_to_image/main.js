console.log('iframe :: text to image :: main.js');

// Set canvas dimensions
let url = new URL(window.location.href);
let canvasWidth = url.searchParams.get('w');
let canvasHeight = url.searchParams.get('h');

// Get canvas
let canvas = document.getElementById('canvas');
canvas.width = canvasWidth;
canvas.height = canvasHeight;
