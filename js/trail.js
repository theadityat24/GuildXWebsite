const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse = {
  x: -32,
  y: -32,
};

class Particle {
  constructor (x, y, s, r, c) {
    this.x = x;
    this.y = y;
    this.spread = s;
    this.r = r;    
    this.c = c;
  }
  update () {
    this.y += this.r;
    this.x += this.spread;
    this.draw();
  }
  draw() {
    ctx.fillStyle = this.c;
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

let pA = [];

function make() {
  const x = mouse.x;
  const y = mouse.y;
  const s = (Math.random() - 0.5) / 2;
  const r = Math.random() * 2 + 2;
  const c = colors[Math.floor(Math.random() * 4)];
    
  pA.push(new Particle(x, y, s, r, c));
}
      
function animate() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  make();
  
  for (let i = 0; i < pA.length; i++) {
    pA[i].update();
    if (pA[i].y > canvas.height + pA[i].r) pA.splice(i, 1);
  }
  
  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);

document.addEventListener('mousemove', function(e) {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

window.addEventListener('resize', function (e) {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
});
