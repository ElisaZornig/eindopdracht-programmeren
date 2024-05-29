import { Actor, ScreenElement, Vector, Color } from "excalibur";

export class UI extends ScreenElement {
    healthbar;
    maxHealth = 100;

    onInitialize(engine) {
        let barBackground = new Actor({
            x: 10, y: 40, z: 3,
            color: Color.fromRGB(255, 255, 255, 0.4),
            width: 200, height: 20,
            anchor: Vector.Zero
        });
        this.addChild(barBackground);

        this.healthbar = new Actor({
            x: 10, y: 40, z: 3,
            color: Color.Green,
            width: 200, height: 20,
            anchor: Vector.Zero
        });
        this.addChild(this.healthbar);
    }

    reduceHealth(currentHealth) {
        const healthPercentage = currentHealth / this.maxHealth;
        this.healthbar.scale = new Vector(healthPercentage, 1); 
    }
}
