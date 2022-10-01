export default class PopUpContainer{
    container;
    scene;
    #text;
    #position;
    #elements;
    constructor({scene, position, text, texture = 'popup-contenedor', scale = 1, btnClose = null, setter}){
        this.scene = scene.scene.scene;
        this.#text = (text)? text : null;
        this.#position = {
            x: (position)? position.x : this.scene.scale.width / 2,
            y: (position)? position.y : this.scene.scale.height / 2
        }
        // this.setOpen = setter;
        const background = this.scene.add.image(0, 0, texture)
        const txt = this.scene.add.text(0, 0, this.#text, {fontStyle: 'bold', fontSize: '18px'}).setOrigin(0.5)

        //Set the button close in the correct position. In the top-right
        const rightPosition = background.width / 2;
        const topPosition = background.texture.frames.__BASE.height / 2;

        const buttonClose = this.scene.add.text( rightPosition - 50, -topPosition + 50, 'X', {color: 'red', fontStyle: 'bold', fontSize: 30}).setInteractive({ useHandCursor: true }).on('pointerdown', ()=>this.hide());
        
        //If exist the button, then create one in the container.
        (btnClose)? this.#elements = [background, txt, buttonClose] : this.#elements = [background, txt];

        
        this.container = this.scene.add.container(this.#position.x, this.#position.y, this.#elements).setScale(scale);
        this.container.visible = false;
    }
    show(){
        this.container.visible = true;
        //Return false for the canOpenPopUp in the scene.
        // this.setOpen(false)
        this.scene.canOpenPopUp = false;
        return false;
    }
    hide(){
        this.container.visible = false;
        //Return true for the canOpenPopUp in the scene.
        // this.setOpen(true)
        this.scene.canOpenPopUp = true;
        return true
    }
    canOpen(){
        return this.container.visible;
    }
}