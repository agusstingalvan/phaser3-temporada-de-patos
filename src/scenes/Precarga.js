import Phaser from 'phaser'

export default class Precarga extends Phaser.Scene
{
	constructor()
	{
		super('Precarga')
	}

	preload()
    {
        //Tilemaps
        this.load.tilemapTiledJSON("tableroTile", "assets/tilemaps/tablero.json");
        this.load.image("fondo-menu", 'assets/escenas/fondo-menu.png');


        //atlas backgrounds
        this.load.image("fondo-tablero", 'assets/escenas/tablero.png');
        this.load.atlas("atlas-backgrounds", 'assets/escenas/atlas-backgrounds.png', 'assets/escenas/atlas-backgrounds.json');

        
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
        this.load.image("reloj", 'assets/reloj.png');


        //PopUps
        this.load.image('popup-contenedor', 'assets/popups/popup-contenedor.png');
        this.load.image('popup-ayuda', 'assets/popups/popup-ayuda.png');
        this.load.image('popup-opciones', 'assets/popups/popup-opciones.png');
        this.load.image('popup-creditos', 'assets/popups/popup-creditos.png');


        //Buttons
        this.load.atlas("botones", 'assets/botones/atlas_botones_amarrillos.png', 'assets/botones/atlas_botones_amarrillos.json')
        this.load.image('boton-check', 'assets/botones/boton-check.png');
        this.load.image('boton-lapiz-edit', 'assets/botones/boton-lapiz-edit.png');


        //UserInterfaces
        this.load.image('slot', 'assets/interface/slot.png');
        this.load.image('boton-dado', 'assets/interface/boton-dado.png');
        this.load.spritesheet('boton-dado-pointer-spritesheet', 'assets/interface/boton-dado-pointer-spritesheet.png', {frameWidth: 128, frameHeight: 128});

        //Music
        this.load.audio('musicTablero', 'assets/sounds/music-tablero.mp3');
        this.load.audio('musicMain', 'assets/sounds/music-main-menu.mp3');

        //Sound Effects
        this.load.audio('movimiento', 'assets/sounds/movimiento3.mp3');
        this.load.audio('tirarDado', 'assets/sounds/sonido-dado.mp3');
        
    }

    create()
    {
        this.anims.create({
            key: "pato-bruja-idle-anims",
            frames: this.anims.generateFrameNumbers("pato-bruja-idle", {
                start: 0,
                end: 3,
            }),
            frameRate: 3,
            repeat: -1,
        });
        this.anims.create({
            key: "pato-verde-idle-anims",
            frames: this.anims.generateFrameNumbers("pato-verde-idle", {
                start: 0,
                end: 3,
            }),
            frameRate: 3,
            repeat: -1,
        });
        this.anims.create({
            key: "pato-recibido-idle-anims",
            frames: this.anims.generateFrameNumbers("pato-recibido-idle", {
                start: 0,
                end: 3,
            }),
            frameRate: 3,
            repeat: -1,
        });
        this.anims.create({
            key: "pato-galera-idle-anims",
            frames: this.anims.generateFrameNumbers("pato-galera-idle", {
                start: 0,
                end: 3,
            }),
            frameRate: 3,
            repeat: -1,
        });
        this.scene.start("Inicio");
    }
}
