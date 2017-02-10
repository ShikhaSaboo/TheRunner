function rollingEnemy() {
  var gameUI = GameUI.getInstance();
  var element = new Image();;
  element.src = "images/ground-spritesheet.png";
  var temp = 0;
  this.x;
  this.y;
  this.velX = 0.5;
  this.velY = 0;
  this.grounded = false;
  this.type;
  this.state;
  this.sX;
  this.sY = 81;
  this.width = 39;
  this.height = 40;

  this.frame = 0;

  var that = this;

  this.rollingSpine = function() {
    this.type = 7;
    that.sX = 1;
  }

  this.draw = function() {
    
    gameUI.draw(element, that.sX, that.sY, that.width, that.height, that.x, that.y, that.width, that.height);
  }

  this.update = function() {
    var gravity = 2;
    

      if (that.grounded) {
        that.velY = 0;
      }
     
      if(temp<3)
      {
        that.sX=that.width*temp+temp;
        that.x -=that.velX; 
        temp++;
      }
      else{
        temp=0;
      }  

      if(that.y<390)
      {
        that.velY+=gravity;
        that.y+=gravity;
        // that.x -=that.velX;
       // that.y = that.y;
      }else if(that.y== 390)
      {
        that.y = that.y;  
      } 
    }
  }

