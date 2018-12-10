$(document).ready(function(){
  let $bs_floater = $('div.bootstrap-floater');
  let $floatsam = $('div#floating-content');
  let $h1_floater = $('h1.x-plus');

  $h1_floater.on('click', function(){
    // show/hide the content area of floater
    $floatsam.toggleClass('wh-0');
    // toggle the roundness of the floater itself
    $bs_floater.toggleClass('rounded-circle w-50');

    if($(this).hasClass('x-is-plus')){
      // move the x/plus to the right of the div
      $h1_floater.removeClass('float-right ml-4')
    } else {
      // move the x/plus to the right of the div
      $h1_floater.addClass('float-right ml-4')
    }

    // toggleClass after if statement
    $(this).toggleClass('x-is-plus');
  })

})
