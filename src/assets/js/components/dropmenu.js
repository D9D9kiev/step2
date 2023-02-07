const hamburger = document.querySelector('.hamburger');
const hamburgerNav = document.querySelector('.hamburger-nav');
const hamburgerItems = document.querySelector ('.hamburger-nav__nav-items')
const wrapper = document.querySelector('.wrapper');


const toggleMenu = () => {
  hamburgerNav.classList.toggle('active');
  hamburger.classList.toggle('open');
}

hamburger.addEventListener('click', e => {
  e.stopPropagation();

  toggleMenu();
});

document.addEventListener('click', e => {
  const target = e.target;
  const its_menu = target == hamburgerNav || hamburgerNav.contains(target);
  const its_hamburger = target == hamburger;
  const menu_is_active = hamburgerNav.classList.contains('active');
  
  if (!its_menu && !its_hamburger && menu_is_active) {
    toggleMenu();
  }
})