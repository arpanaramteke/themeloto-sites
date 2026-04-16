export default function decorate(block) {
  // Find the first direct child (the "track") and its first element child (the content)
  const track = block.querySelector(':scope > div');
  const content = track?.firstElementChild;

  // Safety checks: need a track and at least one child element, and avoid double-cloning
  if (!track || !content || track.dataset.cloned === 'true') return;

  // Clone the content node for a seamless loop and mark it aria-hidden
  const clone = content.cloneNode(true);
  clone.setAttribute('aria-hidden', 'true');

  track.appendChild(clone);
  track.dataset.cloned = 'true';

  // Add helpful class names for styling/debugging
  track.classList.add('slider-track');
  content.classList.add('slider-content');
  clone.classList.add('slider-content');
}
