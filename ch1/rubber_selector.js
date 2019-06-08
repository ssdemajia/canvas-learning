let canvas = document.querySelector('#canvas'),
    ctx = canvas.getContext('2d'),
    rubberbandDiv = document.querySelector('#rubberbandDiv'),
    resetButton = document.querySelector('#resetButton'),
    image = new Image(),
    mouseDown = {},
    rubberbandRect = {},
    dragging = false;

function rubberbandStart(x, y) {
  rubberbandRect.left = mouseDown.x = x;
  rubberbandRect.top = mouseDown.y = y;
  moveRubberbandDiv();
  showRubberbandDiv();

  dragging = true;
}

function rubberbandStretch(x, y) {
  rubberbandRect.left = x < mouseDown.x? x: mouseDown.x;
  rubberbandRect.top = y < mouseDown.y? y: mouseDown.y;

  rubberbandRect.width = Math.abs(x - mouseDown.x);
  rubberbandRect.height = Math.abs(y - mouseDown.y);

  moveRubberbandDiv();
  resizeRubberbandDiv();
}

function rubberbandEnd() {
  let bbox = canvas.getBoundingClientRect();
  console.log(rubberbandRect.left,
    rubberbandRect.top,
    bbox.left,
    bbox.top)

  ctx.drawImage(canvas, 
    rubberbandRect.left - bbox.left,
    rubberbandRect.top - bbox.top,
    rubberbandRect.width,
    rubberbandRect.height, 
    0, 0, canvas.width, canvas.height);

  resetRubberband();
  rubberbandDiv.style.width = 0;
  rubberbandDiv.style.height = 0;

  hideRubberband();
  dragging = false;
}

function moveRubberbandDiv() {
  rubberbandDiv.style.top = rubberbandRect.top + 'px';
  rubberbandDiv.style.left = rubberbandRect.left + 'px';
}

function resizeRubberbandDiv() {
  rubberbandDiv.style.width = rubberbandRect.width + 'px';
  rubberbandDiv.style.height = rubberbandRect.height + 'px';
}

function showRubberbandDiv() {
  rubberbandDiv.style.display = 'inline';
}

function hideRubberband() {
  rubberbandDiv.style.display = 'none';
}

function resetRubberband() {
  rubberbandRect = { top: 0, left: 0, width: 0, height: 0 };
}


canvas.addEventListener('mousedown', function(e) {
  let x = e.clientX,
      y = e.clientY;
  
  e.preventDefault();
  rubberbandStart(x, y);
})

canvas.addEventListener('mousemove', function(e) {
  let x = e.clientX,
      y = e.clientY;
  e.preventDefault();
  if (dragging) {
    rubberbandStretch(x, y);
  }
})

window.addEventListener('mouseup', function(e) {
  e.preventDefault();
  rubberbandEnd();
})

image.addEventListener('load', function(e) {
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
})

resetButton.addEventListener('click', function(e) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
})
image.src = '头像.jpg'

