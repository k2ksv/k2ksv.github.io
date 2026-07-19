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

  // Fetch Codeforces status from official API
  fetch('https://codeforces.com/api/user.info?handles=k2ksv')
    .then(response => response.json())
    .then(data => {
      if (data && data.status === "OK" && data.result && data.result.length > 0 && data.result[0].rank) {
        const cfStatus = document.querySelector('.cf-status');
        if (cfStatus) {
          const rank = data.result[0].rank;
          const capitalizedRank = rank.charAt(0).toUpperCase() + rank.slice(1);
          cfStatus.textContent = capitalizedRank;
        }
      }
    })
    .catch(err => console.error("Error fetching Codeforces stats:", err));
});
