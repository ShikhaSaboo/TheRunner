//Main Class through which game is instantiated

var GameMaker = (function() {

  var instance;

  function GameMaker() {
    var view = View.getInstance();

    var mainWrapper;
    var startScreen;
    var btnWrapper;
    var startGameButton; 
    var goBack;
    var runnerGame;
    var instruction;
    var that = this;

    this.init = function() {
      runnerGame = new RunnerGame();
      //main menu screen
      mainWrapper = view.getMainWrapper();
      startScreen = view.create('div');
      btnWrapper = view.create('div');
      startGameButton = view.create('button');
      instruction = view.create('div');
      goBack = view.create('div');

      view.addClass(btnWrapper, 'btn-wrapper');
      view.addClass(startScreen, 'start-screen');
      view.addClass(instruction,'instruction');
      view.addClass(startGameButton, 'start-btn');
      view.addClass(goBack, 'goBack');

      view.append(startScreen, startGameButton);
      view.append(startScreen,instruction);
      view.append(mainWrapper, goBack);
      view.append(mainWrapper, startScreen);
      view.append(mainWrapper, btnWrapper);
      view.setHTML(instruction, '> Press key "M" to &nbsp&nbspoff/on background &nbsp&nbspMusic <br\>> Press Up Arrow to  &nbsp &nbsp jump <br\>> Press Down Arrow &nbsp &nbsp to roll<br\>> Collect Coin to &nbsp&nbspincrease score <br\>&nbsp&nbsp&nbsp&nbsp&nbspEnjoy!');

      goBack.onclick = that.backToMenu;
      startGameButton.onclick = function() {
        map = that.loadMainGameMap();
        that.startGame(map);
      }

    }

    this.loadMainGameMap = function() {
      var map = {
      /*row1. 1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69 row2 1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69 row3 1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69 row4 1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69row5  1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69row6 1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69row7 1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69 */
        1:'[[ 0, 0, 0, 0, 9,10,10,10,11,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9,10,10,10,10,10,11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],   [ 0, 0, 0, 0, 0, 9,10,11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9,10,10,10,11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],  [ 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 8, 0, 8, 0, 12,13,14, 0, 0, 8, 8, 0, 0, 0, 0, 6, 8, 6, 6, 6, 6, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 8, 8, 8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],  [6, 6, 6, 6, 6, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 6, 6, 6, 6, 6, 6, 6, 6, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 0, 4, 4, 4, 8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],  [6, 6, 6, 6, 6, 0, 8, 8, 7, 0, 0, 6, 6, 8, 8, 7, 0, 8, 8, 6, 6, 6, 6, 6, 6, 6, 6, 6, 0, 7, 0, 0, 0, 4, 0, 7, 6, 0, 8, 8, 6, 0, 6, 7, 0, 6, 0, 7, 8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],  [6, 6, 6, 6, 6, 4, 4, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 6, 6, 6, 6, 0, 6, 0, 4, 4, 0, 6, 6, 6, 6, 6, 0, 6, 6, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]'
     
      };

      return map;
    }

    this.startGame = function(levelMap) {
      view.style(goBack, { display: 'block' });
      runnerGame.clearInstances();
      runnerGame.init(levelMap, 1); 
      that.hideMainMenu();
      
    }

    

    this.backToMenu = function() {
      runnerGame.pauseGame(); //pause game when the back button is pressed so that the gameloop doesnt run more than once
      runnerGame.clearTimeOut(); //when player dies, a timeout starts for resetting the game. Pressing the back button clears that timeout
      runnerGame.removeGameScreen();
      
      that.showMainMenu();
      view.style(goBack, { display: 'none' });
    }

    this.hideMainMenu = function() {
      view.style(startScreen, { display: 'none' });
    }

    this.showMainMenu = function() {
      view.style(startScreen, { display: 'block' });
    }
  }

  return {
    getInstance: function() {
      if (instance == null) {
        instance = new GameMaker();
      }

      return instance;
    }
  }

}());
