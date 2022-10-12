import { sharedInstance as events } from "../scenes/EventCenter";

export default class PowerUp extends Phaser.Physics.Arcade.Sprite{
    #scene;
    currentPlayer;
    #position;
    constructor({scene, x, y, texture, position, currentPlayer}){
        super(scene, x, y, texture)
        this.#position = position;
        this.currentPlayer = currentPlayer;
        this.#scene = scene;
        this.setScale(0.5);
    }
    add(player){
        this.#scene.add.existing(this);
        this.#scene.physics.add.existing(this);
        this.body.allowGravity = false;
        this.setCollideWorldBounds(true);
        
        this.setX(player.x)
        this.setY(player.y)
        this.setScale(0.7);

        events.emit('hide-dice');
        player.changeTurn()
        // setTimeout(()=>{
        // }, 3000)
    }
    delete(){
        this.currentPlayer.inventory = this.currentPlayer.inventory.filter((item) => item !== this);
        events.emit('delete-item', this);
    }
    effect(){
        console.log('No hay efecto')
        this.destroy();
    }
}