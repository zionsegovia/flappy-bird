import Phaser from "phaser";
import WebFontFile from "../../WebFontFile";

class PreLoadScene extends Phaser.Scene{

    constructor() {
        super("PreLoadScene");

    }

    preload(){
        this.load.image('sky-bg', 'assets/pixel-sky.png');
        this.load.image('bird', 'assets/bird.png');
        this.load.image('pipe', 'assets/newpipe.png');
        this.load.image('pipe2', 'assets/newpipe2.png');
        this.load.image('pause2', 'assets/pause2.png');
        this.load.image('back', 'assets/back.png');

        this.load.addFile(new WebFontFile(this.load, 'Press Start 2P'))
    }

    create(){
       this.scene.start('MenuScene');

    }


}

export default PreLoadScene;