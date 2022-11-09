import { sharedInstance as events } from "../scenes/EventCenter";

export default class PowerUp extends Phaser.Physics.Arcade.Sprite{
    #scene;
    currentPlayer;
    #position;
    type = ''
    constructor({scene, x, y, texture, type, position, currentPlayer }){
        super(scene, x, y, texture)
        this.#position = position;
        this.currentPlayer = currentPlayer;
        this.#scene = scene;
        this.type = type;
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
    }
    delete(){
        this.currentPlayer.setInventory(this.currentPlayer.getInventory().filter((item) => item.texture.key !== this.texture.key)); 
        events.emit('delete-item', this.type);
    }
    effect(){
        this.destroy();
    }
}