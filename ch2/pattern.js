let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext('2d'),
rR = document.querySelector('#repeatRadio'),
rxR = document.querySelector('#repeatXRadio'),
ryR = document.querySelector('#repeatYRadio'),
nrR = document.querySelector('#noRepeatRadio'),
image = new Image();

// function fillPattern(repeatString) {
//   let pattern = ctx.createPattern(image, repeatString);
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   ctx.fillStyle = pattern;
//   ctx.fillRect(0, 0, canvas.width, canvas.height);

// }
// rR.onclick = () => {
//   fillPattern('repeat')
// }
// rxR.onclick = () => {
//   fillPattern('repeat-x')
// }
// ryR.onclick = () => {
//   fillPattern('repeat-y')
// }
// nrR.onclick = () => {
//   fillPattern('no-repeat')
// }
// image.onload = function() {
//   fillPattern('repeat')
// }
// image.src = '../ch1/favicon.ico'
ctx.save();
ctx.beginPath();
ctx.lineWidth = 10;
ctx.arc(canvas.width/2, canvas.height/2, 50, 0, Math.PI*2, true);
ctx.strokeStyle = 'rgba(22,233,123,0.9)';
ctx.stroke();
ctx.restore();

ctx.save();
ctx.globalCompositeOperation = "source-atop";
ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
ctx.shadowOffsetX = 0;
ctx.shadowOffsetY = 5;
ctx.shadowBlur = 20;
ctx.beginPath();
ctx.lineWidth = 10;
ctx.arc(canvas.width/2, canvas.height/2, 60, 0, Math.PI*2, false);
ctx.strokeStyle = 'rgba(123,123,123,0.9)';
ctx.stroke();
ctx.restore();