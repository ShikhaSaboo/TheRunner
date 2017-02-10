function RunnerGame() {
  var gameUI = GameUI.getInstance();

  var maxWidth; //width of the game world
  var height;
  var viewPort; //width of canvas, viewPort that can be seen
  var tileSize;
  var map;
  var originalMaps;
  var WIDTH = window.innerWidth;
  var HEIGHT = window.innerHeight;
  var translatedDist; //distance translated(side scrolled)
  var centerPos;
  var element;
  var gameSound;
  var roughObstacle;
  var score;
  var temp = 0;
  var keystate = [];
  var player;
  var currentLevel;
  var animationID;
  var timeOutId;
  var count = 0;
  var gameelement;
  var extraJump=false;
  var scrollVariable = -1;
  var boomFlag=false;
  var minDist=null;
  var image = new Image();
  var that = this;
  var imageDx;
  var imageDy;
  var collided =false;
  var difference;
  var musicOff =false;
  var UP_ARROW = 38;
  var SPACEBAR =32;
  var DOWN_ARROW = 40;
  var LETTER_M = 77;
  var SCROLL_WINDOW = -3;
  image.src = 'images/ground-spritesheet.png';
  this.init = function(levelMaps, level) {
    
    height = 490;
    maxWidth = 0;
    viewPort = 980;
    tileSize = 70;
    translatedDist = 0;
    gameUI.setWidth(viewPort);
    gameUI.setHeight(height);
    gameUI.show();
    score = new Score();
    score.init();
    score.displayScore();
    player = new Player();
    player.init();
   
    currentLevel = level;
    originalMaps = levelMaps;
    map = JSON.parse(levelMaps[currentLevel]);
    gameSound = new GameSound();
    gameSound.init();
    element = new Element();
    gameelement = new gameElement();
    roughObstacle = new unevenObstacle();
    that.calculateMaxWidth();
    rollingSpine=[];
    that.startGame();
    gameSound.play('background',0.4);
  }
   
  window.addEventListener("keydown", function(evt) {
     
    evt.preventDefault();
    keystate[evt.keyCode] = true;
  });

  window.addEventListener("keyup", function(evt) {
    
    keystate[evt.keyCode] = false;
  });

  that.calculateMaxWidth = function() {
    //calculates the max width of the game according to map size
    for (var row = 0; row < map.length; row++) {
      for (var column = 0; column < map[row].length; column++) {
        if (maxWidth < (map[row].length * tileSize)) {
            maxWidth = map[column].length * tileSize;
        }
      }
    }
  }

  this.startGame = function() {

    animationID = window.requestAnimationFrame(that.startGame);
    gameUI.clear(0, 0, maxWidth, height);
    count++
    that.renderMap();
    score.displayScore();
    
    for (var i = 0; i < rollingSpine.length; i++) {
        rollingSpine[i].draw();
        rollingSpine[i].update();
    }

    that.checkEnemyPlayerCollision(rollingSpine);
    player.draw();
    that.moveWindow();
    that.updatePlayer();  
  
    if (boomFlag==true) {
      that.afterBoomFlag(imageDx,imageDy);
      boomFlag=false;
    }

    that.checkGameOver();
  }

  this.renderMap = function() {
   
    for (var row = 0; row < map.length; row++) {  
      for (var column = 0; column < map[row].length; column++) {
        switch (map[row][column]) {
          case 1: 
            element.x = column * tileSize;
            element.y = row * tileSize;
            element.platform1();
            element.draw();
            that.checkElementPlayerCollision(element, row, column);
            that.checkElementEnemyCollision(element,rollingSpine);
            break;

          case 2:
            element.x = column * tileSize;
            element.y = row * tileSize;
            element.platform2();
            element.draw();
            that.checkElementPlayerCollision(element, row, column);
            that.checkElementEnemyCollision(element,rollingSpine);
            break;

          case 3:
            element.x = column * tileSize;
            element.y = row * tileSize;
            element.platform3();
            element.draw();
            that.checkElementPlayerCollision(element, row, column);
            that.checkElementEnemyCollision(element,rollingSpine);
            break;

          case 4:
            element.x = column * tileSize;
            element.y = row * tileSize;
            element.platform4();
            element.draw();
            that.checkElementPlayerCollision(element, row, column);
            that.checkElementEnemyCollision(element,rollingSpine);
            break;

          case 6:
            element.x = column * tileSize;
            element.y = row * tileSize;
            element.platform6();
            element.draw();
            that.checkElementPlayerCollision(element, row, column);
            that.checkElementEnemyCollision(element,rollingSpine);
            break;

          case 8:
            gameelement.x = column * 70;
            gameelement.y = row * 75;
            gameelement.coin();
            gameelement.draw();
            that.checkElementPlayerCollision(gameelement,row,column);
            that.checkElementEnemyCollision(element,rollingSpine);
            break;

          case 9:
            element.x = column * tileSize;
            element.y = row * tileSize;
            element.obstacleLeft();
            element.draw();
            that.checkElementPlayerCollision(element, row, column);
            break;

          case 10:
            element.x = column * tileSize;
            element.y = row * tileSize;
            element.obstacleMiddle();
            element.draw();
            that.checkElementPlayerCollision(element, row, column);
            break;  
          
          case 11:
            element.x = column * tileSize;
            element.y = row * tileSize;
            element.obstacleRight();
            element.draw();
            that.checkElementPlayerCollision(element, row, column);
            break;  

          case 12:
            roughObstacle.x = column *tileSize;
            roughObstacle.y = row *tileSize;
            roughObstacle.rockyObstacleLeft();
            roughObstacle.draw();
            that.checkElementPlayerCollision(roughObstacle, row, column);
            break;

          case 13:
            roughObstacle.x = column * tileSize;
            roughObstacle.y = row *tileSize;
            roughObstacle.rockyObstacleMiddle();
            roughObstacle.draw();
            that.checkElementPlayerCollision(roughObstacle, row, column);
            break;    
          
          case 14:
            roughObstacle.x = column * tileSize;
            roughObstacle.y = row *tileSize;
            roughObstacle.rockyObstacleRight();
            roughObstacle.draw();
            that.checkElementPlayerCollision(roughObstacle, row, column);
            break;  

          case 7:
            var rSpine = new rollingEnemy();
            rSpine.x = column*75;
            rSpine.y = row* 75;
            rSpine.rollingSpine();
            rSpine.draw();
            rollingSpine.push(rSpine);
            map[row][column]=0;
            break;
          }
        }
    }   
  }

  this.collisionCheck = function(objA, objB) {

    var vX = (objA.x + (objA.width / 2)) - (objB.x + (objB.width / 2));
    var vY = (objA.y + (objA.height / 2)) - (objB.y + (objB.height / 2));
    var minDist = Math.sqrt(vX*vX+vY*vY); //calculates minimum distance betwwen two objects
    var hWidths = (objA.width / 2) + (objB.width / 2);
    var hHeights = (objA.height / 2) + (objB.height / 2);
    var collisionDirection = null;

    // if the x and y vector are less than the half width or half height, then we must be inside the object, causing a collision
    if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {
      
      var offsetX = hWidths - Math.abs(vX);
      var offsetY = hHeights - Math.abs(vY);
      if(objB.type==7 && objA==player){
          console.log(" outside,,,minDist",minDist);
        if(minDist<=36) {
           collided=true;
        }
      }
       
      if (offsetX >= offsetY) {
        if (vY > 0 && vY < 60) {
            collisionDirection = 't';
            if(objB.type == 6 || objB.type == 4) {
              objA.y += offsetY+5;
            }
          } else if (vY < 0) {
            if(objB.type !==7){
              collisionDirection = 'b';
              objA.y -= offsetY;
            }
          }
        }
        
         
        else {
          if (vX > 0) {
          collisionDirection = 'l';
          if(objB.type != 8 && objB.type !=7){
            objA.x += offsetX;
          }
          } else {
          collisionDirection = 'r';
          if(objB.type !=8 && objB.type !=7){
           objA.x -= offsetX;
          }
          }
        }
    }
  
    return collisionDirection;
  

}
  this.checkElementPlayerCollision = function(element, row, column) {
    
    var collisionDirection = that.collisionCheck(player, element);
    if (collisionDirection == 'l' || collisionDirection == 'r') {
      if (element.type == 8) {
          //Coin
          score.coinScore++;
          score.totalScore += 10;
          
          score.updateCoinScore();
          score.updateTotalScore();
          map[row][column]=0;
          gameSound.play('coin',false);
        }
        if(element.type ==9 || element.type==10 || element.type==11 || element.type==12 || element.type==13 || element.type==14 ) {
          that.pauseGame();
          boomFlag=true;
          imageDy=element.y+element.height/2;
          imageDx = player.x+15;
          gameSound.play('playerDie',false);
          gameSound.stop('background');
          timeOutId = setTimeout(function() {
                  that.gameOver();
                  
                },1000)

        }  
      
 
    } else if (collisionDirection == 'b') {

      if (element.type != 8) { //only if not coin
        player.grounded = true;
        player.jumping = false;
      
      }
      if (element.type == 8) {
         //Coin
        score.coinScore++;
        score.totalScore += 10;
        score.updateCoinScore();
        score.updateTotalScore();
        map[row][column]=0;
        
        //sound when coin block is hit
          gameSound.play('coin',false);
        }        
      
    } else if(collisionDirection == 't') {
        if(element.type == 8) { //Coin
          score.coinScore++;
          score.totalScore += 10;
          score.updateCoinScore();
          score.updateTotalScore();
          map[row][column]=0;
          
          //sound when coin block is hit
          gameSound.play('coin',false);  
      }

      if(element.type ==9 || element.type==10 || element.type==11 || element.type==12 || element.type==13 || element.type==14 )
      {
        that.pauseGame();
        boomFlag=true;
        imageDy=element.y+element.height/2;
        imageDx = player.x+15;
        gameSound.play('playerDie',false);
        gameSound.stop('background');
        timeOutId = setTimeout(function(){
                that.gameOver();
                
              },1000)

      } 

    } else if (collisionDirection === null)  {
      player.grounded = false;
    }
  }
  
  this.checkEnemyPlayerCollision = function(enemyArray) {
    for (var i = 0; i < enemyArray.length; i++) {
          var collWithPlayer = that.collisionCheck(player,enemyArray[i]);

        if(collided==true) {   
          collided=false;
          that.pauseGame();
          boomFlag=true;
          imageDy=enemyArray[i].y-enemyArray[i].height/2;
          imageDx = player.x; 
          gameSound.play('playerDie',false);
          gameSound.stop('background');
          timeOutId = setTimeout(function() {
            that.gameOver();
                
          },1000)
              
        }
      }   

  }

  this.checkElementEnemyCollision= function(element,enemyArray) {
    for (var i = 0; i < enemyArray.length; i++) {
      var collisionDirection = that.collisionCheck(element,enemyArray[i]);
      
      if(collisionDirection == 'b' && element.type != 8 ) {
        enemyArray[i].grounded==true;

      } 
    }
  }

  this.updatePlayer= function() {
    
  if (keystate[SPACEBAR] || keystate[UP_ARROW]) {
        player.frame=5;
  }

  if (keystate[DOWN_ARROW]) {
      player.frame=2;
  }
  
  if(keystate[LETTER_M]) {
    if(musicOff==false) {
          musicOff=true;
          that.toggleGameMusic();
    }
    else if(musicOff==true) {
        musicOff=false;
        that.toggleGameMusic();
    }
  }

    that.checkGameOver();
    player.update(count);
    that.checkPlayerPos();
    
  }

  this.afterBoomFlag = function(imageDx,imageDy) {
    
    gameUI.draw(image,42,192,83,76,imageDx,imageDy,83,76);
  
  }

  this.checkPlayerPos = function() {
    
    centerPos = (translatedDist) + (viewPort / 2);
    difference = Math.abs((centerPos+100)-player.x);
    
    if ((player.x > centerPos+100) && ((centerPos + viewPort / 2) < maxWidth)) {
      
      player.x-=difference;  
      player.centerPosition = true;
    }

    if((player.x < centerPos-500) && ((centerPos + viewPort / 2) < maxWidth)) {
      
      that.pauseGame();
      gameSound.play('playerDie',false);
      gameSound.stop('background');
      timeOutId=setTimeout(function()
      {
        that.gameOver();

      },1000)   
    }
  }
    
  this.moveWindow = function() {
    
    gameUI.scrollWindow(SCROLL_WINDOW,0);
    translatedDist+=3;
    centerPos=(translatedDist)+(viewPort/2);
  }

  this.toggleGameMusic = function() {
    if(musicOff==false) {
      gameSound.play('background',0.4);
    }
    else if(musicOff==true){
      gameSound.stop('background');
    }
  }  

  this.checkGameOver = function() {
    if(player.y >= 491)
    { 
      that.pauseGame();
      gameSound.play('playerDie',false);
      gameSound.stop('background');
      timeOutId=setTimeout(function()
      {
        that.gameOver();

      },1000)      
    }
  }

  this.pauseGame = function() {
    window.cancelAnimationFrame(animationID);
  }

  this.gameOver = function() {
        
    gameUI.makeBox(0, 0, maxWidth, height);
    gameUI.gameOverText('Game Over', centerPos - 150,height/2-50 );
    gameUI.gameOverText('Thanks For Playing', centerPos-280, height/2+50);

    gameUI.scrollWindow(0,0);
  }

  this.clearInstances = function() {
   
    player = null;
    element = null;
    rollingSpine = [];
    
  }

  this.removeGameScreen = function() {
    
    gameUI.hide();
    gameSound.stop('background');  
    if (score) {
      score.hideScore();
    }
  }

  this.clearTimeOut =function() {
    clearTimeout(timeOutId);
  }
}
