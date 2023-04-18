import Phaser from 'phaser';
import PlayScene from './scenes/PlayScene';

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {}
    },
    scene: [PlayScene]
};

new Phaser.Game(config);
