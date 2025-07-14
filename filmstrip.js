document.addEventListener('DOMContentLoaded', function() {
    const filmTrack = document.querySelector('.film-track');
    let isDragging = false;
    let startX, scrollLeft;
    let autoScrollInterval;

    function startAutoScroll() {
        autoScrollInterval = setInterval(() => {
            if (!isDragging && filmTrack) {
                filmTrack.scrollLeft += 1;
            }
        }, 16); // ~60fps
    }

    function stopAutoScroll() {
        clearInterval(autoScrollInterval);
    }

    if (filmTrack) {
        startAutoScroll();

        filmTrack.addEventListener('mousedown', (e) => {
            isDragging = true;
            stopAutoScroll();
            startX = e.pageX - filmTrack.offsetLeft;
            scrollLeft = filmTrack.scrollLeft;
            filmTrack.classList.add('grabbing');
        });

        filmTrack.addEventListener('mouseleave', () => {
            isDragging = false;
            filmTrack.classList.remove('grabbing');
            startAutoScroll();
        });

        filmTrack.addEventListener('mouseup', () => {
            isDragging = false;
            filmTrack.classList.remove('grabbing');
            startAutoScroll();
        });

        filmTrack.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
            const x = e.pageX - filmTrack.offsetLeft;
            const walk = (x - startX) * 2; // scroll-fast
            filmTrack.scrollLeft = scrollLeft - walk;
        });
    }
});
