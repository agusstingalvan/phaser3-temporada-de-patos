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
    #language;
	constructor()
	{
		super('Inicio');
	}
    init(data){
        this.#language = data.language;
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
 
        this.#btnPlay = new Button(this, positionCenter.x, positionCenter.y + 100, 'atlas-botones', "contenedores-madera", () => this.scene.start("SeleccionPersonajes", { sonidos, language: this.#language }), 'Jugar', 28,  1.35)
        
        this.#btnHelp = new Button(this, positionCenter.x, positionCenter.y + 180, 'atlas-botones', "contenedores-madera",
        () => {
            if(this.canOpenPopUp){
                this.#popUpHelp.show()
                return;
            }
            
        }, 'Ayuda', 28,  1.05);
        this.#btnCredits = new Button(this, positionCenter.x - 100, positionCenter.y + 250, 'atlas-botones',"contenedores-madera", () => {
            if(this.canOpenPopUp){
                this.#popUpCredits.show()
                return;
            }
        }, 'Creditos', 24, 0.85)
        this.#btnOptions = new Button(this, positionCenter.x + 100, positionCenter.y + 250, 'atlas-botones', "contenedores-madera", () => {
            if(this.canOpenPopUp){
                this.#popUpOptions.show()
                return;
            }
        }, 'Opciones', 24, 0.85)
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
