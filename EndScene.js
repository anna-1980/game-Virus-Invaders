class EndScene extends Phaser.Scene {
    constructor(){
      super({key: 'EndScene'});
    }
   preload(){
   };
  
  create() {
    // this.add.text( 50, 200, 'Time is up', { fontFamily: 'Georgia', fontSize: '20px', fill: '#800000' });
    this.add.text( 50, 230, 'GAME OVER', { fontFamily: 'Georgia', fontSize: '20px', fill: '#800000' });
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
     

    this.input.on('pointerdown', () => {  
        this.scene.stop('EndScene')
        this.scene.start('StartScene')
        gameState.score = 0;
        gameState.lives = 100;
        gameState.bestScorePlayer = localStorage.getItem('Best-Player');
        function ifNoCurrentPlayer() {
           addButton.classList.remove(
             "hideMe", 
           );
           playerName.classList.remove(
             "hideMe", 
           );
           console.log('change to hidden')
          };
        
          ifNoCurrentPlayer();
      
      
      
      })

    const r1 = this.add.rectangle(450/2, 250, 450, 500, 0x215e85);


      this.add.text( 50, 360, 'Click to restart', { fontFamily: 'Georgia', fontSize: '20px', fill: '#ffb4f4' });
      if (gameState.score >= gameState.highScore){
        this.add.text( 50, 300, `NEW High Score: ${gameState.highScore} by: ${newBestPlayer}`, { fontFamily: 'Georgia', fontSize: '25px', fill: '#ffd342' });
        this.add.text( 50, 330, `Congratulations: ${newBestPlayer}`, { fontFamily: 'Georgia', fontSize: '25px', fill: '#ffd342' });
        
      } else {
        gameState.scoreText = this.add.text(50, 260, 'Score: 0', { fontFamily: 'Georgia', fontSize: '35px', fill: '#ffb4f4' });
        gameState.scoreText.setText(`Your Score ${localStorage.getItem('Player-Name')}: ${gameState.score}`);
        this.add.text( 50, 300, `Highest Score: ${gameState.highScore} by ${gameState.bestScorePlayer}`, { fontFamily: 'Georgia', fontSize: '25px', fill: '#ffd342' });
      

      }
      console.log(gameState.highScore);
   };
     update(){
   };
  }