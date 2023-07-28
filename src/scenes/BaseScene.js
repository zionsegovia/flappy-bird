import Phaser from "phaser";

class BaseScene extends Phaser.Scene {
    constructor(key, config) {
        super(key);
        this.config = config;
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
            this.add.text(...menuPosition, menuItem.text, { fontSize: '32px', fill: '#CD00FF' });
            lastMenuPositionY += 42;
        });
    }
}

export default BaseScene;
