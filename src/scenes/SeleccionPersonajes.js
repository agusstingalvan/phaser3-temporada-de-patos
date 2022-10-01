import Phaser from 'phaser'

export default class SeleccionPersonajes extends Phaser.Scene
{
    #players;
	constructor()
	{
		super('SeleccionPersonajes')
	}

	preload()
    {
    }

    create()
    {
        this.add.text(500, 500, 'Estas en SeleccionPersonajes')
        setTimeout(()=>{
            this.scene.start("Tablero", {player: this.#players} );
        }, 4000)
    }
}
