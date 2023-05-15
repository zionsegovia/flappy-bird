import Phaser from 'phaser';
import PlayScene from './scenes/PlayScene';
import MenuScene from './scenes/MenuScene';
import PreLoadScene from "./scenes/PreLoadScene";

const Scenes = [PreLoadScene, MenuScene, PlayScene];
const createScene = Scene => new Scene(config);

// instantiate all scenes with the config object
const initScenes = () => Scenes.map(createScene)

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {}
    },
    scene: Scenes
};



// create the Phaser game object
new Phaser.Game(config);


