import Phaser from 'phaser'
import { sharedInstance as events } from './EventCenter';

export default class Interface extends Phaser.Scene{
    #slot1;
    #slot2;
    #buttonDice;
    #timerLabel;
    #nameLabel;
    #moneyLabel;
    #currentPlayer;
    constructor(){
        super("Interface")
    }
    create(){
        
        //Slots
       this.#slot1 = this.add.image(100, this.scale.height - 64, 'slot').setInteractive({ useHandCursor: true })
       .on("pointerdown", () => this.addPowerUp())
       .on("pointerover", (btn) => this.#slot1.setTint('0xc2c2c2'))
       .on("pointerout", (btn) => this.#slot1.setTint('0xe5e5e5'))

       this.#slot2 = this.add.image(174, this.scale.height - 64, 'slot').setInteractive({ useHandCursor: true })
       .on("pointerdown", () => console.log('slot2'))
       .on("pointerover", (btn) => this.#slot2.setTint('0xc2c2c2'))
       .on("pointerout", (btn) => this.#slot2.setTint('0xe5e5e5'))
        //Wallet
        this.#moneyLabel = this.add.text(272, this.scale.height - 64, '$:0', {fontSize: 32, fontStyle: 'bold'}).setOrigin(0.5)
       //Timer
       this.#timerLabel = this.add.text(this.scale.width/2, this.scale.height - 64, '15s', {fontSize: 36, fontStyle: 'bold'}).setOrigin(0.5)

        //TextName
       this.#nameLabel = this.add.text(this.scale.width - 240, this.scale.height - 64, '123456789', {fontSize: 32, fontStyle: 'bold'} ).setOrigin(0.5)

       //Button Dice
       this.#buttonDice = this.add.image(this.scale.width - 84, this.scale.height - 94, 'boton-dado').setInteractive({ useHandCursor: true })
       .on("pointerdown", () => this.handleDice())
       .on("pointerover", (btn) => this.#buttonDice.setTint('0xc2c2c2').setScale(1.2))
       .on("pointerout", (btn) => this.#buttonDice.setTint('0xe5e5e5').setScale(1))

       events.on('show-dice', ()=> {
        this.#buttonDice.visible = true;
        }, this)

       events.on('hide-dice', () => {
            this.#buttonDice.visible = false;
        }, this)
        
        events.on('update-money', (money) => {
            const text = `$:${money}`
            this.#moneyLabel.setText(text);
        })

        events.on('change-turn', (player)=> {
            //Change the interfaces with own properties of player, when change the turn
            this.#currentPlayer = player;
            this.#nameLabel.setText(this.#currentPlayer.name);
            
            const text = `$:${this.#currentPlayer.wallet}`;
            this.#moneyLabel.setText(text);
        }, this)
        

    }
    handleDice(){
        this.#currentPlayer.throwDice();
    }

}