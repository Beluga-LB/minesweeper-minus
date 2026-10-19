// Global
const blue = "#5BA7F4"
const green = "#3DD462"
const red = "#FF0000"
const worse_blue = "#3498DB"
const charcoal = "#000000"
const pantone = "#4A412A"
const crimson = "#DC143C"
const emerald = "#50C878"
const amethyst = "#9966CC"
const blush = "#DE5D83"
const coral = "#FF7F50"
const indigo = "#4B0082"
const bronze = "#CD7F32"
const silver = "#C0C0C0"
const gold = "#FFD700"

function invert(color) {
    const invertHexComponent = (hex) => {
        const inverted = 255 - parseInt(hex, 16);
        return inverted.toString(16).padStart(2, '0');
    };

    color = color.trim();

    if (color.toLowerCase().includes('rgb') || color.includes(',')) {
        const rgbMatch = color.match(/\d+/g);
        if (!rgbMatch || rgbMatch.length < 3) throw new Error("Invalid RGB format");
        
        const r = 255 - parseInt(rgbMatch[0], 10);
        const g = 255 - parseInt(rgbMatch[1], 10);
        const b = 255 - parseInt(rgbMatch[2], 10);
        
        return `rgb(${r}, ${g}, ${b})`;
    }

    let hex = color.replace('#', '');

    if (hex.length === 3) {
        hex = hex.split('').map(char => char + char).join('');
    }

    if (hex.length !== 6) throw new Error("Invalid HEX format");

    const r = invertHexComponent(hex.slice(0, 2));
    const g = invertHexComponent(hex.slice(2, 4));
    const b = invertHexComponent(hex.slice(4, 6));

    return `#${r}${g}${b}`;
}


function circle(x, y, r, c, s = null, f = 2) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  
  if (c) {
    ctx.fillStyle = c;
    ctx.fill();
  }

  if (s) {
    ctx.strokeStyle = s;
    ctx.lineWidth = f;
    ctx.stroke();
  }
}

function rect(x, y, w, h, c, s = null, f = 2) {
  if (c) {
    ctx.fillStyle = c;
    ctx.fillRect(x, y, w, h);
  }

  if (s) {
    ctx.strokeStyle = s;
    ctx.lineWidth = f;
    ctx.strokeRect(x, y, w, h);
  }
}

function circle2(x, y, r, c, s = null, f = 2) {
  ctx2.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  
  if (c) {
    ctx2.fillStyle = c;
    ctx2.fill();
  }

  if (s) {
    ctx2.strokeStyle = s;
    ctx2.lineWidth = f;
    ctx2.stroke();
  }
}

function rect2(x, y, w, h, c, s = null, f = 2) {
  if (c) {
    ctx2.fillStyle = c;
    ctx2.fillRect(x, y, w, h);
  }

  if (s) {
    ctx2.strokeStyle = s;
    ctx2.lineWidth = f;
    ctx2.strokeRect(x, y, w, h);
  }
}

function text(t, x, y, c, size, family, align, baseline, sc, sw = 3, weight) {
  ctx.textAlign = align ? align : "left";
  ctx.textBaseline = baseline ? baseline : "alphabetic";
  ctx.font = `${weight ? weight : ""} ${size}px ${family ? family : "serif"}`;
  
  if (sc) {
    ctx.strokeStyle = sc;
    ctx.lineWidth = sw;
    ctx.strokeText(t, x, y);
  }
  
  if (c) {
    ctx.fillStyle = c;
    ctx.fillText(t, x, y);
  }
}

// Angles & Distance

function getDistance(entity1, entity2) {
    const dx = entity2.x - entity1.x;
    const dy = entity2.y - entity1.y;
    return Math.sqrt(dx * dx + dy * dy);
}

function moveToward(follower, target, speed) {
    const dx = target.x - follower.x;
    const dy = target.y - follower.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance > speed) {
        follower.x += (dx / distance) * speed;
        follower.y += (dy / distance) * speed;
    } else {
        follower.x = target.x;
        follower.y = target.y;
    }
}

function moveAtAngle(entity, angle, speed) {
    entity.x += Math.cos(angle) * speed;
    entity.y += Math.sin(angle) * speed;
}

function checkCircleCollision(c1, c2) {
    const dx = c1.x - c2.x;
    const dy = c1.y - c2.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    return distance < (c1.r + c2.r);
}

function checkRectCollision(r1, r2) {
    return r1.x < r2.x + r2.w &&
           r1.x + r1.w > r2.x &&
           r1.y < r2.y + r2.h &&
           r1.y + r1.h > r2.y;
}

function checkCircleRectCollision(circle, rect) {
    const closestX = Math.max(rect.x, Math.min(circle.x, rect.x + rect.w));
    const closestY = Math.max(rect.y, Math.min(circle.y, rect.y + rect.h));

    const dx = circle.x - closestX;
    const dy = circle.y - closestY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    return distance < circle.r;
}

function randomNumber(min, max, int = false) {
    if (int) return Math.floor(Math.random() * (max - min + 1)) + min;
    return Math.random() * (max - min) + min;
}

// arr should be an array (e.g. [blue, red, green])
function randomChoice(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function clamp(val, min, max) {
    return Math.max(min, Math.min(max, val));
}

function getAngle(entity1, entity2) {
    return Math.atan2(entity2.y - entity1.y, entity2.x - entity1.x);
}

// Conversions

function degToRad(degrees) {
    return degrees * (Math.PI / 180);
}

function radToDeg(radians) {
    return radians * (180 / Math.PI);
}

function hexToRGBA(hex, alpha = 0) {
    hex = hex.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function toggle(boo) {
  return !boo;
}