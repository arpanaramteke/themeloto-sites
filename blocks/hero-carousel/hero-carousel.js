import { loadCSS, loadScript } from '../../scripts/aem.js';

export default async function decorate(block) {
  /* Load Swiper only for this block */
  await loadCSS('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css');
  await loadScript('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js');

  /* Swiper container */
  const swiperEl = document.createElement('div');
  swiperEl.className = 'swiper hero-carousel-swiper';

  const swiperWrapper = document.createElement('div');
  swiperWrapper.className = 'swiper-wrapper';

  /* Convert each authored row into a slide */
  [...block.children].forEach((row) => {
    const [imageCol, textCol] = row.children;
    if (!imageCol || !textCol) return;

    const slide = document.createElement('div');
    slide.className = 'swiper-slide';

    const heroSlide = document.createElement('div');
    heroSlide.className = 'hero-slide';

    const media = document.createElement('div');
    media.className = 'hero-media';
    media.append(...imageCol.children);

    const text = document.createElement('div');
    text.className = 'hero-text-wrapper';
    text.append(...textCol.children);

    heroSlide.append(media, text);
    slide.append(heroSlide);
    swiperWrapper.append(slide);
  });

  swiperEl.append(
    swiperWrapper,
    createDiv('swiper-pagination'),
    createDiv('swiper-button-prev'),
    createDiv('swiper-button-next')
  );

  block.innerHTML = '';
  block.append(swiperEl);

  /* Init Swiper */
  // eslint-disable-next-line no-new
  new window.Swiper(swiperEl, {
    loop: true,
    speed: 800,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    a11y: {
      enabled: true,
    },
  });
}

function createDiv(className) {
  const div = document.createElement('div');
  div.className = className;
  return div;
}
