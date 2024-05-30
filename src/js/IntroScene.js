import { Scene, Label, TextAlign, Color, Vector, Input, Font, Actor } from 'excalibur';
import { ResourceLoader, Resources } from './resources.js';

export class IntroScene extends Scene {
    constructor(game) {
        super();
        this.game = game;
    }

    onInitialize() {
        this.game.input.keyboard.on('press', (evt) => {
            if (evt.key === Input.Keys.Space) {
                this.game.goToControlScene();
            }
        });

        const startScherm = new Actor()
        startScherm.graphics.use(Resources.StartScherm.toSprite())
        startScherm.pos = new Vector(this.game.drawWidth / 2, this.game.drawHeight / 2)
        startScherm.scale = new Vector(0.7, 0.7)
        this.add(startScherm);
        console.log("intro scene")
    }
}
