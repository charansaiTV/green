document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("main section[id]");
    const links = document.querySelectorAll("header nav a[href^='#']");

    const setActiveLink = (sectionId) => {
        links.forEach((link) => {
            const isActive = link.getAttribute("href") === `#${sectionId}`;
            if (isActive) {
                link.setAttribute("aria-current", "location");
            } else {
                link.removeAttribute("aria-current");
            }
        });
    };

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries) => {
            const visibleSections = entries
                .filter((entry) => entry.isIntersecting)
                .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

            if (visibleSections.length) {
                setActiveLink(visibleSections[0].target.id);
            }
        }, { rootMargin: "-15% 0px -65% 0px", threshold: [0, 0.25, 0.5] });

        sections.forEach((section) => observer.observe(section));
    }
});
