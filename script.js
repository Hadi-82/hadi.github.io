/* =============================================
   SOLAR SYSTEM EXPLORER — SCRIPT
   ============================================= */

// ── Planet Data ────────────────────────────────────────────────
const PLANETS = {
  sun: {
    name: "The Sun",
    type: "G-type Main-sequence Star",
    color: "radial-gradient(circle at 38% 32%, #fff7a0, #ffcc00 40%, #ff8800 75%, #cc4400)",
    glow: "rgba(255,180,0,0.8)",
    desc: "The Sun is the star at the centre of our Solar System — a nearly perfect sphere of hot plasma generating energy via nuclear fusion. It accounts for 99.86% of the total mass of the Solar System.",
    stats: {
      "Age":       "4.6 Billion yrs",
      "Type":      "Yellow Dwarf",
      "Diameter":  "1,392,700 km",
      "Temp":      "5,778 K",
      "Rotation":  "25 Earth days",
      "Planets":   "8 Orbiting"
    }
  },
  mercury: {
    name: "Mercury",
    type: "Terrestrial Planet · 1st from Sun",
    color: "radial-gradient(circle at 38% 32%, #d0d0d0, #808080)",
    glow: "rgba(181,181,181,0.7)",
    desc: "The smallest planet in the Solar System and the closest to the Sun. Mercury has no atmosphere to retain heat, causing extreme temperature swings — from 430°C in the day to –180°C at night.",
    stats: {
      "Diameter":  "4,879 km",
      "Day":       "58.6 Earth days",
      "Year":      "88 Earth days",
      "Moons":     "0",
      "Temp (day)":"430°C",
      "Gravity":   "3.7 m/s²"
    }
  },
  venus: {
    name: "Venus",
    type: "Terrestrial Planet · 2nd from Sun",
    color: "radial-gradient(circle at 38% 32%, #f5e4b0, #c8a060 60%, #9a7040)",
    glow: "rgba(232,205,160,0.7)",
    desc: "Often called Earth's twin due to similar size, Venus is the hottest planet with a thick CO₂ atmosphere creating a runaway greenhouse effect. Its surface pressure is 90× that of Earth.",
    stats: {
      "Diameter":  "12,104 km",
      "Day":       "243 Earth days",
      "Year":      "225 Earth days",
      "Moons":     "0",
      "Surface":   "462°C avg",
      "Gravity":   "8.87 m/s²"
    }
  },
  earth: {
    name: "Earth",
    type: "Terrestrial Planet · 3rd from Sun",
    color: "radial-gradient(circle at 38% 32%, #7de0e0, #2a7fd4 50%, #1a4f90 75%, #256030)",
    glow: "rgba(79,163,224,0.7)",
    desc: "Our home — the only known world to harbour life. Earth has a dynamic atmosphere, liquid water, a protective magnetic field, and a single large Moon that stabilises its axial tilt.",
    stats: {
      "Diameter":  "12,742 km",
      "Day":       "23h 56m",
      "Year":      "365.25 days",
      "Moons":     "1",
      "Temp avg":  "15°C",
      "Gravity":   "9.8 m/s²"
    }
  },
  mars: {
    name: "Mars",
    type: "Terrestrial Planet · 4th from Sun",
    color: "radial-gradient(circle at 38% 32%, #e07050, #c1440e 60%, #8b2a06)",
    glow: "rgba(193,68,14,0.7)",
    desc: "The Red Planet. Mars hosts the tallest volcano (Olympus Mons) and deepest canyon (Valles Marineris) in the Solar System. Evidence suggests ancient rivers and oceans once covered its surface.",
    stats: {
      "Diameter":  "6,779 km",
      "Day":       "24h 37m",
      "Year":      "687 Earth days",
      "Moons":     "2",
      "Temp avg":  "–63°C",
      "Gravity":   "3.7 m/s²"
    }
  },
  jupiter: {
    name: "Jupiter",
    type: "Gas Giant · 5th from Sun",
    color: "radial-gradient(circle at 38% 32%, #f0d090, #c88b3a 40%, #a06020 65%, #c88b3a 80%)",
    glow: "rgba(200,139,58,0.7)",
    desc: "The largest planet — more than twice the mass of all other planets combined. Jupiter's Great Red Spot is an anticyclonic storm larger than Earth that has persisted for over 350 years.",
    stats: {
      "Diameter":  "139,820 km",
      "Day":       "9h 56m",
      "Year":      "11.9 Earth yrs",
      "Moons":     "95",
      "Temp (top)":"–108°C",
      "Gravity":   "24.8 m/s²"
    }
  },
  saturn: {
    name: "Saturn",
    type: "Gas Giant · 6th from Sun",
    color: "radial-gradient(circle at 38% 32%, #f0e4a0, #c8b060 50%, #a08040)",
    glow: "rgba(228,209,145,0.7)",
    desc: "Saturn's iconic ring system extends up to 282,000 km from the planet and is mostly ice particles and rocky debris. It is the least dense planet — it would float on water.",
    stats: {
      "Diameter":  "116,460 km",
      "Day":       "10h 42m",
      "Year":      "29.5 Earth yrs",
      "Moons":     "146",
      "Ring width":"282,000 km",
      "Gravity":   "10.4 m/s²"
    }
  },
  uranus: {
    name: "Uranus",
    type: "Ice Giant · 7th from Sun",
    color: "radial-gradient(circle at 38% 32%, #c0f0f0, #7de8e8 55%, #40b0b0)",
    glow: "rgba(125,232,232,0.7)",
    desc: "Uranus rotates on its side with an axial tilt of 97.8°, possibly from an ancient collision. It has faint rings, 27 known moons, and emits virtually no internal heat — the coldest planetary atmosphere.",
    stats: {
      "Diameter":  "50,724 km",
      "Day":       "17h 14m",
      "Year":      "84 Earth yrs",
      "Moons":     "27",
      "Temp (top)":"–224°C",
      "Axial Tilt":"97.8°"
    }
  },
  neptune: {
    name: "Neptune",
    type: "Ice Giant · 8th from Sun",
    color: "radial-gradient(circle at 38% 32%, #6080e0, #3f54ba 55%, #202880)",
    glow: "rgba(63,84,186,0.7)",
    desc: "The windiest planet — storms exceed 2,100 km/h. Neptune was discovered via mathematical prediction before observation. Its moon Triton orbits backwards and is slowly spiralling inward.",
    stats: {
      "Diameter":  "49,244 km",
      "Day":       "16h 6m",
      "Year":      "165 Earth yrs",
      "Moons":     "16",
      "Wind speed":"2,100 km/h",
      "Gravity":   "11.2 m/s²"
    }
  }
};

