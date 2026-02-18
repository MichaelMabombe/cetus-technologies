document.querySelectorAll(".reveal").forEach((el) => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  observer.observe(el);
});

const yearNode = document.querySelector("[data-current-year]");
if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}

const contactForm = document.querySelector("#contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    alert("Obrigado pelo contato. Retornaremos em breve.");
    contactForm.reset();
  });
}
