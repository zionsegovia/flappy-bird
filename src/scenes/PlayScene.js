import Phaser from 'phaser';

export default class PlayScene extends Phaser.Scene {

    constructor() {
        super('play');
    }

    preload() {
        this.load.image('sky-bg', 'assets/pixel-sky.png');
        this.load.image('bird', 'assets/bird.png');
        this.load.image('pipe', 'assets/newpipe.png');
        this.load.image('pipe2', 'assets/newpipe2.png');
    }

    create() {
        this.createBG();
        this.createBird();
        this.createPipes();
        this.createColliders();
        this.handleInputs();

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
        this.bird.body.gravity.y = 950;
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

        this.pipes.setVelocityX(-185);
    }

    handleInputs(){
        this.input.on('pointerdown', this.flap, this);
        this.input.keyboard.on('keydown-SPACE', this.flap, this);
    }

    placePipe(tPipe, bPipe) {
        const rightMostX = this.getRightMostPipe();
        const pipeVerticalDistance = Phaser.Math.Between(105, 115);
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

    gameOver() {
        this.physics.pause();
        this.bird.setTint(0xEE4824);

        this.time.addEvent({
            delay: 1000,
            callback: () =>{
               this.scene.restart();
            },
            loop: false
        });
    }

    flap() {
        this.bird.body.velocity.y = -345;
    }

    checkGameStatus() {
        if (this.bird.getBounds().bottom >= this.game.config.height || this.bird.y <= 0) {
            this.gameOver();
        }
    }

    createColliders() {
        this.physics.add.collider(this.bird, this.pipes, this.gameOver, null, this);
    }
}
