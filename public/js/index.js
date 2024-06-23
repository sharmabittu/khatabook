function toggleMenu() {
    const navLinks = document.querySelector('.nav ul');
    navLinks.classList.toggle('active');
  }

  window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    header.classList.toggle('scrolled', window.scrollY > 0);
  });