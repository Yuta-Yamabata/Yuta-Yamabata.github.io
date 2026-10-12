// Keep the comparison clips unloaded until the visitor selects one.
document.documentElement.classList.add('video-enhanced');

document.querySelectorAll('.video-start').forEach((button) => {
  button.addEventListener('click', () => {
    const shell = button.closest('.video-shell');
    const video = shell.querySelector('video');

    shell.classList.add('is-playing');
    video.play().catch(() => {
      // Native controls remain available if playback needs another interaction.
    });
  });
});
