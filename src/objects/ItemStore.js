import PopUpContainer from "./PopupContainer";

export default class ItemStore {
    #items = [];
    constructor({scene, items, player}){
        console.log('mundo')
        console.log(items)
        const props = {
            scene: scene,
            btnClose: true,
            changeTurn: true,
            player: player,
        }
        const popup = new PopUpContainer(props)
        popup.container.visible = true;
        
        items.map((item, index)=>{
            const image = scene.add.image(0, 0, item.texture)
            console.log()
            const rectangle = scene.add.rectangle(- (popup.container.x / 2), 0, image.width + 30, image.height + 30, '0x242424' )
            const name = scene.add.text(0, -image.height, item.name).setOrigin(0.5)
            const price = scene.add.text(0, image.height + 10, `Price: ${item.price}`).setOrigin(0.5)
            let itemContainer = scene.add.container(index  * (rectangle.width + 40), 0, [rectangle ,name ,image, price])
            
            this.#items.push(itemContainer);
            popup.addChild(itemContainer);
            
        })
        console.log(this.#items)
    }
}
