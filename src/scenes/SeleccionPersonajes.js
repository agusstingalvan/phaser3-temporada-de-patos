import Phaser from 'phaser'
import Button from '../objects/Button';

let stringName = ""

export default class SeleccionPersonajes extends Phaser.Scene
{
    #players
    // #players =  [
    //     {
    //         name: 'Jugador 1',
    //         texture: "pato-bruja",
    //         x: 300,
    //         y: 300,
    //     },
    //     {
    //         name: 'Jugador 2',
    //         texture: "pato-recibido",
    //         x: 525,
    //         y: 300,
    //     },
    //     {
    //         name: 'Jugador 3',
    //         texture: "pato-verde",
    //         x: 700,
    //         y: 300,
    //     },
    //     {
    //         name: 'Jugador 4',
    //         texture: "pato-galera",
    //         x: 900,
    //         y: 300,
    //     }
    // ];

    canEdit = true;

	constructor() {
        super("SeleccionPersonajes");
    }
    init(data) {
        console.log('estas en pjs')
        this.canEdit = true
        stringName = "";
        this.#players =  [
            {
                name: 'Jugador 1',
                texture: "pato-bruja",
                x: 300,
                y: 300,
            },
            {
                name: 'Jugador 2',
                texture: "pato-recibido",
                x: 525,
                y: 300,
            },
            {
                name: 'Jugador 3',
                texture: "pato-verde",
                x: 700,
                y: 300,
            },
            {
                name: 'Jugador 4',
                texture: "pato-galera",
                x: 900,
                y: 300,
            }
        ];
        // this.#players[0].name = 'Jugador 1';
        // this.#players[1].name = 'Jugador 2';
        // this.#players[2].name = 'Jugador 3';
        // this.#players[3].name = 'Jugador 4';
        this.sonidos = data.sonidos;
    }
    create() {
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
            let nameText = this.add.text(x, y + 70, name, {
                fontFamily: 'Lsans',
                fontSize: 18,
            }).setOrigin(0.5);
            this.createInputs(nameText, player);
        }
        const sonidos = this.sonidos;
        const btnCerrar = new Button(this, width - 45, height - (height - 45), 'botones', "boton-cerrar", () => {
            this.sonidos.sound.musicMain.stop();
            this.scene.start("Inicio")
        }, 0.5);

        const btnListo = new Button(this, width / 2, height - 100, 'botones', "boton-listo", () => {
            console.log(this.#players);
            this.scene.start("Tablero", { players: this.#players, sonidos })
            this.sonidos.sound.musicMain.stop()
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
            nameText.setText("Escriba...");
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
                if (nameText.text === "Escriba...") {
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
            if (nameText.text === "Escriba...") {
                nameText.setText(playerObj.name);
            }
        });

        function writeName(e) {
            if (stringName === undefined) {
                console.log('Es igual a undefined')
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
                if (nameText.text === "Escriba...") {
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
}
