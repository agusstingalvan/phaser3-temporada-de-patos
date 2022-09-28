export default class Player {
    #tablero;
    #name;
    #isTurn;
    #timeTurn;
    #position;
    #canMove;
    #wallet;
    #inventory;

    constructor(tablero, name, isTurn, position, canMove, wallet, invetory){
        this.#tablero = tablero;
        this.#name = name; 
        this.#isTurn = isTurn;
        this.#position = position;
        this.#canMove = canMove;
        this.#wallet = wallet;
        this.#inventory = invetory;
    }
}