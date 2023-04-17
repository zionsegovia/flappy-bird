

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
  this.load.image('pipe', 'assets/newpipe.png');
  this.load.image('pipe2', 'assets/newpipe2.png');

}

const VELOCITY   = 200;
const PIPES_TO_RENDER = 4;
const pipeHorizontalDistanceRange = [450, 500];

let bird = null;
let pipes = null;
let pipeHorizontalDistance = 0;
const pipeOpeningDistanceRange = [100,175];
const initialPosition = {x: config.width/10, y: config.height /2}
const flapVelocity = 270;
function create(){
  // create sky bg on canvas and size
  const sky = this.add.image(config.width / 2, config.height / 2, 'sky-bg');
  sky.setScale(config.width / sky.width, config.height / sky.height);
  // create bird on canvas
  bird = this.physics.add.sprite(initialPosition.x,initialPosition.y,'bird').setOrigin(0)
  // apply gravity to bird
  bird.body.gravity.y = 650;

  // create group pipes to access them easier
  pipes = this.physics.add.group();

  // create pipes on canvas
  for (let i =0; i < PIPES_TO_RENDER; i++) {
   const topPipe = pipes.create(0,0, 'pipe').setOrigin(0,1);
   const bottomPipe = pipes.create(0,0, 'pipe2').setOrigin(0,0);
    topPipe.flipY = true;
    bottomPipe.flipY = true;
    bottomPipe.flipX = true;

    placePipe(topPipe, bottomPipe);

  }

  // set velocity for entire pipes group
  pipes.setVelocityX(-200);


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

function placePipe(tPipe, bPipe){
  const rightMostX = getRightMostPipe();
  const pipeVerticalDistance = Phaser.Math.Between(...pipeOpeningDistanceRange);
  const pipeVertPosition = Phaser.Math.Between(35, config.height -35 - pipeVerticalDistance );
  const pipeHorizontalDistance = Phaser.Math.Between(...pipeHorizontalDistanceRange);

  tPipe.x = rightMostX + pipeHorizontalDistance;
  tPipe.y = pipeVertPosition;

  bPipe.x = tPipe.x;
  bPipe.y = tPipe.y + pipeVerticalDistance


}
function getRightMostPipe(){
  let rightMostX = 0;

  pipes.getChildren().forEach(function (pipe){
    rightMostX = Math.max(pipe.x, rightMostX);
  });

  return rightMostX;
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

