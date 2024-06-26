import { Actor, Vector, Keys, CollisionType, SpriteSheet, Animation, range, Rectangle } from "excalibur";
import { ResourceLoader, Resources } from './resources.js';
import { UI } from "./staminaBar.js";

export class Player extends Actor {
    health = 100;
    currentAnimation = null;

    constructor() {
        super({
            width: 12,
            height: 20,
            collisionType: CollisionType.Active
        });

        this.direction = new Vector(0, 0); 
        this.ui = new UI();
        this.ui.scale = new Vector(0.3, 0.3);
        this.ui.pos = new Vector(-30, -30);
        this.ui.z = 7;
        this.addChild(this.ui);

        const customShape = new Rectangle(this.width, this.height - 10, new Vector(0, 5)); // Lower the center by 5 units
        this.body.collider = customShape;

    }

    onInitialize(engine) {
        const spriteSheet = SpriteSheet.fromImageSource({
            image: Resources.SpriteSheet,
            grid: {
                rows: 1,
                columns: 24,
                spriteWidth: 16,
                spriteHeight: 32
            },
        });

        this.runAnimationRight = Animation.fromSpriteSheet(spriteSheet, range(0, 5), 100);
        this.runAnimationTop = Animation.fromSpriteSheet(spriteSheet, range(6, 11), 100);
        this.runAnimationLeft = Animation.fromSpriteSheet(spriteSheet, range(12, 17), 100);
        this.runAnimationDown = Animation.fromSpriteSheet(spriteSheet, range(18, 23), 100);
        this.runAnimationRightIdle = Animation.fromSpriteSheet(spriteSheet, range(2, 2), 100);
        this.runAnimationTopIdle = Animation.fromSpriteSheet(spriteSheet, range(9, 9), 100);
        this.runAnimationLeftIdle = Animation.fromSpriteSheet(spriteSheet, range(14, 14), 100);
        this.runAnimationDownIdle = Animation.fromSpriteSheet(spriteSheet, range(20, 20), 100);
        this.graphics.use(this.runAnimationDownIdle);
        this.currentAnimation = this.runAnimationDownIdle;

        this.scale = new Vector(1.5, 1.5);
    }

    noMovementKeysHeld(engine) {
        return !(
            engine.input.keyboard.isHeld(Keys.Up) ||
            engine.input.keyboard.isHeld(Keys.Left) ||
            engine.input.keyboard.isHeld(Keys.Down) ||
            engine.input.keyboard.isHeld(Keys.Right)
        );

    }

    onPreUpdate(engine, delta) {
        let xspeed = 0;
        let yspeed = 0;

        if (engine.input.keyboard.isHeld(Keys.Up)) {
            yspeed = -1.2;
            if (this.currentAnimation !== this.runAnimationTop) {
                this.graphics.use(this.runAnimationTop);
                this.currentAnimation = this.runAnimationTop;
            }
        } else if (engine.input.keyboard.isHeld(Keys.Down)) {
            yspeed = 1.2;
            if (this.currentAnimation !== this.runAnimationDown) {
                this.graphics.use(this.runAnimationDown);
                this.currentAnimation = this.runAnimationDown;
            }
        } else {
            yspeed = 0;
        }

        if (engine.input.keyboard.isHeld(Keys.Right)) {
            xspeed = 1.2;
            if (this.currentAnimation !== this.runAnimationRight) {
                this.graphics.use(this.runAnimationRight);
                this.currentAnimation = this.runAnimationRight;
            }
        } else if (engine.input.keyboard.isHeld(Keys.Left)) {
            xspeed = -1.2;
            if (this.currentAnimation !== this.runAnimationLeft) {
                this.graphics.use(this.runAnimationLeft);
                this.currentAnimation = this.runAnimationLeft;
            }
        } else {
            xspeed = 0;
        }

        if (engine.input.keyboard.isHeld(Keys.ShiftRight)) {

            if (this.health < 0) {
                this.health = -1;
            } else {
                xspeed *= 2;
                yspeed *= 2;

                this.health -= 0.05 * delta;
            }
            this.ui.reduceHealth(this.health);
        } else {
            if (this.health > 100) {
                this.health = 100;
            } else {
                this.health += 0.05 * delta;
            }
            this.ui.reduceHealth(this.health);
        }


        if (this.noMovementKeysHeld(engine)) {
            if (this.currentAnimation === this.runAnimationRight) {
                this.graphics.use(this.runAnimationRightIdle);
                this.currentAnimation = this.runAnimationRightIdle;
            } else if (this.currentAnimation === this.runAnimationLeft) {
                this.graphics.use(this.runAnimationLeftIdle);
                this.currentAnimation = this.runAnimationLeftIdle;
            } else if (this.currentAnimation === this.runAnimationTop) {
                this.graphics.use(this.runAnimationTopIdle);
                this.currentAnimation = this.runAnimationTopIdle;
            } else if (this.currentAnimation === this.runAnimationDown) {
                this.graphics.use(this.runAnimationDownIdle);
                this.currentAnimation = this.runAnimationDownIdle;
            }
        }

        this.direction = new Vector(xspeed, yspeed);

        const movementSpeed = 100; 
        this.vel = this.direction.scale(movementSpeed);
    }

}
