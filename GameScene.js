class GameScene extends Phaser.Scene {
    constructor(){
      super({ key: 'GameScene' })
    }
    preload() {
      this.load.image('virus1', './assets/Virus01.png');
      this.load.image('virus2', './assets/Virus02.png');
      this.load.image('virus3', './assets/Virus03.png');
      this.load.image('platform', './assets/ground02.png');
      this.load.image('platform2', './assets/ground02.png');
      // this.load.image('player', './assets/player.png');
      this.load.spritesheet('player', 
      './assets/777.png',
      { frameWidth: 125, frameHeight: 201 }
    );
      this.load.image('background', './assets/background05-450x500.png');

      this.load.audio('squish', ['./assets/squish06a.mp3'])
      this.load.audio('backgroundMusic', ['./assets/VImusic.mp3'])
      this.load.audio('auch', ['./assets/aua02.mp3'])
      this.load.audio('puff', ['./assets/puff01.mp3'])
    }
  
    
  create() {
 
    gameState.music = this.sound.add('backgroundMusic', { loop: true, volume: 0.3});
    gameState.puff = this.sound.add('puff', { loop: false , volume: 0.2});
    gameState.squish = this.sound.add("squish", { loop: false });
    gameState.auch = this.sound.add("auch", { loop: false });
    
    
  gameState.music.play();

    this.time.addEvent({
      delay: 500, 
        loop: false,
      callback: () => {
        const timerText1 = this.add.text(20, 50, ` ${gameState.playerName} survive for 1 minute`, { fontSize: '25px', fill: '#800000'});
        this.tweens.add({
          targets: timerText1,
          props: {
              // x: { value: 100, duration: 2000 },
              y: { value: 100, duration: 2000 },
              alpha: {value: 0.2, duration: 2000},
          },
          flipX: false,
          ease: 'Sine.easeInOut',
          yoyo: true,
          color:'#f3fb08',
          completeDelay: 2000,
          onComplete: function () {
            timerText1.flipX = false;
            // timerText1.setColor('#800000');
            timerText1.alpha = 0;
            
            // timerText1.destroy();
          },
          repeat: false
      });
      
        // timerText(),
      // this.add.text(210, 250, 'TIMER 2sec', { fontSize: '20px', fill: '#000000'}),
      // console.log(Event);
    }, 
    })


//ending the game
    this.time.addEvent({
      // delay: 60000, 
        delay: 10000,
        loop: false,
      callback: () => {
         
        this.scene.stop('GameScene')
        this.scene.start('EndScene')
      //   console.log('Show me GameState:');
      //  console.log(gameState);
    }, 
    })

      const backgroung = this.add.image(225, 250, 'background').setScale(1);
      
      
      const platforms = this.physics.add.staticGroup();
  
      platforms.create(225, 495, 'platform').setScale(1, .3).refreshBody();

      platforms.create(225, 480, 'platform2').setScale(1, .5).refreshBody();
  
      gameState.scoreText = this.add.text(350, 475, 'Score: 0', { fontFamily: 'Georgia', fontSize: '20px', fill: '#ffee79' });
      gameState.livesText = this.add.text(10, 475, 'Lives: 10', { fontFamily: 'Georgia', fontSize: '20px', fill: '#ffee79' });
      let currentPlayer = localStorage.getItem('Player-Name');
      this.add.text(150, 480, `Now playing: ${currentPlayer}`, { fontFamily: 'Georgia', fontSize: '15px', fill: '#7cfeb3' });
      
      gameState.player = this.physics.add.sprite(225, 440, 'player')
      .setScale(.4)
      .setSize(90, 130)
      .setOffset(21, 32);

      gameState.player.setCollideWorldBounds(true);
  
      this.physics.add.collider(gameState.player, platforms);
  
      gameState.cursors = this.input.keyboard.createCursorKeys();
  
      const left = this.add.text( 20, 450, '⬅️', {fontFamily: 'Georgia', fill: '#68f5ff', fontSize: '20px'}).setInteractive();
      const right = this.add.text( 410, 450, '➡️', {fontFamily: 'Georgia', fill: '#68f5ff', fontSize: '20px'}).setInteractive();
      
      left.on('pointerdown', () => {
        gameState.player.setAccelerationX(-5000);
        })
        
    right.on('pointerdown', () => {
        gameState.player.setAccelerationX(5000);
        })


      const bugs = this.physics.add.group();
  
      const virusList = ['virus1', 'virus2', 'virus3']

      const bugGen = () => {
        const xCoord = Math.random() * 640
        let randomVirus = virusList[Math.floor(Math.random() * 3)]
        bugs.create(xCoord, 10, randomVirus).setScale(.2).setAlpha(0) 
        
        this.tweens.add({
          targets: bugs.getChildren(), 
          delay: 0,
          duration: 550,
          ease: 'Sine.easeInOut',
          velocityY: -550,
          angle: 210,
          yoyo: true,
          repeat: -1,
          alpha: {value: 1, duration: 300}, 
        })  
        
      }
  
      const bugGenLoop = this.time.addEvent({
        delay: 150,
        callback: bugGen,
        callbackScope: this,
        loop: true,
      });
  
      this.physics.add.collider(bugs, platforms, bug => {
        bug.destroy();
        // console.log(`Bug:`);
        // console.log(bug);
        
        gameState.score += 10;
        gameState.scoreText.setText(`Score: ${gameState.score}`);
      })
  
      
      this.physics.add.collider( gameState.player, bugs, ( player, virus ) => {     
          // virus.setTint(0xff0000);//red
          // player.setTint(0x30a0ea);//blue
          player.setTint(0xff0000),
          // gameState.squish.play(),
          gameState.auch.play(),
          this.time.addEvent({
            targets: player,
              delay: 100, 
              loop: false,
              scaley: 2,
              completeDelay: 500,
            callback: () => {
              player.clearTint();
          }, 
          })
          virus.destroy();
          gameState.player.anims.play('hit');
          // virus.disableBody();
          gameState.lives -= 1;
          gameState.livesText.setText(`Lives: ${gameState.lives}`);
        
        if (gameState.lives === 0)
          {this.physics.pause();
            bugGenLoop.destroy();
            gameState.music.stop();
          this.add.text(125, 150, 'Game Over', { fontFamily: 'Georgia', fontSize: '40px', fill: '#ff0202' });
          gameState.puff.play(),
          this.time.addEvent({
            delay: 1500, 
              loop: false,
            callback: () => {
              this.physics.pause();
              this.scene.stop('GameScene');
              this.scene.start('EndScene');
              
              }, 
             })
            }
          });
    
    this.anims.create({
		  key: 'left',
		  frames: this.anims.generateFrameNumbers('player', { start: 0, end: 2 }),
		  frameRate: 10,
		  repeat: -1
				});	
			// console.log("middle");
		this.anims.create({
			key: 'turn',
			frames: [ { key: 'player', frame: 3 } ],
			frameRate: 1
			   });

    this.anims.create({
        key: 'hit',
        frames: [ { key: 'player', frame: 2 } ],
          rameRate: 10
        });

		this.anims.create({
			key: 'right',
			frames: this.anims.generateFrameNumbers('player', { start: 4, end: 6 }),
			frameRate: 10,
			repeat: -1
		});	

    gameState.squish = this.sound.add("squish", { loop: false });
    gameState.auch = this.sound.add("auch", { loop: false });
    
    
   
    }
  
    update() {
      if (gameState.cursors.left.isDown) {
        gameState.player.setVelocityX(-180);
        gameState.player.anims.play('left', true);
      } else if (gameState.cursors.right.isDown) {
        gameState.player.setVelocityX(180);
        gameState.player.anims.play('right', true);
      } else {
        gameState.player.setVelocityX(0);
        gameState.player.anims.play('turn');
      }
    }
  }

 