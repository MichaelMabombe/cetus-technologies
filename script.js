"use strict";

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const revealElements = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && !reducedMotion.matches) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove("is-pending");
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08 },
  );
  revealElements.forEach((element) => {
    element.classList.add("is-pending");
    observer.observe(element);
  });
}

document.querySelectorAll("[data-current-year]").forEach((element) => {
  element.textContent = new Date().getFullYear();
});

const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#main-nav");
if (menuToggle && navigation) {
  const closeMenu = () => {
    navigation.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menu");
  };
  menuToggle.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Fechar menu" : "Abrir menu",
    );
  });
  navigation.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeMenu();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && navigation.classList.contains("is-open")) {
      closeMenu();
      menuToggle.focus();
    }
  });
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".site-header")) closeMenu();
  });
  window.matchMedia("(min-width: 761px)").addEventListener("change", closeMenu);
}

const motionToggle = document.querySelector(".motion-toggle");
if (motionToggle) {
  let manuallyPaused = false;
  const updateMotion = () => {
    const paused = manuallyPaused || reducedMotion.matches;
    document.body.classList.toggle("motion-paused", paused);
    motionToggle.setAttribute("aria-pressed", String(paused));
    motionToggle.textContent = reducedMotion.matches
      ? "Movimento reduzido ativo"
      : paused
        ? "Retomar animação ▷"
        : "Pausar animação Ⅱ";
    motionToggle.disabled = reducedMotion.matches;
  };
  motionToggle.addEventListener("click", () => {
    manuallyPaused = !manuallyPaused;
    updateMotion();
  });
  reducedMotion.addEventListener("change", updateMotion);
  updateMotion();
}

const contactForm = document.querySelector("#contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;
    const data = new FormData(contactForm);
    const message = [
      "Olá, Cetus! Gostaria de conversar sobre um projeto.",
      `Nome: ${String(data.get("nome") || "").trim()}`,
      `Email: ${String(data.get("email") || "").trim()}`,
      data.get("empresa")
        ? `Empresa: ${String(data.get("empresa")).trim()}`
        : "",
      "",
      String(data.get("mensagem") || "").trim(),
    ]
      .filter((line) => line !== "")
      .join("\n");
    const url = `https://wa.me/258846293055?text=${encodeURIComponent(message)}`;
    const status = document.querySelector("#contact-status");
    if (status) {
      status.textContent =
        "Continue no WhatsApp para rever e enviar a mensagem. ";
      const link = document.createElement("a");
      link.href = url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = "Abrir WhatsApp ↗";
      status.append(link);
    }
    window.open(url, "_blank", "noopener,noreferrer");
  });
}

// Limit scroll-driven motion to one frame at a time, while the hero is visible.
const whaleScene = document.querySelector(".whale-scene");
if (whaleScene) {
  let driftFrame = null;
  const updateWhaleDrift = () => {
    driftFrame = null;
    if (
      reducedMotion.matches ||
      document.body.classList.contains("motion-paused")
    ) {
      whaleScene.style.setProperty("--whale-drift", "0px");
      return;
    }
    const bounds = whaleScene.getBoundingClientRect();
    if (bounds.bottom <= 0 || bounds.top >= window.innerHeight) return;
    const drift = Math.min(
      18,
      Math.max(-18, (window.innerHeight * 0.35 - bounds.top) * 0.045),
    );
    whaleScene.style.setProperty("--whale-drift", `${drift.toFixed(2)}px`);
  };
  const scheduleWhaleDrift = () => {
    if (driftFrame === null)
      driftFrame = window.requestAnimationFrame(updateWhaleDrift);
  };
  window.addEventListener("scroll", scheduleWhaleDrift, { passive: true });
  window.addEventListener("resize", scheduleWhaleDrift, { passive: true });
  reducedMotion.addEventListener("change", scheduleWhaleDrift);
  motionToggle?.addEventListener("click", scheduleWhaleDrift);
  scheduleWhaleDrift();
}
