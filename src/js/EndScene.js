import { Scene, Label, TextAlign, Color, Vector, Input, Font } from 'excalibur';

export class EndScene extends Scene {
    constructor(game) {
        super();
        this.game = game;
    }

    onInitialize() {
        this.game.input.keyboard.on('press', (evt) => {
            if (evt.key === Input.Keys.Space) {
                this.game.showIntroScene();
            }
        });

        const instructions = new Label({
            text: 'Je hebt gewonnen!',
            font: new Font({
                size: 30, 
                family: 'Arial'
            }),
            textAlign: TextAlign.Center,
            pos: new Vector((this.game.drawWidth / 2) - 600, this.game.drawHeight / 2 - 200),
            color: Color.White,
        });
        this.add(instructions);
        console.log("end scene")
    }
}
