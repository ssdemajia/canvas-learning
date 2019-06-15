let canvas = document.querySelector('#canvas'),
  ctx = canvas.getContext('2d'),
  ERASE_WIDTH = 20,
  imageData;

function drawGrid(ctx, color, stepX, stepY) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 0.5;

  for (let i = stepX + 0.5; i < ctx.canvas.width; i += stepX) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, ctx.canvas.height);
    ctx.stroke();
  }
  for (let i = stepY + 0.5; i < ctx.canvas.height; i += stepY) {
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(ctx.canvas.width, i);
    ctx.stroke();
  }
  ctx.restore();
}

function windowToCanvas(x, y) {
  let loc = {},
      bbox = canvas.getBoundingClientRect();
  loc.x = x - bbox.left;
  loc.y = y - bbox.top;
  return loc;
}

function restoreImage() {
  ctx.putImageData(imageData, 0, 0);
}

function saveImage() {
  imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
}

function drawErase(loc) {
  ctx.save();
  ctx.beginPath();
  ctx.rect(loc.x-ERASE_WIDTH/2, loc.y-ERASE_WIDTH, ERASE_WIDTH, ERASE_WIDTH);
  // ctx.clearRect(loc.x, loc)
  ctx.clip()
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  // ctx.stroke();
  ctx.restore();
}

function drawText() {
  ctx.save();
  ctx.shadowColor = 'rgba(100, 100, 150, 0.7)';
  ctx.shadowOffsetX = 5;
  ctx.shadowOffsetY = 5;
  ctx.fillStyle = 'cornflowerblue';
  ctx.fillText("Shaoshuai", 20, 350);
  ctx.strokeStyle = 'orange';
  ctx.strokeText("Shaoshuai", 20, 350);
  ctx.restore();
}
canvas.onmousedown = function() {
  // saveImage()
  animate();
}
canvas.onmousemove = function(e) {
  let loc = windowToCanvas(e.clientX, e.clientY);
  // restoreImage();
  // drawErase(loc)
}
function setClipRegion(r) {
  ctx.beginPath();
  ctx.arc(canvas.width/2, canvas.height/2, r, 0, Math.PI*2, false);
  ctx.clip();
}
ctx.font = '128pt Comic-sans';
drawGrid(ctx, "black", 10, 10)
drawText()

function animate() {
  let r = canvas.width/2;
  let loop = setInterval(function() {
    ctx.fillStyle = 'charcoal';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    r -= canvas.width/1000;
    if (r <= 0) {
      clearInterval(loop);
      return;
    }
    ctx.save();
    setClipRegion(r);
    ctx.fillStyle = 'lightgray';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawText()
    ctx.restore();
  }, 20);
}