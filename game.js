const gameState = {
    game: 'Virusinvaders',
    score: 0,
    lives: 10,
    highScore: localStorage.getItem('bestScore') || 1,
    playerName: '',
    bestScorePlayer: localStorage.getItem('Best-Player') || 'Anna'
  };
  


  console.log(gameState);
  
  const config = {
    type: Phaser.AUTO,
    scale: {
      width: 450,
      height: 500,
          dom: {
      createContainer: true
   },
      mode: Phaser.Scale.FIT,
      // autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    parent:'game',
    backgroundColor: "fec55e",
    dom: {
      createContainer: true
   },
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 200 },
        enableBody: true,
//         debug: true,
//         debugShowBody: true,
      }
    },
    scene: [IntroScene, StartScene, GameScene, EndScene]
  };
  const game = new Phaser.Game(config);
  
