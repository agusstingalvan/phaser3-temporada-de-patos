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
        this.load.atlas("atlas-backgrounds", 'assets/escenas/atlas-backgrounds.png', 'assets/escenas/atlas-backgrounds.json')

        //Statics sprites of "duckus"
        this.load.atlas('atlas-patos-statics', 'assets/patos/atlas-patos-statics.png', 'assets/patos/atlas-patos-statics.json')
        //Spritesheets of "duckus"
        this.load.spritesheet("pato-recibido-idle", 'assets/patos/spritesheets/pato-recibido-idle.png', {frameWidth: 64, frameHeight: 64})
        this.load.spritesheet("pato-recibido-move", 'assets/patos/spritesheets/pato-recibido-move.png', {frameWidth: 64, frameHeight: 64})
        this.load.spritesheet("pato-verde-idle", 'assets/patos/spritesheets/pato-verde-idle.png', {frameWidth: 64, frameHeight: 64})
        this.load.spritesheet("pato-verde-move", 'assets/patos/spritesheets/pato-verde-move.png', {frameWidth: 64, frameHeight: 64})
        this.load.spritesheet("pato-bruja-idle", 'assets/patos/spritesheets/pato-bruja-idle.png', {frameWidth: 64, frameHeight: 64})
        this.load.spritesheet("pato-bruja-move", 'assets/patos/spritesheets/pato-bruja-move.png', {frameWidth: 64, frameHeight: 64})
        this.load.spritesheet("pato-galera-idle", 'assets/patos/spritesheets/pato-galera-idle.png', {frameWidth: 64, frameHeight: 64})
        this.load.spritesheet("pato-galera-move", 'assets/patos/spritesheets/pato-galera-move.png', {frameWidth: 64, frameHeight: 64})

        //Utils
        this.load.image("pointer", 'assets/patos/spritesheets/pointer-spritesheet.png')

        //PopUps
        this.load.image('popup-contenedor', 'assets/popups/popup-contenedor.png');
        this.load.image('popup-ayuda', 'assets/popups/popup-ayuda.png');
        this.load.image('popup-opciones', 'assets/popups/popup-opciones.png');
        this.load.image('popup-creditos', 'assets/popups/popup-creditos.png');
        //UserInterfaces
        this.load.atlas("botones", 'assets/botones/atlas_botones_amarrillos.png', 'assets/botones/atlas_botones_amarrillos.json')
        this.load.image('boton-check', 'assets/botones/boton-check.png');
        this.load.image('boton-lapiz-edit', 'assets/botones/boton-lapiz-edit.png');
        //Music
        this.load.audio('musicTablero', 'assets/sounds/music-tablero.mp3');
        this.load.audio('musicMain', 'assets/sounds/music-main-menu.mp3');

        //Sound Effects
        this.load.audio('movimiento', 'assets/sounds/movimiento3.mp3');
        this.load.audio('tirarDado', 'assets/sounds/sonido-dado.mp3');
        
    }

    create()
    {
        this.scene.start("Inicio");
    }
}
