console.profile("initial canvas");
let canvas = document.querySelector("#canvas");
let context = canvas.getContext('2d');

context.font = '38pt Arial';
context.fillStyle = 'cornflowerblue';
context.strokeStyle = 'blue';
context.fillText('Hello Canvas', canvas.width/2 - 150, canvas.height/2 + 15)
context.strokeText('Hello Canvas', canvas.width/2 - 150, canvas.height/2 + 15)
// window.location.href = canvas.toDataURL('image/jpeg', 1).replace("image/jpeg", "image/octet-stream")
canvas.toDataURL('image/jpeg', 1).replace("image/jpeg", "image/octet-stream")
console.profileEnd();