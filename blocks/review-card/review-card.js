export default function decorate(block) {
  const grid = block.querySelector(':scope > div');
  if (!grid) return;

  const cards = Array.from(grid.children);

  cards.forEach((card, index) => {
    // Inject number once
    if (!card.querySelector('.review-number')) {
      const number = document.createElement('span');
      number.className = 'review-number';
      number.textContent = String(index + 1).padStart(2, '0');
      card.appendChild(number);
    }
  });
}