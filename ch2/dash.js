let canvas = document.querySelector('#canvas'),
    ctx = canvas.getContext("2d"),
    moveToFunction = CanvasRenderingContext2D.prototype.moveTo;

CanvasRenderingContext2D.prototype.lastMoveTolocation = {};  // 用于保存上一次moveTo的位置

CanvasRenderingContext2D.prototype.moveTo = function(x, y) {
  moveToFunction.apply(this, [x, y]);
  this.lastMoveTolocation.x = x;
  this.lastMoveTolocation.y = y;
}

CanvasRenderingContext2D.prototype.dashedLineTo = function(x, y, dashLength = 5) {
  let deltaX = this.lastMoveTolocation.x - x,
      deltaY = this.lastMoveTolocation.y - y,
      dashNums = Math.floor(Math.sqrt(deltaX*deltaX + deltaY*deltaY)/dashLength);

  for (let i = 0; i < dashNums; i++) {
    this[i%2==0? "moveTo":"lineTo"](x+deltaX/dashNums*i, y+deltaY/dashNums*i);
  }
  this.moveTo(x, y);
}

ctx.beginPath();
ctx.moveTo(50, 50);
// ctx.miterLimit = 20;
ctx.lineJoin = "round";
ctx.lineCap = "round"
ctx.lineWidth = 20;
ctx.lineTo(100, 300);
ctx.lineTo(300, 200);
ctx.stroke();