import Phaser from 'phaser'
import Button from '../objects/Button';
import SoundsManage from '../functions/SoundManage';
import PopUpContainer from '../objects/PopupContainer';
import {sceneInicio} from '../enums/keys';
import { FETCHED, FETCHING, READY, TODO } from '../enums/status';
import { getPhrase, getTranslations } from '../services/translations';
import { EN_US, ES_AR } from '../enums/languages';

export default class Inicio extends Phaser.Scene
{
    #btnPlay;
    #btnHelp;
    #btnCredits;
    #btnOptions;
    #popUpHelp;
    #popUpCredits;
    #creditArtist;
    #creditDesign;
    #creditProgrammer;
    #popUpOptions;
    #numberVolume;
    #restBtn;
    #plusBtn;
    #numberTextVolume;
    #textVolume;

    canOpenPopUp = true;
    sonidos;

    //Translations.
    #language;
    #wasChangedLanguage = TODO;
    #jugar;
    #creditos;
    #opciones;
    #volumen;
    #artista;
    #diseñador;
    #programador;

	constructor()
	{
		super('Inicio');

        this.#jugar = sceneInicio.jugar;
        this.#creditos = sceneInicio.creditos;
        this.#opciones = sceneInicio.opciones;
        this.#volumen = sceneInicio.volumen;
        this.#artista = sceneInicio.artista;
        this.#diseñador = sceneInicio.diseñador;
        this.#programador = sceneInicio.programador;

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

        //Buttons of languages;
        const buttonEnglish = new Button(this, 30, 30, 'en-US', null, ()=>this.getTranslations(EN_US), null, null, 0.8);
        const buttonSpanish = new Button(this, 80, 30, 'es-Ar', null, ()=>this.getTranslations(ES_AR), null, null, 0.8);


        this.#btnPlay = new Button(this, positionCenter.x, positionCenter.y + 150, 'atlas-botones', "contenedores-madera", () => {
            if(this.canOpenPopUp) this.scene.start("SeleccionPersonajes", { sonidos: this.sonidos, language: this.#language })
        }, getPhrase(this.#jugar), 28,  1.35);

        this.#btnCredits = new Button(this, positionCenter.x - 100, positionCenter.y + 250, 'atlas-botones',"contenedores-madera", () => {
            if(this.canOpenPopUp){
                this.#popUpCredits.show()
                return;
            }
        }, getPhrase(this.#creditos), 24, 1);

        this.#btnOptions = new Button(this, positionCenter.x + 100, positionCenter.y + 250, 'atlas-botones', "contenedores-madera", () => {
            if(this.canOpenPopUp){
                this.#popUpOptions.show()
                return;
            }
        }, getPhrase(this.#opciones), 24, 1)
        
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

        //Credits texts: 
        this.#creditArtist = this.add.text(0, -45, `${getPhrase(this.#artista)}: Joaquin Fratini`, {fontSize: '30px', fontStyle: 'bold', color: 'white', fontFamily: 'Montserrat'}).setOrigin(0.5);
        this.#creditDesign = this.add.text(0, 0, `${getPhrase(this.#diseñador)}: Gonzalo Belen`, {fontSize: '30px', fontStyle: 'bold', color: 'white', fontFamily: 'Montserrat'}).setOrigin(0.5);
        this.#creditProgrammer = this.add.text(0, 45, `${getPhrase(this.#programador)}: Agustin Galvan`, {fontSize: '30px', fontStyle: 'bold', color: 'white', fontFamily: 'Montserrat'}).setOrigin(0.5);

        const containerCredits = this.add.container(0, 5, [this.#creditArtist, this.#creditDesign, this.#creditProgrammer]);

        this.#popUpCredits.addChild(containerCredits);

        //Volume Buttons and texts:
        this.#numberVolume =  Math.round(this.sonidos.sound.volume * 100);
        this.#restBtn = this.add.text(-60, 0, '-', {fontSize: '56px', fontStyle: 'bold', color: 'white', fontFamily: 'Montserrat'}).setInteractive({ useHandCursor: true }).on('pointerdown', ()=>this.changeVolume('rest')).setOrigin(0.5);

        this.#textVolume = this.add.text(-200, 0, `${this.#volumen}:`, {fontSize: '30px', fontStyle: 'bold', color: 'white', fontFamily: 'Montserrat'}).setOrigin(0.5);


        this.#numberTextVolume =  this.add.text(0, 0, `${(localStorage.getItem('volume'))? localStorage.getItem('volume') : this.#numberVolume.toString()}%`, {fontSize: '30px', fontStyle: 'bold', color: 'white', fontFamily: 'Montserrat'}).setOrigin(0.5);

        this.#plusBtn = this.add.text(60, 0, '+', {fontSize: '56px', fontStyle: 'bold', color: 'white', fontFamily: 'Montserrat'}).setInteractive({ useHandCursor: true }).on('pointerdown', ()=>this.changeVolume('plus')).setOrigin(0.5);


        const containerVolume = this.add.container(100, 5, [this.#textVolume ,this.#restBtn, this.#numberTextVolume, this.#plusBtn]);
        this.#popUpOptions.addChild(containerVolume)
    }
    createPopUp(data){
        return new PopUpContainer(data)
    }

    changeVolume(action){
        let newNumber = this.sonidos.sound.volume;
        if(action === 'plus') {
            if(this.sonidos.sound.volume.toFixed(1) >= 1.0) return;
            newNumber = newNumber + 0.1; 
        }
        if(action === 'rest') {
            if(this.sonidos.sound.volume.toFixed(1) <= 0.0) return;
            newNumber = newNumber - 0.1; 
        }
        this.sonidos.sound.volume = newNumber;
        this.#numberVolume = Math.round(newNumber * 100);
        localStorage.setItem('volume', JSON.stringify(this.#numberVolume))
        this.#numberTextVolume.setText(`${this.#numberVolume.toString()}%`)
    }
    updateWasChangedLanguage = () => {
        this.#wasChangedLanguage = FETCHED
    };
    async getTranslations(language){
        this.#language = language;
        this.#wasChangedLanguage = FETCHING;

        await getTranslations(language, this.updateWasChangedLanguage);
    }

    update(){
        if(this.#wasChangedLanguage === FETCHED){
            this.#wasChangedLanguage = READY;
            //Buttons
            this.#btnPlay.text.setText(getPhrase(this.#jugar));
            this.#btnCredits.text.setText(getPhrase(this.#creditos));
            this.#btnOptions.text.setText(getPhrase(this.#opciones));
            //Options
            this.#textVolume.setText(`${getPhrase(this.#volumen)}:`);
            //Credits
            this.#creditArtist.setText(`${getPhrase(this.#artista)}: Joaquin Fratini`)
            this.#creditDesign.setText(`${getPhrase(this.#diseñador)}: Gonzalo Belen`)
            this.#creditProgrammer.setText(`${getPhrase(this.#programador)}: Agustin Galvan`)
        }
    }
}
