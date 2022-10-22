export default class PopUpContainer{
    container;
    scene;
    #text;
    #position;
    #elements;
    constructor({scene, position, text, texture = 'popup-contenedor', scale = 1, btnClose = null, changeTurn = false, player}){
        this.scene = scene.scene.scene;
        this.#text = (text)? text : null;
        this.#position = {
            x: (position)? position.x : this.scene.scale.width / 2,
            y: (position)? position.y : this.scene.scale.height / 2
        }
        const background = this.scene.add.image(0, 0, texture)
        const txt = this.scene.add.text(0, 0, this.#text, {fontStyle: 'bold', fontSize: '18px'}).setOrigin(0.5)

        //Set the button close in the correct position. In the top-right
        const rightPosition = background.width / 2;
        const topPosition = background.texture.frames.__BASE.height / 2;

        const buttonClose = this.scene.add.text( rightPosition - 50, -topPosition + 20, 'X', {color: 'red', fontStyle: 'bold', fontSize: 30}).setInteractive({ useHandCursor: true }).on('pointerdown', ()=>this.hide(changeTurn, player));
        
        //If exist the button, then create one in the container.
        (btnClose)? this.#elements = [background, txt, buttonClose] : this.#elements = [background, txt];

        
        this.container = this.scene.add.container(this.#position.x, this.#position.y, this.#elements).setScale(scale);
        this.container.visible = false;
    }
    addChild(child){
        this.container.add(child)
    }
    show(){
        this.container.visible = true;
        //Return false for the canOpenPopUp in the scene.
        this.scene.canOpenPopUp = false;
        return false;
    }
    hide(changeTurn, player){
        this.container.visible = false;
        //Return true for the canOpenPopUp in the scene.
        this.scene.canOpenPopUp = true;
        if(changeTurn){
            player.changeTurn()
        }
        return true
    }
    canOpen(){
        return this.container.visible;
    }
}