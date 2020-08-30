const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse = {
  x: -128,
  y: -128,
};

class Particle {
  constructor (x, y, r, c) {
    this.x = x;
    this.y = y;
    this.r = r;    
    this.c = c;
    this.a = 1;
  }
  update () {
    this.a -= 0.01;
    this.draw();
  }
  draw() {
    ctx.fillStyle = this.c;
    ctx.globalAlpha = this.a;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.closePath();
  }
}

const colors = [
  "#5c76fa",
  "#445feb",
  "#6d83f2",
  "#3e53bd",
];

let grd = ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, 1, canvas.width / 2, canvas.height / 2, canvas.height / 2);
  
grd.addColorStop(0, '#000936');  
grd.addColorStop(1, '#000000');

let pA = [];

function make() {
  const x = mouse.x;
  const y = mouse.y;
  const r = Math.random() * 2 + 2;
  const c = colors[Math.floor(Math.random() * 4)];
    
  pA.push(new Particle(x, y, r, c));
}
      
function animate() {
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  make();
  
  for (let i = 0; i < pA.length; i++) {
    pA[i].update();
    if (pA[i].a < 0.05) pA.splice(i, 1);
  }
  
  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);

document.addEventListener('mousemove', function(e) {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

document.addEventListener('mouseout', function(e) {
  mouse.x = -128;
  mouse.y = -128;
});

document.addEventListener('scroll', function(e) {
  mouse.x = -128;
  mouse.y = -128;
});

window.addEventListener('resize', function (e) {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  grd = ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, 1, canvas.width / 2, canvas.height / 2, canvas.height / 2);
});
