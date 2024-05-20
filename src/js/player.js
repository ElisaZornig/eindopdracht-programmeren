import { Actor, Vector, Keys, clamp, CollisionType } from "excalibur";
import { Resources } from "./resources.js";

export class Player extends Actor {
    score = 0;
    health = 100;

    constructor() {
        super({
            width: Resources.Fish.width - 5,
            height: Resources.Fish.height - 5,
            collisionType: CollisionType.Active
        });
        this.direction = new Vector(0, 0); // Initialize direction vector
    }

    onInitialize(engine) {
        this.graphics.use(Resources.Fish.toSprite());
        this.pos = new Vector(400, 400);
        this.scale = new Vector(0.3, 0.3);
    }

    onPreUpdate(engine) {
        this.pos.x = clamp(this.pos.x, 0, 800);
        this.pos.y = clamp(this.pos.y, 0, 600);

        let xspeed = 0;
        let yspeed = 0;

        if (engine.input.keyboard.isHeld(Keys.W) || engine.input.keyboard.isHeld(Keys.Up)) {
            yspeed = -1;
        } else if (engine.input.keyboard.isHeld(Keys.S) || engine.input.keyboard.isHeld(Keys.Down)) {
            yspeed = 1;
        } else {
            yspeed = 0;
        }

        if (engine.input.keyboard.isHeld(Keys.D) || engine.input.keyboard.isHeld(Keys.Right)) {
            xspeed = 1;
            this.graphics.flipHorizontal = true;
        } else if (engine.input.keyboard.isHeld(Keys.A) || engine.input.keyboard.isHeld(Keys.Left)) {
            xspeed = -1;
            this.graphics.flipHorizontal = false;
        } else {
            xspeed = 0;
        }

        this.direction = new Vector(xspeed, yspeed);

        // Apply movement speed to the direction
        const movementSpeed = 100; // Define a constant movement speed
        this.vel = this.direction.scale(movementSpeed);
    }
}
