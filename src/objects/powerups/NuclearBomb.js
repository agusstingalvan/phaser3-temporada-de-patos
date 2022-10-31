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
        if(player.getOnHolidays()) return
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
        
        setTimeout(()=>{
            this.effect();
            postal.container.visible = false;
            player.changeTurn()
        }, 3000)
        
    }
    effect(){
        const players = this.#scene.getPlayers().filter((player)=> (player.getName() !== this.currentPlayer.getName()) && !player.getOnHolidays());
        for(let player of players){
            // console.log(`Name: ${player.name}, esta en : ${player.currentPosition}`)
            if(player.getHaveBand()) player.setHaveBand(false);
            if (player.getCurrentPosition() <= 4){
                player.onlyMove(1000)
                // console.log(`Name: ${player.name}, se mueve a : ${player.currentPosition}`)
            }
            else{
                player.changePosition(-4, false)
                // console.log(`Name: ${player.name}, se mueve a : ${player.currentPosition}`)

            }
        }
    }
}