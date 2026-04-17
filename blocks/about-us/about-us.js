export default function decorate(block) {
  const section = block.closest('.section');
  section.classList.add('about-us-container');

  // Wrapper
  const wrapper = document.createElement('div');
  wrapper.className = 'about-us-wrapper';

  const inner = document.createElement('div');
  inner.className = 'about-us-inner';

  // Grab original content
  const contentRoot = block.querySelector(':scope > div > div') || block;

  const picture = contentRoot.querySelector('picture');
  const eyebrow = contentRoot.querySelector('h5');
  const title = contentRoot.querySelector('h2');
  const paragraphs = contentRoot.querySelectorAll('p');

  /* ========= Image column ========= */
  const imageCol = document.createElement('div');
  imageCol.className = 'about-us-image';

  if (picture) {
    imageCol.append(picture);
  }

  // Optional badge
  const badge = document.createElement('span');
  badge.className = 'about-badge';
  badge.textContent = 'We Are Ready';
  imageCol.append(badge);

  /* ========= Content column ========= */
  const contentCol = document.createElement('div');
  contentCol.className = 'about-us-content';

  if (eyebrow) {
    eyebrow.classList.add('about-eyebrow');
    contentCol.append(eyebrow);
  }

  if (title) {
    title.classList.add('about-title');
    contentCol.append(title);
  }

  /* ========= Description + skills ========= */
  if (paragraphs[1]) {
    const lines = paragraphs[1].innerHTML.split('<br>');

    const desc = document.createElement('p');
    desc.className = 'about-description';
    desc.innerHTML = lines.shift();
    contentCol.append(desc);

    const skills = document.createElement('div');
    skills.className = 'about-skills';

    lines.forEach((line) => {
      if (line.includes('|')) {
        const [label, value] = line.split('|');
        const skill = document.createElement('div');
        skill.className = 'skill';
        skill.innerHTML = `
          <span>${label.trim()}</span>
          <span class="percent">${value.trim()}%</span>
        `;
        skills.append(skill);
      }
    });

    contentCol.append(skills);
  }

  // Normalize skill percent values and expose as CSS variables for styling
  // (This keeps the original HTML output but allows CSS to read --pct)
  const normalizePercents = (root) => {
    const skillsEl = root.querySelectorAll('.about-skills .skill');
    skillsEl.forEach((s) => {
      const pctEl = s.querySelector('.percent');
      if (pctEl) {
        const raw = String(pctEl.textContent || '').trim();
        const num = parseInt(raw.replace(/[^0-9]/g, ''), 10) || 0;
        pctEl.textContent = `${num}%`;
        s.style.setProperty('--pct', `${num}%`);
      }
    });
  };

  // run normalizer on the content column we built
  normalizePercents(contentCol);

  /* ========= Signature + Button ========= */
  if (paragraphs[2]) {
    const text = paragraphs[2].innerText;

    if (text.includes('Hasina')) {
      const signature = document.createElement('div');
      signature.className = 'about-signature';
      signature.innerHTML = `
        <span class="name">Hasina Islam</span>
        <span class="role">CEO - Gradi Ltd</span>
      `;
      contentCol.append(signature);
    }

    if (text.includes('Read More')) {
      const button = document.createElement('a');
      button.className = 'button primary';
      button.textContent = 'Read More';
      button.href = '#';
      contentCol.append(button);
    }
  }

  /* ========= Assemble ========= */
  inner.append(imageCol, contentCol);

  block.innerHTML = '';
  block.append(inner);

  wrapper.append(block);
  section.append(wrapper);
}
