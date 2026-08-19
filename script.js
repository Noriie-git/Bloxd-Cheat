function showNotice(message) {
  const notice = document.getElementById("notice");
  notice.textContent = message;
  notice.classList.add("show");

  clearTimeout(window.noticeTimer);
  window.noticeTimer = setTimeout(() => {
    notice.classList.remove("show");
  }, 3000);
}

const canvas = document.getElementById('background-grid');
const ctx = canvas.getContext('2d');

let width, height;
let mouse = { x: -1000, y: -1000 };

function resizeCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
window.addEventListener('mousemove', (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

window.addEventListener('mouseleave', () => {
  mouse.x = -1000;
  mouse.y = -1000;
});

const spacing = 30;
const baseRadius = 0.9;
const maxRadius = 4.5;
const hoverRadius = 140;

function drawGrid() {
  ctx.clearRect(0, 0, width, height);

  for (let x = spacing / 2; x < width; x += spacing) {
    for (let y = spacing / 2; y < height; y += spacing) {
      const dx = mouse.x - x;
      const dy = mouse.y - y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      let radius = baseRadius;
      let alpha = 0.35;

      if (dist < hoverRadius) {
        const factor = 1 - dist / hoverRadius;
        radius = baseRadius + (maxRadius - baseRadius) * factor;
        alpha = 0.35 + 0.65 * factor;
      }

      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 255, 119, ${alpha})`;
      ctx.fill();
    }
  }

  requestAnimationFrame(drawGrid);
}

resizeCanvas();
drawGrid();
