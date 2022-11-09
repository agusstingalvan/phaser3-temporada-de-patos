export default class Button {
    btn;
    #text;
    image;

    constructor(scene, x, y, atlas, texture, callback , text = null, textSize = 18, scale = 1)  {
        this.#text = scene.add.text(0, 0, text, {fontSize: textSize, fontStyle: 'bold', color: 'white', fontFamily: 'Montserrat'}).setOrigin(0.5);
        this.image =  scene.add
        .image(0, 0, atlas, texture)
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true })
        .on("pointerdown", () => callback())
        .on("pointerover", () => this.btn.setScale(scale + 0.1))
        .on("pointerout", () => this.btn.setScale(scale))
        this.btn = scene.add.container(x, y,[this.image, this.#text]).setScale(scale);
    }
    show(){
        this.btn.visible = true;
    }
    hide(){
        this.btn.visible = false;
    }
}