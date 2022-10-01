export default class Button {
    #btn;
    constructor(scene, x, y, atlas, texture, callback, scale) {
        this.#btn = scene.add
            .image(x, y, atlas, texture)
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
            .on("pointerdown", () => callback()).setScale(scale)
    }
    show(){
        this.#btn.visible = true;
    }
    hide(){
        this.#btn.visible = false;
    }
}