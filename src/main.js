import Phaser from 'phaser'
import Ganador from './scenes/Ganador';
import HelloWorldScene from './scenes/HelloWorldScene';
import Inicio from './scenes/Inicio';
import Interface from './scenes/Interface';
import Precarga from './scenes/Precarga';
import SeleccionPersonajes from './scenes/SeleccionPersonajes';
import Tablero from './scenes/Tablero';
// import { config } from './config'
const config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 768,

    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        min: {
            width: 800,
            height: 600,
        },
        max: {
            width: 1280,
            height: 768,
        },
    },
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 300 },
            debug: false,
        },
    },
    scene: [
        Precarga,
        HelloWorldScene,
        Inicio,
        SeleccionPersonajes,
        Tablero,
        Interface,
        Ganador,
    ],
};

export default new Phaser.Game(config);
