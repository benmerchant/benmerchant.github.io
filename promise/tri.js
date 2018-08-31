var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');


function drawTriCircle(){
  let b = 350;
  let h = b * Math.sin(Math.PI/3);
  let lineW = b * 0.035;

  let p1x = innerWidth/2;
  let p1y = innerHeight/2-b/2;

  let p2x = p1x + b/2;
  let p2y = p1y + h;

  let p3x = p2x - b;
  let p3y = p2y;

  c.beginPath();
  c.moveTo(p1x, p1y);
  c.lineTo(p2x, p2y);
  c.lineTo(p3x, p3y);
  // c.lineTo(p1x, p1y);
  c.lineWidth = lineW;
  c.strokeStyle = 'black';
  c.closePath();
  c.stroke();
  c.fillStyle = 'grey';
  c.fill();

  // now for the circle
  // bisect the angles to find origin of circle
  let r = (b)*Math.tan(Math.PI/6)/2;
  let cx = p1x;
  let cy = p2y-r;
  let ang0 = 0;
  let angEnd = Math.PI*2;
  c.beginPath();
  c.arc(cx, cy, r, ang0, angEnd, false);
  c.strokeStyle = '#000000';
  c.lineWidth = lineW;
  c.stroke();
  c.fillStyle = 'lightgrey';
  c.fill();
}
function randoHex(){
  let outHex = '#';
  let hexxer = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f',];
  let min = Math.ceil(0);
  let max = Math.floor(hexxer.length);
  for(let jj=0; jj<6; jj++){
    outHex += hexxer[Math.floor(Math.random()*(max-min)+min)];
  }
  return outHex;
}

function Circle(x,y,dx,dy,radius){
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;

  this.draw = function(){
    c.beginPath();
    c.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
    // c.strokeStyle = randoHex();
    // c.stroke();
    c.fillStyle = 'black';
    c.fill();
  }
  this.update = function(){
    if(this.x+this.radius>innerWidth || this.x-this.radius < 0)
      {this.dx = -this.dx;}
    if(this.y+this.radius>innerHeight || this.y-this.radius<0)
      {this.dy = -this.dy;}

    // x & y velocity
    this.x+=this.dx;
    this.y+=this.dy;
    this.draw();
  }
}

let circleArray = [];

for(let aa=0; aa<100; aa++){
  let radius = 20;
  let x = Math.random() * (innerWidth - radius*2)+radius;
  let dx = (Math.random() - 0.5);
  let y = Math.random() * (innerHeight - radius*2)+radius;
  let dy = (Math.random() - 0.5);
  circleArray.push(new Circle(x,y,dx,dy,radius));
}

function animate(){
  requestAnimationFrame(animate);
  c.clearRect(0,0,innerWidth, innerHeight);
  for(let bb = 0; bb<circleArray.length-1; bb++){
    circleArray[bb].update();
  }
  drawTriCircle();
}

animate();
