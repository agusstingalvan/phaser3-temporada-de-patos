import { sharedInstance as events } from "../scenes/EventCenter";
export default class Player extends Phaser.Physics.Arcade.Sprite {
    #tablero;
    name;
    isTurn;
    currentPosition = 0;
    frameAnimation;
    #timeTurn;
    #position = 0;
    #canMove;
    #wallet;
    inventory = [];
    #map; //Map of tilemaps for find objects in the tablero.
    constructor({tablero, name, position, currentPositon = 0, texture, frame, isTurn, canMove, wallet, invetory = []}){
        super(tablero, position.x, position.y, texture, frame)
        this.#tablero = tablero;
        this.name = name; 
        this.isTurn = isTurn;
        this.#position = position;
        this.currentPosition = currentPositon;
        this.#canMove = canMove;
        this.#wallet = wallet;
        this.inventory = invetory;
        this.frameAnimation = frame;
        this.#map = this.#tablero.map;

        this.#tablero.add.existing(this);
        this.#tablero.physics.add.existing(this);
        this.body.allowGravity = false;
        this.setCollideWorldBounds(true);
        
        if(this.isTurn) {
            this.anims.play(`${this.frameAnimation}-idle-anims`, true);
            // this.anims.play(`pointer-duck-anims`);
        }else{
            this.anims.play(`${this.frameAnimation}-idle-anims`, true);
            this.anims.pause();
        }
    }

    throwDice(){
        let numberDice = Phaser.Math.Between(1, 6);
        //Move
        this.changePosition(numberDice);
    }
    changePosition(numberPositon){
        //Change position
        this.currentPosition += numberPositon;
        if(this.currentPosition > 54) {
            this.currentPosition -= numberPositon;
        }
        
        if(this.currentPosition === 54){

            this.#tablero.scene.start('Ganador', this)
            this.#tablero.scene.stop('Interface')
        }
        
        let newPositon = this.#map.findObject(
            "objectsBoxes",
            (obj) => obj.name === this.currentPosition.toString()
        );
        this.setX(newPositon.x);
        this.setY(newPositon.y);
        
        this.changeTurn();
    }
    changeTurn(){
        //Change turn
        this.isTurn = false;
        this.anims.pause();
        //Change Player
        const currentIndex = this.#tablero.players.indexOf(this);
        let nextIndex = currentIndex + 1;
        if(nextIndex > 3) nextIndex = 0;
        const nextPlayer = this.#tablero.players[nextIndex];
        nextPlayer.isTurn = true;
        events.emit('change-turn', nextPlayer);
    }
}