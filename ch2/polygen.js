let canvas = document.querySelector('#canvas'),
  ctx = canvas.getContext('2d'),
  sideSelect = document.querySelector('#sideSelect'),
  startAngleSelect = document.querySelector('#startAngleSelect'),
  fillCheckbox = document.querySelector('#fillCheckbox'),
  editCheckbox = document.querySelector('#editCheckbox'),

  drawingImageData,
  mouseDown = {}, // 保存第一次按下鼠标时的位置
  rubberRect = {},

  dragging = false,
  draggingOffsetX,
  draggingOffsetY,

  polygons = [],
  editing = false;


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
  let bbox = canvas.getBoundingClientRect();
  return {
    x: x - bbox.left * (canvas.width / bbox.width),
    y: y - bbox.top * (canvas.height / bbox.height)
  };
}

function saveDrawingSurface() {
  drawingImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
}

function restoreDrawingSurface() {
  ctx.putImageData(drawingImageData, 0, 0);
}

function updateRubberbandRectangle(loc) {
  rubberRect.width = Math.abs(loc.x - mouseDown.x);
  rubberRect.height = Math.abs(loc.y - mouseDown.y);

  if (loc.x < mouseDown.x) {
    rubberRect.left = loc.x;
  } else {
    rubberRect.left = mouseDown.x;
  }

  if (loc.y < mouseDown.y) {
    rubberRect.top = loc.y;
  } else {
    rubberRect.top = mouseDown.y;
  }
}

function updateRubberband(loc) {
  updateRubberbandRectangle(loc);
  drawRubberBandShape(loc);
}

canvas.onmousedown = function (e) {
  let loc = windowToCanvas(e.clientX, e.clientY); // 映射到canvas中
  e.preventDefault();

  if (editing) {
    polygons.forEach(function (p) {
      p.createPath(ctx);
      if (ctx.isPointInPath(loc.x, loc.y)) {
        startDragging(loc);
        dragging = p;
        draggingOffsetX = loc.x - p.x;
        draggingOffsetY = loc.y - p.y;
        return;
      }
    })
  } else {
    startDragging(loc);
    dragging = true;
  }
}

canvas.onmousemove = function (e) {
  let loc = windowToCanvas(e.clientX, e.clientY);
  e.preventDefault();
  if (dragging && editing) {
    dragging.x = loc.x - draggingOffsetX;
    dragging.y = loc.y - draggingOffsetY;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid(ctx, 'lightgray', 10, 10);
    drawPolygons();
    return;
  } else {

    if (dragging) {
      restoreDrawingSurface(); //   清理之前的线条
      updateRubberband(loc);  // 绘制线条
    }
  }
}

canvas.onmouseup = function (e) {
  loc = windowToCanvas(e.clientX, e.clientY);
  dragging = false;
  if (!editing) {
    restoreDrawingSurface();
    updateRubberband(loc);
  }
}

editCheckbox.onchange = function () {
  if (editCheckbox.checked) {
    startEditing();
  } else {
    stopEditing();
  }
}
function drawRubberBandShape() {
  updateEndAndControlPoints();
  drawBezierCurve();
}

function drawPolygon(p) {
  p.stroke(ctx);
  if (fillCheckbox.checked) {
    p.fill(ctx);
  }
}
function drawPolygons() {
  polygons.forEach(function (p) {
    drawPolygon(p);
  })
}

var Point = function (x, y) {
  this.x = x;
  this.y = y;
};
var Polygon = function (centerX, centerY, r, sides, startAngle, strokeStyle, fillStyle, filled) {
  this.x = centerX;
  this.y = centerY;
  this.r = r;
  this.sides = sides;
  this.startAngle = startAngle;
  this.strokeStyle = strokeStyle;
  this.fillStyle = fillStyle;
  this.filled = filled;
}

Polygon.prototype = {
  getPoints: function () {
    let points = [],
      angle = this.startAngle || 0;
    for (var i = 0; i < this.sides; i++) {
      points.push(new Point(this.x + this.r * Math.cos(angle), this.y + this.r * Math.sin(angle)));
      angle += Math.PI * 2 / this.sides;
    }
    return points
  },
  createPath: function (ctx) {
    let points = this.getPoints();

    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);

    for (var i = 1; i < this.sides; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.closePath();
  },
  stroke: function (ctx) {
    ctx.save();
    this.createPath(ctx);
    ctx.strokeStyle = this.strokeStyle;
    ctx.stroke();
    ctx.restore();
  },
  fill: function (ctx) {
    ctx.save();
    this.createPath(ctx);
    ctx.fillStyle = this.fillStyle;
    ctx.fill();
    ctx.restore();
  },
  move: function (x, y) {
    this.x = x;
    this.y = y;
  }
}


// dragging~

function startDragging(loc) {
  saveDrawingSurface();
  mouseDown.x = loc.x;
  mouseDown.y = loc.y;
}

function startEditing() {
  canvas.style.cursor = 'pointer';
  editing = true;
}

function stopEditing() {
  canvas.style.cursor = 'crosshair';
  editing = false;
}


// 初始化
function init() {
  drawGrid(ctx, 'lightgray', 10, 10)
  ctx.shadowColor = 'rgba(0,0,0,0.4)';
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;
  ctx.shadowBlur = 4;
}

init();

