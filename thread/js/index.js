$(function(){

  var dots = new Dots();
  dots.init();

  $('#dots-number-plus').click(function(){ dots.addLine(); });
  $('#dots-number-minus').click(function(){ dots.removeLine(); });

});

var Dots = function () {

  this.angle = 0;
  this.delay = 0;
  this.nbDots = 2;
  this.duration = 3;
  this.$container = $('#dots');

}

Dots.prototype = {

  init: function(){

    for(i=0; i< this.nbDots; i++){

      var $line = this.createLine();
      var $dot = this.createDot();

      $line.append($dot);
      $line
        .hide()
        .appendTo(this.$container)
        .fadeIn(200)
        .css({'transform': 'rotate('+this.angle+'deg)'});

      this.delay -= this.duration/(this.nbDots*2);
      this.angle += 180/this.nbDots;
    }

  },

  createLine: function(){
    return $('<div/>',{ class:'line' });
  },

  createDot: function(){

    return $('<div/>',{
      class:'dot'
    }).css({
      'animation-delay': this.delay+'s',
      'animation-duration': this.duration+'s'
    });

  },

  addLine: function(){

    this.nbDots += 1;
    this.createLine().appendTo(this.$container);
    this.update();
    
  },

  removeLine: function(){
    if(this.nbDots > 1){
      this.nbDots -= 1;
      $('.line:last').remove();
      this.update();
    }
  },

  update: function(){

    this.angle = 0;
    this.delay = 0;

    var that = this;

    $('.line').map(function(){

      $(this).find('.dot').hide().remove();
      $(this).css({'transform': 'rotate('+that.angle+'deg)'});
      $(this).append(that.createDot());

      that.delay -= that.duration/(that.nbDots*2);
      that.angle += 180/that.nbDots;

    });

  }

};