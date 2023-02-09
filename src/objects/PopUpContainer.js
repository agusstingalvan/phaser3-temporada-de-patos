import { sharedInstance as events } from "../scenes/EventCenter";
import Text from "./Text";

export default class PopUpContainer{
    container;
    scene;
    #text;
    #position;
    #elements;
    #isStore;
    constructor({scene, position, text, texture = 'popup-contenedor', scale = 1, btnClose = null, btnCloseSize = 30, changeTurn = false, player, isStore = false}){
        this.scene = scene.scene.scene;
        this.#text = (text)? text : null;
        this.#position = {
            x: (position)? position.x : this.scene.scale.width / 2,
            y: (position)? position.y : this.scene.scale.height / 2
        }
        this.#isStore = isStore;
        const background = this.scene.add.image(0, 0, texture)
        const txt = new Text(this.scene, 0, 0, this.#text)

        //Set the button close in the correct position. In the top-right
        const rightPosition = background.width / 2;
        const topPosition = background.texture.frames.__BASE.height / 2;

        const buttonClose = new Text(this.scene, rightPosition - 30, -topPosition + 30, 'X', {color: 'red', fontStyle: 'bold', fontSize: 30}).setInteractive({ useHandCursor: true }).on('pointerdown', ()=> {
            this.scene.sonidos.sound.btnSFX.play()
            this.hide(changeTurn, player)
        });
        
        //If exist the button, then create one in the container.
        (btnClose)? this.#elements = [background, txt, buttonClose] : this.#elements = [background, txt];

        
        this.container = this.scene.add.container(this.#position.x, this.#position.y, this.#elements).setScale(scale);
        this.container.visible = false;

        if(this.#isStore)this.container.visible = true;
    }
    addChild(child){
        this.container.add(child)
    }
    show(){
        this.container.visible = true;
        //Return false for the canOpenPopUp in the scene.
        this.scene.canOpenPopUp = false;
    }
    hide(changeTurn, player){
        this.container.visible = false;
        //Return true for the canOpenPopUp in the scene.
        this.scene.canOpenPopUp = true;
        if(changeTurn){
            this.container.visible = false;
            if(this.#isStore){
                events.emit('close-store', player, this)
            }
            setTimeout(()=>player.changeTurn(), 1000)
        }
    }
    canOpen(){
        return this.container.visible;
    }
}