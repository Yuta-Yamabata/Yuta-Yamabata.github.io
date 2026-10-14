// Keep the comparison clips unloaded until the visitor selects one.
document.documentElement.classList.add('video-enhanced');

document.querySelectorAll('.video-start').forEach((button) => {
  const shell = button.closest('.video-shell');
  const video = shell.querySelector('video');
  video.controls = false;

  button.addEventListener('click', () => {
    video.controls = true;
    shell.classList.add('is-playing');
    video.play().catch(() => {
      // Native controls remain available if playback needs another interaction.
    });
  });
});

// Loop the hero clips only while they are visible and motion is allowed.
const heroVideos = [...document.querySelectorAll('.hero-motion video')];
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const visibleHeroVideos = new Set();

function updateHeroPlayback() {
  heroVideos.forEach((video) => {
    if (visibleHeroVideos.has(video) && !document.hidden && !reducedMotion.matches) {
      video.play().catch(() => {
        // The poster remains visible when the browser blocks autoplay.
      });
    } else {
      video.pause();
    }
  });
}

heroVideos.forEach((video) => video.pause());

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        visibleHeroVideos.add(entry.target);
      } else {
        visibleHeroVideos.delete(entry.target);
      }
    });
    updateHeroPlayback();
  }, { threshold: 0.1 });

  heroVideos.forEach((video) => observer.observe(video));
} else {
  heroVideos.forEach((video) => visibleHeroVideos.add(video));
  updateHeroPlayback();
}

document.addEventListener('visibilitychange', updateHeroPlayback);
reducedMotion.addEventListener?.('change', updateHeroPlayback);
