import Phaser from 'phaser'
import ItemStore from '../objects/ItemStore';
import Text from '../objects/Text';
import { sharedInstance as events } from './EventCenter';

export default class Interface extends Phaser.Scene{
    #slots = [];
    #slot1;
    #slot2;
    #buttonDice;
    #band;
    #discount;
    #nameLabel;
    #numberDiceLabel;
    #imageDice;
    #imageDiceFail;
    #imageDiceRight;
    #moneyLabel;
    #currentPlayer;
    #openStore = false;
    constructor(){
        super("Interface")
    }
    init(data){
        this.sonidos = data.sonidos
    }
    create(){
        //Slots
       this.#slot1 = this.add.image(130, this.scale.height - 64, 'slot').setInteractive({ useHandCursor: true })
       .on("pointerdown", () => this.#slot1.image.useEffect())
       .on("pointerover", (btn) => this.#slot1.setTint('0xc2c2c2'))
       .on("pointerout", (btn) => this.#slot1.setTint('0xe5e5e5'))
       this.#slot2 = this.add.image(220, this.scale.height - 64, 'slot').setInteractive({ useHandCursor: true })
       .on("pointerdown", () => this.#slot2.image.useEffect())
       .on("pointerover", (btn) => this.#slot2.setTint('0xc2c2c2'))
       .on("pointerout", (btn) => this.#slot2.setTint('0xe5e5e5'))

       //Reset the properties of slots
        this.#slot1.image = this.add.image();
        this.#slot1.image.useEffect = ()=> null;
        this.#slot2.image = this.add.image();
        this.#slot2.image.useEffect = ()=> null;

        //Add a array to the slot
        this.#slots = [this.#slot1, this.#slot2];


        //Wallet
        this.#moneyLabel = this.add.text(280, this.scale.height - 64, '$0', {fontSize: 32, fontStyle: 'bold', color: 'white', fontFamily: 'Montserrat'}).setOrigin(0, 0.5)

        
        //Add image of band
        this.#band = this.add.image(this.scale.width/2, this.scale.height - 64, 'band');
        this.#discount = this.add.image((this.scale.width/2) - 74, this.scale.height - 64, 'discount');
        this.#discount.setScale(0.8)
        this.#discount.visible = false;
        //TextName
       this.#nameLabel = this.add.text(this.scale.width - 240, this.scale.height - 64, '123456789', {fontSize: 32, fontStyle: 'bold', color: 'white', fontFamily: 'Montserrat'} ).setOrigin(0.5);

       //Number of dice and image of the dice.
       this.#imageDice = this.add.image(this.scale.width / 2, -32, 'ticket-dice')
       this.#imageDiceFail = this.add.image(this.scale.width / 2, -32, 'ticket-dice-fail')
       this.#imageDiceRight = this.add.image(this.scale.width / 2, -32, 'ticket-dice-right')
       this.#numberDiceLabel = this.add.text(this.scale.width / 2, -32, '0', {fontSize: 32, fontStyle: 'bold', color: '242424', fontFamily: 'Montserrat'} ).setOrigin(0.5);
       this.#imageDice.visible = false;
       this.#numberDiceLabel.visible = false;

       //Button Dice
       this.#buttonDice = this.add.image(this.scale.width - 84, this.scale.height - 94, 'boton-dado').setInteractive({ useHandCursor: true })
       .on("pointerdown", () => {
            this.sonidos.sound.tirarDadoSFX.play();
            this.handleDice()
       })
       .on("pointerover", (btn) => this.#buttonDice.setTint('0xc2c2c2').setScale(1.2))
       .on("pointerout", (btn) => this.#buttonDice.setTint('0xe5e5e5').setScale(1))

       events.on('show-dice', ()=> {
        this.#buttonDice.visible = true;
        this.#slots.map((slot, index)=>{
            this.enableSlot(slot)
           })
        }, this)

       events.on('hide-dice', () => {
           this.#buttonDice.visible = false;
           this.#slots.map((slot, index)=>{
                this.disableSlot(slot)
           })
        }, this)

        events.on('open-store', (player) => {
            this.#openStore = true;
            if(this.#openStore) this.#slots.map((slot) => this.disableSlot(slot));

            const items = [{name: 'Bomb', price: 300, texture: 'bomb'}, {name: 'Nuclear Bomb', price: 600, texture: 'nuclear-bomb'},  {name: 'Hook', price: 900, texture: 'hook'}]
            const props  = { scene: player.getTablero(), items, player: player}
            const popup = new ItemStore(props);
        })
        events.on('close-store', (player, popup)=>{
            this.#openStore = false;
            this.#slots.map((slot) => this.enableSlot(slot));
        })
        
        events.on('change-turn', (player)=> {
            this.#currentPlayer = player;
            //Change the interfaces with own properties of player, when change the turn
            const name = this.#currentPlayer.getName();
            this.updateName(name)

            const wallet = player.getWallet();
            this.updateWallet(wallet);

            const inventory = player.getInventory();
            this.updateSlots(inventory, player);

            (player.getHaveBand()) ? this.#band.visible = true : this.#band.visible = false;
            (player.getHaveDiscount()) ? this.#discount.visible = true : this.#discount.visible = false;
        }, this)
    }
    enableSlot(slot){
        slot.setInteractive({ useHandCursor: true })
        slot.clearTint()
    }
    disableSlot(slot){
        slot.disableInteractive()
        slot.setTint('0xc2c2c2')
    }
    handleDice(){
        this.#currentPlayer.throwDice();
        this.#numberDiceLabel.setText(this.#currentPlayer.getNumberDice());
        
        const height = (this.scale.height / 2) - 320;
        this.#imageDice.setY(-32)
        this.#imageDiceFail.setY(-32)
        this.#imageDiceRight.setY(-32)
        this.#numberDiceLabel.setY(-32)

        //PopUpDice for holidays STATE.
        let popupDice = '';
        if(this.#currentPlayer.getOnHolidays() && this.#currentPlayer.getNumberDice() !== 4){
            popupDice = this.#imageDiceFail;
        }else if(this.#currentPlayer.getWaitOnHolidays() && this.#currentPlayer.getNumberDice() == 4){
            popupDice = this.#imageDiceRight;
            this.#currentPlayer.setWaitOnHolidays(false);
        }else{
            popupDice = this.#imageDice;
        }
        if(!this.popupDice ){
            this.popupDice = this.#imageDice
        }
        this.tweens.add({
            targets: popupDice,
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
    updateName(name){
        this.#nameLabel.setText(name);
    }
    updateWallet(wallet){
        const text = `$${wallet}`;
        this.#moneyLabel.setText(text);
    }

    updateSlots(inventory, player){
        this.#slots.map((slot) => {
            slot?.image?.destroy();
            slot.image.useEffect = () => null;
        });
        
        inventory.map((item, index)=> {
            if(player.getOnHolidays()) return this.#slots.map((slot)=> this.disableSlot(slot));

            const {x, y} = this.#slots[index];
            const {key} = item.texture;
            this.#slots[index].image = this.add.image(x, y, key).setOrigin(0.5).setScale(0.7);
            events.on('delete-item', (typeElement)=> {
                if(typeElement === item) {
                    this.#slots[index].image.destroy();
                    this.#slots[index].image.useEffect = () => null;
                }
            })
            this.#slots[index].image.useEffect = () => item.add(player);
        })
    }

}