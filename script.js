const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const size = Math.min(window.innerWidth, window.innerHeight) * 0.8;
canvas.width = size;
canvas.height = size;

ctx.translate(canvas.width / 2, canvas.height);
ctx.scale(1, -1);

drawBranch([0,0], 15, 50, 90);

function drawBranch(start, thick, length, deg) {
    if (thick < 10 && Math.random() < 0.2) {
        return;
    }
    if (length < 30) {
        return;
    }
    if (thick < 2) {
        ctx.beginPath();
        ctx.arc(...start, 5, 0, 2 * Math.PI);
        ctx.fillStyle = Math.random()<0.5? '#20f':'#f40';
        ctx.fill();
        return;
    }
    ctx.beginPath();
    ctx.moveTo(...start);
    const end = [
        start[0] + length * Math.cos((deg * Math.PI) / 180),
        start[1] + length * Math.sin((deg * Math.PI) / 180),
    ]
    ctx.lineTo(...end);
    ctx.strokeStyle = '#333';
    ctx.lineCap = 'round';
    ctx.lineWidth = thick;
    ctx.stroke();

    const newLength = length * (0.7 + Math.random() * 0.6);
    const leftDeg = deg + 15 + Math.random() * 10;
    const rightDeg = deg - 15 - Math.random() * 10;
    drawBranch(end, thick * 0.8, newLength, leftDeg);
    drawBranch(end, thick * 0.8, newLength, rightDeg);
}

const reloadButton = document.getElementById('reload-button');
    reloadButton.addEventListener('click', () => {
      location.reload();
    });