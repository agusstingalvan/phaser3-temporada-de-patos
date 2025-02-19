import Phaser from 'phaser'
import { sceneSeleccionPersonajes } from '../enums/keys';
import Button from '../objects/Button';
import PopUpContainer from '../objects/PopupContainer';
import { getTranslations, getPhrase } from '../services/translations';

let stringName = ""

export default class SeleccionPersonajes extends Phaser.Scene
{
    #players;
    #imageDice;
    #textLabel;
    canEdit = true;
    #btnHelp;
    #popUpHelp;
    canOpenPopUp = true;
    #language;
    #listo;
    #jugador;
    #escriba;
    #mensajeTutorial;
	constructor() {
        super("SeleccionPersonajes");
        const {listo, mensajeTutorial, jugador, escriba} = sceneSeleccionPersonajes;
        this.#listo = listo;
        this.#mensajeTutorial = mensajeTutorial;
        this.#jugador = jugador;
        this.#escriba = escriba;
    }
    init(data) {
        this.canEdit = true
        this.canOpenPopUp = true;
        stringName = "";
        this.#players =  [
            {
                name: `${getPhrase(this.#jugador)} 1`,
                texture: "pato-bruja",
                x: 300,
                y: 300,
            },
            {
                name: `${getPhrase(this.#jugador)} 2`,
                texture: "pato-recibido",
                x: 525,
                y: 300,
            },
            {
                name: `${getPhrase(this.#jugador)} 3`,
                texture: "pato-verde",
                x: 700,
                y: 300,
            },
            {
                name: `${getPhrase(this.#jugador)} 4`,
                texture: "pato-galera",
                x: 900,
                y: 300,
            }
        ];
        this.sonidos = data.sonidos;
        this.#language = data.language;
    }
    create() {
        this.getTranslations(this.#language);  
        const {width, height} = this.scale;
        const positionCenter = {
            x: width / 2,
            y: height / 2,
        }
        this.background = this.add.image(positionCenter.x, positionCenter.y, 'atlas-backgrounds', "fondo-seleccionPersonajes");

        for(let player of  this.#players){
            let { x, y, name, texture } = player;
            this.add.rectangle(x + 20, y + 5, 84, 84, '0x0B4551');
            this.add.image(x + 20, y, 'atlas-patos-statics', texture, { frameWidth: 64, frameHeight: 64 });
            let nameText = this.add.text(x, y + 70, name, {fontSize: 18, fontStyle: 'bold', color: 'white', fontFamily: 'Montserrat'}).setOrigin(0.5);
            this.createInputs(nameText, player);
        }
        const sonidos = this.sonidos;
        const btnCerrar = new Button(this, width - 45, height - (height - 45), 'atlas-botones', "contenedores-madera-x", () => {
            this.sonidos.sound.musicMain.stop();
            this.scene.start("Inicio")
        }, 'X', 24, 0.9);
        this.#btnHelp = new Button(this, this.scale.width - 100, height - 100, 'atlas-botones', "contenedores-madera",
        () => {
            if(this.canOpenPopUp){
                this.#popUpHelp.show()
                return;
            }
            
        }, getPhrase('Tutorial'), 24,  0.85);
        this.#popUpHelp = this.createPopUp({
            scene: this,
            texture: 'popup-ayuda',
            btnClose: true,
            scale: 1,
        })
        const titleIncognita = this.createText(-325, -140, sceneSeleccionPersonajes.tutorialCIncognitaTitulo);
        const textIncognita = this.createText(-320, -100, sceneSeleccionPersonajes.tutorialCIncognitaTexto, 24);
        const titlePan = this.createText(-350, 30, sceneSeleccionPersonajes.tutorialPanTitulo);
        const textPan = this.createText(-355, 70, sceneSeleccionPersonajes.tutorialPanTexto, 24);

        const titleYunque = this.createText(150, -140, sceneSeleccionPersonajes.tutorialYunqueTitulo);
        const textYunque = this.createText(150, -100, sceneSeleccionPersonajes.tutorialYunqueTexto, 24);

        const titleStore = this.createText(150, 30, sceneSeleccionPersonajes.tutorialTiendaTitulo);
        const textStore = this.createText(150, 70, sceneSeleccionPersonajes.tutorialTiendaTexto, 24);
        const containerHelp = this.add.container(100, 5, [titleIncognita, textIncognita, titlePan, textPan, titleYunque, textYunque, titleStore, textStore]);
        this.#popUpHelp.addChild(containerHelp)


        const btnListo = new Button(this, width / 2, height - 100, 'atlas-botones', "contenedores-madera", () => {
            btnListo.image.disableInteractive()
            this.sonidos.sound.seleccionPersonajesSFX.play()
            setTimeout(()=>{
                this.scene.start("Tablero", { players: this.#players, sonidos, language: this.#language });
                this.sonidos.sound.musicMain.stop();
            }, 2400)
            
        }, getPhrase(this.#listo), 30,  1.35);
        
        this.#imageDice = this.add.image(this.scale.width + 150, 128, 'ticket-dice').setScale(3, 1.5)
        this.#textLabel = this.add.text(this.scale.width + 160, 128, getPhrase(this.#mensajeTutorial), {fontSize: 16, fontStyle: 'bold',  color: '242424', fontFamily: 'Montserrat'} ).setOrigin(0.5);
        this.#imageDice.visible = true;
        this.#textLabel.visible = false;
        const altura = 128;
        this.tweens.add({
            targets: this.#imageDice,
            x: this.scale.width - 150,
            y: altura,
            ease: "Sine.easeInOut",
            duration: 1500,
            hold: 2000,
            repeat: 0,
            yoyo: true,
        })
        this.tweens.add({
            targets: this.#textLabel,
            x: this.scale.width - 140,
            y: altura,
            ease: "Sine.easeInOut",
            duration: 1500,
            hold: 2000,
            repeat: 0,
            yoyo: true,
            onStart: () =>{
                this.#imageDice.visible = true;
                this.#textLabel.visible = true;
            },
            onComplete: () =>{
                this.#imageDice.visible = false;
                this.#textLabel.visible = false;
            }
        })
        this.events.on('create', ()=>{
            this.cameras.main.fadeIn(500)
        });
    }

    createInputs(nameText, playerObj) {
        let btnEdit, btnReady;
        btnEdit = this.add
            .image(nameText.x + 80, 370, "boton-lapiz-edit")
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true });
        btnReady = this.add
            .image(nameText.x + 80, 370, "boton-check")
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true });
        btnReady.visible = false;     
        btnEdit.on("pointerdown", () => {
            //Primero verifico si no hay ningun otro editandoce.
            if (!this.canEdit) return;
            this.canEdit = false;
            nameText.setText(`${getPhrase(this.#escriba)}...`);
            nameText.setColor("red");
            stringName = "";
            window.addEventListener("keydown", writeName);
            btnEdit.visible = false;
            btnReady.visible = true;
            this.background.setInteractive().on("pointerdown", ()=>{
                this.canEdit = true;
                btnEdit.visible = true;
                btnReady.visible = false;
                nameText.setColor("white");
                window.removeEventListener("keydown", writeName);
                if (nameText.text === `${getPhrase(this.#escriba)}...`) {
                    nameText.setText(playerObj.name);
                }
                });
            });
        btnReady.on("pointerdown", () => {
            this.canEdit = true;
            btnEdit.visible = true;
            btnReady.visible = false;
            nameText.setColor("white");
            window.removeEventListener("keydown", writeName);
            if (nameText.text === `${getPhrase(this.#escriba)}...`) {
                nameText.setText(playerObj.name);
            }
        });

        function writeName(e) {
            if (stringName === undefined) {
                //Lo reseteo y luego le agrego la letra.
                stringName = '';
                stringName += e.key;
            };
            if (stringName.length >= 9) return;
            let letters = ['q', 'w', 'e', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ñ', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'backspace', 'enter', ' ', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
            const isRight = letters.some((letter) => letter.toLowerCase() === e.key.toLowerCase());

            //Verifico si la tecla es correctecta
            if (!isRight) return;
            //Verifico si la tecla es el boton de borrar, entonces borra el ultima letra
            if (e.key === 'Backspace') {
                nameText.setColor("white");
                let string = stringName.charAt(0).toUpperCase() + stringName.slice(1);
                stringName = string.slice(0, string.length - 1);
                nameText.setText(stringName);
                playerObj.name = stringName;
                return;
            }
            if (e.key === 'Enter') {
                this.canEdit = true;
                btnEdit.visible = true;
                btnReady.visible = false;
                nameText.setColor("white");
                window.removeEventListener("keydown", writeName);
                if (nameText.text === "Escriba..." || nameText.text === "Write...") {
                    nameText.setText(playerObj.name);
                }
                return
            }
            nameText.setColor("white");
            stringName += e.key;
            let string = stringName.charAt(0).toUpperCase() + stringName.slice(1);
            nameText.setText(string);
            playerObj.name = string;
        }
    }
    createPopUp(data){
        return new PopUpContainer(data)
    }
    createText(x, y, string, size=30 ){
        return this.add.text(x, y, getPhrase(string), {fontSize: size, fontStyle: 'bold',  color: 'white', fontFamily: 'Montserrat'}).setOrigin(0.5)
    }
    async getTranslations(language){
        const res = await getTranslations(language)
    }
}
