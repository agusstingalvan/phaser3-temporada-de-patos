export default class Button {
    container;
    #text;
    image;

    constructor(scene, x, y, atlas, texture, callback , text = null, textSize = 18, scale = 1)  {
        this.#text = scene.add.text(0, 0, text, {fontSize: textSize, fontStyle: 'bold', color: 'white', fontFamily: 'Montserrat'}).setOrigin(0.5);
        this.image =  scene.add
        .image(0, 0, atlas, texture)
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true })
        .on("pointerdown", () => {
            scene.sonidos.sound.btnSFX.play()
            callback();
        })
        .on("pointerover", () => this.container.setScale(scale + 0.1))
        .on("pointerout", () => this.container.setScale(scale))
        this.container = scene.add.container(x, y,[this.image, this.#text]).setScale(scale);
    }
    show(){
        this.container.visible = true;
    }
    hide(){
        this.container.visible = false;
    }
}