/* PacePilot site — shared behaviour */
(function () {
  "use strict";

  /* Sticky nav shadow */
  const nav = document.querySelector(".nav");
  if (nav) {
    const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* Mobile nav toggle */
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    links.addEventListener("click", (e) => {
      if (e.target.tagName === "A") links.classList.remove("open");
    });
  }

  /* Reveal on scroll */
  const revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("in"));
  }

  /* Screenshot carousel arrows */
  const carousel = document.querySelector(".carousel");
  if (carousel) {
    const step = () => {
      const card = carousel.querySelector(".shot");
      if (!card) return 300;
      const gap = parseFloat(getComputedStyle(carousel).gap) || 22;
      return card.getBoundingClientRect().width + gap;
    };
    const prev = document.querySelector(".car-btn.prev");
    const next = document.querySelector(".car-btn.next");
    if (prev) prev.addEventListener("click", () => carousel.scrollBy({ left: -step(), behavior: "smooth" }));
    if (next) next.addEventListener("click", () => carousel.scrollBy({ left: step(), behavior: "smooth" }));
  }

  /* Changelog search */
  const search = document.querySelector(".log-search");
  if (search) {
    const releases = Array.from(document.querySelectorAll(".release"));
    const empty = document.querySelector(".no-results");
    search.addEventListener("input", () => {
      const q = search.value.trim().toLowerCase();
      let visible = 0;
      releases.forEach((rel) => {
        const hit = !q || rel.textContent.toLowerCase().includes(q);
        rel.style.display = hit ? "" : "none";
        if (hit) visible++;
      });
      if (empty) empty.style.display = visible === 0 ? "block" : "none";
    });
  }

  /* In-app WebView mode: keep ?inapp=1 on internal page links */
  if (document.documentElement.classList.contains("inapp")) {
    document.querySelectorAll('a[href$=".html"], a[href*=".html#"]').forEach((a) => {
      const [path, hash] = a.getAttribute("href").split("#");
      a.setAttribute("href", path + "?inapp=1" + (hash ? "#" + hash : ""));
    });
  }

  /* Current year */
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
})();
