class IntroScene extends Phaser.Scene {
    constructor() {
    super({ key: 'IntroScene' });
    }
    
    preload() {
      this.load.html('nameform', './assets/nameform.html');
    }
    
    create() {
      
      //add player name form
      let nameInput = this.add.dom(220, 100).createFromCache('nameform');
      let text = this.add.text(210, 50, 'Please enter your name', { fill: '#ba6d08', fontSize: '20px '}).setOrigin(0.5, 0.5);
      let names = text.eventNames();
      console.log(nameInput);
  
      nameInput.addListener('keyup');
      nameInput.on('keyup', function (event) {
              // console.log(event.target);
              if (event.target.name === 'nameField' && event.key === "Enter")
              { 
                  var inputText = this.getChildByName('nameField');
                  //  Have they entered anything?
          console.log(event);
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
                  console.log(this.text);     
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
        //   this.tweens.add({
        //       targets: nameInput,
        //       y: 100,
        //       duration: 3000,
        //       ease: 'Power3'
        //   });
    
    }
    
    update() {
   
      
    }
    }