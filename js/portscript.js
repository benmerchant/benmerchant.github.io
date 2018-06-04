if(document.documentElement.clientWidth>1024) {
  function slideIn(){}
  function slideOut(){}
  // nav active class manip
  const navBar = document.getElementById('nav-list');
  const listItems = navBar.getElementsByClassName('list-items');
  const logoArea = document.getElementById('header');

  for(let ii=0; ii<listItems.length; ii++){
    listItems[ii].addEventListener('click', function() {
      const currentItem = document.getElementsByClassName('active-nav');
      currentItem[0].className = currentItem[0].className.replace(' active-nav', '');
      this.className += ' active-nav';
    });
  }
  // change active nav on scroll


  // nav bar sticky
  const navTopOffset = navBar.offsetTop;

  function stickyNav() {
    // console.log('scrollY ' + window.scrollY);
    // console.log('offset ' + navTopOffset);
    if(window.scrollY >= navTopOffset){
      document.body.classList.add('fixed-nav');
      logoArea.classList.add('shrinkLogoArea');
      // navBar.classList.add('fixed-nav');
    } else {
      document.body.classList.remove('fixed-nav');
      logoArea.classList.remove('shrinkLogoArea');
      // navBar.classList.remove('fixed-nav');
    }
  }

  window.addEventListener('scroll', stickyNav);
}
