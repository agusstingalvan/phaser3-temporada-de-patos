import PowerUp from "../PowerUp";
import { sharedInstance as events } from "../../scenes/EventCenter";
import Postal from "../Postal";

export default class NuclearBomb extends PowerUp{
    #scene;
    constructor({scene, x, y, texture, position, currentPlayer, type='nuclear-bomb' }){
        super({scene, x, y, texture, position, currentPlayer, type})
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
            if(player.getHaveBand()) player.brokenBand();
            if (player.getCurrentPosition() <= 4){
                player.onlyMove(1000)
            } else{
                player.changePosition(-4, false)
            }
        }
    }
}