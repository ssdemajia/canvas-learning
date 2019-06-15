let canvas = document.querySelector('#canvas'),
  ctx = canvas.getContext('2d'),
  eraseButton = document.querySelector('#eraseButton'),
  strokeStyleSelect = document.querySelector('#strokeStyleSelect'),

  drawingImageData,
  mouseDown = {}, // 保存第一次按下鼠标时的位置
  rubberRect = {},

  dragging = false,
  draggingPoint,
  
  controlPoints = [{}, {}],
  endPoints = [{}, {}],
  POINT_R = 8,
  CONTROL_POINT_FILL_STYLE = 'blue',
  CONTROL_POINT_STROKE_STYLE = 'grey',
  END_POINT_FILL_STYLE = 'orange',
  END_POINT_STROKE_STYLE = 'red',
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

// 更新选取范围，绘制范围内的图形
function updateRubberband(loc) {
  updateRubberbandRectangle(loc);
  drawRubberBandShape(loc);
}

// 绘制rubberRect范围内的图形
function drawRubberBandShape() {
  updateEndAndControlPoints();
  drawBezierCurve();
}

// 绘制贝塞尔曲线
function drawBezierCurve() {
  ctx.beginPath();
  ctx.moveTo(endPoints[0].x, endPoints[0].y);
  ctx.bezierCurveTo(controlPoints[0].x, controlPoints[0].y,
                    controlPoints[1].x, controlPoints[1].y,
                    endPoints[1].x, endPoints[1].y);
  ctx.stroke();
}

// 更新控制点和端点
function updateEndAndControlPoints() {
  endPoints[0].x = rubberRect.left;
  endPoints[0].y = rubberRect.top;

  endPoints[1].x = rubberRect.left+rubberRect.width;
  endPoints[1].y = rubberRect.top+rubberRect.height;

  controlPoints[0].x = rubberRect.left;
  controlPoints[0].y = rubberRect.top+rubberRect.height;

  controlPoints[1].x = rubberRect.left+rubberRect.width;
  controlPoints[1].y = rubberRect.top;
}

// 绘制控制点、锚点
function drawPoint(point, r) {
  ctx.beginPath();
  ctx.arc(point.x, point.y, r, 0, Math.PI*2, false);
  ctx.stroke();
  ctx.fill();
}

function drawControlPoints() {
  // 绘制控制点
  ctx.save();
  ctx.strokeStyle = CONTROL_POINT_STROKE_STYLE;
  ctx.fillStyle = CONTROL_POINT_FILL_STYLE;
  drawPoint(controlPoints[0], POINT_R);
  drawPoint(controlPoints[1], POINT_R);
  ctx.restore();
}

function drawEndPoints() {
  ctx.save();
  ctx.strokeStyle = END_POINT_STROKE_STYLE;
  ctx.fillStyle = END_POINT_FILL_STYLE;
  drawPoint(endPoints[0], POINT_R);
  drawPoint(endPoints[1], POINT_R);
  ctx.restore();
}

function drawControlAndEndPoints() {
  drawControlPoints();
  drawEndPoints();
}

function cursorInPoint(loc, points) {
  // 判断是否点击在这些点的路径里
  let point;
  points.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, POINT_R, 0, Math.PI*2, false);
    if (ctx.isPointInPath(loc.x, loc.y)) {
      point = p;
    }
  })
  return point;
}
 
function updateDraggingPoint(loc) {
  draggingPoint.x = loc.x;
  draggingPoint.y = loc.y;
}

// 事件处理函数
canvas.onmousedown = function(e) {
  let loc = windowToCanvas(e.clientX, e.clientY);
  e.preventDefault();

  if (!editing) {  // 处于绘制模式
    saveDrawingSurface();
    mouseDown.x = loc.x;
    mouseDown.y = loc.y;
    updateRubberbandRectangle(loc);
    dragging = true;
  } else {  // 处于编辑模式
    draggingPoint = cursorInPoint(loc, controlPoints);  // 找到控制的那个点
    if (!draggingPoint) {
      draggingPoint = cursorInPoint(loc, endPoints);
    }
  }
}

canvas.onmousemove = function(e) {
  let loc = windowToCanvas(e.clientX, e.clientY);
  if (dragging || draggingPoint) {
    e.preventDefault();
    restoreDrawingSurface();
  }

  if (dragging) {
    updateRubberband(loc);
    drawControlAndEndPoints();
  } else if (draggingPoint) {
    updateDraggingPoint(loc);
    drawControlAndEndPoints();
    drawBezierCurve();
  }
}

canvas.onmouseup = function(e) {
  let loc = windowToCanvas(e.clientX, e.clientY);
  restoreDrawingSurface();

  if (!editing) {
    updateRubberband(loc);
    drawControlAndEndPoints();
    dragging = false;
    editing = true;
  }
  else {
    if (draggingPoint) {
      drawControlAndEndPoints();
    } else {
      editing = false;
    }
    drawBezierCurve();
    draggingPoint = undefined;
  }
}

