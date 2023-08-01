import Phaser from 'phaser';
import PlayScene from './scenes/PlayScene';
import MenuScene from './scenes/MenuScene';
import PreLoadScene from "./scenes/PreLoadScene";
import ScoreScene from "./scenes/ScoreScene";
import PauseScene from "./scenes/PauseScene";


const Scenes = [PreLoadScene, MenuScene, ScoreScene, PlayScene, PauseScene];
const createScene = Scene => new Scene(config);

// instantiate all scenes with the config object
const initScenes = () => Scenes.map(createScene)

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {}
    },
    scene: Scenes
};



// create the Phaser game object
new Phaser.Game(config);


