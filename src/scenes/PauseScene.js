import BaseScene from "./BaseScene";

class PauseScene extends BaseScene{

    constructor(config) {
        super('PauseScene',config);

        this.menu = [
            {scene: 'play', text: 'Continue'},
            {scene: 'MenuScene', text: 'Exit'},
        ]

    }


    create(){
        super.create();
        this.createMenu(this.menu,(menuItem) =>  this.setupMenuEvents(menuItem));
    }

    setupMenuEvents(menuItem) {
        const textGO = menuItem.textGO;
        textGO.setInteractive();

        textGO.on('pointerover', () => {
            textGO.setStyle({fill: '#FF0'});

        })

        textGO.on('pointerout', () => {
            textGO.setStyle({fill: '#594c4c'});
        })

        textGO.on('pointerup', () => {
        console.log('Clicked on something')
        })
    }


}

export default PauseScene;