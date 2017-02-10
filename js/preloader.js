(function(){
var Preloader=function () {
    var player = player
    var imageSources;
    var soundSources;
    var that = this;

  this.init = function() {
   
  imageSources = {
      1: 'images/sonic.png',
      2: 'images/ground-spritesheet.png',
  }

    that.loadImages(imageSources);
  }

  this.loadImages = function(imageSources) {
    var images = {};
    var loadedImages = 0;
    var totalImages = 0;

    for (var key in imageSources) {
      totalImages++;
    }

    for (var key in imageSources) {
      images[key] = new Image();
      images[key].src = imageSources[key];
      images[key].onload = function() {
      loadedImages++;
        if (loadedImages >= totalImages) {
          
          that.initMainApp();
        }
      }
    }
  }

  this.initMainApp = function() {
    var gameMakerInstance = GameMaker.getInstance();
    gameMakerInstance.init();
  }
}

window.onload = function() {
  console.log("preloader");
  var preloader = new Preloader();
  preloader.init();
}
})();