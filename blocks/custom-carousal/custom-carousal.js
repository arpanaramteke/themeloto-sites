import { loadCSS, loadScript } from '../../scripts/aem.js';

export default async function decorate(block) {
  await loadCSS('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css');
  await loadScript('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js');

  const swiper = document.createElement('div');
  swiper.className = 'swiper gradi-carousel';

  const wrapper = document.createElement('div');
  wrapper.className = 'swiper-wrapper';

  [...block.children].forEach((row) => {
    const [imageCol, textCol] = row.children;
    if (!imageCol || !textCol) return;

    const slide = document.createElement('div');
    slide.className = 'swiper-slide';

    const card = document.createElement('div');
    card.className = 'gradi-card';

    
    const img = document.createElement('div');
    img.className = 'gradi-image';
    img.append(...imageCol.children);


    const overlay = document.createElement('div');
    overlay.className = 'gradi-overlay';

    const title = textCol.querySelector('h2');
    const desc = textCol.querySelector('p');

    if (title) overlay.append(title.cloneNode(true));
    if (desc) overlay.append(desc.cloneNode(true));

    const plus = document.createElement('span');
    plus.className = 'gradi-plus';
    plus.textContent = '+';

    card.append(img, overlay, plus);
    slide.append(card);
    wrapper.append(slide);
  });

  swiper.append(
    wrapper,
    document.createElement('div'),
    document.createElement('div')
  );

  swiper.children[1].className = 'swiper-button-prev';
  swiper.children[2].className = 'swiper-button-next';

  block.innerHTML = '';
  block.append(swiper);

  // eslint-disable-next-line no-new
  new window.Swiper('.gradi-carousel', {
    slidesPerView: 3.4,
    spaceBetween: 30,
    loop: true,
    speed: 900,
    centeredSlides: false,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      0: { slidesPerView: 1.2 },
      768: { slidesPerView: 2.5 },
      1200: { slidesPerView: 3.4 },
    },
  });
}
