const fs = require('fs');

// Card 1: Tail bottom-left
// Card dimensions: 400 x 400
// White bubble touches top-right: (400, 0)
// Top edge: from x=70 to x=400
// Right edge: from y=0 to y=250
// Bottom arc: curves from (400, 250) down through (300, 310) to (150, 280)
// Tail: points to (45, 295)
// Tail returns to (65, 220)
// Left arc: curves from (65, 220) up through (48, 120) to (70, 0)
const path1 = "M 70,0 L 400,0 L 400,250 C 400,290 320,315 220,305 C 170,300 130,285 110,270 L 45,295 L 65,225 C 48,160 52,60 70,0 Z";

// Card 2: Tail bottom-right (horizontal mirror of Card 1)
// White bubble touches top-left: (0, 0)
// Top edge: from x=0 to x=330
// Left edge: from y=0 to y=250
// Bottom arc: curves from (0, 250) down through (100, 310) to (250, 305)
// Tail: points to (355, 295)
// Tail returns to (335, 225)
// Right arc: curves from (335, 225) up through (352, 160) to (330, 0)
const path2 = "M 0,0 L 330,0 C 348,60 352,160 335,225 L 355,295 L 290,270 C 270,285 230,300 180,305 C 80,315 0,290 0,250 L 0,0 Z";

const html = `<!DOCTYPE html>
<html>
<head>
  <style>
    body { background: #e5e5e5; display: flex; gap: 40px; padding: 50px; font-family: sans-serif; }
    .card { width: 360px; height: 360px; position: relative; box-shadow: 0 10px 25px rgba(0,0,0,0.15); overflow: hidden; }
    .navy { background: #0c1a2d; }
    .amber { background: #f59e0b; }
    .bubble-svg { position: absolute; inset: 0; width: 100%; height: 100%; }
    .content { position: absolute; inset: 0; padding: 36px 36px 30px; display: flex; flex-direction: column; justify-content: space-between; z-index: 10; }
  </style>
</head>
<body>
  <div class="card navy">
    <svg class="bubble-svg" viewBox="0 0 400 400" preserveAspectRatio="none">
      <path d="${path1}" fill="#ffffff" />
    </svg>
    <div class="content">
      <div style="display: flex; justify-content: flex-end;">
        <span style="font-size: 54px; line-height: 1; color: #0c1a2d; font-family: serif; font-weight: bold;">“</span>
      </div>
      <p style="font-size: 14px; line-height: 1.5; color: #1e293b; margin: 0 0 12px 0;">
        Lorem ipsum dolor sit amet, consectetuer ut adipiscing elit, sed diam nonummy nibh tincidunt ut dolore magna ut adipiscing aliquam.
      </p>
      <div style="text-align: right;">
        <strong style="color: #0c1a2d; font-size: 15px;">John Doe</strong>
      </div>
    </div>
  </div>

  <div class="card amber">
    <svg class="bubble-svg" viewBox="0 0 400 400" preserveAspectRatio="none">
      <path d="${path2}" fill="#ffffff" />
    </svg>
    <div class="content">
      <div style="display: flex; justify-content: flex-start;">
        <span style="font-size: 54px; line-height: 1; color: #f59e0b; font-family: serif; font-weight: bold;">“</span>
      </div>
      <p style="font-size: 14px; line-height: 1.5; color: #9a3412; margin: 0 0 12px 0;">
        Lorem ipsum dolor sit amet, consectetuer ut adipiscing elit, sed diam nonummy nibh tincidunt ut dolore magna ut adipiscing aliquam.
      </p>
      <div style="text-align: left;">
        <strong style="color: #9a3412; font-size: 15px;">John Doe</strong>
      </div>
    </div>
  </div>
</body>
</html>`;

fs.writeFileSync('scratch/test_bubble.html', html);
console.log('Saved scratch/test_bubble.html');
