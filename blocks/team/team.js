export default function decorate(block) {
  [...block.children].forEach((row) => {
    const [image, name, role, social] = row.children;

    /* Image */
    const img = document.createElement('img');
    img.src = image.textContent.trim();
    img.alt = name.textContent.trim();

    /* Name */
    const title = document.createElement('h3');
    title.textContent = name.textContent;

    /* Role */
    const roleEl = document.createElement('p');
    roleEl.className = 'role';
    roleEl.textContent = role.textContent;

    /* Social icons */
    const socialWrap = document.createElement('div');
    socialWrap.className = 'social';

    social.textContent.split(',').forEach((icon) => {
      const span = document.createElement('span');
      span.textContent = icon.trim().toUpperCase();
      socialWrap.append(span);
    });

    row.innerHTML = '';
    row.append(img, title, roleEl, socialWrap);
  });
}
``