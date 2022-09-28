export default class PlayerController {
    #scene
    #sprite
    #cursors
    #stateMachine 
    constructor(scene ,sprite, cursors){
        this.scene = scene;
        this.sprite = sprite;
        this.cursors = cursors;
    }
}

