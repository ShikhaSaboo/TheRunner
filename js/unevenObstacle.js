function unevenObstacle() {
  var gameUI =  GameUI.getInstance();

  var element = new Image();
  element.src = 'images/ground-spritesheet.png';

  this.type;
  this.sX;
  this.sY = 121;
  this.x;
  this.y;
  this.width = 70;
  this.height = 105;
  this.inPlatform = false;
  var i=0;
  var that = this;

  this.rockyObstacleLeft = function() {
    that.type = 12;
    that.sX=281;
  }

  this.rockyObstacleMiddle = function() {
    that.type = 13;
    that.sX=281+that.width*1;
  }

  this.rockyObstacleRight= function() {
    that.type = 14;
    that.sX =281+that.width*2;
  
  }

  
  this.draw = function() {

    gameUI.draw(element, that.sX, that.sY, that.width, that.height, that.x, that.y, that.width, that.height);
  }
}