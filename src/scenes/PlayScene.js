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
        const sky = this.add.image(this.game.config.width / 2, this.game.config.height / 2, 'sky-bg');
        sky.setScale(this.game.config.width / sky.width, this.game.config.height / sky.height);

        this.bird = this.physics.add.sprite(this.game.config.width / 10, this.game.config.height / 2, 'bird').setOrigin(0);
        this.bird.body.gravity.y = 950;

        this.pipes = this.physics.add.group();

        for (let i = 0; i < 4; i++) {
            const topPipe = this.pipes.create(0, 0, 'pipe').setOrigin(0, 1);
            const bottomPipe = this.pipes.create(0, 0, 'pipe2').setOrigin(0, 0);
            topPipe.flipY = true;
            bottomPipe.flipY = true;
            bottomPipe.flipX = true;

            this.placePipe(topPipe, bottomPipe);
        }

        this.pipes.setVelocityX(-175);

        this.input.on('pointerdown', this.flap, this);
        this.input.keyboard.on('keydown-SPACE', this.flap, this);
    }

    update(time, delta) {
        if (this.bird.y > this.game.config.height || this.bird.y < -this.bird.height) {
            this.restartPlayerPosition();
        }
        this.recyclePipes();
    }

    placePipe(tPipe, bPipe) {
        const rightMostX = this.getRightMostPipe();
        const pipeVerticalDistance = Phaser.Math.Between(100, 160);
        const pipeVertPosition = Phaser.Math.Between(35, this.game.config.height - 35 - pipeVerticalDistance);
        const pipeHorizontalDistance = Phaser.Math.Between(450, 500);

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

    restartPlayerPosition() {
        this.bird.x = this.game.config.width / 10;
        this.bird.y = this.game.config.height / 2;
        this.bird.body.velocity.y = 0;
    }

    flap() {
        this.bird.body.velocity.y = -270;
    }

}
