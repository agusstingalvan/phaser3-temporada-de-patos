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
    #interfaces;
    #slots; //Contain the power ups
    #timeTurn = 15;
    #startTurnPlayer;
    #casillaConsecuenciaGroup;
    #boxesGroup; //Group of casillas
    #storeBoxesGroup;
    #bombsGroup;
    map;
    casillaDesactivada;
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

        this.#boxesGroup = this.physics.add.group();
        this.#casillaConsecuenciaGroup = this.physics.add.group();
        this.#storeBoxesGroup = this.physics.add.group();

        //#bombsGroup group is only for test
        this.#bombsGroup = this.physics.add.group();


        objectsBoxesLayer.objects.forEach((box) =>{
            const {type, x , y, name} = box;
            
            const casilla = this.#boxesGroup.create(box.x, box.y, 'invisible')
            casilla.body.allowGravity = false;
            casilla.visible = false;
            switch(type){
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

        //Create the players on the tablero.
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
        

        this.physics.add.overlap(this.players, this.#boxesGroup,(player, box)=>{
            this.#currentPositionPlayer = player.currentPosition;
            box.disableBody(true, true);
        }, null, this);

        this.physics.add.overlap(this.players, this.#casillaConsecuenciaGroup,(player, box)=>{
            console.log('yunque')
            this.casillaDesactivada = box.disableBody(true, true);
            console.log('aca')
            this.camara.shake(200);
            setTimeout(()=> { player.onlyMove(1) }, 1000);
                player.casillaDesactivada = this.casillaDesactivada;
        }, null, this)


        //#bombsGroup group is only for test, for bomb in the boxes.
        // this.physics.add.overlap(this.players, this.#bombsGroup, (player, bomb) => this.effectBomb(player, bomb), null, this);

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
    effectBomb(player, bomb){
        this.casillaDesactivada = bomb.disableBody(true, true);
            console.log('bomba')
            setTimeout(()=> {
                if (player.currentPosition <= 5){
                    player.onlyMove(1)
                }
                else
                {
                    player.changePosition(-5)
                }
            }, 1000)
    }
}
