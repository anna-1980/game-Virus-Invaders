class EndScene extends Phaser.Scene {
    constructor(){
      super({key: 'EndScene'});
    }
   preload(){

    this.load.image('start', './assets/startButton.png');
    this.load.image('goBack', './assets/GoBackRed.png');

   };
  
  create() {
    const r1 = this.add.rectangle(450/2, 250, 450, 500, 0x215e85);
    // this.add.text( 50, 200, 'Time is up', { fontFamily: 'Georgia', fontSize: '20px', fill: '#800000' });
    this.add.text( 50, 200, 'Time is up :)', { fontFamily: 'Georgia', fontSize: '30px', fill: '#FE5151' });
    let newBestPlayer = localStorage.getItem('Player-Name');
    
    const bestScoreText = localStorage.getItem('bestScore');
    const bestScore = bestScoreText && parseInt(bestScoreText, 10);
    console.log(gameState.score);
    // localStorage.setItem ('bestScore', gameState.score);
    if (!bestScore || gameState.score > bestScore){
      localStorage.setItem('bestScore', gameState.score);
      gameState.highScore = localStorage.getItem('bestScore');
      localStorage.setItem('Best-Player', newBestPlayer);
      
    }
    
    gameState.music.stop();
     

   
    const startB = this.add.image(350, 380, 'start').setOrigin(0.5, 0.5).setScale(0.3).setInteractive();
    const goBack =this.add.image(100, 380, 'goBack').setOrigin(0.5, 0.5).setScale(0.3).setInteractive();
    startB.on('pointerdown', () => {
      this.scene.stop('EndScene')
      this.scene.start('GameScene')
      gameState.score = 0;
      gameState.lives = 10;
      gameState.bestScorePlayer = localStorage.getItem('Best-Player');
    
    })
    goBack.on('pointerdown', () => {
      this.scene.stop('EndScene')
      this.scene.start('IntroScene')
      gameState.score = 0;
      gameState.lives = 10;
      gameState.bestScorePlayer = localStorage.getItem('Best-Player');
 
    })
    startB.on('pointerover', () => {
     this.tweens.add({
        targets: startB, 
        duration: 100,
        scaleX: 0.4,
        scaleY: 0.4,
        repeat: false
      }) 
    })
    startB.on('pointerout', () => {
      this.tweens.add({
        targets: startB, 
        duration: 100,
        scaleX: 0.3,
        scaleY: 0.3,
        repeat: false
      }) 
    })

    goBack.on('pointerover', () => {
      this.tweens.add({
        targets: goBack, 
        duration: 100,
        scaleX: 0.4,
        scaleY: 0.4,
        repeat: false
      }) 
    })
    goBack.on('pointerout', () => {
      this.tweens.add({
        targets: goBack, 
        duration: 100,
        scaleX: 0.3,
        scaleY: 0.3,
        repeat: false
      }) 
    })

      if (gameState.score >= gameState.highScore){
        this.add.text( 50, 250, `NEW High Score: ${gameState.highScore} by: ${newBestPlayer}`, { fontFamily: 'Georgia', fontSize: '25px', fill: '#ffd342' });
        this.add.text( 50, 300, `Congratulations: ${newBestPlayer}`, { fontFamily: 'Georgia', fontSize: '25px', fill: '#ffd342' });
        
      } else {
        gameState.scoreText = this.add.text(50, 260, 'Score: 0', { fontFamily: 'Georgia', fontSize: '20px', fill: '#ffd342' });
        gameState.scoreText.setText(`Your Score ${localStorage.getItem('Player-Name')}: ${gameState.score}`);
        this.add.text( 50, 300, `Highest Score: ${gameState.highScore} by ${gameState.bestScorePlayer}`, { fontFamily: 'Georgia', fontSize: '25px', fill: '#ffd342' });
      

      }
      
      console.log(gameState.game);
      console.log(gameState.score);
      console.log(gameState.highScore);
      console.log(gameState.playerName);
      console.log(gameState.bestScorePlayer);

      fetch('http://localhost:5000/api/scores', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      game: `${gameState.gameName}`,
      playerName: `${gameState.playerName}`,
      score: `${gameState.highScore}`}) 

  }).then((response) => response.json())
    .then((data) =>console.log(data))
    .catch( (error) =>console.warn('Something went wrong.', error));
 

    fetch('https://wbs-final-game-back.herokuapp.com/api/scores', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        game: `${gameState.gameName}`,
        playerName: `${gameState.highScore}`,
        score: `${gameState.highScore}`}) 
  
    }).then((response) => response.json())
      .then((data) =>console.log(data))
      .catch( (error) =>console.warn('Something went wrong.', error));
 
      

   };
     update(){
   };
  }

  // http://localhost:5000/api/scores
  // https://wbs-final-game-back.herokuapp.com/api/scores