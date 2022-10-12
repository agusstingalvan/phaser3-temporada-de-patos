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
        player.changeTurn()
        // setTimeout(()=>{
        // }, 3000)
    }
    effect(playerCollide){
        this.currentPlayer = playerCollide
        if (this.currentPlayer.currentPosition <= 5){
            this.currentPlayer.onlyMove(1)
        }
        else{
            this.currentPlayer.changePosition(-5)
        }
        this.destroy()
        // setTimeout(()=>, 1000)
    }
}