import Phaser from 'phaser'
import { shuffle } from 'underscore';
import Player from '../objects/Player';
import { sharedInstance as events } from './EventCenter';
import PopUpContainer from '../objects/PopupContainer';
export default class Tablero extends Phaser.Scene
{
    #playersData = []; //Data of name with texture of player;
    players = []; //Intances of class Player 
    #currentPositionPlayer;
    #currentPlayer;
    #time;
    #boxes; //Group of casillas
    #interfaces;
    #slots; //Contain the power ups
    #timeTurn = 15;
    #startTurnPlayer;
    #bombas;
    #bombsGroup;
    #casillaConsecuenciaGroup;
    map;
	constructor()
	{
		super('Tablero')
	}
    init({players, sonidos}){
        this.#playersData = shuffle(players);
        this.sonidos = sonidos;
    }

    create()
    {
        this.scene.launch('Interface')
        this.map = this.make.tilemap({key: "tableroTile"});
        const tiledBackground = this.map.addTilesetImage("background", "fondo-tablero");
        const backgroundLayer = this.map.createLayer("background", tiledBackground)

        const objectsBoxesLayer = this.map.getObjectLayer("objectsBoxes");

        const salida = objectsBoxesLayer.objects.find((point=> point.type === 'salida'));
        const meta = objectsBoxesLayer.objects.find((point=> point.name === '54'))

        this.camara = this.cameras.main;
        this.#boxes = this.physics.add.group();
        this.#casillaConsecuenciaGroup = this.physics.add.group();
        //#bombas group is only for test
        this.#bombas = this.physics.add.group();


        objectsBoxesLayer.objects.forEach((box) =>{
            const {type, x , y, name} = box;
            
            const casilla = this.#boxes.create(box.x, box.y, 'invisible')
            casilla.body.allowGravity = false;
            casilla.visible = false;
            switch(type){
                //#bombas group is only for test
                case 'bomba':
                    const testBomb =  this.add.rectangle(x, y, 20, 20, 0xfff);
                    const bomba = this.#bombas.create(x, y, testBomb)
                    bomba.body.allowGravity = false;
                    // events.emit('add-bomb', testBomb);
                    break;
                case 'consecuencia':
                    console.log('consecuencia')
                    const casillaConsecuencia = this.#casillaConsecuenciaGroup.create(x, y, 'invisible');
                    casillaConsecuencia.body.allowGravity = false;
                    break;
            }
        })

        //Create the players in the tablero.
        for(let player of this.#playersData){
            const index = this.#playersData.indexOf(player);
            const props = {
                tablero: this,
                name: player.name,
                position: {
                    x:  salida.x + Phaser.Math.Between(-32, 32),
                    y: salida.y + Phaser.Math.Between(-74, 64)
                },
                texture: 'atlas-patos-statics',
                frame: player.texture,
                isTurn: false
            }
            if(index === 0) props.isTurn = true;
            this.players = [...this.players, new Player(props)];
        }
        console.log(this.players);
        

        this.physics.add.overlap(this.players, this.#boxes,(player, box)=>{
            this.#currentPositionPlayer = player.currentPosition;
            box.disableBody(true, true);
        }, null, this)
        this.physics.add.overlap(this.players, this.#casillaConsecuenciaGroup,(player, box)=>{
            console.log('yunque')
            box.disableBody(true, true);
            this.camara.shake(200);
            setTimeout(()=> player.changePosition(0), 1000)
        }, null, this)

        this.physics.add.overlap(this.players, this.#bombas, (player, box)=>{
            // events.emit('add-bomb', box)
            box.disableBody(true, true);
            console.log('bomba')
        }, null, this)

        // const data = {
        //     scene: this,
        //     text: 'Perdiste el turno',
        //     position: {
        //         x: 400,
        //         y: 500,
        //     },
        //     btnClose: true
        // }
        // this.pop = new PopUpContainer(data);
        // this.pop.container.visible = true;
    }
    update(){
        for(let player of this.players){
            if(player.isTurn){
                player.anims.resume();
                this.#currentPlayer = player;
                events.emit('change-turn',  this.#currentPlayer);
            }
        }
    }
    cronometer(){
        // #time
    }
}
