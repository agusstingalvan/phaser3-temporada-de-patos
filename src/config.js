import Ganador from './scenes/Ganador';
import Inicio from './scenes/Inicio';
import Interface from './scenes/Interface';
import Precarga from './scenes/Precarga';
import SeleccionPersonajes from './scenes/SeleccionPersonajes';
import Tablero from './scenes/Tablero';


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
            debug: true,
        },
    },
    scene: [
        Precarga,
        Inicio,
        SeleccionPersonajes,
        Tablero,
        Interface,
        Ganador,
    ],
};
