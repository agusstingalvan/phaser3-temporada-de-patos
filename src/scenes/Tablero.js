import Phaser from 'phaser'
import { shuffle } from 'underscore';
import Player from '../objects/Player';
import { sharedInstance as events } from './EventCenter';
import Bomb from '../objects/powerups/Bomb';
import Button from '../objects/Button';
import { getTranslations } from '../services/translations';

export default class Tablero extends Phaser.Scene {
    #playersData = []; //Data of name with texture of player;
    #players = []; //Intances of class Player 
    #currentPlayer;
    language;
    bombsGroup;
    nuclearBombsGroup;
    map;
    constructor() {
        super('Tablero');
    }
    getPlayers(){
        return this.#players;
    }
    init({ players, sonidos, language }) {
        this.#playersData = shuffle(players);
        this.#players = [];
        this.sonidos = sonidos;
        this.language = language;
    }

    create() {
        this.sonidos.sound.musicTablero.config.volume = 0.1;
        
        this.sonidos.sound.inicioPartidaSFX.play();
        this.sonidos.sound.inicioPartidaSFX.on('complete', ()=>{
            this.sonidos.sound.musicTablero.play();
        })
        this.getTranslations(this.language);  
        this.scene.launch('Interface', {sonidos: this.sonidos});
        this.map = this.make.tilemap({ key: "tableroTile" });
        const tiledBackground = this.map.addTilesetImage("background", "fondo-tablero");
        const backgroundLayer = this.map.createLayer("background", tiledBackground)

        const objectsBoxesLayer = this.map.getObjectLayer("objectsBoxes");

        const salida = objectsBoxesLayer.objects.find((point => point.type === 'salida'));
        const meta = objectsBoxesLayer.objects.find((point => point.name === '54'))

        this.camara = this.cameras.main;

        //Create groups for Boxes layers.
        this.addGroups();


        //Create the players on the tablero.
        this.addPlayers(salida);


        this.addOverlaps();
        const btnCerrar = new Button(
            this,
            this.scale.width - 45,
            this.scale.height - (this.scale.height - 45),
            "atlas-botones",
            "contenedores-madera-x",
            () => {
                this.#players = [];
                this.sonidos.sound.musicTablero.stop();    
                this.sonidos.sound.inicioPartidaSFX.stop()
                this.cameras.main.fadeOut(500).on('camerafadeoutcomplete', ()=>{
                    this.scene.stop('Interface');
                    events.removeListener('open-store')
                    events.removeListener('close-store')
                    this.scene.stop('Tablero');
                    this.scene.start("Inicio");
                })
            }, 'X', 24, 0.9
        );
        
        this.events.on('create', ()=>{
            this.cameras.main.fadeIn(500)
        });
    }
    changeTurn() {
        for (let player of this.getPlayers()) {
            if (player.getIsTurn()) {
                if(player.getWaitTurn()){
                    const pan = this.add.image(0, 0, 'pan')
                    pan.visible = false;
                    this.add.tween({
                        targets: pan,
                        x: Phaser.Math.Between(player.x - 15, player.x + 15),
                        y: Phaser.Math.Between(player.y - 15, player.y + 15),
                        ease: "Sine.easeIn",
                        duration: 600,
                        repeat: 0,
                        yoyo: false,
                        onStart: ()=> pan.visible = true,
                        onComplete: ()=>{
                            pan.destroy()
                        },
                    })
                    player.changeTurn()
                    player.setWaitTurn(false);               
                    return;
                }
                player.anims.resume();
                player.getPointerEntity().visible = true;
                player.getPointerEntity().anims.resume();

                this.#currentPlayer = player;
                events.emit('change-turn', this.#currentPlayer);
            }
        }
    }
    update() {
        this.changeTurn();
    }
    addGroups() {
        this.bombsGroup = this.physics.add.group({ allowGravity: false, classType: Bomb })
    }
    addPlayers(salida) {
        for (let player of this.#playersData) {
            const index = this.#playersData.indexOf(player);
            const props = {
                tablero: this,
                name: player.name,
                position: {
                    x: salida.x + Phaser.Math.Between(-32, 32),
                    y: salida.y + Phaser.Math.Between(-74, 64)
                },
                texture: 'atlas-patos-statics',
                frame: player.texture,
                isTurn: false
            }
            if (index === 0) props.isTurn = true;

            player = new Player(props);
            this.#players = [...this.#players, player];
        }
    }

    addOverlaps() {
        this.physics.add.overlap(this.getPlayers(), this.bombsGroup, (player, bomb) => {
            const owner = bomb.getData('owner');
            if(player.getName() === owner) return;
            if(player.getOnHolidays()) return;
            if(player.getHaveBand()) {
                player.brokenBand()
                bomb.destroy();
                return
            }
            bomb.effect(player);
        }, null, this);
    }
    async getTranslations(language){
        const res = await getTranslations(language)
    }
}
