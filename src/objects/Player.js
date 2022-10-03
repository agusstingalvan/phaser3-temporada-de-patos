export default class Player extends Phaser.Physics.Arcade.Sprite {
    #tablero;
    name;
    #isTurn;
    #timeTurn;
    #currentPosition = 0;
    #position = 0;
    #canMove;
    #wallet;
    #inventory;
    #map; //Map of tilemaps for find objects in the tablero.
    constructor({tablero, name, position, currentPositon = 0, texture, frame, isTurn, canMove, wallet, invetory}){
        super(tablero, position.x, position.y, texture, frame)
        this.#tablero = tablero;
        this.name = name; 
        this.#isTurn = isTurn;
        this.#position = position;
        this.#currentPosition = currentPositon;
        this.#canMove = canMove;
        this.#wallet = wallet;
        this.#inventory = invetory;
        this.#map = this.#tablero.map;

        this.#tablero.add.existing(this);
        this.#tablero.physics.add.existing(this);
        this.body.allowGravity = false;
        this.setCollideWorldBounds(true);

        
        if(this.#isTurn) {
            this.anims.play(`${frame}-idle-anims`);
        }
    }

    throwDice(){
        let numberDice = Phaser.Math.Between(1, 6);
        //Move
        this.changePosition(numberDice);
    }
    changePosition(numberPositon){
        this.#currentPosition += numberPositon;
        if(this.#currentPosition > 48) {
            this.#currentPosition -= numberPositon;
        }
        let newPositon = this.#map.findObject(
            "objects",
            (obj) => obj.name === this.#currentPosition.toString()
        );
        this.setX(newPositon.x)
        this.setY(newPositon.y)
    }
}