export default class Postal{
    container;
    #position;

    constructor({scene, position, texture = 'postal', scale = 1, image, animsName = '', shake = false, autoClose = true, text = undefined, autoChange = false, player, nuclear}){
        this.scene = scene.scene.scene;
        this.#position = {
            x: (position)? position.x : this.scene.scale.width / 2,
            y: (position)? position.y : this.scene.scale.height / 2
        }

        const textureSprite = (animsName.includes('anims')? animsName.slice(0, -6) : null)
        const background = this.scene.add.image(0, 0, texture);
        const imageStatic = this.scene.add.sprite(0, 0, image)
        const entidad = (textureSprite)? this.scene.add.sprite(0, (background.height / 2) - 90 , textureSprite):null;
        const textLabel = this.scene.add.text(0, (background.height / 2) - 100, (text)? text: null, {fontSize: 18, fontStyle: 'bold', color: '242424', fontFamily: 'Montserrat'}).setOrigin(0.5);

        let elements;
        if(image){
            if(image === 'holidays') {
                imageStatic.setScale(0.8)
                textLabel.setY(textLabel.y + 28)
            }
            elements = [background, imageStatic, textLabel];
            setTimeout(()=>{
                if(autoClose){
                    this.container.visible = false;
                }
            }, 3000)
        }
        if(animsName){
            entidad.anims.play(animsName).setOrigin(0.5, 1).on('animationstart', ()=>{
                if(shake){
                    this.scene.camara.shake(400, 0.03, false, ()=>{
                    })
                }
                
            }).on('animationcomplete', ()=>{
                if(autoClose){
                    this.container.visible = false;
                    if(autoChange){
                        player?.loseTurn();
                    }
                }
                
            }).setScale((animsName) === 'pan-anims'? .8 : 1)
            elements =  [background, entidad, textLabel];
        }
        
         
        this.container = this.scene.add.container(this.#position.x, this.#position.y, elements).setScale(scale);
    }
}
