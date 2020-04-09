// const enemyFactory = (type, attributes, ...children) => {
//   const el = document.createElement(type)
//
//   for (key in attributes) {
//     el.setAttribute(key, attributes[key])
//   }
//
//   children.forEach(child => {
//     if (typeof child === 'string') {
//       el.appendChild(document.createTextNode(child))
//     } else {
//       el.appendChild(child)
//     }
//   })
//
//   return el
// }
// var i;
// for (i = 0; i < 5; i++){
//   const markup = elFactory(
//     'div',
//     { class: 'dengue', id: 'dengue'+i },
//     elFactory('img', {src: 'dengue.png', ondragstart:'return false'}, '')
//     )
//
//     document.body.appendChild(markup)
// }

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
  jQuery(this).animate({"top": y + "px",
                        "left": x + "px",
                        "scale": "5"}, 7000,function(){});
  return this;
}

jQuery(document).ready(function(){
  var score = 0;

  function gameover(){
    //jQuery('.dengue').find('.dengueimg').attr("src","dengueatackdir.png");
    jQuery('.dengue').stop().center();
    jQuery('#finalscore').html(score);
    jQuery('.gameover').css('display','block');
  }

  function start(){
    score = 0;
    jQuery('.score').html('<span>Score: '+ score +'</span>');
    jQuery('.dengue').removeAttr('style');
    jQuery('.dengue').animate({'top':'0%'}, 5000, function(){
      gameover();
      jQuery('#tryagain').click(function(){
        jQuery('.gameover').css('display','none');
        start();
      });
    });
  }

  jQuery('.dengue').click(function(){
    jQuery(this).find('.dengueimg').attr("src","images/denguemorta.png");
    //porcent = parseInt((jQuery(this).innerHeight() - jQuery(this).position().top) / 100);
    porcent = 10;
    jQuery(this).stop().animate({'top':'100%'},300, function(){
      score = score + porcent;
      jQuery('.score').html('<span>Score: '+ score +'</span>');
      jQuery(this).find('.dengueimg').attr("src","images/dengue.png");
      jQuery(this).animate({'top':'0%'}, Math.floor((Math.random() * 5000) + 3000), function(){
        gameover();
        jQuery('#tryagain').click(function(){
          jQuery('.gameover').css('display','none');
          start();
        });
      });

    });

  });
  start();
});
