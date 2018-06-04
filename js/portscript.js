if(document.documentElement.clientWidth<1025){
  function slideIn(){
    document.getElementById('nav-list').style.width = '300px';
    document.getElementById('main-arena').style.marginRight = '300px';
    document.getElementById('main-arena').style.marginLeft = '-300px';
    document.getElementById('hiCopy').className = 'hideThis';
    document.getElementById('hiSolo').className = '';
  }
  function slideOut(){
    document.getElementById('nav-list').style.width = '0';
    document.getElementById('main-arena').style.marginRight = '0';
    document.getElementById('main-arena').style.marginLeft = '0';
    document.getElementById('hiCopy').className = '';
    document.getElementById('hiSolo').className = 'hideThis';
  }
} else {
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
