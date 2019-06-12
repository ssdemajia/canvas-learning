let canvas = document.querySelector('#canvas'),
  ctx = canvas.getContext('2d'),
  point = [
    {
      x: 100,
      y: 100
    },
    {
      x: 200,
      y: 200
    }
  ]

function windowToCanvas(x, y) {
  let bbox = canvas.getBoundingClientRect();
  return {
    x: x - bbox.left * (canvas.width / bbox.width),
    y: y - bbox.top * (canvas.height / bbox.height)
  };
}
canvas.onmousemove = function (e) {
  let loc = windowToCanvas(e.clientX, e.clientY);
  ctx.putImageData(drawingImageData, 0, 0);
  ctx.beginPath();
  ctx.moveTo(point[0].x, point[0].y);
  ctx.quadraticCurveTo(loc.x, loc.y, point[1].x, point[1].y);
  ctx.stroke();
}
let drawingImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
