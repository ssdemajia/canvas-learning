let canvas = document.querySelector("#canvas");
let context = canvas.getContext('2d');
let FONT_HEIGHT = 15,
    MARGIN = 35,
    HAND_TRUNCATION = canvas.width/25,
    HOUR_HAND_TRUNCATION = canvas.width/10,
    NUMERAL_SAPCING = 20,
    RADIUS = canvas.width/2 - MARGIN,
    HAND_RADIUS = RADIUS + NUMERAL_SAPCING;

  
let drawCircle = function() {
  context.beginPath();
  context.arc(canvas.width/2, canvas.height/2, RADIUS, 0, Math.PI*2, true);
  context.stroke();
}

let drawCenter = function() {
  context.beginPath();
  context.arc(canvas.width/2, canvas.height/2, 5, 0, Math.PI*2, true);
  context.fill();
}

let drawNumeral = function() {
  for (let num = 1; num < 13; num++) {
    let angle = Math.PI/6*(num-3);
    let numWidth = context.measureText(num).width;
    let FAKE = HAND_RADIUS - 35;
    context.fillText(num, canvas.width/2 + FAKE*Math.cos(angle) - numWidth/2,
                    canvas.height/2 + FAKE*Math.sin(angle) + FONT_HEIGHT/3);
  }
}

let drawHand = function(loc, isHour) {
  let angle = Math.PI*2*loc/60 - Math.PI/2;  // 将0～60定位到 -90 ～ 270
  let radius = isHour? RADIUS - HAND_TRUNCATION - HOUR_HAND_TRUNCATION:
                       RADIUS - HAND_TRUNCATION;
  context.moveTo(canvas.width/2, canvas.height/2);
  context.lineTo(canvas.width/2 + radius*Math.cos(angle), canvas.width/2 + radius*Math.sin(angle));
  context.stroke();
}

let drawHands = function() {
  let date = new Date();
  let hour = date.getHours();
  hour = hour > 12? hour-12: hour;
  drawHand(hour*5, true);
  drawHand(date.getMinutes(), false)
  drawHand(date.getSeconds(), false)
}

let draw = function() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawCircle();
  drawCenter();
  drawNumeral();
  drawHands();
}
loop = setInterval(draw, 1000);