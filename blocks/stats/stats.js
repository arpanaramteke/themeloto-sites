export default function decorate(block) {
  block.querySelectorAll('p').forEach((p) => {
    const match = p.textContent.trim().match(/^([\d+K]+)\s+(.*)$/);
    if (!match) return;

    p.innerHTML = `
      <span class="stat-number">${match[1]}</span>
      <span class="stat-label">${match[2]}</span>
    `;
  });
}
