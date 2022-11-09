import Phaser from 'phaser';
export default class Precarga extends Phaser.Scene
{
	constructor()
	{
		super('Precarga')
	}

	preload()
    {
        this.load.image('cargando', 'assets/escenas/cargando.png')
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
        
        //PowerUps- StaticSprites
        this.load.image("bomb", 'assets/powerups/bomb/bomb.png');
        this.load.image("nuclear-bomb", 'assets/powerups/nuclear-bomb/nuclear-bomb.png');
        this.load.image("hook", 'assets/powerups/hook/hook.png');


        //PowerUps-Anims
        this.load.spritesheet("bomb-spritesheet", 'assets/powerups/bomb/bomb-spritesheet.png', {frameWidth: 64, frameHeight: 64})
        this.load.spritesheet("nuclear-bomb-spritesheet", 'assets/powerups/nuclear-bomb/nuclear-bomb-spritesheet.png', {frameWidth: 575, frameHeight: 315})
        this.load.spritesheet("hook-spritesheet", 'assets/powerups/hook/hook-spritesheet.png', {frameWidth: 575, frameHeight: 315})


        //Consecuencias - Impacts
        this.load.image("yunque", 'assets/consecuencias/yunque/yunque.png');
        this.load.image("pan", 'assets/consecuencias/pan/pan.png');
        this.load.image("holidays", 'assets/consecuencias/holidays/holidays.png');
        this.load.spritesheet("cerdo-spritesheet", 'assets/consecuencias/cerdo/cerdo-spritesheet.png', {frameWidth: 575, frameHeight: 315})
        this.load.spritesheet("pan-spritesheet", 'assets/consecuencias/pan/pan-spritesheet.png', {frameWidth: 575, frameHeight: 315})
        this.load.spritesheet('band-spritesheet', 'assets/consecuencias/band/band-spritesheet.png', {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('band-broken-spritesheet', 'assets/consecuencias/band/band-broken-spritesheet.png', {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('discount-spritesheet', 'assets/consecuencias/discount/discount-spritesheet.png', {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('money-spritesheet', 'assets/consecuencias/money/money-spritesheet.png', {frameWidth: 64, frameHeight: 64});


        //Utils
        this.load.image("reloj", 'assets/reloj.png');
        this.load.image("ticket-dice", 'assets/interface/ticket-dice.png');
        this.load.image("ticket-dice-fail", 'assets/interface/ticket-dice-fail.png');
        this.load.image("ticket-dice-right", 'assets/interface/ticket-dice-right.png');
        this.load.image("tienda", 'assets/interface/tienda.png');


        //Buttons
        this.load.atlas("botones", 'assets/botones/atlas_botones_amarrillos.png', 'assets/botones/atlas_botones_amarrillos.json')
        this.load.atlas("atlas-botones", 'assets/botones/atlas-botones.png', 'assets/botones/atlas-botones.json')
        this.load.image('boton-check', 'assets/botones/boton-check.png');
        this.load.image('boton-lapiz-edit', 'assets/botones/boton-lapiz-edit.png');
        this.load.image('contenedor-madera', 'assets/botones/contenedores-madera.png');
        
        
        //UserInterfaces
        this.load.image('slot', 'assets/interface/slot.png');
        this.load.image('boton-dado', 'assets/interface/boton-dado.png');
        this.load.image('band', 'assets/interface/band.png');
        this.load.image('discount', 'assets/interface/discount.png');
        
        
        //Music
        this.load.audio('musicTablero', 'assets/sounds/music-tablero.mp3');
        this.load.audio('musicMain', 'assets/sounds/music-main-menu.mp3');

        //Sound Effects
        this.load.audio('movimiento', 'assets/sounds/movimiento3.mp3');
        this.load.audio('tirarDado', 'assets/sounds/sonido-dado.mp3');
        this.load.audio('sonido-inicio-partida', 'assets/sounds/sonido-inicio-partida.mp3');
        this.load.audio('sonido-pato-inicio-partida', 'assets/sounds/sonido-pato-inicio-partida.mp3');
        this.load.audio('sonido-ganador', 'assets/sounds/sonido-ganador.mp3');
        this.load.audio('sonido-yunque', 'assets/sounds/sonido-yunque.mp3');
        this.load.audio('sonido-nuclear', 'assets/sounds/sonido-nuclear.mp3');
        this.load.audio('sonido-bomba', 'assets/sounds/sonido-bomba.mp3');
        this.load.audio('sonido-boton', 'assets/sounds/sonido-boton.mp3');

        //PopUps
        this.load.image('popup-contenedor', 'assets/popups/popup-contenedor.png');
        this.load.image('popup-ayuda', 'assets/popups/popup-ayuda.png');
        this.load.image('popup-opciones', 'assets/popups/popup-opciones.png');
        this.load.image('popup-creditos', 'assets/popups/popup-creditos.png');

        
        
        const maxWidth = 400;
        const rectangleProgress = this.add.rectangle(this.scale.width / 2, this.scale.height / 2, maxWidth, 30, '0xffc600');
        const txt = this.add.text(this.scale.width / 2, this.scale.height / 2, '0%',{fontSize: '18px', fontStyle: 'bold', color: 'white', fontFamily: 'Montserrat'} ).setOrigin(0.5)
        this.load.on('progress', (progress)=>{
            rectangleProgress.width = maxWidth * progress;
            console.log()
            txt.setText(`${Math.round(progress * 100)}%`)
        })
        this.load.on('complete',  () => {
            this.scene.start('Inicio');
        });
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
            key: "hook-anims",
            frames: this.anims.generateFrameNumbers("hook-spritesheet", {
                start: 0,
                end: 9,
            }),
            frameRate: 8,
            repeat: 0,
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
        this.anims.create({
            key: "band-anims",
            frames: this.anims.generateFrameNumbers("band-spritesheet", {
                start: 0,
                end: 3,
            }),
            hideOnComplete: true,
            frameRate: 4,
            repeat: 0,
        });
        this.anims.create({
            key: "band-broken-anims",
            frames: this.anims.generateFrameNumbers("band-broken-spritesheet", {
                start: 0,
                end: 3,
            }),
            hideOnComplete: true,
            frameRate: 4,
            repeat: 0,
        });
        this.anims.create({
            key: "discount-anims",
            frames: this.anims.generateFrameNumbers("discount-spritesheet", {
                start: 0,
                end: 3,
            }),
            hideOnComplete: true,
            frameRate: 4,
            repeat: 0,
        });
        this.anims.create({
            key: "money-anims",
            frames: this.anims.generateFrameNumbers("money-spritesheet", {
                start: 0,
                end: 3,
            }),
            hideOnComplete: true,
            frameRate: 4,
            repeat: 0,
        });
    }
}
