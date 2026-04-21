export default function decorate(block) {
  [...block.children].forEach((card) => {
    const socialDiv = card.children[2];
    if (!socialDiv) return;

    const text = socialDiv.textContent.toLowerCase();
    const wrapper = document.createElement('div');
    wrapper.className = 'social';

    text.split(',').forEach((iconName) => {
      iconName = iconName.trim();
      if (!iconName) return;

      const a = document.createElement('a');
      a.href = '#';
      a.target = '_blank';
      a.rel = 'noopener noreferrer';

      const span = document.createElement('span');
      span.className = `icon icon-${iconName}`;

      a.appendChild(span);
      wrapper.appendChild(a);
    });

    socialDiv.innerHTML = '';
    socialDiv.appendChild(wrapper);
  });
}
