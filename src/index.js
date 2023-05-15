import Phaser from 'phaser';
import PlayScene from './scenes/PlayScene';
import MenuScene from './scenes/MenuScene';
import PreLoadScene from "./scenes/PreLoadScene";


const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {}
    },
    scene: [PreLoadScene,MenuScene,PlayScene]
};

new Phaser.Game(config);
