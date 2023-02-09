import Button from "./Button";
import PopUpContainer from "./PopupContainer";
import Bomb from "./powerups/Bomb";
import Hook from "./powerups/Hook";
import NuclearBomb from "./powerups/NuclearBomb";

export default class ItemStore {
    popup
    constructor({scene, items, player}){
        const props = {
            scene: scene,
            btnClose: true,
            btnCloseSize: 60,
            isStore: true,
            changeTurn: true,
            player: player,
            texture: 'tienda'
        }
        this.popup = new PopUpContainer(props);
        let widthContainerItems = 0;
        let itemContainer;
        let containerItems = scene.add.container(0, 0, []);
        items.map((item, index)=>{
            if(player.getHaveDiscount()) item.price = item.price/2;

            const image = scene.add.image(0, 0, item.texture)
            const rectangle = scene.add.rectangle(0, 0, image.width + 30, image.height + 30, '0x242424' )
            rectangle.visible = false;
            const button = new Button(scene, 0, image.height + 48, 'atlas-botones', "contenedores-madera", ()=>null, `$${item.price}`, 36, 0.7 );
            const btnContainer = button.container
            button.image.setData('price', item.price)
            
            if(player.getWallet() >= item.price && player.getInventory().length < 2){
                button.image.setInteractive({ useHandCursor: true }).on('pointerdown', ()=>{
                    if(player.getWallet() >= item.price && player.getInventory().length < 2){
                        player.setWallet(player.getWallet() - item.price)
                        this.disableButton(button, btnContainer, image)
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

                        if(player.getHaveDiscount()) player.setHaveDiscount(false);

                        containerItems.list.map((container)=>{
                            let price = container.list[2].list[0].getData('price');
                            if(player.getWallet() < price || player.getInventory().length === 2){
                                container.list[2].disableInteractive();
                                container.list[2].setAlpha(.6);
                                container.list[1].setTint('0x5c5c5c');
                            }
                        })
                    }else{
                        this.disableButton(button, btnContainer, image)
                    }
                })
            }else{
                this.disableButton(button, btnContainer, image)
            }
            
            const positionX = index  * (rectangle.width + 50);
            itemContainer = scene.add.container(positionX, 0, [rectangle, image, btnContainer])
            widthContainerItems = positionX;
            containerItems.add(itemContainer);
            this.popup.addChild(containerItems);
        })

        containerItems.setX(-(widthContainerItems/ 2))
        if(widthContainerItems > 410) {
            let width = (widthContainerItems - 410) / 100;
            this.popup.container.list[0].setScale(1 + width + 0.20)
        }
    }
    disableButton(buttonImage, btnContainer, image){
        buttonImage.image.disableInteractive();
        btnContainer.setAlpha(.6);
        image.setTint('0x5c5c5c');
    }
}
