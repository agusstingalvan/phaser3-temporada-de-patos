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
    #popUpOptions
    canOpenPopUp = true;
	constructor()
	{
		super('Inicio')
	}
    create()
    {   
        const {width, height} = this.scale;
        const positionCenter = {
            x: width / 2,
            y: height / 2,
        }
        this.sky = this.add.image(positionCenter.x, positionCenter.y, "fondo-menu")
        const sonidos = new SoundsManage(this.sound, 0.3);
        sonidos.sound.musicMain.play();
 
        this.#btnPlay = new Button(this, positionCenter.x, positionCenter.y, 'botones', "boton-jugar", () => this.scene.start("SeleccionPersonajes", { sonidos }), 1.15)
        
        
        this.#btnHelp = new Button(this, positionCenter.x, positionCenter.y + 80, 'botones', "boton-ayuda",
        () => {
            if(this.canOpenPopUp){
                this.#popUpHelp.show()
                return;
            }
            
        },  0.85);
        this.#btnCredits = new Button(this, positionCenter.x - 100, positionCenter.y + 150, 'botones',"boton-creditos", () => {
            if(this.canOpenPopUp){
                this.#popUpCredits.show()
                return;
            }
        }, 0.65)
        this.#btnOptions = new Button(this, positionCenter.x + 100, positionCenter.y + 150, 'botones', "boton-opciones", () => {
            if(this.canOpenPopUp){
                this.#popUpOptions.show()
                return;
            }
        }, 0.65)
        this.#popUpHelp = this.createPopUp({
            scene: this,
            texture: 'popup-ayuda',
            btnClose: true,
            scale: 1,
        })
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
    }
    createPopUp(data){
        return new PopUpContainer(data)
    }
}
