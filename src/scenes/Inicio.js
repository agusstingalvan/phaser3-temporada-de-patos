import Phaser from 'phaser'
import Button from '../objects/Button';
import SoundsManage from '../functions/SoundManage';
import PopUpContainer from '../objects/PopupContainer';

export default class Inicio extends Phaser.Scene
{
    #btnPlay;
    #btnHelp;
    #btnCredits;
    #btnOptions;
    #popUpHelp;
    #popUpCredits;
    #popUpOptions;
    #numberVolume;
    #restBtn;
    #plusBtn;
    #numberTextVolume;
    canOpenPopUp = true;
    #language;
    sonidos;
	constructor()
	{
		super('Inicio');
	}
    init(data){
        this.#language = data.language;
        this.canOpenPopUp = true;
    }
    create()
    {   
        const {width, height} = this.scale;
        const positionCenter = {
            x: width / 2,
            y: height / 2,
        }
        this.sky = this.add.image(positionCenter.x, positionCenter.y, "fondo-menu")
        this.sonidos = new SoundsManage(this.sound, 1);
        this.sonidos.sound.musicMain.play();
        this.#btnPlay = new Button(this, positionCenter.x, positionCenter.y + 150, 'atlas-botones', "contenedores-madera", () => this.scene.start("SeleccionPersonajes", { sonidos: this.sonidos, language: this.#language }), 'JUGAR', 28,  1.35)
        
        
        this.#btnCredits = new Button(this, positionCenter.x - 100, positionCenter.y + 250, 'atlas-botones',"contenedores-madera", () => {
            if(this.canOpenPopUp){
                this.#popUpCredits.show()
                return;
            }
        }, 'CREDITOS', 24, 1)
        this.#btnOptions = new Button(this, positionCenter.x + 100, positionCenter.y + 250, 'atlas-botones', "contenedores-madera", () => {
            if(this.canOpenPopUp){
                this.#popUpOptions.show()
                return;
            }
        }, 'OPCIONES', 24, 1)
        
        this.#popUpCredits = this.createPopUp({
            scene: this,
            texture: 'popup-creditos',
            btnClose: true,
            scale: 1,
        })
        this.#popUpOptions = this.createPopUp({
            scene: this,
            texture: 'popup-opciones',
            btnClose: true,
            scale: 1,
        })

        
        this.#numberVolume =  Math.round(this.sonidos.sound.volume * 100);
        this.#restBtn = this.add.text(-60, 0, '-', {fontSize: '56px', fontStyle: 'bold', color: 'white', fontFamily: 'Montserrat'}).setInteractive({ useHandCursor: true }).on('pointerdown', ()=>{
            if(this.sonidos.sound.volume.toFixed(1) <= 0.0) return
            let newNumber = this.sonidos.sound.volume - 0.1;
            this.sonidos.sound.volume = newNumber;
            this.#numberVolume = Math.round(newNumber * 100)
            localStorage.setItem('volume', JSON.stringify(this.#numberVolume));
            this.#numberTextVolume.setText(`${this.#numberVolume.toString()}%`)
        }).setOrigin(0.5)
        
        this.#numberTextVolume =  this.add.text(0, 0, `${(localStorage.getItem('volume'))? localStorage.getItem('volume') : this.#numberVolume.toString()}%`, {fontSize: '30px', fontStyle: 'bold', color: 'white', fontFamily: 'Montserrat'}).setOrigin(0.5)
        this.#plusBtn = this.add.text(60, 0, '+', {fontSize: '56px', fontStyle: 'bold', color: 'white', fontFamily: 'Montserrat'}).setInteractive({ useHandCursor: true }).on('pointerdown', ()=>{
            if(this.sonidos.sound.volume.toFixed(1) >= 1.0) return
            let newNumber = this.sonidos.sound.volume + 0.1
            this.sonidos.sound.volume = newNumber;
            this.#numberVolume = Math.round(newNumber * 100);
            localStorage.setItem('volume', JSON.stringify(this.#numberVolume))
            this.#numberTextVolume.setText(`${this.#numberVolume.toString()}%`)
        }).setOrigin(0.5)
        const containerVolume = this.add.container(120, 5, [this.#restBtn, this.#numberTextVolume, this.#plusBtn]);
        this.#popUpOptions.addChild(containerVolume)
    }
    createPopUp(data){
        return new PopUpContainer(data)
    }

}
