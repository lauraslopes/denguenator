jQuery.fn.center = function () {
  /*var id = jQuery(this).attr('id');
  var coord = document.getElementById(id).getBoundingClientRect();
  console.log(coord);
  if ((coord.right - (coord.width/2)) <= ($(window).width() - $(this).outerWidth()) / 2){
    $('#'+id).find('.dengueimg').attr("src","dengueatackesq.png");
  } else {
    $('#'+id).find('.dengueimg').attr("src","dengueatackdir.png");
  }*/
  var x = Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) + $(window).scrollLeft());
  var y = Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) + $(window).scrollTop());
  $(this).animate({
    "top": y + "px",
    "left": x + "px",
    "scale": "5"},
    10000,
    function(){
      $(this).children().bind('click', function(){ return false; });
    }
  );
}

jQuery(document).ready(function(){
  var score = 0;

  function gameover(){
    $('#finalscore').html(score);
    $('.gameover').css('display','block');
    $('.dengue').css('pointer-events', 'none');
    $('.dengue').stop().center();
  }

  function start(){
    score = 0;
    $('.score').html('<span>Score: '+ score +'</span>');
    $('.dengue').removeAttr('style');
    $('.dengue').css('pointer-events', 'auto');
    $('.dengue').animate({'top':'0%'}, 5000, function(){
      gameover();
      $('#tryagain').click(function(){
        $('.gameover').css('display','none');
        $('.dengue').stop().removeAttr('style');
        start();
      });
    });

    $('.dengue').click(function(){
      $(this).find('.dengueimg').attr("src","images/denguemorta.png");
      //porcent = parseInt((jQuery(this).innerHeight() - jQuery(this).position().top) / 100);
      porcent = 10;
      $(this).stop().animate({'top':'100%'},300, function(){
        score = score + porcent;
        $('.score').html('<span>Score: '+ score +'</span>');
        $(this).find('.dengueimg').attr("src","images/dengue.png");
        $(this).animate({'top':'0%'}, Math.floor((Math.random() * 5000) + 3000), function(){
          gameover();
          $('#tryagain').click(function(){
            $('.gameover').css('display','none');
            $('.dengue').stop().removeAttr('style');
            start();
          });
        });
      });
    });
  }

  start();
});
