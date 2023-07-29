import BaseScene from "./BaseScene";

class MenuScene extends BaseScene{

    constructor(config) {
        super("MenuScene",config);

        this.menu = [
            {scene: 'PlayScene', text: 'Play'},
            {scene: 'ScoreScene', text: 'Best Score'},
            {scene: 'null', text: 'Exit'},
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
     }


}

export default MenuScene;