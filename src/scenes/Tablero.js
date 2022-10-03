import Phaser from 'phaser'
import { indexOf, shuffle } from 'underscore';
import Player from '../objects/Player';
export default class Tablero extends Phaser.Scene
{
    #playersData = []; //Data of name with texture of player;
    #players = []; //Intances of class Player 
    #time;
    #boxes; //Group of casillas
    #interfaces;
    #slots; //Contain the power ups
    #timeTurn = 15;
    #startTurnPlayer;
    map;
    #buttonDice; //Eliminar esta propiedad es de testeo.
	constructor()
	{
		super('Tablero')
	}
    init({players, sonidos}){
        this.#playersData = shuffle(players);

        //Start Random Player
        // this.#startTurnPlayer = this.#players[Math.floor(Math.random() * 3)];
        this.#startTurnPlayer = this.#playersData[0];
        this.#startTurnPlayer.isTurn = true;
        console.log('Comienza el turno el jugador', this.#startTurnPlayer.name);
        this.sonidos = sonidos;
    }

    create()
    {
        this.scene.launch('Interface')
        this.map = this.make.tilemap({key: "tableroTile"});
        const tiledBackground = this.map.addTilesetImage("background", "fondo-tablero");
        const backgroundLayer = this.map.createLayer("background", tiledBackground)

        const objectsLayer = this.map.getObjectLayer("objects");

        const salida = objectsLayer.objects.find((point=> point.type === 'salida'));
        const meta = objectsLayer.objects.find((point=> point.type === 'meta'))

        //Creating the players in the tablero.
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
            this.#players = [...this.#players, new Player(props)];
        }
        this.#buttonDice = this.add.image(this.scale.width - 84, this.scale.height / 2, 'boton-dado').setInteractive({ useHandCursor: true })
       .on("pointerdown", () => this.#players[0].throwDice())
       .on("pointerover", (btn) => this.#buttonDice.setTint('0xc2c2c2').setScale(1.1))
       .on("pointerout", (btn) => this.#buttonDice.setTint('0xe5e5e5').setScale(1))
        //Only para testear la prop de su turno
        // for(let player of this.#players){
        //     const {x, y, name, texture} = player;
        //     if(player === this.#startTurnPlayer){
        //         this.#startTurnPlayer.isTurn = true;
        //     }else{
        //         player.isTurn = false;
        //     }
        //     this.add.sprite(x, y, 'atlas-patos-statics', texture);

        // }
    }
    update(){
        // for(let player of this.#playersData){
        //     if(player.isTurn){
        //         console.log('ThrowDice', player.name)
                
        //         let index = this.#playersData.indexOf(player) + 1;
        //         if(index >  3) index = 0;
        //         player.isTurn = false;
        //         this.#playersData[index].isTurn = true;
        //         const nextPlayer = this.#playersData.find(p=> p.isTurn === true)
        //         console.log('nextplayernext', nextPlayer.name)
        //     }
        // }
    }
    // updatePosition(){

    // }
    changeTurn(player){

    }
    cronometer(){
        // #time
    }
}
