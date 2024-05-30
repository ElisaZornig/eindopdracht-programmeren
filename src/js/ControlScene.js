import { Scene, Vector, Input, Font, Actor } from 'excalibur';
import { Resources } from './resources.js';

export class ControlScene extends Scene {
    constructor(game) {
        super();
        this.game = game;
    }

    onInitialize() {
        this.game.input.keyboard.on('press', (evt) => {
            if (evt.key === Input.Keys.Enter) {
                this.game.goToMainGameScene();
            }
        });

        const startScherm = new Actor()
        startScherm.graphics.use(Resources.Controls.toSprite())
        startScherm.pos = new Vector(this.game.drawWidth / 2, this.game.drawHeight / 2)
        startScherm.scale = new Vector(0.7, 0.7)
        this.add(startScherm);
        console.log("Control scene")
    }
}
