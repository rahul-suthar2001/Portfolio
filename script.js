// Smooth scrolling for nav links & Active link highlighting
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      window.scrollTo({
        top: target.offsetTop - 20,
        behavior: 'smooth'
      });
    }
  });
});

// Section fade-in on scroll
const fadeEls = document.querySelectorAll('.fade-in');

const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.18 });

fadeEls.forEach(el => {
  appearOnScroll.observe(el);
});

// Highlight nav link for currently-visible section
const navLinks = document.querySelectorAll('nav a');
const sections = Array.from(document.querySelectorAll('main section'));

function highlightNav() {
  let scrollPos = window.scrollY + 120; // adjust offset for header
  let current = sections[0].id;
  for (const section of sections) {
    if (scrollPos >= section.offsetTop) current = section.id;
  }
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
}
window.addEventListener('scroll', highlightNav);
window.addEventListener('resize', highlightNav);
window.addEventListener('DOMContentLoaded', highlightNav);
