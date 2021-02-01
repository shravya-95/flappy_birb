// Create our 'main' state that will contain the game
class mainState {
    
    
    preload() { 
        // This function will be executed at the beginning     
        // That's where we load the images and sounds 
        this.load.image('bird', 'assets/bird.png'); 
        this.load.image('pipe', 'assets/pipe.jpg');
    }

    create() { 
        // This function is called after the preload function     
        // Here we set up the game, display sprites, etc.
        // this.stage.backgroundColor = '#71c5cf';
        // this.physics.startSystem(Phaser.Physics.ARCADE);
        this.pipes = this.add.group(); 
        this.bird = this.physics.add.sprite(100, 245, 'bird');
        this.bird.body.velocity.x=200
        // this.physics.arcade.enable(this.bird);
        this.bird.setScale(0.05);
        this.bird.body.gravity.y = 1000; 
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        // spaceKey.on('down',this.jump);
        
        // spaceKey.onDown(this.jump, this);   
        this.timer = this.time.events.loop(1500, this.addRowOfPipes, this); 
        // var timeline = this.tweens.timeline({
        //     target: this.pipes,
        //     ease: 'Power1',
        //     duration: 1500,
        //     loop: -1
        // });
        // timeline.on('loop', this.addRowOfPipes);
        // timeline.play();
        // var timeLine = this.add.tween(this.pipes);
        

        
                
    }

    update() {
        // This function is called 60 times per second    
        // It contains the game's logic   
        // this.pipes.body.velocity.x = -200;
        if (this.bird.y < 0 || this.bird.y > 490)
        // this.restartGame();
        this.scene.restart();
        if (this.spaceKey.isDown){
            this.bird.body.velocity.y = -350;
        }
    }
    addOnePipe(x, y) {
        // Create a pipe at the position x and y
        var pipe = this.physics.add.sprite(x, y, 'pipe');
        console.log("added pipe")
        pipe.setScale(5);
        pipe.body.velocity.x=-200;
        // Add the pipe to our previously created group
        this.pipes.add(pipe);
    
        // Enable physics on the pipe 
    
    
        // Add velocity to the pipe to make it move left
        pipe.body.velocity.x = -200; 
    
        // Automatically kill the pipe when it's no longer visible 
        pipe.checkWorldBounds = true;
        pipe.outOfBoundsKill = true;
    }
    addRowOfPipes() {
        // Randomly pick a number between 1 and 5
        // This will be the hole position
        var hole = Math.floor(Math.random() * 5) + 1;
    
        // Add the 6 pipes 
        // With one big hole at position 'hole' and 'hole + 1'
        for (var i = 0; i < 8; i++)
            if (i != hole && i != hole + 1) 
                this.addOnePipe(400, i * 60 + 10);   
    }

};

// Initialize Phaser, and create a 400px by 490px game
// var game = new Phaser.Game(400, 490);

// // Add the 'mainState' and call it 'main'
// game.state.add('main', mainState); 

new Phaser.Game({
    width: 700, // Width of the game in pixels
    height: 400, // Height of the game in pixels
    backgroundColor: '#71c5cf', // The background color (blue)
    scene: mainState, // The name of the scene we created
    physics: { default: 'arcade' }, // The physics engine to use
    parent: 'game', // Create the game inside the <div id="game"> 
  });

// // Start the state to actually start the game
// game.state.start('main');