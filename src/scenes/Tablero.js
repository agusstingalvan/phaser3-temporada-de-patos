import Phaser from 'phaser'
import { shuffle } from 'underscore';
import Player from '../objects/Player';
import { sharedInstance as events } from './EventCenter';
import PopUpContainer from '../objects/PopupContainer';
import Bomb from '../objects/powerups/Bomb';
import NuclearBomb from '../objects/powerups/NuclearBomb';

export default class Tablero extends Phaser.Scene {
    #playersData = []; //Data of name with texture of player;
    players = []; //Intances of class Player 
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
    casillaDesactivada;
    constructor() {
        super('Tablero')
    }
    init({ players, sonidos }) {
        console.log('tablero');
        this.#playersData = shuffle(players);
        this.players = [];
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
        for (let player of this.players) {
            if (player.isTurn) {
                if(player.waitTurn){
                    console.log(`${player.name} en la proxima jugada podra jugar.`);
                    player.changeTurn()
                    player.waitTurn = false;
                    return;
                }
                player.anims.resume();
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

            const casilla = this.#boxesGroup.create(box.x, box.y, 'invisible')
            casilla.body.allowGravity = false;
            casilla.visible = false;
            switch (type) {
                case 'consecuencia':
                    console.log('consecuencia')
                    const casillaConsecuencia = this.#casillaConsecuenciaGroup.create(x, y, 'invisible');
                    casillaConsecuencia.body.allowGravity = false;
                    break;
                case 'tienda':
                    const storeBox = this.#storeBoxesGroup.create(x, y, 'invisible')
                    storeBox.body.allowGravity = false;
                    storeBox.visible = false;
                    break;
                //#bombsGroup group is only for test
                // case 'bomba':
                //     const testBomb =  this.add.rectangle(x, y, 20, 20, 0xfff);
                //     const bomb = this.#bombsGroup.create(x, y, testBomb)
                //     bomb.body.allowGravity = false;
                //     bomb.name = name;
                //     // events.emit('add-bomb', testBomb);
                // break;
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
            // const nuclearBomb = new NuclearBomb({scene: this.#tablero, x: this.x, y: this.y, texture: 'nuclear-bomb', currentPlayer: this});
            player.addPowerUp(bomb);
            player.addPowerUp(nuclearBomb);
            console.log(this.players);
            this.players = [...this.players, player];

            // this.players = [...this.players, new Player(props)];
        }
        console.log(this.players);
    }

    addOverlaps() {
        this.physics.add.overlap(this.players, this.#boxesGroup, (player, box) => {
            this.#currentPositionPlayer = player.currentPosition;
            box.disableBody(true, true);
        }, null, this);

        this.physics.add.overlap(this.players, this.#casillaConsecuenciaGroup,(player, box)=>{
            this.casillaDesactivada = box.disableBody(true, true);
            const numberRandom = Phaser.Math.Between(1,2);
            switch(3){
                case 1:
                    console.log('yunque')
                    const yunque = this.add.image(Phaser.Math.Between(player.x, 700), 0, 'yunque');
                    yunque.visible = false;
                    this.tweens.add({
                        targets: yunque,
                        x: Phaser.Math.Between(player.x - 15, player.x + 15),
                        y: Phaser.Math.Between(player.y - 15, player.y + 15),
                        ease: "Sine.easeIn",
                        duration: 600,
                        repeat: 0,
                        yoyo: false,
                        onStart: ()=> {
                            yunque.visible = true;
                        },
                        onComplete: ()=>{
                            this.camara.shake(400, 0.015, false, ()=>{
                                yunque.visible = false;
                                yunque.destroy();
                                player.onlyMove(1000)
                                player.casillaDesactivada = this.casillaDesactivada;
                            })
                            
                        },
                    })
                    break;
                case 2:
                        console.log('Cerdito');
                        player.deleteMoney();
                    break;
                case 3:
                        console.log('Se le lanza un pan y pierde el turno');
                        player.loseTurn();
                    break;
            }
        }, null, this)

        this.physics.add.overlap(this.players, this.bombsGroup, (player, bomb) => {
            const owner = bomb.getData('owner');
            if(player.name === owner) return 

            bomb.effect(player);
        }, null, this);
        //#bombsGroup group is only for test, for bomb in the boxes.
        // this.physics.add.overlap(this.players, this.#bombsGroup, (player, bomb) => this.effectBomb(player, bomb), null, this);
    }
    cronometer() {
        // #time
    }
    effectBomb(player, bomb) {
        this.casillaDesactivada = bomb.disableBody(true, true);
        console.log('bomba')
        setTimeout(() => {
            if (player.currentPosition <= 5) {
                player.onlyMove(1)
            }
            else {
                player.changePosition(-5)
            }
        }, 1000)
    }
}
