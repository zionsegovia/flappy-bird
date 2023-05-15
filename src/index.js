import Phaser from 'phaser';
import PlayScene from './scenes/PlayScene';
import MenuScene from './scenes/MenuScene'

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {}
    },
    scene: [MenuScene,PlayScene]
};

new Phaser.Game(config);
