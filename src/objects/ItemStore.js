import PopUpContainer from "./PopupContainer";
import Bomb from "./powerups/Bomb";
import Hook from "./powerups/Hook";
import NuclearBomb from "./powerups/NuclearBomb";

export default class ItemStore {
    constructor({scene, items, player}){
        const props = {
            scene: scene,
            btnClose: true,
            isStore: true,
            changeTurn: true,
            player: player,
        }
        const popup = new PopUpContainer(props)
        popup.container.visible = true;
        let widthContainerItems = 0;
        let itemContainer;
        let containerItems = scene.add.container(0, 0, []);
        items.map((item, index)=>{
            if(player.getHaveDiscount()){
                item.price = item.price/2;
            }
            const image = scene.add.image(0, 0, item.texture)
            const rectangle = scene.add.rectangle(0, 0, image.width + 30, image.height + 30, '0x242424' )
            rectangle.visible = true;
            const name = scene.add.text(0, -image.height, item.name).setOrigin(0.5)
            const priceText = scene.add.text(0, image.height, `Price: $${item.price}`).setOrigin(0.5);
            priceText.setData('price', item.price)
            const btn = scene.add.text(0, image.height + 24, 'Comprar', {padding: 8, backgroundColor: '#ffffff', color: '#000000', fontStyle: 'bold', fontFamily: 'Montserrat'}).setOrigin(0.5)


            if(player.getWallet() >= item.price && player.getInventory().length < 2){
                btn.setInteractive({ useHandCursor: true }).on('pointerdown', ()=>{
                    if(player.getWallet() >= item.price && player.getInventory().length < 2){
                        console.log(player.getWallet())
                        player.setWallet(player.getWallet() - item.price)
                        btn.disableInteractive();
                        image.setTint('0x5c5c5c');
                        btn.setAlpha(.8)
                        switch(item.name.toLowerCase()){
                            case 'bomb':
                                const bomb = new Bomb({ scene: scene, x: player.x, y: player.y, texture: 'bomb', currentPlayer: player });
                                player.addPowerUp(bomb)
                                break;
                            case 'nuclear bomb':
                                const nuclearBomb = new NuclearBomb({ scene: scene, x: player.x, y: player.y, texture: 'nuclear-bomb', currentPlayer: player });
                                player.addPowerUp(nuclearBomb)
                                break;
                            case 'hook':
                                const hook = new Hook({ scene: scene, x: player.x, y: player.y, texture: 'hook', currentPlayer: player });
                                player.addPowerUp(hook)
                                break    
                            
                        }
                        if(player.getHaveDiscount()){
                            player.setHaveDiscount(false);
                        }
                        containerItems.list.map((container)=>{
                            let price = container.list[3].getData('price');
                            if(player.getWallet() < price || player.getInventory().length === 2){
                                container.list[4].disableInteractive();
                                container.list[4].setAlpha(.8);
                                container.list[2].setTint('0x5c5c5c');
                            }
                        })
                    }else{
                        btn.disableInteractive();
                        btn.setAlpha(.8);
                        image.setTint('0x5c5c5c');
                    }
                })
            }else{
                btn.disableInteractive();
                btn.setAlpha(.8);
                image.setTint('0x5c5c5c');
            }

            

            const positionX = index  * (rectangle.width + 20);
            itemContainer = scene.add.container(positionX, 0, [rectangle ,name ,image, priceText, btn])
            widthContainerItems = positionX;
            containerItems.add(itemContainer);
            popup.addChild(containerItems);
        })
        containerItems.setX(-(widthContainerItems/ 2))
        if(widthContainerItems > 386) {
            let width = (widthContainerItems - 386) / 100;
            popup.container.list[0].setScale(1 + width + 0.20)
        }
    }
}
