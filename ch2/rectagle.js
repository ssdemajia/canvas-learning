let canvas = document.querySelector('#canvas'),
    ctx = canvas.getContext('2d'),
    gradient = ctx.createLinearGradient(0, 0, canvas.width, 0),
    radial_gradient = ctx.createRadialGradient(550, 200, 10, 550, 100, 200);
ctx.lineJoin = 'round';
ctx.lineWidth = 30;
ctx.font = '24px Helvetica';

ctx.fillText('ClickClickClickClickClickClickClick', 100, 140);
gradient.addColorStop(0, 'blue');
gradient.addColorStop(0.3, 'red');
gradient.addColorStop(0.4, 'green');
gradient.addColorStop(0.7, 'blue');
gradient.addColorStop(1, 'rgba(213,21,123,0.5)');
ctx.fillStyle = gradient;
ctx.strokeStyle = 'rgba(0, 123, 123, 0.7)'
ctx.strokeRect(325, 100, 200, 200);
ctx.fillRect(100, 100, 200, 200);

radial_gradient.addColorStop(0, 'blue');
radial_gradient.addColorStop(0.3, 'white');
radial_gradient.addColorStop(0.4, 'green');
radial_gradient.addColorStop(0.7, 'blue');
radial_gradient.addColorStop(1, 'rgba(213,21,123,0.5)');
ctx.fillStyle = radial_gradient;
ctx.fillRect(500, 100, 200, 200);
canvas.onmousedown = function() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};
