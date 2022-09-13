import HelloWorldScene from './scenes/HelloWorldScene'
import Precarga from './scenes/Precarga';
import Inicio from './scenes/Inicio';
import SeleccionPersonajes from './scenes/SeleccionPersonajes';
import Tablero from './scenes/Tablero';
import Ganador from './scenes/Ganador';

export const config = {
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
        Inicio,
        SeleccionPersonajes,
        Tablero,
        Ganador,
    ],
};
