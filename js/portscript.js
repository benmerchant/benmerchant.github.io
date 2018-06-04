// nav active class manip
const navBar = document.getElementById('nav-list');
const listItems = navBar.getElementsByClassName('list-items');

for(let ii=0; ii<listItems.length; ii++){
  listItems[ii].addEventListener('click', function() {
    const currentItem = document.getElementsByClassName('active-nav');
    currentItem[0].className = currentItem[0].className.replace(' active-nav', '');
    this.className += ' active-nav';
  });
}

// nav bar sticky
const navTopOffset = navBar.offsetTop;

function stickyNav() {
  console.log('scrollY ' + window.scrollY);
  console.log('offset ' + navTopOffset);
  if(window.scrollY >= navTopOffset){
    document.body.classList.add('fixed-nav');
  } else {
    document.body.classList.remove('fixed-nav');
  }
}

window.addEventListener('scroll', stickyNav);

// class toggler for hamburger icon
function slideIn() {
  if(navBar.className === 'navigation'){
    navBar.className += ' smallScreen';
  } else {
    navBar.className = 'navigation';
  }
}
