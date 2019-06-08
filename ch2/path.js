let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext('2d');

ctx.beginPath();
ctx.arc(100, 100, 20, 0, 180, true);
ctx.closePath();
ctx.stroke();

ctx.beginPath();
ctx.strokeStyle = '#F31'
ctx.rect(50, 50, 20, 20);
ctx.stroke();


function drawTwoArcs() {
  ctx.beginPath();
  ctx.shadowColor = 'rgba(0, 0, 0, 0.95)'
  // ctx.shadowOffsetX = 12;
  // ctx.shadowOffsetY = 12;
  ctx.shadowBlur = 15;
  ctx.arc(400, 200, 40, 0, Math.PI*2, true);
  ctx.arc(400, 200, 50, 0, Math.PI*2, false);
  ctx.fill();

}

function drawTriangle() {
  ctx.beginPath();
  ctx.lineTo(400, 100);
  ctx.lineTo(500, 200);
  ctx.lineTo(300, 200);
  ctx.closePath();
  ctx.stroke()
}
drawTwoArcs();
drawTriangle();