// ── Starfield ──────────────────────────────────────────────────
(function initStarfield() {
  const canvas = document.getElementById('starfield');
  const ctx    = canvas.getContext('2d');
  let stars    = [];

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createStars(n) {
    stars = [];
    for (let i = 0; i < n; i++) {
      stars.push({
        x:    Math.random() * canvas.width,
        y:    Math.random() * canvas.height,
        r:    Math.random() * 1.4 + 0.2,
        a:    Math.random(),
        da:   (Math.random() - 0.5) * 0.005,
        twinkleSpeed: Math.random() * 0.02 + 0.005
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const s of stars) {
      s.a += s.twinkleSpeed * (Math.sin(Date.now() * 0.001 * s.da * 20) > 0 ? 1 : -1);
      s.a = Math.max(0.05, Math.min(1, s.a));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${s.a})`;
      ctx.fill();
    }
    requestAnimationFrame(draw);
  }

  resize();
  createStars(320);
  draw();
  window.addEventListener('resize', () => { resize(); createStars(320); });
})();

// ── Speed Control ──────────────────────────────────────────────
const speedSlider = document.getElementById('speedSlider');
const speedVal    = document.getElementById('speedVal');

speedSlider.addEventListener('input', () => {
  const v = parseFloat(speedSlider.value);
  speedVal.textContent = v.toFixed(1) + '×';
  document.querySelectorAll('.orbit, .planet, .moon-orbit, .moon').forEach(el => {
    const base = el.style.getPropertyValue('--speed') || el.dataset.baseSpeed;
    if (!el.dataset.baseSpeed) el.dataset.baseSpeed = base;
    const baseMs = parseFloat(el.dataset.baseSpeed);
    if (baseMs) {
      el.style.animationDuration = (baseMs / v) + 's';
    }
  });
});

// ── Info Panel ─────────────────────────────────────────────────
const panel    = document.getElementById('infoPanel');
const overlay  = document.getElementById('overlay');
const closeBtn = document.getElementById('closePanel');

function openPanel(key) {
  const d = PLANETS[key];
  if (!d) return;

  document.getElementById('planetName').textContent = d.name;
  document.getElementById('planetType').textContent = d.type;
  document.getElementById('planetDesc').textContent = d.desc;

  const icon = document.getElementById('planetIcon');
  icon.style.background  = d.color;
  icon.style.boxShadow   = `0 0 30px 8px ${d.glow}, 0 0 60px 20px ${d.glow.replace('0.7','0.25')}`;

  const statsEl = document.getElementById('planetStats');
  statsEl.innerHTML = Object.entries(d.stats).map(([label, val]) => `
    <div class="stat-card">
      <div class="stat-label">${label}</div>
      <div class="stat-value">${val}</div>
    </div>
  `).join('');

  panel.classList.add('open');
  overlay.classList.add('visible');
}

function closePanel() {
  panel.classList.remove('open');
  overlay.classList.remove('visible');
}

closeBtn.addEventListener('click', closePanel);
overlay.addEventListener('click', closePanel);

// ── Click Handlers ─────────────────────────────────────────────
document.querySelectorAll('.planet, .sun').forEach(el => {
  el.addEventListener('click', (e) => {
    e.stopPropagation();
    openPanel(el.dataset.planet);
  });
});

// ── Tooltip ────────────────────────────────────────────────────
const tooltip = document.createElement('div');
tooltip.className = 'tooltip';
document.body.appendChild(tooltip);

document.querySelectorAll('.planet, .sun').forEach(el => {
  const key = el.dataset.planet;

  el.addEventListener('mouseenter', (e) => {
    tooltip.textContent = PLANETS[key]?.name || key;
    tooltip.classList.add('show');
  });

  el.addEventListener('mousemove', (e) => {
    tooltip.style.left = (e.clientX + 14) + 'px';
    tooltip.style.top  = (e.clientY - 28) + 'px';
  });

  el.addEventListener('mouseleave', () => {
    tooltip.classList.remove('show');
  });
});

// ── Keyboard shortcut ─────────────────────────────────────────
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closePanel();
});

// ── Animate speed CSS var sync ────────────────────────────────
// Grab base speeds from CSS --speed and store as data attr
document.querySelectorAll('.orbit').forEach(el => {
  const spd = parseFloat(getComputedStyle(el).getPropertyValue('--speed'));
  if (spd) el.dataset.baseSpeed = spd;
});

document.querySelectorAll('.planet').forEach(el => {
  const parentOrbit = el.closest('.orbit');
  if (parentOrbit) el.dataset.baseSpeed = parentOrbit.dataset.baseSpeed;
});

// Moon
document.querySelector('.moon-orbit').dataset.baseSpeed  = 1.5;
document.querySelector('.moon').dataset.baseSpeed        = 1.5;