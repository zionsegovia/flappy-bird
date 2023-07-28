import Phaser from "phaser";

class BaseScene extends Phaser.Scene {
    constructor(key, config) {
        super(key);
        this.config = config;
        this.fontSize = 32;
        this.lineHeight = 42;
        this.fontOptions = {fontSize: `${this.fontSize}px`,fill: '#CD00FF'};
    }

    create() {
        // Access game.config here in the create method
        this.screenCenter = [this.game.config.width / 2, this.game.config.height / 2];

        const sky = this.add.image(this.screenCenter[0], this.screenCenter[1], 'sky-bg');
        sky.setScale(this.game.config.width / sky.width, this.game.config.height / sky.height);
    }

    createMenu(menu) {
        let lastMenuPositionY = 0;

        menu.forEach(menuItem => {
            const menuPosition = [this.screenCenter[0], this.screenCenter[1] + lastMenuPositionY];
            this.add.text(...menuPosition, menuItem.text, this.fontOptions).setOrigin(0.5,1);
            lastMenuPositionY += this.lineHeight;
        });
    }
}

export default BaseScene;
