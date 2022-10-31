import Phaser from 'phaser'
import { shuffle } from 'underscore';
import Player from '../objects/Player';
import { sharedInstance as events } from './EventCenter';
import Bomb from '../objects/powerups/Bomb';
import NuclearBomb from '../objects/powerups/NuclearBomb';
import Hook from '../objects/powerups/Hook';

export default class Tablero extends Phaser.Scene {
    #playersData = []; //Data of name with texture of player;
    #players = []; //Intances of class Player 
    #currentPositionPlayer;
    #currentPlayer;
    #time;
    #interfaces;
    #slots; //Contain the power ups
    #timeTurn = 15;
    #startTurnPlayer;
    #casillaConsecuenciaGroup;
    #boxesGroup; //Group of casillas
    #storeBoxesGroup;
    bombsGroup;
    nuclearBombsGroup;
    map;
    // casillaDesactivada;
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
        this.scene.launch('Interface')
        this.map = this.make.tilemap({ key: "tableroTile" });
        const tiledBackground = this.map.addTilesetImage("background", "fondo-tablero");
        const backgroundLayer = this.map.createLayer("background", tiledBackground)

        const objectsBoxesLayer = this.map.getObjectLayer("objectsBoxes");

        const salida = objectsBoxesLayer.objects.find((point => point.type === 'salida'));
        const meta = objectsBoxesLayer.objects.find((point => point.name === '54'))

        this.camara = this.cameras.main;

        //Create groups for Boxes layers.
        this.addGroups();

        //Create Boxes layer on the tablero.
        this.addBoxes(objectsBoxesLayer)

        //Create the players on the tablero.
        this.addPlayers(salida);


        this.addOverlaps();

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
        this.#boxesGroup = this.physics.add.group();
        this.#casillaConsecuenciaGroup = this.physics.add.group();
        this.#storeBoxesGroup = this.physics.add.group();

        //#bombsGroup group is only for test
        this.bombsGroup = this.physics.add.group({ allowGravity: false, classType: Bomb })
        this.nuclearBombsGroup = this.physics.add.group({ allowGravity: false, classType: NuclearBomb })
    }
    addBoxes(objectsBoxesLayer) {
        objectsBoxesLayer.objects.forEach((box) => {
            const { type, x, y, name } = box;

            // const casilla = this.#boxesGroup.create(box.x, box.y, 'invisible')
            // casilla.body.allowGravity = false;
            // casilla.visible = false;
            switch (type) {
                // case 'consecuencia':
                //     console.log('consecuencia')
                //     const casillaConsecuencia = this.#casillaConsecuenciaGroup.create(x, y, 'invisible');
                //     casillaConsecuencia.body.allowGravity = false;
                //     casillaConsecuencia.visible = false;
                //     break;
                // case 'tienda':
                //     const storeBox = this.#storeBoxesGroup.create(x, y, 'invisible')
                //     storeBox.body.allowGravity = false;
                //     storeBox.visible = false;
                //     break;
            }
        })
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

            //Only test powerup of bomb. Each player starts with a bomb.
            player = new Player(props);
            const bomb = new Bomb({ scene: this, x: player.x, y: player.y, texture: 'bomb', currentPlayer: player });
            const nuclearBomb = new NuclearBomb({ scene: this, x: player.x, y: player.y, texture: 'nuclear-bomb', currentPlayer: player });
            const hook = new Hook({ scene: this, x: player.x, y: player.y, texture: 'hook', currentPlayer: player });

            // player.addPowerUp(bomb);
            player.addPowerUp(nuclearBomb);
            // player.addPowerUp(hook);
            this.#players = [...this.#players, player];
        }
        console.log(this.#players);
    }

    addOverlaps() {
        this.physics.add.overlap(this.getPlayers(), this.#boxesGroup, (player, box) => {
            this.#currentPositionPlayer = player.getCurrentPosition();
            box.disableBody(true, true);
        }, null, this);


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
