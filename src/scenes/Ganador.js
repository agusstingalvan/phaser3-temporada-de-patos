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
        console.log(data)
        this.#winPlayer = data.getName();
    }
	preload()
    {
    }

    create()
    {
        
        this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'atlas-backgrounds', "fondo-ganador");
        this.add.text(this.sys.game.config.width / 2, this.sys.game.config.height / 2 - 220, this.#winPlayer, {
            fontFamily: 'Montserrat', fontSize: 20, fontStyle: 'bold', 
        } ).setOrigin(0.5)
        new Button(this, this.sys.game.config.width / 2 - 5, this.sys.game.config.height - 45, 'botones', "boton-volver", () => {
            this.scene.start("Inicio")
        })
        
    }
}
