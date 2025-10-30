// Simple script to make movie rows scroll smoothly on wheel
const movieRows = document.querySelectorAll('.movie-row');

movieRows.forEach(row => {
  row.addEventListener('wheel', (e) => {
    e.preventDefault();
    row.scrollLeft += e.deltaY;
  });
});

// Optional: small animation for banner buttons
const buttons = document.querySelectorAll('.btn');
buttons.forEach(btn => {
  btn.addEventListener('mouseenter', () => {
    btn.style.transform = 'scale(1.05)';
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = 'scale(1)';
  });
});
