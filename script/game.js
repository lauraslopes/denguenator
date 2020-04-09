jQuery(document).ready(function(){
  var score = 0;

  function center(){
    var x = Math.max(0, (($(window).width() - $('.dengue').outerWidth()) / 2) + $(window).scrollLeft());
    var y = Math.max(0, (($(window).height() - $('.dengue').outerHeight()) / 2) + $(window).scrollTop());
    $('.dengue').css("scale", "1");
    $('.dengue').animate({
      "top": y + "px",
      "left": x + "px",
      "scale": "5"},
      10000,
      function(){}
    );
  }

  function gameover(){
    $('#finalscore').html(score);
    $('.gameover').css('display','block');
    $('.dengue').stop().css('pointer-events', 'none');
    center();
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
