function gameElement() {
  var gameUI =  GameUI.getInstance();

  var gameelement = new Image();;
  gameelement.src = 'images/ground-spritesheet.png';

  this.type;
  this.sX=0;  //sprite x
  this.sY =81; //sprite y
  this.x;
  this.y;
  this.width = 40;
  this.height = 40;
  
  var that = this;

  
  this.coin = function() {
    that.type = 8;
    that.sX=158;
    

  } 

  this.draw = function() {

    gameUI.draw(gameelement, that.sX, that.sY, that.width, that.height, that.x, that.y, that.width, that.height);
  }
}