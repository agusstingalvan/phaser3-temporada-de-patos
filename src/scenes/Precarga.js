import Phaser from 'phaser'

export default class Precarga extends Phaser.Scene
{
	constructor()
	{
		super('Precarga')
	}

	preload()
    {
        this.load.image("reloj", 'assets/reloj.png');
        this.load.image("fondo-menu", 'assets/escenas/fondo-menu.png')
        this.load.image("pato-recibido-idle", 'assets/patos/spritesheets/pato-recibido-idle.png')
        this.load.image("pato-recibido-move", 'assets/patos/spritesheets/pato-recibido-move.png')
        this.load.image("pato-verde-idle", 'assets/patos/spritesheets/pato-verde-idle.png')
        this.load.image("pato-verde-move", 'assets/patos/spritesheets/pato-verde-move.png')
        this.load.image("pato-bruja-idle", 'assets/patos/spritesheets/pato-bruja-idle.png')
        this.load.image("pato-bruja-move", 'assets/patos/spritesheets/pato-bruja-move.png')
        this.load.image("pato-galera-idle", 'assets/patos/spritesheets/pato-galera-idle.png')
        this.load.image("pato-galera-move", 'assets/patos/spritesheets/pato-galera-move.png')
        this.load.image("pointer", 'assets/patos/spritesheets/pointer-spritesheet.png')
        this.load.atlas("botones", 'assets/botones/atlas_botones_amarrillos.png', 'assets/botones/atlas_botones_amarrillos.json')
        
    }

    create()
    {
        this.scene.start("Inicio");
    }
}
