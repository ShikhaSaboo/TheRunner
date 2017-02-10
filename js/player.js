function Player() {
  
 
  var gameUI = GameUI.getInstance();

  
  this.x=200;
  this.y;
  this.width = 55;
  this.height = 55;
  this.speed = 5;
  this.rolling=false;
  this.sX = 0; // sprite x
  this.sY = 1; // sprite y
  this.frame = 0;
  this.speed = 1;
  this.jumpDy=-8;
  this.velX = 0;
  this.velY = 0;
  this.jumping = false;
  this.grounded = false;
  this.centerPosition =false;
  this.falling = false; 
  var that = this;
  var j=2;
  var count=0;
  var i=0;
  var flag=0;
  var jumpTime = 0;
  var center;
  var difference;
  var jumpCounter=0;
  var isJumping=false;
  var maxJumpHeight =false;
  var rollCounter=0;
  var rollSp=0;
  var count=0;
  
  this.init = function() {
    
    that.y = gameUI.getHeight()-225;
    thatSprite = new Image();
    thatSprite.src = 'images/sonic.png';
   
  }

  this.draw = function() {
    
    gameUI.draw(thatSprite, that.sX, that.sY, that.width, that.height, that.x, that.y, that.width, that.height);
  }

  this.update=function(count) {
    
    var gravity = 0.2;
    if(that.velY >=10 && that.jumping==false) { 
      that.velY=0;
    }

    if(that.jumping==false && that.rolling==false && that.frame==0) {
        that.height=55;
        that.velX=3;
        that.grounded=true;
        
      if(count%3==0){  
          if(i<7) { 
            that.sX=that.width*i+i;
            that.sY=1;
            i++;
            //count=0;
          } else {
            i=0;
          }
      }
    }

    if(that.frame==5 && that.jumping==false) {
      
      that.jumping=true;
      that.grounded=false;
      that.sY=315;
      that.sX =264+that.width*j+j;
      jumpCounter=3;
      isJumping=true;
      that.velY=that.jumpDy-5;
      maxJumpHeight=true;
      that.velX = 2;
      jumpCounter--;
      that.falling=true;
      
    }

    if(that.jumping==true && jumpCounter>1 && isJumping==true) {
      that.sX =264+that.width*j+j;
      that.sY=315;
      that.sX =264+that.width*j+j;
      jumpCounter--;
      gravity=0.8;
      friction=0.6;
      that.velY=that.jumpDy-2;
      that.velX=2;
      j++;
    }

     if (jumpCounter==1 && that.jumping==true) { 
      maxJumpHeight=true;
      that.jump=false;
    }
    
    if(maxJumpHeight==true && jumpCounter==1) {
      that.frame=0;
      that.grounded=true;
      maxJumpHeight=false;
      that.velX=3;
      that.velY+=0.2;
      j=2;
    }
    if(that.frame===2 && that.rolling===false && that.jumping==false) {

       that.rolling = true;
       rollCounter=11;
      that.sY = 84;
      that.sX =101+that.width*rollSp;
      that.velX+=1;
      that.y+=15;
      that.height=32;
     }

    if(count%3==0) {
     if(that.frame===2 && rollCounter>1 ) {
        that.height=32;
        that.sX =101+that.width*rollSp+rollSp;
        rollCounter--;
        that.y+=15;
        rollSp++; 
        that.velX+=0.5;
      }

      } else if (rollCounter==1 && that.rolling==true) {
      
        that.rolling=false;
        that.frame=0;
        rollCounter=0;
        that.height=55;
        that.sY=84;
        that.velX=3;
        rollSp=0;
      }
    
      that.velY += gravity;
      that.x += that.velX;
      that.y += that.velY;
  }  
}   
