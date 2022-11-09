import Phaser from 'phaser'
import { shuffle } from 'underscore';
import Player from '../objects/Player';
import { sharedInstance as events } from './EventCenter';
import Bomb from '../objects/powerups/Bomb';
import NuclearBomb from '../objects/powerups/NuclearBomb';
import Hook from '../objects/powerups/Hook';
import Button from '../objects/Button';

export default class Tablero extends Phaser.Scene {
    #playersData = []; //Data of name with texture of player;
    #players = []; //Intances of class Player 
    #currentPlayer;
    bombsGroup;
    nuclearBombsGroup;
    map;
    constructor() {
        super('Tablero')
    }
    getPlayers(){
        return this.#players;
    }
    init({ players, sonidos }) {
        this.#playersData = shuffle(players);
        this.#players = [];
        this.sonidos = sonidos;
    }

    create() {
        this.sonidos.sound.musicTablero.config.volume = 0.1;
        this.sonidos.sound.musicTablero.play();
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
                this.sonidos.sound.musicTablero.stop();    
                this.cameras.main.fadeOut(500).on('camerafadeoutcomplete', ()=>{
                    this.scene.stop('Interface');
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
                    console.log(`${player.getName()} en la proxima jugada podra jugar.`);
                    player.changeTurn()
                    player.setWaitTurn(false);
                    // setTimeout(()=>{
                    // }, 3000)
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

        //#bombsGroup group is only for test
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
            //Only test powerup of bomb. Each player starts with a bomb.
            const bomb = new Bomb({ scene: this, x: player.x, y: player.y, texture: 'bomb', currentPlayer: player });
            const nuclearBomb = new NuclearBomb({ scene: this, x: player.x, y: player.y, texture: 'nuclear-bomb', currentPlayer: player });
            const hook = new Hook({ scene: this, x: player.x, y: player.y, texture: 'hook', currentPlayer: player });

            // player.addPowerUp(bomb);
            // player.addPowerUp(nuclearBomb);
            // player.addPowerUp(hook);
            // player.addPowerUp(hook);
            this.#players = [...this.#players, player];
        }
        console.log(this.#players);
    }

    addOverlaps() {
        this.physics.add.overlap(this.getPlayers(), this.bombsGroup, (player, bomb) => {
            const owner = bomb.getData('owner');
            if(player.getName() === owner) return;
            if(player.getOnHolidays()) return;
            if(player.getHaveBand()) {
                player.setHaveBand(false);
                bomb.destroy();
                return
            }
            bomb.effect(player);
        }, null, this);
    }
}
