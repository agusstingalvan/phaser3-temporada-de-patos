export default class PopUpContainer{
    #container;
    scene;
    #text;
    #position;    
    constructor(scene, position, text, texture = 'popup-contenedor', scale = 1){
        this.scene = scene.scene.scene;
        this.#text = (text)? text : null;
        this.#position = {
            x: (position)? position.x : this.scene.scale.width / 2,
            y: (position)? position.y : this.scene.scale.height / 2
        }

        const background = this.scene.add.image(0, 0, texture)
        const txt = this.scene.add.text(0, 0, this.#text, {fontStyle: 'bold', fontSize: '18px'}).setOrigin(0.5)
        const elements = [background, txt]
        this.#container = this.scene.add.container(this.#position.x, this.#position.y, elements).setScale(scale);
    }
}