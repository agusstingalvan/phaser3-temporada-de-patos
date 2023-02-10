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
        
        try {
            const gameParty = {
                id: window.crypto.randomUUID(),
                name: this.#winPlayer,
                counterMovement: this.#counterMovement,
                skin: this.#skin,
            }
            await setGame(gameParty);
            const topGames = await getTop();
            if(topGames.length != 0){
                this.add.text((this.scale.width) - 200, 20, '🏆 - TOP#10:', {fontSize: 28, fontStyle: 'bold', color: 'black', fontFamily: 'Montserrat'})
            topGames.map((top, index) => {
                let icon = null;
                if(index === 0) icon = '🥇';
                if(index === 1) icon = '🥈';
                if(index === 2) icon = '🥉';

                return this.add.text((this.scale.width) - 200, (index * 20) +  60, `${icon? icon : index + 1}#- ${top.name} - 🎲:  ${top.counterMovement}`,  {fontSize: 16, fontStyle: 'bold', color: 'black', fontFamily: 'Montserrat'});
            })
            }
        } catch (error) {
            console.log('Raios! Ocurrió al intentar acceder y/o cargar datos de la DataBase! ')
        }
    }
    async getTranslations(language){
        const res = await getTranslations(language)
    }
}
