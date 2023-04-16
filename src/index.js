

import Phaser from 'phaser';


const config = {
  // WebGL (web graphics library) JS API for rendering 2D  and 3D graphics
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    // the arcade physics plugin manages physics simulations
    default: 'arcade',
    arcade: {



    }
  },
  scene: {
    preload,
    create,
    update,
  }
}

// Loading assets, such as images, music, animations
function preload(){
  // this context - scene
  // contains functions and properties I can use
  // loading assets and declaring  keys for them
  //           declare key   location of asset
  this.load.image('sky-bg', 'assets/pixel-sky.png');
  this.load.image('bird', 'assets/bird.png');
  this.load.image('pipe', 'assets/pipe.png');
}

const VELOCITY   = 200;

let bird = null;
let topPipe = null;
let bottomPipe = null;
const pipeOpeningDistanceRange = [150,250];
let pipeOpeningDistance = Phaser.Math.Between(...pipeOpeningDistanceRange);

const initialPosition = {x: config.width/10, y: config.height /2
}
const flapVelocity = 270;
function create(){
  // create sky bg on canvas and size
  const sky = this.add.image(config.width / 2, config.height / 2, 'sky-bg');
  sky.setScale(config.width / sky.width, config.height / sky.height);
  // create bird on canvas
  bird = this.physics.add.sprite(initialPosition.x,initialPosition.y,'bird').setOrigin(0)
  // apply gravity to bird
  bird.body.gravity.y = 650;

  // create pipes on canvas
  topPipe = this.physics.add.sprite(400, 100, 'pipe').setOrigin(0,1);
  bottomPipe = this.physics.add.sprite(400, topPipe.y + pipeOpeningDistance, 'pipe').setOrigin(0,0);

  // when using gravity speed increases over time, when
  // using velocity the speed stays consistently at what is inputed

  // declare events to flap the bird
 this.input.on('pointerdown', flap);
  this.input.keyboard.on('keydown-SPACE', flap);

}

// function that calls the reset function when the player loses
function update(time, delta){
if (bird.y > config.height || bird.y < - bird.height){
  restartPlayerPosition();
}
}


// function that resets the players position
function restartPlayerPosition(){
 bird.x = initialPosition.x;
 bird.y = initialPosition.y;
 bird.body.velocity.y = 0;
}
function flap(){

  bird.body.velocity.y = -flapVelocity;
}
new Phaser.Game(config);

