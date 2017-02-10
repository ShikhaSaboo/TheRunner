function GameSound() {
  var coin;
  var powerUp;
  var playerDie;
  var stageClear;
  var jump;
  var background;
  var that = this;

  this.init = function() {
    coin = new Audio('sounds/coin.wav');
    background = new Audio('sounds/backgroundSound.wav');
    playerDie = new Audio('sounds/gameOver.wav');
    jump = new Audio('sounds/jump.wav');
  }

  this.play = function(element,options) {
    if (element=='background') {
      
      background.currentTime = 0;
      background.play();
      background.volume = 0.5;
      background.loop =options;
    }
    if (element=='coin') {
      coin.pause();
      coin.currentTime = 0;
      coin.play();
      coin.volume =0.7;
      coin.loop =options;
    }
    if (element=='jump') {
      jump.pause();
      jump.currentTime = 0;
      jump.play();
      jump.volume =0.7;
      jump.loop =options;
    }
    if (element=='playerDie') {
      playerDie.pause();
      playerDie.currentTime = 0;
      playerDie.play();
      playerDie.volume =0.7;
      playerDie.loop =options;
    }
  }

  this.stop = function(element) {
    if (element=='background') {
      background.pause();
    }
  }
  
}  