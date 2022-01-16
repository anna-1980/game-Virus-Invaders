// Paste in ONLY the StartScene class below:

class StartScene extends Phaser.Scene {
    constructor(){
      super({key: 'StartScene'});
    }
   preload(){
   };
  
  create() {
    // this.add.text( 50, 450, `other : ${gameState.playerName}`, { fontFamily: 'Georgia', fontSize: '30px', fill: '#800000' });
   this.add.text( 50, 150, `Welcome: ${gameState.playerName}`, { fontFamily: 'Georgia', fontSize: '30px', fill: '#feffc0' });

    
    this.add.text( 50, 220, 'Click here to Start the Game', { fontFamily: 'Georgia', fontSize: '25px', fill: '#ff0202' });

    this.add.text( 50,  40, `Highest Score: ${gameState.highScore}`, { fontFamily: 'Georgia', fontSize: '25px', fill: '#800000' });
    this.add.text( 50,  80, `By: ${gameState.bestScorePlayer}`, { fontFamily: 'Georgia', fontSize: '25px', fill: '#800000' });
     
    this.add.text( 110, 400, '⬅️ key to move left', {fontFamily: 'Georgia', fill: '#fffb22', fontSize: '20px'})
    this.add.text( 110, 430, '➡️ key to move right', {fontFamily: 'Georgia', fill: '#fffb22', fontSize: '20px'})
    this.add.text( 110, 460, 'Avoid Viruses to survive!', {fontFamily: 'Georgia', fill: '#ff7407', fontSize: '20px'})

    this.input.on('pointerdown', () => {  
        this.scene.stop('StartScene')
        this.scene.start('GameScene')
      })

      // console.log(`fromGameScene${gameState.playerName}`);
      
      //this is crazy... how does this even work (addButton is ina main.js)



   };
     update(){
      //  const playerName = document.querySelector(".playerName");
      //  const addButton = document.querySelector(".addButton");


      // addButton.addEventListener('click', () => {
        
      //   //had to put it here othwerwise it was not updating the given player name
      //   this.add.text( 50, 150, `Welcome: ${localStorage.getItem('Player-Name')}`, { fontFamily: 'Georgia', fontSize: '30px', fill: '#feffc0' });
       
      // });
   };


   
  }
  

  // this.add.text( 50, 450, `other : ${gameState.playerName}`, { fontFamily: 'Georgia', fontSize: '30px', fill: '#800000' });
