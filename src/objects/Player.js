import { sharedInstance as events } from "../scenes/EventCenter";
import PopUpContainer from "./PopupContainer";
import Bomb from "./powerups/Bomb";
import NuclearBomb from "./powerups/NuclearBomb";
export default class Player extends Phaser.Physics.Arcade.Sprite {
    tablero;
    name;
    isTurn;
    currentPosition = 0;
    frameAnimation;
    #timeTurn;
    #position = 0;
    #canMove;
    wallet = 0;
    inventory = [];
    casillaDesactivada;
    #map; //Map of tilemaps for find objects in the tablero.
    #storeMap = [];
    #moneyMap = [];
    waitTurn = false;

    constructor({tablero, name, position, currentPositon = 0, texture, frame, isTurn, canMove, wallet = 0, invetory = []}){
        super(tablero, position.x, position.y, texture, frame)
        this.tablero = tablero;
        this.name = name; 
        this.isTurn = isTurn;
        this.#position = position;
        this.currentPosition = currentPositon;
        this.#canMove = canMove;
        this.wallet = wallet;
        this.inventory = invetory;
        this.frameAnimation = frame;
        this.#map = this.tablero.map;

        this.tablero.add.existing(this);
        this.tablero.physics.add.existing(this);
        this.body.allowGravity = false;
        this.setCollideWorldBounds(true);
        
        if(this.isTurn) {
            this.anims.play(`${this.frameAnimation}-idle-anims`, true);
            // this.anims.play(`pointer-duck-anims`, true);
        }else{
            this.anims.play(`${this.frameAnimation}-idle-anims`, true);
            this.anims.pause();
        }

        this.searchBoxes();
    }

    throwDice(){
        let numberDice = Phaser.Math.Between(1, 6);
        //Move
        this.changePosition(numberDice);
    }
    changePosition(numberPositon, canChangeTurn = true){

        if(numberPositon === 1000){
            //The number 1000, is for init position one
            this.currentPosition = 1;
        }else{
            this.currentPosition += numberPositon;
        }
        //Change position
        if(this.currentPosition > 39) {
            this.currentPosition -= numberPositon;
        }
        
        if(this.currentPosition === 39){

            this.tablero.scene.stop('Tablero')
            this.tablero.scene.stop('Interface')
            this.tablero.scene.start('Ganador', this)
        }
        this.move(this.currentPosition, canChangeTurn);
    }
    move(position, canChangeTurn){
        
        events.emit('hide-dice');
        let newPositon = this.#map.findObject(
            "objectsBoxes",
            (obj) => obj.name === position.toString()
        );
        
        this.tablero.tweens.add({
            targets: this,
            x: newPositon.x,
            y: newPositon.y,
            ease: "Sine.easeOut",
            duration: 1000,
            repeat: 0,
            yoyo: false,
            onStart: ()=>{
                this.tablero.physics.pause()
            },
            onComplete: ()=>{
                this.tablero.physics.resume()
                
                //Reactivar casilla
                if(this.casillaDesactivada !== undefined){
                    this.casillaDesactivada.enableBody(
                        true,
                        this.casillaDesactivada.x,
                        this.casillaDesactivada.y,
                        true,
                        true
                    );
                };

                let inStoreBox = this.#storeMap.some((numberBox)=> numberBox === position.toString());
                let inMoneyBox = this.#moneyMap.some((numberBox)=> numberBox === position.toString());

                if(inStoreBox){
                    const nuclearBomb = new NuclearBomb({scene: this.tablero, x: this.x, y: this.y, texture: 'nuclear-bomb', currentPlayer: this});
                    this.addPowerUp(nuclearBomb);
                }
                if(inMoneyBox){
                    this.addMoney();
                }
                // this.changeTurn()
               if(canChangeTurn){
                const secondsChangeTurn = 3000;
                setTimeout(()=>this.changeTurn(), secondsChangeTurn)
               }
            },
        })
    }
    onlyMove(num = 1, canChangeTurn = false){
        this.changePosition(num, canChangeTurn)
    }

    changeTurn(){
        //Change turn
        this.isTurn = false;
        this.anims.pause();
        
        //Change Player

        const currentIndex = this.tablero.players.indexOf(this);
        let nextIndex = currentIndex + 1;
        if(nextIndex > 3) nextIndex = 0;
        const nextPlayer = this.tablero.players[nextIndex];
        nextPlayer.isTurn = true;
        events.emit('change-turn', nextPlayer);
        events.emit('show-dice');
    }

    searchBoxes(){
        let objectsLayers = this.#map.getObjectLayer("objectsBoxes")
        objectsLayers.objects.forEach((box)=> {
            const {name,type} = box;
            switch(type){
                case 'tienda': 
                    this.#storeMap.push(name)
                break;
                case 'dinero': 
                    this.#moneyMap.push(name)
                break;
            }
        });
    }

    addMoney(money = 300){
        this.wallet  += money;
        // events.emit('update-money', this.wallet);
    }
    deleteMoney(){
        this.wallet = 0; 
    }
    addPowerUp(powerup){
        if(this.inventory.length === 2) return;
        this.inventory.push(powerup);
        return this.inventory;
    }
    loseTurn(){
        this.waitTurn = true;
        this.changeTurn();
    }

        // mover(numberPositon){
    //     this.currentPosition = numberPositon < 0 ? this.currentPosition + numberPositon : numberPositon;

    //     let newPositon = this.#map.findObject(
    //         "objectsBoxes",
    //         (obj) => obj.name === this.currentPosition.toString()
    //     );
    //     // this.setX(newPositon.x);
    //     // this.setY(newPositon.y);
    //     console.log(newPositon);
    //     console.log(this.name + ' se mvio');
    //     this.#tablero.tweens.add({
    //         targets: this,
    //         x: newPositon.x,
    //         y: newPositon.y,
    //         ease: "Sine.easeOut",
    //         duration: 1000,
    //         repeat: 0,
    //         yoyo: false,
    //         onStart: ()=>{
    //             this.#tablero.physics.pause()
    //         },
    //         onComplete: ()=>{
    //             this.#tablero.physics.resume()
                
    //             //Reactivar casilla
    //             if(this.casillaDesactivada !== undefined){
    //                 this.casillaDesactivada.enableBody(
    //                     true,
    //                     this.casillaDesactivada.x,
    //                     this.casillaDesactivada.y,
    //                     true,
    //                     true
    //                 );
    //             };

    //             let inStoreBox = this.#storeMap.some((numberBox)=> numberBox === this.currentPosition.toString());
    //             let inMoneyBox = this.#moneyMap.some((numberBox)=> numberBox === this.currentPosition.toString());

    //             if(inStoreBox){
    //                 const nuclearBomb = new NuclearBomb({scene: this.#tablero, x: this.x, y: this.y, texture: 'nuclear-bomb', currentPlayer: this});
    //                 this.addPowerUp(nuclearBomb);
    //             }
    //             if(inMoneyBox){
    //                 this.addMoney();
    //             }
    //         },
    //     })
    // }
    // soloMover(num = 1){
    //     //this.currentPosition = num;
    //     this.mover(num)
    // }
}