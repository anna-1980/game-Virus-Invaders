const gameState = {
    gameName: 'Virusinvaders',
    score: 0,
    lives: 10,
    highScore: localStorage.getItem('bestScore') || 1,
    playerName: '',
    bestScorePlayer: localStorage.getItem('Best-Player') || 'Anna'
  };
  
    const scores = ({playerName}) => {
      // console.log(`Gel all scores: ${playerName}`);
    }
    // fetch(`http://localhost:5000/api/scores/${gameState.gameName}`)
    
    fetch(`https://wbs-final-game-back.herokuapp.com/api/scores`)
    .then((response) => response.json())
    .then((data) => scores(data))
    .catch((error) => console.log(`That is why: ${error}`));
   
   
 


  // console.log(gameState);
  
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
        gravity: { y: 300 },
        enableBody: true,
//         debug: true,
//         debugShowBody: true,
      }
    },
    scene: [IntroScene, StartScene, GameScene, EndScene]
  };
  const game = new Phaser.Game(config);
  
