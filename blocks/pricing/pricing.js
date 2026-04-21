export default function decorate(block) {
  const wrapper = document.createElement('div');
  wrapper.className = 'pricing-cards';

  [...block.children].forEach((row, index) => {
    const cols = row.children;
    if (cols.length < 4) return;

    const card = document.createElement('div');
    card.className = 'pricing-card';

    // Middle card = featured
    if (index === 1) card.classList.add('featured');

    // Price
    const price = document.createElement('div');
    price.className = 'price';
    price.textContent = cols[0].textContent.trim();

    // Plan
    const plan = document.createElement('div');
    plan.className = 'plan';
    plan.textContent = cols[1].textContent.trim();

    // Features
    const ul = document.createElement('ul');

    [...cols[2].querySelectorAll('p')].forEach((p) => {
      p.innerHTML.split('<br>').forEach((text) => {
        const value = text.trim();
        if (!value) return;
        const li = document.createElement('li');
        li.textContent = value;
        ul.appendChild(li);
      });
    });

    // Button
    const btn = document.createElement('a');
    btn.href = '#';
    btn.className = 'pricing-btn';
    btn.textContent = cols[3].textContent.trim();

    card.append(price, plan, ul, btn);
    wrapper.append(card);
  });

  block.innerHTML = '';
  block.append(wrapper);
}
