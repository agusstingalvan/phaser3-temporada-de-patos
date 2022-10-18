export default class Postal{
    container;
    #position;

    constructor({scene, position, texture = 'postal', scale = 1, animsName, shake = false, autoClose = true, text = undefined}){
        this.scene = scene.scene.scene;
        this.#position = {
            x: (position)? position.x : this.scene.scale.width / 2,
            y: (position)? position.y : this.scene.scale.height / 2
        }

        const textureSprite = animsName.slice(0, -6)
        const background = this.scene.add.image(0, 0, texture);
        const entidad = this.scene.add.sprite(0, (background.height / 2) - 90 , textureSprite)
        const textLabel = this.scene.add.text(0, (background.height / 2) - 100, (text)? text: null, {fontSize: 18, fontStyle: 'bold', color: '242424'}).setOrigin(0.5)

        
        entidad.anims.play(animsName).setOrigin(0.5, 1).on('animationstart', ()=>{
            if(shake){
                this.scene.camara.shake(400, 0.03, false, ()=>{
                })
            }
            
        }).on('animationcomplete', ()=>{
            if(autoClose){
                this.container.visible = false;
            }
        }).setScale((animsName) === 'pan-anims'? .8 : 1)
        
        const elements = [background, entidad, textLabel]
        this.container = this.scene.add.container(this.#position.x, this.#position.y, elements).setScale(scale);
    }
}