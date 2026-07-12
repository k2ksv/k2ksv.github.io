// Add scroll reveal animations
document.addEventListener("DOMContentLoaded", () => {
  console.log("Welcome to my portfolio.");
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('section, header, footer').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });
});
