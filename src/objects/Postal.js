export default class Postal{
    container;
    #position;

    constructor({scene, position, texture = 'postal', scale = 1, animsName}){
        this.scene = scene.scene.scene;
        this.#position = {
            x: (position)? position.x : this.scene.scale.width / 2,
            y: (position)? position.y : this.scene.scale.height / 2
        }

        const textureSprite = animsName.slice(0, -6)
        const background = this.scene.add.image(0, 0, texture);
        const entidad = this.scene.add.sprite(0, (background.height / 2) - 90 , textureSprite)
        // entidad.setY(entidad.anims.currentFrame.frame.height)
        entidad.anims.play(animsName).setOrigin(0.5, 1).on('animationstart', ()=>{
            this.scene.camara.shake(400, 0.03, false, ()=>{
            })
            
        })
        
        const elements = [background, entidad]
        this.container = this.scene.add.container(this.#position.x, this.#position.y, elements).setScale(scale);
    }
}