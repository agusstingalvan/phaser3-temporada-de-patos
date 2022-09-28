import Phaser from 'phaser'

export default class Precarga extends Phaser.Scene
{
	constructor()
	{
		super('Precarga')
	}

	preload()
    {
        this.load.image("fondo-menu", 'public/assets/escenas/fondo-menu.png')
        this.load.image("pato-recibido-idle", 'public/assets/patos/spritesheets/pato-recibido-idle.png')
        this.load.image("pato-recibido-move", 'public/assets/patos/spritesheets/pato-recibido-move.png')
        this.load.image("pato-verde-idle", 'public/assets/patos/spritesheets/pato-verde-idle.png')
        this.load.image("pato-verde-move", 'public/assets/patos/spritesheets/pato-verde-move.png')
        this.load.image("pato-bruja-idle", 'public/assets/patos/spritesheets/pato-bruja-idle.png')
        this.load.image("pato-bruja-move", 'public/assets/patos/spritesheets/pato-bruja-move.png')
        this.load.image("pato-galera-idle", 'public/assets/patos/spritesheets/pato-galera-idle.png')
        this.load.image("pato-galera-move", 'public/assets/patos/spritesheets/pato-galera-move.png')
        this.load.image("pointer", 'public/assets/patos/spritesheets/pointer-spritesheet.png')
        this.load.atlas("botones", 'public/assets/botones/atlas_botones_amarrillos.png', 'public/assets/botones/atlas_botones_amarrillos.json')
        
    }

    create()
    {
        this.scene.start("Inicio");
    }
}
