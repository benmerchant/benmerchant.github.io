
  function slideIn(){
    document.getElementById('nav-list').style.width = '300px';
    document.getElementById('main-arena').style.marginRight = '300px';
    document.getElementById('main-arena').style.marginLeft = '-300px';
    document.getElementById('hiCopy').className = 'hideThis';
    document.getElementById('hiSolo').className = '';
  }
  function slideOut(){
    // live this width blank. 0 removes list on resize
    document.getElementById('nav-list').style.width = '';
    document.getElementById('main-arena').style.marginRight = '0';
    document.getElementById('main-arena').style.marginLeft = '0';
    document.getElementById('hiCopy').className = '';
    document.getElementById('hiSolo').className = 'hideThis';
  }
