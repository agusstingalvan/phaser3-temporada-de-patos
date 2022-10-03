import Phaser from 'phaser'

export default class Interface extends Phaser.Scene{
    #slot1;
    #slot2;
    #buttonDice;
    #timerLabel;
    constructor(){
        super("Interface")
    }
    
    create(){
        //Slots
       this.#slot1 = this.add.image(100, this.scale.height - 64, 'slot').setInteractive({ useHandCursor: true })
       .on("pointerdown", () => console.log('slot1'))
       .on("pointerover", (btn) => this.#slot1.setTint('0xc2c2c2'))
       .on("pointerout", (btn) => this.#slot1.setTint('0xe5e5e5'))

       this.#slot2 = this.add.image(174, this.scale.height - 64, 'slot').setInteractive({ useHandCursor: true })
       .on("pointerdown", () => console.log('slot2'))
       .on("pointerover", (btn) => this.#slot2.setTint('0xc2c2c2'))
       .on("pointerout", (btn) => this.#slot2.setTint('0xe5e5e5'))

       //Timer
       this.#timerLabel = this.add.text(this.scale.width/2, this.scale.height - 64, '15s', {fontSize: 36, fontFamily: 'bold'}).setOrigin(0.5)

       //Button Dice
       this.#buttonDice = this.add.image(this.scale.width - 84, this.scale.height - 94, 'boton-dado').setInteractive({ useHandCursor: true })
       .on("pointerdown", () => console.log('slot2'))
       .on("pointerover", (btn) => this.#buttonDice.setTint('0xc2c2c2').setScale(1.1))
       .on("pointerout", (btn) => this.#buttonDice.setTint('0xe5e5e5').setScale(1))
    }
}