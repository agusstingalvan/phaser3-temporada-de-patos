import Phaser from 'phaser'

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
    }
}
