var score = 0;
var sound = true;
var musica, somDengue, somMatadengue, somGameover;

center = function(){
  let x = Math.max(0, (($(window).width() - $('.dengue').outerWidth()) / 2) + $(window).scrollLeft());
  let y = Math.max(0, (($(window).height() - $('.dengue').outerHeight()) / 2) + $(window).scrollTop());
  $('.dengue').css("scale", "1");
  for (var i = 1; i < 4; i++){
    $('#dengue'+i).find('.dengueimg').attr("src","images/dengueatackesq.png");
  }
  for (var i = 4; i < 6; i++){
    $('#dengue'+i).find('.dengueimg').attr("src","images/dengueatackdir.png");
  }
  $('.dengue').animate({
    "top": y + "px",
    "left": x + "px",
    "scale": "5"},
    7000,
    function(){}
  );
}

gameover = function(){
  $('#finalscore').html(score);
  $('.gameover').css('display','block');
  $('.dengue').stop().css('pointer-events', 'none');
  center();
}

reset = function(){
  $('.gameover').css('display','none');
  $('.dengue').stop().removeAttr('style')
              .find('.dengueimg').attr("src","images/dengue.png");
  start();
}

start = function(){
  score = 0;
  $('.score').html('<span>Score: '+ score +'</span>');
  $('.dengue').removeAttr('style');
  $('.dengue').css('pointer-events', 'auto');
  if (sound === true) {
    somDengue.play();
  }
  $('.dengue').animate({'top':'0%'}, 5000, function(){
    gameover();
    $('#tryagain').click(function(){
      reset();
    });
  });

  $('.dengue').click(function(){
    if (sound === true) {
      somMatadengue.play();
    }
    $(this).find('.dengueimg').attr("src","images/denguemorta.png");
    //porcent = parseInt((jQuery(this).innerHeight() - jQuery(this).position().top) / 100);
    porcent = 10;
    $(this).stop().animate({'top':'100%'}, 300, function(){
      score = score + porcent;
      $('.score').html('<span>Score: '+ score +'</span>');
      $(this).find('.dengueimg').attr("src","images/dengue.png");

      if (sound === true) {
        somDengue.play();
      }
      $(this).animate({'top':'0%'}, Math.floor((Math.random() * 5000) + 3000), function(){
        gameover();
        $('#tryagain').click(function(){
          reset();
        });
      });
    });
  });
}

playmusic = function(){
  musica.currentTime = 0;
  musica.play();
}

jQuery(document).ready(function(){

  musica = document.getElementById("musica");
  somDengue = document.getElementById("somDengue");
  somMatadengue = document.getElementById("somMatadengue");
  somGameover = document.getElementById("somGameover");

  musica.addEventListener("ended", playmusic, false);
  musica.play();

  $('#sound').click(function(){
    if (sound === true) {
      $('#sound').css('color','red');
      sound = false;
      musica.pause();
    } else {
      $('#sound').css('color','green');
      sound = true;
      musica.play();
    }
  });

  $('#play').click(function(){
    $('.home').css('display','none');
    $('.game').css('display','block');
    start();
  });
});
