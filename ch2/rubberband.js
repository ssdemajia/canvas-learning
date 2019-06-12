let canvas = document.querySelector("#canvas"),
  ctx = canvas.getContext('2d'),
  eraseButton = document.querySelector('#erase'),
  guidewireCheckBox = document.querySelector('#guidewire'),
  drawingImageData,
  mouseDown = {}, // 保存第一次按下鼠标时的位置
  rubberRect = {},
  dragging = false,
  guidewire = false;


// function drawGrid(ctx, color, stepX, stepY) {
//   ctx.save();
//   ctx.strokeStyle = color;
//   ctx.lineWidth = 0.5;

//   for (let i = stepX + 0.5; i < ctx.canvas.width; i += stepX) {
//     ctx.beginPath();
//     ctx.moveTo(i, 0);
//     ctx.lineTo(i, ctx.canvas.height);
//     ctx.stroke();
//   }
//   for (let i = stepY + 0.5; i < ctx.canvas.height; i += stepY) {
//     ctx.beginPath();
//     ctx.moveTo(0, i);
//     ctx.lineTo(ctx.canvas.width, i);
//     ctx.stroke();
//   }
//   ctx.restore();
// }

// function windowToCanvas(x, y) {
//   let bbox = canvas.getBoundingClientRect();
//   return {
//     x: x - bbox.left * (canvas.width/bbox.width),
//     y: y - bbox.top * (canvas.height/bbox.height)
//   };
// }

// function saveDrawingSurface() {
//   drawingImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
// }

// function restoreDrawingSurface() {
//   ctx.putImageData(drawingImageData, 0, 0);
// }

// function updateRubberbandRectangle(loc) {
//   rubberRect.width = Math.abs(loc.x - mouseDown.x);
//   rubberRect.height = Math.abs(loc.y - mouseDown.y);

//   if (loc.x < mouseDown.x) {
//     rubberRect.left = loc.x;
//   } else {
//     rubberRect.left = mouseDown.x;
//   }

//   if (loc.y < mouseDown.y) {
//     rubberRect.top = loc.y;
//   } else {
//     rubberRect.top = mouseDown.y;
//   }
// }

// function drawRubberbandLine(loc) {
//   // 绘制在mouseDown到loc这个范围内的图形
//   ctx.beginPath();
//   ctx.moveTo(mouseDown.x, mouseDown.y);
//   ctx.lineTo(loc.x, loc.y);
//   ctx.stroke();
// }

// function drawRubberbandCircle(loc) {
//   ctx.beginPath();
//   let dx = loc.x - mouseDown.x;
//   let dy = loc.y - mouseDown.y;

//   let r = Math.sqrt(dx*dx + dy*dy);
//   ctx.arc(mouseDown.x, mouseDown.y, r, 0, Math.PI*2, false);
//   ctx.stroke();
// }

// function updateRubberband(loc) {
//   updateRubberbandRectangle(loc);
//   drawRubberbandCircle(loc);
// }

// function drawHorizontalLine(y) {
//   ctx.beginPath();
//   ctx.moveTo(0, y+0.5);
//   ctx.lineTo(ctx.canvas.width, y+0.5);
//   ctx.stroke();
// }

// function drawVerticalLine(x) {
//   ctx.beginPath();
//   ctx.moveTo(x+0.5, 0);
//   ctx.lineTo(x+0.5, ctx.canvas.height);
//   ctx.stroke();
// }

// function drawGuideWires(x, y) {
//   ctx.save();  // 保存之前的配置
//   ctx.strokeStyle = 'rgba(0,0,230,0.4)';
//   ctx.lineWidth = 0.5;
//   drawVerticalLine(x);
//   drawHorizontalLine(y);
//   ctx.restore();
// }

// canvas.onmousedown = function(e) {
//   let loc = windowToCanvas(e.clientX, e.clientY); // 映射到canvas中
//   e.preventDefault();

//   saveDrawingSurface();  // 保存绘制前的效果
//   mouseDown.x = loc.x;
//   mouseDown.y = loc.y;
//   dragging = true;
// }

// canvas.onmousemove = function(e) {
//   let loc;
//   if (dragging) {
//     e.preventDefault();
//     loc = windowToCanvas(e.clientX, e.clientY);
//     restoreDrawingSurface(); //   清理之前的线条
//     updateRubberband(loc);  // 绘制线条
//     if (guidewire) {
//       drawGuideWires(loc.x, loc.y);
//     }
//   }
// }

// canvas.onmouseup = function(e) {
//   console.log("mouse up")
//   loc = windowToCanvas(e.clientX, e.clientY);
//   restoreDrawingSurface();
//   updateRubberband(loc);
//   dragging = false;
// }

// guidewireCheckBox.onchange = function(e) {
//   guidewire = guidewireCheckBox.checked;
// }

// eraseButton.onclick = function(e) {
//   ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
//   drawGrid(ctx, 'lightgray', 10, 10);
//   saveDrawingSurface();
// }
// drawGrid(ctx, 'lightgray', 10, 10);

ctx.beginPath();
ctx.strokeStyle = 'red';
ctx.setLineDash([8,7,6,5])
ctx.moveTo(100, 100);
ctx.arcTo(150, 100, 200, 200, 50);
// ctx.arc(200,200, 100, 0, Math.PI*2, false);
ctx.stroke();
