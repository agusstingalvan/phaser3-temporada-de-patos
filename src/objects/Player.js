import { sharedInstance as events } from "../scenes/EventCenter";
import Postal from "./Postal";
export default class Player extends Phaser.Physics.Arcade.Sprite {
    #tablero;
    #name;
    #isTurn;
    #currentPosition = 0;
    #frameAnimation;
    #position = 0;
    #wallet = 0;
    #inventory = [];
    #map; //Map of tilemaps for find objects in the tablero.
    #storeMap = [];
    #moneyMap = [];
    #yunqueMap = [];
    #impactsMap = [];
    #holidaysMap = [];
    #wavesMap = [];
    #panMap = [];
    #onHolidays = false;
    #waitOnHolidays = false;
    #haveBand = false;
    #haveDiscount = false;
    #numberDice;
    #waitTurn = false;
    #pointerEntity;

    constructor({tablero, name,position, currentPositon = 0, texture, frame, isTurn, wallet = 3000, invetory = []}){
        super(tablero, position.x, position.y, texture, frame)
        this.#tablero = tablero;
        this.#name = name; 
        this.#isTurn = isTurn;
        this.#currentPosition = currentPositon;
        this.#frameAnimation = frame;
        this.#position = position;
        this.#wallet = wallet = 3000;
        this.#inventory = invetory;
        this.#map = this.#tablero.map;

        this.#tablero.add.existing(this);
        this.#tablero.physics.add.existing(this);
        this.body.allowGravity = false;
        this.setCollideWorldBounds(true);
        
        this.#pointerEntity = this.#tablero.add.sprite(position.x, position.y, 'point');
        this.#pointerEntity.visible = false;
        if(this.getIsTurn()) {
            this.#pointerEntity.visible = true;
            this.#pointerEntity.anims.play(`pointer-duck-anims`, true)
            this.anims.play(`${this.#frameAnimation}-idle-anims`, true);
        }else{
            this.#pointerEntity.visible = false;
            this.#pointerEntity.anims.play(`pointer-duck-anims`, true)
            this.#pointerEntity.anims.pause();
            this.anims.play(`${this.#frameAnimation}-idle-anims`, true);
            this.anims.pause();
        }

        this.searchBoxes();
    }
    getTablero(){
        return this.#tablero;
    }
    getName () {
        return this.#name;
    }
    getIsTurn(){
        return this.#isTurn;
    }
    setIsTurn(bool){
        this.#isTurn = bool;
    }
    getCurrentPosition(){
        return this.#currentPosition;
    }
    setCurrentPosition(number){
        this.#currentPosition = number
    }
    getWallet(){
        return this.#wallet;
    }
    setWallet(number){
        this.#wallet = number;
    }
    getInventory(){
        return this.#inventory;
    }
    setInventory(items){
        this.#inventory = items;
    }
    getOnHolidays(){
        return this.#onHolidays;
    }
    setOnHolidays(bool){
        this.#onHolidays = bool;
    }
    getWaitOnHolidays(){
        return this.#waitOnHolidays;
    }
    setWaitOnHolidays(bool){
        this.#waitOnHolidays = bool;
    }
    getHaveBand(){
        return this.#haveBand;
    }
    setHaveBand(bool){
        this.#haveBand = bool;
    }
    getHaveDiscount(bool){
        return this.#haveDiscount;
    }
    setHaveDiscount(bool){
        this.#haveDiscount = bool;
    }
    getNumberDice(){
        return this.#numberDice;
    }
    setNumberDice(number){
        this.#numberDice = number;
    }
    getWaitTurn(){
        return this.#waitTurn;
    }
    setWaitTurn(bool){
        this.#waitTurn = bool;
    }
    getPointerEntity(){
        return this.#pointerEntity;
    }
    throwDice(){
        this.setNumberDice(Phaser.Math.Between(1, 6));
        if(this.getOnHolidays() && this.getNumberDice() !== 4){
            events.emit('hide-dice');
            setTimeout(() => {
             this.changeTurn();
            }, 3000);
            return
            
        }else if(this.getOnHolidays() && this.getNumberDice() === 4){
            this.setWaitOnHolidays(true);
            this.setOnHolidays(false);
        }

        //Move this player.
        this.changePosition(5);
    }
    changePosition(numberPositon, canChangeTurn = true){

        if(numberPositon === 1000){
            //The number 1000, is for init position one (1) in the tablero.
            this.setCurrentPosition(1);
        }else{
            this.setCurrentPosition(this.getCurrentPosition() + numberPositon);
        }
        //Change position and the postions is evaluated
        if(this.getCurrentPosition() > 35) {
            const rest = ( 35 - (this.getCurrentPosition() - 35))
            this.setCurrentPosition(rest);
        }
        if(this.getCurrentPosition() === 35){
            this.#tablero.scene.stop('Interface')
            this.#tablero.cameras.main.fadeOut(1500).on('camerafadeoutcomplete', ()=>{
                events.removeListener('open-store')
                events.removeListener('close-store')
                this.#tablero.sonidos.sound.musicTablero.stop();
                this.#tablero.scene.stop('Tablero')
                this.#tablero.scene.start('Ganador', {name: this.getName(), sonidos: this.#tablero.sonidos})
            })
            return
        }

        this.move(this.getCurrentPosition(), canChangeTurn);
    }
    move(position, canChangeTurn){
        events.emit('hide-dice');
        let newPositon = this.#map.findObject(
            "objectsBoxes",
            (obj) => obj.name === position.toString()
        );
        
        this.#tablero.tweens.add({
            targets: this.#pointerEntity,
            x: newPositon.x,
            y: newPositon.y,
            ease: "Sine.easeOut",
            duration: 1100,
            repeat: 0,
            yoyo: false,
        })
        this.#tablero.tweens.add({
            targets: this,
            x: newPositon.x,
            y: newPositon.y,
            ease: "Sine.easeOut",
            duration: 1000,
            repeat: 0,
            yoyo: false,
            onStart: ()=>{
                this.#tablero.physics.pause()
                this.#tablero.sonidos.sound.movimientoDadoSFX.play();
            },
            onComplete: ()=>{
                this.#tablero.physics.resume();

                const inMoneyBox = this.#moneyMap.some((numberBox)=> numberBox === position.toString());
                const inWapesBox = this.#wavesMap.some((numberBox)=> numberBox === position.toString());
                const inStoreBox = this.#storeMap.some((numberBox)=> numberBox === position.toString());
                const inYunqueBox = this.#yunqueMap.some((numberBox)=> numberBox === position.toString());
                const inImpactsBox = this.#impactsMap.some((numberBox)=> numberBox === position.toString());
                const inHolidaysBox = this.#holidaysMap.some((numberBox)=> numberBox === position.toString());
                const inPanBox = this.#panMap.some((numberBox)=> numberBox === position.toString());

                if(inMoneyBox) {
                    const money = this.#tablero.add.sprite(this.x, this.y - 32, 'money-spritesheet', [3]);
                    money.anims.play("money-anims");
                    this.addMoney()
                }; 
                if(this.getIsTurn() && inWapesBox) this.changePosition(-4, false);
                if(this.getIsTurn() && inStoreBox) return events.emit('open-store', this);
                if(inYunqueBox){
                        const yunque = this.#tablero.add.image(Phaser.Math.Between(this.x, 700), 0, 'yunque');yunque.setScale(1.5)
                        yunque.visible = false;
                        this.#tablero.tweens.add({
                            targets: yunque,
                            x: Phaser.Math.Between(this.x - 15, this.x + 15),
                            y: Phaser.Math.Between(this.y - 15, this.y + 15),
                            ease: "Sine.easeIn",
                            duration: 600,
                            repeat: 0,
                            yoyo: false,
                            onStart: ()=> yunque.visible = true,
                            onComplete: ()=>{
                                this.#tablero.camara.shake(400, 0.015, false, ()=>{
                                    yunque.visible = false;
                                    yunque.destroy();
                                })
                                if(this.getIsTurn()){
                                    this.onlyMove(1000, true);
                                }else{
                                    this.onlyMove(1000, false);
                                    return;
                                }
                            },
                        })
                        if(!this.getIsTurn()) return
                }
                if(this.getIsTurn() && inImpactsBox){
                        const numberRandom = Phaser.Math.Between(1,3);
                        switch(numberRandom){
                            case 1:
                                const propsCerdo = {
                                    scene: this.#tablero,
                                    animsName: 'cerdo-anims',
                                    text: 'El cerdo banquero te cobra los impuestos.'
                                }
                                const postalCerdo = new Postal(propsCerdo);
                                this.deleteMoney();
                                break;
                            case 2:
                                const descuento = this.#tablero.add.sprite(this.x, this.y - 32, 'descuento');
                                descuento.anims.play("discount-anims");
                                this.setHaveDiscount(true);
                                break;
                            case 3:
                                const band = this.#tablero.add.sprite(this.x, this.y - 32, 'band');
                                band.anims.play("band-anims");
                                this.setHaveBand(true);
                                break;
                        }
                }
                if(inHolidaysBox){
                        if(this.getIsTurn()){
                            const props = {
                                scene: this.#tablero,
                                image: 'holidays',
                                text: '     Estás tomando unas vacaciones.\nNecesitas sacar un 4 para salir de ellas.'
                            }
                            const postalHolidays = new Postal(props)
                        }
                        this.setOnHolidays(true);
                        events.emit('hide-slots')
                }
                if(inPanBox){
                    if(this.#isTurn){
                        const propsPato = {
                            scene: this.#tablero,
                            animsName: 'pan-anims',
                            text: 'Te lanzan un pan y pierdes el siguiente turno.',
                            autoChange: true,
                            player: this,
                        }
                        const postalPan = new Postal(propsPato);
                    }else if(!this.#isTurn){
                        console.log(this.#name, 'perdio el turno')
                        this.setWaitTurn(true);
                    }
                    return;
                }
                
                //Detect of direction of this player.
                const direction = newPositon.properties[0].value;
                (direction === 'left')? this.setFlipX(false): this.setFlipX(true);


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
        this.setIsTurn(false);
        //Stop the animations of pointers and player
        this.anims.pause();
        this.#pointerEntity.anims.pause();
        this.#pointerEntity.visible = false;

        //Change Player
        const players = this.#tablero.getPlayers();
        const currentIndex = players.indexOf(this);
        let nextIndex = currentIndex + 1;
        if(nextIndex > players.length - 1) nextIndex = 0;
        const nextPlayer = players[nextIndex];
        nextPlayer.setIsTurn(true);
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
                case 'yunque': 
                    this.#yunqueMap.push(name)
                break;
                case 'consecuencia': 
                    this.#impactsMap.push(name)
                break;
                case 'vacaciones': 
                    this.#holidaysMap.push(name)
                break;
                case 'wave': 
                    this.#wavesMap.push(name)
                break;
                case 'pan': 
                    this.#panMap.push(name)
                break;
            }
        });
    }

    addMoney(money = 300){
        this.setWallet(this.getWallet() + money);
    }
    deleteMoney(){
        this.setWallet(0); 
    }
    addPowerUp(powerup){
        if(this.getInventory().length === 2) return;
        this.getInventory().push(powerup);
    }
    loseTurn(){
        this.setWaitTurn(true);
        this.changeTurn();
    }
    brokenBand(){
        const bandBroken = this.#tablero.add.sprite(this.x, this.y - 32, 'band-broken-spritesheet', [0]);
        bandBroken.anims.play("band-broken-anims");
        this.setHaveBand(false)
    }
}