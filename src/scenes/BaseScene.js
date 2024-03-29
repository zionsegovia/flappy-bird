import Phaser from "phaser";

class BaseScene extends Phaser.Scene {

    constructor(key, config) {
        super(key);
        this.config = config;
        this.fontSize = 32;
        this.lineHeight = 42;
        this.fontOptions = {fontSize: `${this.fontSize}px`,fill: '#594c4c'};
    }

    create() {
        // Access game.config here in the create method
        this.screenCenter = [this.game.config.width / 2, this.game.config.height / 2];

        const sky = this.add.image(this.screenCenter[0], this.screenCenter[1], 'sky-bg');
        sky.setScale(this.game.config.width / sky.width, this.game.config.height / sky.height);


        const backButton = this.add.image(10, this.game.config.height - 10, 'back') // Changed the position to (10, this.game.config.height - 10)
            .setOrigin(0, 1) // Set the origin to the bottom-left corner
            .setScale(2)
            .setInteractive();

            backButton.on('pointerup', () => {
                this.scene.start('MenuScene');
            });

        const currentSceneKey = this.scene.key;
        backButton.visible = !(currentSceneKey === 'MenuScene' || currentSceneKey === 'play');

    }

    createMenu(menu, setupMenuEvents) {
        let lastMenuPositionY = 0;

        menu.forEach(menuItem => {
            const menuPosition = [this.screenCenter[0], this.screenCenter[1] + lastMenuPositionY];
            menuItem.textGO = this.add.text(...menuPosition, menuItem.text, this.fontOptions).setOrigin(0.5,1);
            lastMenuPositionY += this.lineHeight;
            setupMenuEvents(menuItem);
        });
    }
}

export default BaseScene;
