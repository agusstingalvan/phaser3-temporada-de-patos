import PowerUp from "../PowerUp";
import { sharedInstance as events } from "../../scenes/EventCenter";
import Postal from "../Postal";

export default class NuclearBomb extends PowerUp{
    #scene;
    constructor({scene, x, y, texture, position, currentPlayer}){
        super({scene, x, y, texture, position, currentPlayer})
        this.#scene = scene;
    }
    add(player){

        // this.#scene.nuclearBombsGroup.add(this, this.#scene)
        // this.setX(player.x)
        // this.setY(player.y)
        // this.setData('owner', player.name)
        if(player.onHolidays) return
        events.emit('hide-dice');
        const props = {
            scene: this.#scene,
            animsName: 'nuclear-bomb-anims',
            shake: true,
            autoClose: false,
            autoChange: false,
            player: player
        }
        const postal = new Postal(props);
       
        this.delete();
        this.effect();
       
        setTimeout(()=>{
            postal.container.visible = false;
            player.changeTurn()
        }, 3000)
        
    }
    effect(){
        const players = this.#scene.players.filter((player)=> (player.name !== this.currentPlayer.name) && !player.onHolidays);
        for(let player of players){
            console.log(`Name: ${player.name}, esta en : ${player.currentPosition}`)
            // if(player.onHolidays) return;
            if(player.haveBand) player.haveBand = false;
            if (player.currentPosition <= 4){
                player.onlyMove(1000)
                console.log(`Name: ${player.name}, se mueve a : ${player.currentPosition}`)
            }
            else{
                player.changePosition(-4, false)
                console.log(`Name: ${player.name}, se mueve a : ${player.currentPosition}`)

            }
        }
    }
}