export default function decorate(block) {
  const rows = [...block.children];
  if (rows.length < 3) return;

  const getCellText = (row) => row.children[1].textContent.trim();

  const header = document.createElement('header');
  header.className = 'hero-header-inner';

  /* LOGO */
  const logo = document.createElement('div');
  logo.className = 'hero-header-logo';
  logo.append(...rows[0].children[1].children);

  /* NAVIGATION */
  const nav = document.createElement('nav');
  nav.className = 'hero-header-nav';

  const navText = getCellText(rows[1]);

  navText.split(';').forEach((item) => {
    const trimmed = item.trim();
    if (!trimmed) return;

    // Dropdown item
    if (trimmed.includes('|')) {
      const [label, children] = trimmed.split('|');

      const wrapper = document.createElement('div');
      wrapper.className = 'nav-item has-dropdown';

      const link = document.createElement('a');
      link.textContent = label.trim();
      link.href = '#';

      const dropdown = document.createElement('div');
      dropdown.className = 'nav-dropdown';

      children.split(',').forEach((child) => {
        const a = document.createElement('a');
        a.textContent = child.trim();
        a.href = '#';
        dropdown.append(a);
      });

      wrapper.append(link, dropdown);
      nav.append(wrapper);
    } else {
      // Normal item
      const a = document.createElement('a');
      a.textContent = trimmed;
      a.href = '#';
      nav.append(a);
    }
  });

  /* CTA */
  const cta = document.createElement('div');
  cta.className = 'hero-header-cta';

  const btn = document.createElement('a');
  btn.textContent = getCellText(rows[2]);
  btn.href = '#';

  cta.append(btn);

  header.append(logo, nav, cta);
  block.replaceChildren(header);
}