const hamburger = document.querySelector('.hamburger');
const hamburgerNav = document.querySelector('.hamburger-nav');
const hamburgerItems = document.querySelector ('.hamburger-nav__nav-items')


hamburger.addEventListener('click', function() {
  hamburger.classList.toggle('open');
  hamburgerNav.classList.toggle('active');

});