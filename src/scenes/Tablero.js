import Phaser from 'phaser'

export default class Tablero extends Phaser.Scene
{
    #players;
    #time;
    #boxes; //Group of casillas
    #interfaces;
    #slots; //Contain the power ups
    #timeTurn;
    
	constructor()
	{
		super('Tablero')
	}
    init({players}){
        this.#players = players
    }

    create()
    {
        this.add.text(500, 500, 'Estas en Tablero')
        setTimeout(()=>{
            this.scene.start("Ganador" );
        }, 4000)
    }

    changeTurn(player){

    }
    cronometer(){
        // #time
    }
}
