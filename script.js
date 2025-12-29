const containers = document.querySelectorAll('.imgCont');

const ease = 0.12;
const parallaxSpeed = 0.3;

containers.forEach(container => {
    const cursor = container.querySelector('.cursor');
    const parallaxWrap = container.querySelector('.parallax-img');

    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    let isInside = false;

    container.addEventListener('mousemove', (e) => {
        const rect = container.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
    });

    container.addEventListener('mouseenter', () => {
        isInside = true;
    });

    container.addEventListener('mouseleave', () => {
        isInside = false;
        cursor.style.transform = `
      translate3d(${currentX}px, ${currentY}px, 0)
      scale(0)
    `;
    });

    function animate() {
        /* ---------- Cursor ---------- */
        if (isInside) {
            currentX += (mouseX - currentX) * ease;
            currentY += (mouseY - currentY) * ease;

            cursor.style.transform = `
        translate3d(${currentX}px, ${currentY}px, 0)
        scale(1)
      `;
        }

        /* ---------- Parallax (NO SCALE HERE) ---------- */
        if (parallaxWrap) {
            const rect = container.getBoundingClientRect();
            const center = rect.top + rect.height / 2;
            const viewportCenter = window.innerHeight / 2;

            const distance = center - viewportCenter;
            const translateY = -distance * parallaxSpeed;

            parallaxWrap.style.transform = `translate3d(0, ${translateY}px, 0)`;
        }

        requestAnimationFrame(animate);
    }

    animate();
});


document.querySelectorAll(".contact").forEach(e => {
    e.addEventListener("click", () => {
        document.getElementById("footer").scrollIntoView({
            behavior: "smooth"
        });
    });
})
