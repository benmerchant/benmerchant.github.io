$(document).ready(function(){
  $('a.list-items, a.topUp').on('click', function(e){
    if(this.hash !== ""){
      e.preventDefault();
      var hash = this.hash;
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 750, function(){
        window.location.hash = hash;
      });
    }
  });
});
