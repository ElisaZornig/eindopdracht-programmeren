import { Actor, Vector, Keys, CollisionType, SpriteSheet, Animation, range, Rectangle } from "excalibur";
import { ResourceLoader, Resources } from './resources.js';
import { UI } from "./staminaBar.js";
import { Score } from "./score.js";
import { Paper } from "./paper.js";
import { Player } from "./player.js";

export class Player2 extends Player {

    onInitialize(engine) {
        // Define the sprite sheet
        const spriteSheet = SpriteSheet.fromImageSource({
            image: Resources.SpriteSheetPlayer2,
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
            engine.input.keyboard.isHeld(Keys.W) ||
            engine.input.keyboard.isHeld(Keys.A) ||
            engine.input.keyboard.isHeld(Keys.S) ||
            engine.input.keyboard.isHeld(Keys.D)
        );

    }

    onPreUpdate(engine, delta) {
        let xspeed = 0;
        let yspeed = 0;

        if (engine.input.keyboard.isHeld(Keys.W)) {
            yspeed = -1.2;
            if (this.currentAnimation !== this.runAnimationTop) {
                this.graphics.use(this.runAnimationTop);
                this.currentAnimation = this.runAnimationTop;
            }
        } else if (engine.input.keyboard.isHeld(Keys.S)) {
            yspeed = 1.2;
            if (this.currentAnimation !== this.runAnimationDown) {
                this.graphics.use(this.runAnimationDown);
                this.currentAnimation = this.runAnimationDown;
            }
        } else {
            yspeed = 0;
        }

        if (engine.input.keyboard.isHeld(Keys.D)) {
            xspeed = 1.2;
            if (this.currentAnimation !== this.runAnimationRight) {
                this.graphics.use(this.runAnimationRight);
                this.currentAnimation = this.runAnimationRight;
            }
        } else if (engine.input.keyboard.isHeld(Keys.A)) {
            xspeed = -1.2;
            if (this.currentAnimation !== this.runAnimationLeft) {
                this.graphics.use(this.runAnimationLeft);
                this.currentAnimation = this.runAnimationLeft;
            }
        } else {
            xspeed = 0;
        }

        if (engine.input.keyboard.isHeld(Keys.ShiftLeft)) {

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
