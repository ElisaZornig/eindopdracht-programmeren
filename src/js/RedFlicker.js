import { Actor, Color, Vector } from "excalibur";

export class RedOverlay extends Actor {
    constructor(engine) {
        super({
            pos: new Vector(engine.drawWidth / 2, engine.drawHeight / 2),
            width: 2560,
            height: 1920,
            color: new Color(255, 0, 0, 0.5) // Semi-transparent red
        });

        this.z = 999; // Ensure it is on top of other actors
        this.visible = false; // Start off as not visible
    }

    onInitialize(engine) {
        this.graphics.opacity = 0.5; // Ensure the overlay is semi-transparent
    }
}
