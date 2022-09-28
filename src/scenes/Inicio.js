import Phaser from 'phaser'

export default class Inicio extends Phaser.Scene
{
	constructor()
	{
		super('Inicio')
	}
    init(data){}
    create()
    {   
        this.add.image(0, 0, "fondo-menu")
        this.add.text(500, 500, 'Estas en inicio')
        setTimeout(()=>{
            this.scene.start("SeleccionPersonajes" );
        }, 4000)

    }
}
