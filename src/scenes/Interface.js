import Phaser from 'phaser'
import PopUpContainer from '../objects/PopupContainer';
import { sharedInstance as events } from './EventCenter';

export default class Interface extends Phaser.Scene{
    #slots = [];
    #slot1;
    #slot2;
    #buttonDice;
    #timerLabel;
    #nameLabel;
    #numberDiceLabel;
    #imageDice;
    #moneyLabel;
    #currentPlayer;
    constructor(){
        super("Interface")
    }
    create(){
        
        //Slots
       this.#slot1 = this.add.image(100, this.scale.height - 64, 'slot').setInteractive({ useHandCursor: true })
       .on("pointerdown", () => this.#slot1.useEffect())
       .on("pointerover", (btn) => this.#slot1.setTint('0xc2c2c2'))
       .on("pointerout", (btn) => this.#slot1.setTint('0xe5e5e5'))

       this.#slot2 = this.add.image(174, this.scale.height - 64, 'slot').setInteractive({ useHandCursor: true })
       .on("pointerdown", () => this.#slot2.useEffect())
       .on("pointerover", (btn) => this.#slot2.setTint('0xc2c2c2'))
       .on("pointerout", (btn) => this.#slot2.setTint('0xe5e5e5'))

       this.#slots = [this.#slot1, this.#slot2];
        //Wallet
        this.#moneyLabel = this.add.text(272, this.scale.height - 64, '$:0', {fontSize: 32, fontStyle: 'bold'}).setOrigin(0.5)
       //Timer
       this.#timerLabel = this.add.text(this.scale.width/2, this.scale.height - 64, '15s', {fontSize: 36, fontStyle: 'bold'}).setOrigin(0.5)

        //TextName
       this.#nameLabel = this.add.text(this.scale.width - 240, this.scale.height - 64, '123456789', {fontSize: 32, fontStyle: 'bold'} ).setOrigin(0.5);

       //Number of dice
       this.#imageDice = this.add.image(this.scale.width / 2, -32, 'ticket-dice')
       this.#numberDiceLabel = this.add.text(this.scale.width / 2, -32, '0', {fontSize: 32, fontStyle: 'bold', color: '242424'} ).setOrigin(0.5);
       this.#imageDice.visible = true;
       this.#numberDiceLabel.visible = false;

       //Button Dice
       this.#buttonDice = this.add.image(this.scale.width - 84, this.scale.height - 94, 'boton-dado').setInteractive({ useHandCursor: true })
       .on("pointerdown", () => this.handleDice())
       .on("pointerover", (btn) => this.#buttonDice.setTint('0xc2c2c2').setScale(1.2))
       .on("pointerout", (btn) => this.#buttonDice.setTint('0xe5e5e5').setScale(1))

       events.on('show-dice', ()=> {
        this.#buttonDice.visible = true;
        this.#slots.map((slot, index)=>{
            slot.visible = true
            //Esta logica es sobreescrita en algun lugar
            const image = slot?.image;
            if(image) slot.image.visible = true; 
           })
        }, this)

       events.on('hide-dice', () => {
           this.#buttonDice.visible = false;
           this.#slots.map((slot, index)=>{
            slot.visible = false;
            //Esta logica es sobreescrita en algun lugar
            const image = slot?.image;
            if(image) slot.image.visible = false; 
           })
        }, this)
        
        events.on('update-money', (money) => {
            const text = `$:${money}`
            this.#moneyLabel.setText(text);
        })
        events.on('open-store', (player) => {
            console.log('open store');
            const props = {
                scene: player.tablero,
                btnClose: true,
                changeTurn: true,
                player: player
            }
            const popup = new PopUpContainer(props)
            popup.container.visible = true;
            const items = [{}];
        })

        events.on('change-turn', (player)=> {
            this.#currentPlayer = player;
            //Change the interfaces with own properties of player, when change the turn
            this.updateName(player)

            const wallet = player.wallet;
            this.updateWallet(wallet);

            const inventory = player.inventory;
            this.updateSlots(inventory, player)
        }, this)
    }
    handleDice(){
        this.#currentPlayer.throwDice();
        this.#numberDiceLabel.setText(this.#currentPlayer.numberDice);
        const height = (this.scale.height / 2) - 320;
        this.#imageDice.setY(-32)
        this.#numberDiceLabel.setY(-32)

        this.tweens.add({
            targets: this.#imageDice,
            x: this.scale.width / 2,
            y: height,
            ease: "Sine.easeInOut",
            duration: 1500,
            repeat: 0,
            yoyo: true,
        })
        this.tweens.add({
            targets: this.#numberDiceLabel,
            x: this.scale.width / 2,
            y: height,
            ease: "Sine.easeInOut",
            duration: 1500,
            repeat: 0,
            yoyo: true,
            onStart: () =>{
                this.#imageDice.visible = true;
                this.#numberDiceLabel.visible = true;
            },
            onComplete: () =>{
                this.#imageDice.visible = false;
                this.#numberDiceLabel.visible = false;
            }
        })
    }
    updateName(player){
        this.#nameLabel.setText(this.#currentPlayer.name);
    }
    updateWallet(wallet){
        const text = `$:${wallet}`;
        this.#moneyLabel.setText(text);
    }

    updateSlots(inventory, player){
        this.#slots.map((slot)=> {
            slot?.image?.destroy();
            slot.useEffect = ()=>{
                console.log('vacio')
            }
        });
        inventory.map((item, index)=> {
            const {x, y} = this.#slots[index];
            const {key} = item.texture;
            this.#slots[index].image = this.add.image(x, y, key).setOrigin(0.5).setScale(0.7);
            events.on('delete-item', (element)=> {
                if(element === item){
                    this.#slots[index].image.destroy();
                }
            })
            this.#slots[index].useEffect = () =>{
                item.add(player);
            }
        })
    }

}