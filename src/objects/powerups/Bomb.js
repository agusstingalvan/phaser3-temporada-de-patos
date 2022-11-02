import PowerUp from "../PowerUp";
import { sharedInstance as events } from "../../scenes/EventCenter";

export default class Bomb extends PowerUp{
    #scene;
    constructor({scene, x, y, texture, position, currentPlayer, type="bomb"}){
        super({scene, x, y, texture, position, currentPlayer, type})
        this.#scene = scene;
    }
    //when player plant the bomb in the tablero.
    add(player){
        //If player on holiday. He can't put in the bomb. Else. He puts the bomb in the tablero.
        if(player.getOnHolidays()) return
        this.#scene.bombsGroup.add(this, this.#scene)
        this.setX(player.x)
        this.setY(player.y)
        this.setData('owner', player.getName())
        events.emit('hide-dice');
        this.delete()
        
        setTimeout(()=> player.changeTurn(), 3000)
    }
    effect(playerCollide){
        //He is call for the tablero.
        this.currentPlayer = playerCollide;
        this.anims.play('bomb-anims', true).on('animationcomplete', ()=> this.destroy());
        if (this.currentPlayer.getCurrentPosition() <= 5){
            this.currentPlayer.onlyMove(1000)
        }else{
            this.currentPlayer.changePosition(-5, false)
        }
        
    }
}