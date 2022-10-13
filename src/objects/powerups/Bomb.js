import PowerUp from "../PowerUp";
import { sharedInstance as events } from "../../scenes/EventCenter";

export default class Bomb extends PowerUp{
    #scene;
    constructor({scene, x, y, texture, position, currentPlayer}){
        super({scene, x, y, texture, position, currentPlayer})
        this.#scene = scene;
    }
    add(player){

        this.#scene.bombsGroup.add(this, this.#scene)
        this.setX(player.x)
        this.setY(player.y)
        this.setData('owner', player.name)
        events.emit('hide-dice');
        this.delete()
        
        setTimeout(()=>{
            player.changeTurn()
        }, 3000)
    }
    effect(playerCollide){
        //Is call for the tablero.
        this.currentPlayer = playerCollide
        if (this.currentPlayer.currentPosition <= 5){
            this.currentPlayer.soloMover(1)
        }
        else{
            this.currentPlayer.mover(-5)
            ///CAMBIAR LA LOGICA DEL CAMBIAR TURNO
        }
        this.destroy()
        // setTimeout(()=>, 1000)
    }
}