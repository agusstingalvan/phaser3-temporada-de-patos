import Phaser from 'phaser'
import { sceneGanador } from '../enums/keys';
import Button from '../objects/Button';
import { getPhrase, getTranslations } from '../services/translations';
import { getTop } from '../services/getTop';
import { setGame } from '../services/setGame';

export default class Ganador extends Phaser.Scene
{
    #winPlayer;
    #language;
    #counterMovement;
    #skin;
	constructor()
	{
		super('Ganador')
	}

    init(data){
        this.#winPlayer = data.name;
        this.sonidos = data.sonidos;
        this.#language = data.language;
        this.#counterMovement = data.counterMovement;
        this.#skin = data.skin;
    }

    async create()
    {
        try {
            const gameParty = {
                id: window.crypto.randomUUID(),
                name: this.#winPlayer,
                counterMovement: this.#counterMovement,
                skin: this.#skin,
            }
            await setGame(gameParty)
            const topGames = await getTop();
        } catch (error) {
            console.log('Raios! Ocurrió al intentar acceder y/o cargar datos de la DataBase! ')
        }
        this.sonidos.sound.musicTablero.stop()
        this.sonidos.sound.ganadorSFX.play()
        this.getTranslations(this.#language);  
        this.events.on('create', ()=> this.cameras.main.fadeIn(500));
        this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'atlas-backgrounds', "fondo-ganador");
        const name = this.add.text(this.sys.game.config.width / 2, this.sys.game.config.height / 2 - 320, this.#winPlayer, {
            fontFamily: 'Montserrat', fontSize: 20, fontStyle: 'bold', 
        } ).setOrigin(0.5)
        new Button(this, this.sys.game.config.width / 2, this.sys.game.config.height - 45, 'atlas-botones', 'contenedores-madera',() => {
            
            this.sonidos.sound.ganadorSFX.stop()
            this.cameras.main.fadeOut(500).on('camerafadeoutcomplete', ()=>{
                this.scene.start("Inicio");
            })
        }, getPhrase(sceneGanador.volver), 28 )
        
    }
    async getTranslations(language){
        const res = await getTranslations(language)
    }
}
