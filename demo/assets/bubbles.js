!function($) {
  "use strict";
  var width;
  var height;
  var ctx;

  var Bubbles = function(element) {
    if(!element) return;
    
    this.bubbles = [];
    this.$element = $(element);
    
    ctx = element.getContext('2d');

    this.init();
  }

  // Each Bubble drawer
  var OneBubble = function() {
    var _this = this;
    _this.pos = {};

    function init(first) {
      if(first) {
        _this.pos.y = height + Math.random()*height*0.2;
      } else {
        _this.pos.y = height + 20;
      }
      _this.pos.x = Math.random()*width;
      _this.scale = 0.1+Math.random()*0.7;
      _this.velocity = 0.5*Math.random();
      _this.alpha = 0.1+Math.random()*0.2;
    }

    this.draw = function() {
      if(_this.alpha <= 0) {
          init();
      }
      _this.pos.y -= _this.velocity;
      _this.alpha -= 0.0004;
      ctx.beginPath();
      ctx.arc(_this.pos.x, _this.pos.y, _this.scale*10, 0, 2 * Math.PI, false);
      ctx.fillStyle = 'rgba(107, 85, 67,'+ _this.alpha+')';
      ctx.fill();
    };

    init(true);
  }


  // init
  Bubbles.prototype.init = function() {
    var _this = this;
    
    // update width and height of canvas
    _this.updateSizes();
    $(window).on('resize', function() {
      _this.updateSizes();
    });

    // enable start styles for canvas
    _this.$element.css({
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: -1
    });

    // create particles
    for(var x = 0; x < width * 0.5; x++) {
      var c = new OneBubble();
      _this.bubbles.push(c);
    }
    
    // start animate
    _this.animate();
  }


  // update width and height
  Bubbles.prototype.updateSizes = function() {
    width = window.innerWidth;
    height = window.innerHeight;

    // enable 
    this.$element.attr({
      width: width,
      height: height
    });
  }

  // animate bubbles
  Bubbles.prototype.animate = function() {
    var _this = this;
    ctx.clearRect(0, 0, width, height);
    for(var i in _this.bubbles) {
      _this.bubbles[i].draw();
    }
    requestAnimationFrame(function() {
      _this.animate();
    });
  }

  // init
  new Bubbles( $('#bubble-canvas')[0] );

}(jQuery);