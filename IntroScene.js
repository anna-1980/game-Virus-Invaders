class IntroScene extends Phaser.Scene {
    constructor() {
    super({ key: 'IntroScene' });
    }
    
    preload() {
      this.load.html('nameform', './assets/nameform.html');
      this.load.image('backgroundPale', './assets/background06.png');
    }
    
    create() {
      
      //add player name form
      this.add.image(0, 0 , 'backgroundPale').setOrigin(0, 0)
      let nameInput = this.add.dom(220, 100).createFromCache('nameform');
      let text = this.add.text(225, 60, 'Please enter your name', { fill: '#ba6d08', fontSize: '20px '}).setOrigin(0.5, 0.5);
      let names = text.eventNames();
    //   console.log(nameInput);
  
      nameInput.addListener('keyup');
      nameInput.on('keyup', function (event) {
              // console.log(event.target);
              if (event.target.name === 'nameField' && event.key === "Enter")
              { 
                  var inputText = this.getChildByName('nameField');
                  //  Have they entered anything?
          // console.log(event);
                  if (inputText.value !== '' )
                  {
                      //  Turn off the click events
                      this.removeListener('keyup');
                      
                      //  Populate the text with whatever they typed in
                      // text.setText('Welcome ' + inputText.value);
                      text.setAlpha(0);
                      //  Hide the login nameInput
                      this.setVisible(false);
  
                localStorage.setItem('Player-Name', inputText.value);
                      gameState.playerName = inputText.value;
                      // console.log(gameState);
                  // console.log(this.text);     
                this.scene.scene.stop('IntroScene');
                this.scene.scene.start('StartScene');
  
              }
                  else
                  {
                      //  Flash the prompt
                      this.scene.tweens.add({
                          targets: text,
                          scaleX: 1.2,
                          scaleY: 1.2,
                          onStart: function () {
                              // setColor('#800000')
                              text.setTint(0xff0000);
                           } ,
                          setTint: ('#800000'),
                          alpha: 0.4,
                          duration: 250,
                          ease: 'Power3',
                          yoyo: true,
                          onComplete: function () {
                              // setColor('#800000')
                              text.setTint(0xb5e6fd);
                           } ,
                      });
                              }
              }
      
          });
          this.tweens.add({
              targets: nameInput,
              y: 100,
              duration: 3000,
              ease: 'Power3'
          });

          this.add.rectangle(50, 200, 350, 148, '#000000', 0.5).setOrigin(0, 0);
          this.add.text(215, 220, `Leader board:`, { fill: '#fffb22', fontSize: '22px '}).setOrigin(0.5, 0.5);
          
      let scores = fetch(`https://wbs-final-game-back.herokuapp.com/api/scores/Virus Invaders`)
      .then((response) => response.json())
      .then(scores => {
        console.log(scores)
        // let player1 = `${(scores[0].playerName)}  ${(scores[0].score)}`;
        // console.log(player1)
        gameState.bestScorePlayer1 = (scores[0].score);
        gameState.bestScorePlayer1Name = (scores[0].playerName);
        gameState.bestScorePlayer2 = (scores[1].score);
        gameState.bestScorePlayer2Name = (scores[1].playerName);
        gameState.bestScorePlayer3 = (scores[2].score);
        gameState.bestScorePlayer3Name = (scores[2].playerName);
        console.log('more stuff to log')
        console.log(gameState.bestScorePlayer1);
        console.log(gameState.bestScorePlayer1Name);
      
        this.add.text(70, 255, `${gameState.bestScorePlayer1Name} `, { fill: '#fcff95', fontSize: '20px '}).setOrigin(0, 0.5);
        this.add.text(240, 255, `${gameState.bestScorePlayer1}`, { fill: '#fcff95', fontSize: '20px '}).setOrigin(0, 0.5);
        this.add.text(310, 255, `points`, { fill: '#fcff95', fontSize: '20px '}).setOrigin(0, 0.5);
      
        this.add.text(70, 285, `${gameState.bestScorePlayer2Name} `, { fill: '#fcff95', fontSize: '20px '}).setOrigin(0, 0.5);
        this.add.text(240, 285, `${gameState.bestScorePlayer2}`, { fill: '#fcff95', fontSize: '20px '}).setOrigin(0, 0.5);
        this.add.text(310, 285, `points`, { fill: '#fcff95', fontSize: '20px '}).setOrigin(0, 0.5);
      
        this.add.text(70, 315, `${gameState.bestScorePlayer3Name} `, { fill: '#fcff95', fontSize: '20px '}).setOrigin(0, 0.5);
        this.add.text(240, 315, `${gameState.bestScorePlayer3}`, { fill: '#fcff95', fontSize: '20px '}).setOrigin(0, 0.5);
        this.add.text(310, 315, `points`, { fill: '#fcff95', fontSize: '20px '}).setOrigin(0, 0.5);
        
        })
      // .then(data => console.log(data))
      // console.log(`from fetch request ${scores}`)
      .catch((error) => console.log(`That is why: ${error}`));
      
      
      console.log(gameState.bestScorePlayer1);
      console.log('sfter fetch and checking GameState');
      // fetch(`http://localhost:5000/api/scores/${gameState.gameName}`)
      
      const api_url = 
            "https://wbs-final-game-back.herokuapp.com/api/scores/Angry Viruses";
          
        
    }
    
    update() {
   
      
    }
    }