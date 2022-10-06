import Phaser from 'phaser'
import Button from '../objects/Button';

export default class Ganador extends Phaser.Scene
{
	constructor()
	{
		super('Ganador')
	}

	preload()
    {
    }

    create()
    {
        this.add.text(500, 500, 'Estas en Ganador')
        this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'atlas-backgrounds', "fondo-ganador");
        new Button(this, this.sys.game.config.width / 2 - 5, this.sys.game.config.height - 45, 'botones', "boton-volver", () => {
            this.scene.start("Inicio")
        })
        
    }
}
