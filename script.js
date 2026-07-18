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

  // Fetch stats.json and update Codeforces status
  fetch('stats.json')
    .then(response => response.json())
    .then(data => {
      if (data && data.codeforces && data.codeforces.rank) {
        const cfStatus = document.querySelector('.cf-status');
        if (cfStatus) {
          const rank = data.codeforces.rank;
          const capitalizedRank = rank.charAt(0).toUpperCase() + rank.slice(1);
          cfStatus.textContent = capitalizedRank;
        }
      }
    })
    .catch(err => console.error("Error fetching stats:", err));
});
