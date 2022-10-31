import Postal from "../Postal";
import PowerUp from "../PowerUp";

export default class Hook extends PowerUp{
    #scene;
    #currentPlayer;
    #canChangeTurn = false
    constructor({scene, x, y, texture, position, currentPlayer}){
        super({scene, x, y, texture, position, currentPlayer})
        this.#scene = scene;
        this.#currentPlayer = currentPlayer;
    }
    
    //add() is equals of USE the powerup.
    add(player){
        if(player.getOnHolidays()) return
        this.effect(player);
        if(this.#canChangeTurn){
            this.delete();
            setTimeout(()=>{
                player.changeTurn()
            }, 3000)
        }
    }
    effect(player){
        const players = this.#scene.getPlayers().filter((player) => (player.getCurrentPosition() > this.#currentPlayer.getCurrentPosition()) && !player.get);

        if(players.length >= 1){ 
            const positonArray = players.map(player => {
                return  {position: player.getCurrentPosition(), player}
            });
            const positions = positonArray.sort((a,b) =>  a.position - b.position); 
            const playerCollide = positions[positions.length - 1].player;
            if(playerCollide.getHaveBand()) {
                playerCollide.setHaveBand(false)
                this.#canChangeTurn = true;
                this.delete();
                console.log('se roimpio el gancho y la curita')
                return
            }
            
            playerCollide.setCurrentPosition(player.getCurrentPosition());
            if(playerCollide.getCurrentPosition() <= 1){  
                const props = {
                    scene: this.#scene,
                    animsName: 'hook-anims',
                    autoClose: true,
                    player: player,
                    callback: ()=> playerCollide.onlyMove(1000),
                }
                const postal = new Postal(props);
            }else{ 
                const props = {
                    scene: this.#scene,
                    animsName: 'hook-anims',
                    autoClose: true,
                    player: player,
                    callback: ()=> playerCollide.changePosition(-1, false),
                }
                const postal = new Postal(props);
            }
            this.#canChangeTurn = true;
           
        }else {
            console.log('No puede usar el gancho porque no tienen ningun contricante delante de ti');
            this.#canChangeTurn = false;
        }
        
    }
}