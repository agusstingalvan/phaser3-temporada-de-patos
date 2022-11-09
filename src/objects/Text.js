export default class Text extends Phaser.GameObjects. Text{
    constructor(scene, x, y, text, configStyle = null){
        super(scene, x, y, text, (configStyle)? configStyle : {fontSize: '18', fontStyle: 'bold', color: '242424', fontFamily: 'Montserrat'});
        this.setOrigin(0.5)
    }
}