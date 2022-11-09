export default class SoundsManage{
    constructor(soundScene, volume = 0.2, sound) {
        this.sound = soundScene;
        this.sound.volume = volume;
        this.sound.musicMain = this.sound.add("musicMain", { loop: true, volume: volume });
        this.sound.musicTablero = this.sound.add("musicTablero", { loop: true, volume: volume });
        this.sound.tirarDadoSFX = this.sound.add("tirarDado");
        this.sound.movimientoDadoSFX = this.sound.add("movimiento");
        this.sound.inicioPartidaSFX = this.sound.add("sonido-inicio-partida");
        this.sound.seleccionPersonajesSFX = this.sound.add("sonido-pato-inicio-partida");
        this.sound.ganadorSFX = this.sound.add("sonido-ganador");
        this.sound.yunqueSFX = this.sound.add("sonido-yunque");
        this.sound.nuclearSFX = this.sound.add("sonido-nuclear");
        this.sound.bombSFX = this.sound.add("sonido-bomba");
        this.sound.btnSFX = this.sound.add("sonido-boton");
    }
}