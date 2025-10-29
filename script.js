// Movie data
const MOVIES = [
  { id:1, title:"Crimson Nights", year:2024, rating:"8.2", category:"Action", desc:"A courier finds a conspiracy under the neon.", color:"#e53a3a" },
  { id:2, title:"Shoreline", year:2023, rating:"7.8", category:"Drama", desc:"A coastal town's secrets surface.", color:"#2b9eb3" },
  { id:3, title:"Binary Heart", year:2025, rating:"8.6", category:"Sci-Fi", desc:"An AI falls in love with code.", color:"#8b5cf6" },
  { id:4, title:"High Velocity", year:2022, rating:"7.5", category:"Action", desc:"A high-speed heist across borders.", color:"#ff7b00" },
  { id:5, title:"Last Laugh", year:2021, rating:"7.2", category:"Comedy", desc:"A comedian gets one big break or a bigger fall.", color:"#ffd166" },
  { id:6, title:"Midnight Run", year:2020, rating:"7.9", category:"Action", desc:"Night runners in a city that never sleeps.", color:"#ef476f" },
  { id:7, title:"Quiet Study", year:2019, rating:"7.1", category:"Drama", desc:"An introvert discovers a hidden library.", color:"#06d6a0" },
  { id:8, title:"Spaceway 9", year:2024, rating:"8.9", category:"Sci-Fi", desc:"Crew fights to save a failing starship.", color:"#118ab2" },
  { id:9, title:"Jester's Game", year:2023, rating:"7.3", category:"Comedy", desc:"A prank turns into a crime mystery.", color:"#f4a261" },
  { id:10, title:"Rogue Protocol", year:2025, rating:"8.4", category:"Action", desc:"A hacker teams up with rebels.", color:"#9b2226" }
];

// Helper to shade colors
function shadeColor(hex, percent) {
  const c = hex.replace('#', '');
  const num = parseInt(c, 16);
  let r = (num >> 16) + Math.round(255 * (percent / 100));
  let g = ((num >> 8) & 0x00FF) + Math.round(255 * (percent / 100));
  let b = (num & 0x0000FF) + Math.round(255 * (percent / 100));
  r = Math.min(255, Math.max(0, r));
  g = Math.min(255, Math.max(0, g));
  b = Math.min(255, Math.max(0, b));
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

// Create card
function createCard(movie) {
  const card = document.createElement('div');
  card.className = 'card';
  card.dataset.id = movie.id;

  const poster = document.createElement('div');
  poster.className = 'poster';
  poster.style.background = `linear-gradient(180deg, ${shadeColor(movie.color, 10)}, ${shadeColor(movie.color, -10)})`;
  poster.textContent = movie.title.split(' ').map(w => w[0]).join('').toUpperCase();

  const meta = document.createElement('div');
  meta.className = 'meta';
  meta.innerHTML = `<div>${movie.title}</div><div class="rating">${movie.rating}</div>`;

  card.append(poster, meta);
  card.addEventListener('click', () => openModal(movie.id));
  return card;
}

// Render carousels
function renderCarousel(id, data) {
  const container = document.getElementById(id);
  container.innerHTML = '';
  data.forEach(m => container.appendChild(createCard(m)));
}

// Modal functions
function openModal(id) {
  const movie = MOVIES.find(m => m.id === id);
  if (!movie) return;
  document.getElementById('modalTitle').textContent = `${movie.title} (${movie.year})`;
  document.getElementById('modalDesc').textContent = `${movie.desc} • Category: ${movie.category} • Rating: ${movie.rating}`;
  document.getElementById('fakeScreen').textContent = `Trailer — ${movie.title}`;
  document.getElementById('modal').classList.add('open');
}

function closeModal() {
  document.getElementById('modal').classList.remove('open');
}

// Search
function onSearch(e) {
  const q = e.target.value.toLowerCase();
  const filtered = MOVIES.filter(m => m.title.toLowerCase().includes(q) || m.category.toLowerCase().includes(q));
  renderCarousel('trending', filtered.length ? filtered : MOVIES);
}

// Initialize
function init() {
  renderCarousel('trending', MOVIES.slice(0, 8));
  renderCarousel('topPicks', MOVIES.filter(m => m.rating >= 8));
  renderCarousel('action', MOVIES.filter(m => m.category === 'Action'));
  renderCarousel('comedy', MOVIES.filter(m => m.category === 'Comedy'));

  document.getElementById('searchInput').addEventListener('input', onSearch);
  document.getElementById('closeModal').addEventListener('click', closeModal);
  document.getElementById('playHero').addEventListener('click', () => openModal(1));
  document.getElementById('moreHero').addEventListener('click', () => openModal(1));
}

init();
