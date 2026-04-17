export default function decorate(block) {
  [...block.children].forEach((card) => {
    const socialCell = card.children[3];
    const text = socialCell.textContent.trim();

    const wrapper = document.createElement('div');
    text.split(',').forEach((item) => {
      const span = document.createElement('span');
      span.textContent = item.trim();
      wrapper.append(span);
    });

    socialCell.innerHTML = '';
    socialCell.append(wrapper);
  });
}
