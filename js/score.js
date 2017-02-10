function Score() {
  var view = View.getInstance();

  var mainWrapper;
  var scoreWrapper;
  var coinScoreWrapper;
  var totalScoreWrapper;
  

  this.coinScore;
  this.totalScore;
 

  var that = this;

  this.init = function() {
    console.log("socre");
    that.coinScore = 0;
    that.totalScore = 0;
    

    mainWrapper = view.getMainWrapper();
    
    scoreWrapper = view.create('div');
    coinScoreWrapper = view.create('div');
    totalScoreWrapper = view.create('div');
    
    view.addClass(scoreWrapper, 'score-wrapper');
    view.addClass(coinScoreWrapper, 'coin-score');
    view.addClass(totalScoreWrapper, 'total-score');
    
    view.append(scoreWrapper, coinScoreWrapper);
    view.append(scoreWrapper, totalScoreWrapper);
    view.append(mainWrapper, scoreWrapper);

    that.updateCoinScore();
    that.updateTotalScore();
   
  }

  this.updateCoinScore = function() {
    if(that.coinScore == 100){
      that.coinScore = 0;
      
      
    }

    view.setHTML(coinScoreWrapper, + that.coinScore);
  }

  this.updateTotalScore = function() {
    view.setHTML(totalScoreWrapper, 'Score: ' + that.totalScore);
  }

  this.displayScore = function() {
    view.style(scoreWrapper, {display: 'block'});
  }

  this.hideScore = function() {
    view.style(scoreWrapper, {display: 'none'});
 
    that.coinScore = 0;
    that.totalScore = 0;
    that.updateCoinScore();
    that.updateTotalScore();
    
  }

  this.gameOverView = function() {
    view.style(scoreWrapper, {background: 'black'});
  }
}

