import Phaser from 'phaser'
import Button from '../objects/Button';

export default class Ganador extends Phaser.Scene
{
    #winPlayer;
	constructor()
	{
		super('Ganador')
	}

    init(data){
        this.#winPlayer = data.name;
        this.sonidos = data.sonidos;
    }

    create()
    {
        this.events.on('create', ()=> this.cameras.main.fadeIn(500));
        this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'atlas-backgrounds', "fondo-ganador");
        const name = this.add.text(this.sys.game.config.width / 2, this.sys.game.config.height / 2 - 220, this.#winPlayer, {
            fontFamily: 'Montserrat', fontSize: 20, fontStyle: 'bold', 
        } ).setOrigin(0.5)
        new Button(this, this.sys.game.config.width / 2 - 5, this.sys.game.config.height - 45, 'botones', "boton-volver", () => {
            
            this.cameras.main.fadeOut(500).on('camerafadeoutcomplete', ()=>{
                this.scene.start("Inicio");
            })
        })
        
    }
}
