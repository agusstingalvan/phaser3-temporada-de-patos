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
    init({players, sonidos}){
        this.#players = players
        this.sonidos = sonidos;
        console.log(this.#players)
    }

    create()
    {
        this.add.text(500, 500, 'Estas en Tablero')

    }

    changeTurn(player){

    }
    cronometer(){
        // #time
    }
}
