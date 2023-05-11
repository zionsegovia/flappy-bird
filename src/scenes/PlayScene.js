import Phaser from 'phaser';
import WebFontFile from "../../WebFontFile";


export default class PlayScene extends Phaser.Scene {

    constructor() {
        super('play');

        this.score = 0;
        this.scoreText = "";
    }

    preload() {
        this.load.image('sky-bg', 'assets/pixel-sky.png');
        this.load.image('bird', 'assets/bird.png');
        this.load.image('pipe', 'assets/newpipe.png');
        this.load.image('pipe2', 'assets/newpipe2.png');
        this.load.image('pause2', 'assets/pause2.png');

        this.load.addFile(new WebFontFile(this.load, 'Press Start 2P'))




    }

    create() {
        this.createBG();
        this.createBird();
        this.createPipes();
        this.createColliders();
        this.handleInputs();
        this.createScore();
        this.createPause();






    }

    update(time, delta) {
        this.checkGameStatus();
        this.recyclePipes();
    }

    createBG(){
        const sky = this.add.image(this.game.config.width / 2, this.game.config.height / 2, 'sky-bg');
        sky.setScale(this.game.config.width / sky.width, this.game.config.height / sky.height);
    }

    createBird(){
        this.bird = this.physics.add.sprite(this.game.config.width / 10, this.game.config.height / 2, 'bird').setOrigin(0);
        this.bird.body.gravity.y = 1500;
        this.bird.setCollideWorldBounds()
    }

    createPipes(){
        this.pipes = this.physics.add.group();

        for (let i = 0; i < 4; i++) {
            const topPipe = this.pipes.create(0, 0, 'pipe').setImmovable(true).setOrigin(0, 1);
            const bottomPipe = this.pipes.create(0, 0, 'pipe2').setImmovable(true).setOrigin(0, 0);
            topPipe.flipY = true;
            bottomPipe.flipY = true;
            bottomPipe.flipX = true;

            this.placePipe(topPipe, bottomPipe);
        }

        this.pipes.setVelocityX(-170);
    }

    handleInputs(){
        this.input.on('pointerdown', this.flap, this);
        this.input.keyboard.on('keydown-SPACE', this.flap, this);
    }

    placePipe(tPipe, bPipe) {
        const rightMostX = this.getRightMostPipe();
        const pipeVerticalDistance = Phaser.Math.Between(105, 110);
        const pipeVertPosition = Phaser.Math.Between(35, this.game.config.height - 35 - pipeVerticalDistance);
        const pipeHorizontalDistance = Phaser.Math.Between(415, 435);

        tPipe.x = rightMostX + pipeHorizontalDistance;
        tPipe.y = pipeVertPosition;

        bPipe.x = tPipe.x;
        bPipe.y = tPipe.y + pipeVerticalDistance;
    }

    recyclePipes() {
        const tempPipes = [];
        this.pipes.getChildren().forEach(pipe => {
            if (pipe.getBounds().right <= 0) {
                tempPipes.push(pipe);
                if (tempPipes.length === 2) {
                    this.placePipe(...tempPipes);
                    this.increaseScore();
                    this.saveBestScore();
                }
            }
        })
    }

    getRightMostPipe() {
        let rightMostX = 0;

        this.pipes.getChildren().forEach(function (pipe) {
            rightMostX = Math.max(pipe.x, rightMostX);
        });

        return rightMostX;
    }

    saveBestScore() {
        // using localstorage to save highest score on users browser
        const bestScoreText = localStorage.getItem('bestScore');
        const bestScore = bestScoreText && parseInt(bestScoreText, 10);
        // only if there is no previous bestscore, and only if current score is better than bestscore:
        if (!bestScore || this.score > bestScore) {
            localStorage.setItem('bestScore', this.score);
        }
    }
    gameOver() {
        this.physics.pause();
        this.bird.setTint(0xEE4824);
        this.saveBestScore();
        this.time.addEvent({
            delay: 1000,
            callback: () =>{
               this.scene.restart();
            },
            loop: false
        });
    }

    flap() {
        this.bird.body.velocity.y = -450;
    }

    checkGameStatus() {
        if (this.bird.getBounds().bottom >= this.game.config.height || this.bird.y <= 0) {
            this.gameOver();
        }
    }

    createColliders() {
        this.physics.add.collider(this.bird, this.pipes, this.gameOver, null, this);
    }

    createScore() {
        this.score = 0;

        const bestScore = localStorage.getItem('bestScore');
        this.scoreText = this.add.text(16, 16, `Score: ${0}`, {fontSize: '20px', fontFamily:'"Press Start 2P"',color: '#070707'});
        this.add.text(16, 52, `Best Score: ${bestScore || 0}`, {fontSize: '13px',fontFamily:'"Press Start 2P"', color: '#3b3a3a'});
    }


    increaseScore(){
        this.score ++;
        this.scoreText.setText(`Score: ${this.score}`)
    }

    createPause() {
     const pause2 = this.add.image(this.game.config.width - 10, this.game.config.height - 10, 'pause2')
        .setScale(0.13) // Adjust the scale of the image
        .setOrigin(1)
        .setPosition(this.game.config.width - 10, this.game.config.height - 10); // Adjust the position of the image
}}
