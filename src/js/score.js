import { Actor, ScreenElement, Vector, Color, Label, Font } from "excalibur";

export class Score extends ScreenElement {
    score = 0;
    scoreText

    onInitialize(engine) {
        this.scoreText = new Label({
            z: 999,
            text: 'Papiersnippers verzameld: 0',
            font: new Font({
                size: 50, 
                family: 'Arial'
            }),
        })
        this.addChild(this.scoreText)
    }

    updateScore() {
        this.score++
        this.scoreText.text = 'Papiersnippers verzameld:' + this.score
        if (this.score >= 7) {
            this.scene.engine.goToEndScene();
        }
        console.log("score is ge update")
        console.log(this.scoreText.text)
    }
    resetScore() {
        this.score = 0;
        console.log("score is reset")
    }

}