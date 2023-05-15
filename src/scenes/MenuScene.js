import Phaser from "phaser";

class MenuScene extends Phaser.Scene{

    constructor(config) {
        super("MenuScene");
        this.config = config;
    }


    create(){
            const sky = this.add.image(this.game.config.width / 2, this.game.config.height / 2, 'sky-bg');
            sky.setScale(this.game.config.width / sky.width, this.game.config.height / sky.height);


        }


}

export default MenuScene;