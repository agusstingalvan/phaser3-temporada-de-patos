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

        this.load.image("invisible", 'assets/capa-invisible.png');

        //Statics sprites of "ducks"
        this.load.atlas('atlas-patos-statics', 'assets/patos/atlas-patos-statics.png', 'assets/patos/atlas-patos-statics.json')

        //Pointer of ducks
        this.load.image("point", 'assets/pointers/point.png');
        this.load.spritesheet("pointer-duck", 'assets/pointers/pointer-spritesheet.png', {frameWidth: 64, frameHeight: 64})

        //Spritesheets of "ducks"
        this.load.spritesheet("pato-recibido-idle", 'assets/patos/spritesheets/pato-recibido-idle.png', {frameWidth: 64, frameHeight: 64})
        this.load.spritesheet("pato-recibido-move", 'assets/patos/spritesheets/pato-recibido-move.png', {frameWidth: 64, frameHeight: 64})
        this.load.spritesheet("pato-verde-idle", 'assets/patos/spritesheets/pato-verde-idle.png', {frameWidth: 64, frameHeight: 64})
        this.load.spritesheet("pato-verde-move", 'assets/patos/spritesheets/pato-verde-move.png', {frameWidth: 64, frameHeight: 64})
        this.load.spritesheet("pato-bruja-idle", 'assets/patos/spritesheets/pato-bruja-idle.png', {frameWidth: 64, frameHeight: 64})
        this.load.spritesheet("pato-bruja-move", 'assets/patos/spritesheets/pato-bruja-move.png', {frameWidth: 64, frameHeight: 64})
        this.load.spritesheet("pato-galera-idle", 'assets/patos/spritesheets/pato-galera-idle.png', {frameWidth: 64, frameHeight: 64})
        this.load.spritesheet("pato-galera-move", 'assets/patos/spritesheets/pato-galera-move.png', {frameWidth: 64, frameHeight: 64})




        this.load.image("postal", 'assets/postal/postal.png');
        //PowerUps
        this.load.image("bomb", 'assets/powerups/bomb/bomb.png');
        this.load.image("nuclear-bomb", 'assets/powerups/nuclear-bomb/nuclear-bomb.png');
        this.load.image("yunque", 'assets/powerups/yunque/yunque.png');

        this.load.spritesheet("bomb-spritesheet", 'assets/powerups/bomb/bomb-spritesheet.png', {frameWidth: 64, frameHeight: 64})
        this.load.spritesheet("nuclear-bomb-spritesheet", 'assets/powerups/nuclear-bomb/nuclear-bomb-spritesheet.png', {frameWidth: 575, frameHeight: 315})

        //Consecuencias - Impacts
        this.load.spritesheet("cerdo-spritesheet", 'assets/powerups/cerdo/cerdo-spritesheet.png', {frameWidth: 575, frameHeight: 315})
        this.load.spritesheet("pan-spritesheet", 'assets/powerups/pan/pan-spritesheet.png', {frameWidth: 575, frameHeight: 315})
        //Utils
        this.load.image("reloj", 'assets/reloj.png');
        this.load.image("ticket-dice", 'assets/pointers/ticket-dice.png');


        


        //Buttons
        this.load.atlas("botones", 'assets/botones/atlas_botones_amarrillos.png', 'assets/botones/atlas_botones_amarrillos.json')
        this.load.image('boton-check', 'assets/botones/boton-check.png');
        this.load.image('boton-lapiz-edit', 'assets/botones/boton-lapiz-edit.png');


        //UserInterfaces
        this.load.image('slot', 'assets/interface/slot.png');
        this.load.image('boton-dado', 'assets/interface/boton-dado.png');
        this.load.image('band', 'assets/interface/band.png');
        this.load.spritesheet('boton-dado-pointer-spritesheet', 'assets/interface/boton-dado-pointer-spritesheet.png', {frameWidth: 128, frameHeight: 128});

        //Music
        this.load.audio('musicTablero', 'assets/sounds/music-tablero.mp3');
        this.load.audio('musicMain', 'assets/sounds/music-main-menu.mp3');

        //Sound Effects
        this.load.audio('movimiento', 'assets/sounds/movimiento3.mp3');
        this.load.audio('tirarDado', 'assets/sounds/sonido-dado.mp3');

        //PopUps
        this.load.image('popup-contenedor', 'assets/popups/popup-contenedor.png');
        this.load.image('popup-ayuda', 'assets/popups/popup-ayuda.png');
        this.load.image('popup-opciones', 'assets/popups/popup-opciones.png');
        this.load.image('popup-creditos', 'assets/popups/popup-creditos.png');
        
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
        this.anims.create({
            key: "pointer-duck-anims",
            frames: this.anims.generateFrameNumbers("pointer-duck", {
                start: 0,
                end: 2,
            }),
            frameRate: 3,
            repeat: -1,
        });
        this.anims.create({
            key: "bomb-anims",
            frames: this.anims.generateFrameNumbers("bomb-spritesheet", {
                start: 0,
                end: 6,
            }),
            frameRate: 6,
            repeat: 0,
            yoyo: false
        });
        this.anims.create({
            key: "nuclear-bomb-anims",
            frames: this.anims.generateFrameNumbers("nuclear-bomb-spritesheet", {
                start: 0,
                end: 6,
            }),
            delay: 1000,
            frameRate: 4,
            repeat: 1,
        });
        this.anims.create({
            key: "cerdo-anims",
            frames: this.anims.generateFrameNumbers("cerdo-spritesheet", {
                start: 0,
                end: 16,
            }),
            frameRate: 8,
            hideOnComplete: true,
            repeat: 0,
        });
        this.anims.create({
            key: "pan-anims",
            frames: this.anims.generateFrameNumbers("pan-spritesheet", {
                start: 0,
                end: 8,
            }),
            hideOnComplete: true,
            frameRate: 4,
            repeat: 0,
        });
       
        this.scene.start("Inicio");
    }
}
