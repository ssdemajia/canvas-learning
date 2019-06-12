let canvas = document.querySelector('#canvas'),
    ctx = canvas.getContext('2d'),

    CENTROID_RADIUS = 10,
    CENTROID_STROKE_STYLE = 'rgba(0,0,0,0.5)',
    CENTROID_FILL_STYLE = 'rgba(80,190,240,0.6)',

    RING_INNER_R = 35,
    RING_OUTER_R = 55,

    ANNOTATION_FILL_STYLE = 'rgba(0,0,230,0.9)',
    ANNOTATION_TEXT_SIZE = 12,

    TICK_WIDTH = 10,
    TICK_LONG_STROKE_STYLE = 'rgba(100,140,230,0.9)',
    TICK_SHORT_STROKE_STYLE = 'rgba(100,140,230,0.6)',

    TRACKING_DIAL_STROKING_STYLE = 'rgba(100,140,230,0.5)',

    GUIDEWIRE_STROKE_STYLE = 'goldenrod',
    GUIDEWIRE_FILL_STYLE = 'rgba(250,250,0,0.6)',

    circle = {
      x: canvas.width/2,
      y: canvas.height/2,
      r: 150
    };

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

// function drawDial() {
//   let loc = {
//     x: circle.x,
//     y: circle.y
//   };

//   drawCentroid();
//   drawCentroidGuidewire(loc);
//   drawRing();
//   // drawTickInnerCircle();
//   // drawTicks();
//   // drawAnnotations();
// }

// function drawCentroid() {
//   ctx.save();
//   ctx.beginPath();
//   ctx.strokeStyle = CENTROID_STROKE_STYLE;
//   ctx.fillStyle = CENTROID_FILL_STYLE;
//   ctx.arc(circle.x, circle.y, circle.r, 0, Math.PI*2, false);
//   ctx.stroke();
//   ctx.fill();
//   ctx.restore();
// }

// function drawCentroidGuidewire(loc) {
//   let angle = Math.PI / 4,
//     radius, endpoint;
  
//   ctx.lineWidth = 2;
//   radius = circle.r;
//   endpoint = {
//     x: circle.x + radius * Math.cos(angle),
//     y: circle.y - radius * Math.sin(angle)
//   };
//   ctx.save();

//   ctx.strokeStyle = GUIDEWIRE_STROKE_STYLE;
//   ctx.fillStyle = GUIDEWIRE_FILL_STYLE;

//   ctx.beginPath();
//   ctx.moveTo(circle.x, circle.y);
//   ctx.lineTo(endpoint.x, endpoint.y);
//   ctx.stroke();

//   ctx.beginPath();
//   ctx.strokeStyle = TICK_LONG_STROKE_STYLE;
//   ctx.arc(endpoint.x, endpoint.y, 5, 0, Math.PI*2, false);
//   ctx.fill();
//   ctx.stroke();
//   ctx.restore();
// }

// function drawRing() {
//   drawOuterCircle();

//   ctx.strokeStyle = 'rgba(0,0,0,0.1)';
//   ctx.arc(circle.x, circle.y, circle.r+RING_INNER_R, 0, Math.PI*2, false);
//   ctx.fillStyle = 'rgba(100,140,230,0.1)';
//   ctx.fill();
//   ctx.stroke();
// }

// function drawOuterCircle() {
//   ctx.shadowColor = 'rgba(0,0,0,0.7)';
//   ctx.shadowOffsetX = 3;
//   ctx.shadowOffsetY = 3;
//   ctx.shadowBlur = 6;
//   ctx.strokeStyle = TRACKING_DIAL_STROKING_STYLE;
//   ctx.beginPath();
//   ctx.arc(circle.x, circle.y, circle.r+RING_OUTER_R, 0, Math.PI*2, true);
//   ctx.stroke();
// }
// drawDial();

ctx.save();
ctx.fillStyle = 'cornflowerblue';
ctx.lineWidth = 20;
ctx.lineCap = "round";

ctx.beginPath();
ctx.moveTo(100,100);
ctx.quadraticCurveTo(150, 130, 160, 170);
ctx.stroke();