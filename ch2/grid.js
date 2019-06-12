let canvas = document.querySelector('#canvas'),
    ctx = canvas.getContext('2d'),

    AXIS_MARGIN = 40,
    AXIS_ORIGIN = { x: AXIS_MARGIN, y: canvas.height - AXIS_MARGIN },  // 原点位置

    AXIS_TOP = AXIS_MARGIN,
    AXIS_RIGHT = canvas.width-AXIS_MARGIN,

    HORIZONTAL_TICK_SPACING = 10,
    VERTICAL_TICK_SPACING = 10,

    AXIS_WIDTH = AXIS_RIGHT - AXIS_ORIGIN.x,
    AXIS_HEIGHT = AXIS_ORIGIN.y - AXIS_TOP,

    NUM_VERTICAL_TICKS = AXIS_HEIGHT / VERTICAL_TICK_SPACING,
    NUM_HORIZONTAL_TICKS = AXIS_WIDTH / HORIZONTAL_TICK_SPACING,

    TICK_WIDTH = 10,
    TICKS_LINEWIDTH = 0.5,
    TICKS_COLOR = 'black',

    AXIS_LINEWIDTH = 1.0,
    AXIS_COLOR = 'blue';


function drawGrid(ctx, color, stepX, stepY) {
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
}



function drawAxes() {
  ctx.save();
  ctx.strokeStyle = AXIS_COLOR;
  ctx.lineWidth = AXIS_LINEWIDTH;

  drawHorizontalAxis();
  drawVerticalAxis();

  ctx.lineWidth = TICKS_LINEWIDTH;
  ctx.strokeStyle = TICKS_COLOR;

  drawVerticalAxisTicks();
  drawHorizontalAxisTicks();

  ctx.restore();
}

function drawHorizontalAxis() {
  ctx.beginPath();
  ctx.moveTo(AXIS_ORIGIN.x, AXIS_ORIGIN.y);
  ctx.lineTo(AXIS_RIGHT, AXIS_ORIGIN.y);
  ctx.stroke();
}

function drawVerticalAxis() {
  ctx.beginPath();
  ctx.moveTo(AXIS_ORIGIN.x, AXIS_ORIGIN.y);
  ctx.lineTo(AXIS_ORIGIN.x, AXIS_TOP);
  ctx.stroke();
}

function drawHorizontalAxisTicks() {
  let delta = 0;
  for (let i = 0; i < NUM_HORIZONTAL_TICKS; i++) {
    if (i%5 == 0) {
      delta = TICK_WIDTH;
    } else {
      delta = TICK_WIDTH/2;
    }
    ctx.beginPath();
    ctx.moveTo(i*HORIZONTAL_TICK_SPACING+AXIS_ORIGIN.x, AXIS_ORIGIN.y-delta);
    ctx.lineTo(i*HORIZONTAL_TICK_SPACING+AXIS_ORIGIN.x, AXIS_ORIGIN.y+delta);
    ctx.stroke();
  }
}

function drawVerticalAxisTicks() {
  let delta = 0;
  for (let i = 0; i < NUM_VERTICAL_TICKS; i++) {
    ctx.beginPath();
    if (i%5 == 0) {
      delta = TICK_WIDTH;
    } else {
      delta = TICK_WIDTH/2;
    }
    ctx.moveTo(AXIS_ORIGIN.x-delta, AXIS_TOP + i*VERTICAL_TICK_SPACING);
    ctx.lineTo(AXIS_ORIGIN.x+delta, AXIS_TOP + i*VERTICAL_TICK_SPACING);
    ctx.stroke();
  }
}
drawGrid(ctx, 'rgba(0,0,0, 0.4)', 10, 10);
drawAxes();