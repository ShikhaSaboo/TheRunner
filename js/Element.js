function Element() {
  var gameUI =  GameUI.getInstance();

  var element = new Image();
  element.src = 'images/ground-spritesheet.png';

  this.type;
  this.sX;
  this.sY = 0;
  this.x;
  this.y;
  this.width = 70;
  this.height = 70;
  this.inPlatform = false;
  var i=0;
  var that = this;

  this.platform1 = function() {
    that.width = 70;
    that.sY = 0;
    that.type = 1;
    that.sX =0;
  }

  this.platform2 = function() {
    that.type = 2;
    that.sX =that.width*1;
    that.sY = 0;
  }

  this.platform3 = function() {
    that.type = 3;
    that.sX =that.width*2;
    that.sY = 0;
  }

  this.platform4 = function() {
    that.type = 4;
    that.sX =that.width*4;
    that.sY = 0;
  }

  this.platform6= function() {
    that.type = 6;
    that.sX = that.width*6;
    that.sY = 0;
  }

  this.obstacleLeft = function() {
    
    that.type = 9;
    that.sY=121;
    that.sX= 64;
  } 

  this.obstacleMiddle = function() {
    that.type = 10;
    that.sY=121;
    that.sX= 64+that.width;
  }
  this.obstacleRight = function() {
    that.type = 11;
    that.sY=121;
    that.sX= 64+that.width*2;
  }
  this.draw = function() {

    gameUI.draw(element, that.sX, that.sY, that.width, that.height, that.x, that.y, that.width, that.height);
  }
}