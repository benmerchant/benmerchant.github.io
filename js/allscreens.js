if(document.documentElement.clientWidth>+824) {
  // function slideIn(){}
  // function slideOut(){}
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

}
var slideItIn = function() {
  document.getElementById('nav-list').style.width = '300px';
  document.getElementById('main-arena').style.marginRight = '300px';
  document.getElementById('main-arena').style.marginLeft = '-300px';
  document.getElementById('hiCopy').className = 'hideThis';
  document.getElementById('hiSolo').className = '';
}
var slideItOut = function(){
  // live this width blank. 0 'removes' list on resize
  document.getElementById('nav-list').style.width = '';
  document.getElementById('main-arena').style.marginRight = '0';
  document.getElementById('main-arena').style.marginLeft = '0';
  document.getElementById('hiCopy').className = '';
  document.getElementById('hiSolo').className = 'hideThis';
}
// elemtents that need slideItOut
var theClosers = document.getElementsByClassName('closers');
// function for sliding in and out for small screens
var slidersFunction = function(){
  // slide in menu for the hamburger
  document.getElementById('burgerWrapper').addEventListener('click', slideItIn, false);
  for(let ii=0;ii<theClosers.length;ii++){
    theClosers[ii].addEventListener('click', slideItOut, false);
  }
}

var mql_iphone = window.matchMedia("screen and (min-width: 375px) and (max-width: 823px)");
var mql_ipad = window.matchMedia("screen and (min-width: 824px) and (max-width: 1199px)");
var mql_laptop = window.matchMedia("screen and (min-width: 1200px)");
var mql_portrait = window.matchMedia("screen and (max-aspect-ratio: 13/9)");

// if initial state is mobile we need the slideIn/slideOut functions
if(mql_iphone.matches){
  console.log('initial: iPhone');
  slidersFunction();

  // if user flips mobile device, slideOut the menu
  mql_portrait.onchange = function(e){slideItOut();}
  // if a laptop browswer is resized
  mql_iphone.onchange = function(e){
    if(!mql_iphone.matches){
      document.getElementById('nav-list').style.width = '';
      document.getElementById('main-arena').style.marginRight = '0';
      document.getElementById('main-arena').style.marginLeft = '0';
      document.getElementById('hiCopy').className = '';
      document.getElementById('hiSolo').className = 'hideThis';
      slideOut();
      console.log('resize to: iPad or laptop');
      // "empty" our slider functions
      function slideIn(){}; function slideOut(){};
      // if larger than iphone, we want stickyNav
      // nav bar sticky
      const navBar = document.getElementById('nav-list');
      const navTopOffset = navBar.offsetTop;
      const logoArea = document.getElementById('header');

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
  }
} else {
  console.log('initial: iPod or laptop');
  // "empty" our slider functions
  function slideIn(){}; function slideOut(){};
  // if larger than iphone, we want stickyNav
  // nav bar sticky
  const navBar = document.getElementById('nav-list');
  const navTopOffset = navBar.offsetTop;
  const logoArea = document.getElementById('header');

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
  // if large browser resized to small
  mql_ipad.onchange = function(e){
    if(mql_iphone.matches){
      console.log('resize to: iPhone');
      slidersFunction();
      // if user flips mobile device, slideOut the menu
      mql_portrait.onchange = function(e){
        slideItOut();
      }
    }
  }
}
