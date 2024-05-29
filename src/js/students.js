import { Actor, Vector, CollisionType, SpriteSheet, Animation, range } from "excalibur";
import { Resources } from './resources.js';
import { Player } from "./player.js";

export class NPC extends Actor {
    currentAnimation = null;
    target = null; 
    detectionRadius = 100; // Radius to detect the player
    score = 0;

    constructor(game) {
        super({
            width: 10,
            height: 15,
            collisionType: CollisionType.Active
        });
        this.direction = new Vector(0, 0); 
        this.changeDirectionInterval = 2000;
        this.timeSinceLastChange = 0;
        this.game = game;
    }

    onInitialize(engine) {
        const spriteSheets = [
            Resources.SpriteSheetAlexWalk,
            Resources.SpriteSheetAmeliaWalk,
            Resources.SpriteSheetBobWalk
        ];
        const spriteSheetsPhone = [
            Resources.SpriteSheetAlexPhone,
            Resources.SpriteSheetAmeliaPhone,
            Resources.SpriteSheetBobPhone
        ];

        const number = Math.floor(Math.random() * spriteSheets.length);
        const selectedSpriteSheet = spriteSheets[number];
        const selectedSpriteSheetPhone = spriteSheetsPhone[number];

        // Define the sprite sheet
        const spriteSheet = SpriteSheet.fromImageSource({
            image: selectedSpriteSheet,
            grid: {
                rows: 1,
                columns: 24,
                spriteWidth: 16,
                spriteHeight: 32
            },
        });

        // Create animations from the selected sprite sheet
        this.runAnimationRight = Animation.fromSpriteSheet(spriteSheet, range(0, 5), 100);
        this.runAnimationTop = Animation.fromSpriteSheet(spriteSheet, range(6, 11), 100);
        this.runAnimationLeft = Animation.fromSpriteSheet(spriteSheet, range(12, 17), 100);
        this.runAnimationDown = Animation.fromSpriteSheet(spriteSheet, range(18, 23), 100);
        this.runAnimationRightIdle = Animation.fromSpriteSheet(spriteSheet, range(2, 2), 100);
        this.runAnimationTopIdle = Animation.fromSpriteSheet(spriteSheet, range(9, 9), 100);
        this.runAnimationLeftIdle = Animation.fromSpriteSheet(spriteSheet, range(14, 14), 100);
        this.runAnimationDownIdle = Animation.fromSpriteSheet(spriteSheet, range(20, 20), 100);

        // Additional phone animation
        const spriteSheetPhone = SpriteSheet.fromImageSource({
            image: selectedSpriteSheetPhone,
            grid: {
                rows: 1,
                columns: 9,
                spriteWidth: 16,
                spriteHeight: 32
            },
        });
        this.AnimationPhone = Animation.fromSpriteSheet(spriteSheetPhone, range(0, 8), 70);

        // Set initial idle animation
        this.graphics.use(this.runAnimationDownIdle);
        this.currentAnimation = this.runAnimationDownIdle;

        // Set the initial position and scale of the actor
        this.scale = new Vector(1.5, 1.5);

        this.changeDirection();

        // Add collision handler
        this.on('collisionstart', (evt) => this.onCollisionStart(evt));
    }

    changeDirection() {
        const directions = [
            new Vector(1, 0),   // Right
            new Vector(-1, 0),  // Left
            new Vector(0, 1),   // Down
            new Vector(0, -1),  // Up
            new Vector(0, 0)    // Still
        ];
        const randomDirection = directions[Math.floor(Math.random() * directions.length)];
        this.direction = randomDirection;
        this.updateAnimation(); // Update animation based on direction
    }

    updateAnimation() {
        if (this.direction.equals(new Vector(1, 0))) {
            if (this.currentAnimation !== this.runAnimationRight) {
                this.graphics.use(this.runAnimationRight);
                this.currentAnimation = this.runAnimationRight;
            }
        } else if (this.direction.equals(new Vector(-1, 0))) {
            if (this.currentAnimation !== this.runAnimationLeft) {
                this.graphics.use(this.runAnimationLeft);
                this.currentAnimation = this.runAnimationLeft;
            }
        } else if (this.direction.equals(new Vector(0, 1))) {
            if (this.currentAnimation !== this.runAnimationDown) {
                this.graphics.use(this.runAnimationDown);
                this.currentAnimation = this.runAnimationDown;
            }
        } else if (this.direction.equals(new Vector(0, -1))) {
            if (this.currentAnimation !== this.runAnimationTop) {
                this.graphics.use(this.runAnimationTop);
                this.currentAnimation = this.runAnimationTop;
            }
        } else if (this.direction.equals(new Vector(0, 0))) {
            if (this.currentAnimation !== this.AnimationPhone) {
                this.graphics.use(this.AnimationPhone);
                this.currentAnimation = this.AnimationPhone;
            }
        }
    }

    onPreUpdate(engine, delta) {
        let nearestPlayer = null;
        let minDistance = Number.MAX_VALUE;


        engine.currentScene.actors.forEach(actor => {
            if (actor instanceof Player) {
                const distanceToPlayer = this.pos.distance(actor.pos);
                if (distanceToPlayer < minDistance) {
                    minDistance = distanceToPlayer;
                    nearestPlayer = actor;
                }
            }
        });

        if (nearestPlayer) {
            const distanceToPlayer = minDistance;
            if (distanceToPlayer <= this.detectionRadius) {
                this.direction = nearestPlayer.pos.sub(this.pos).normalize();
                this.updateAnimation();
            } else {
                this.timeSinceLastChange += delta;
                if (this.timeSinceLastChange >= this.changeDirectionInterval) {
                    this.changeDirection();
                    this.timeSinceLastChange = 0;
                }
            }
        }

        const movementSpeed = 100;
        this.vel = this.direction.scale(movementSpeed);
    }

    onCollisionStart(evt) {
        if (evt.other instanceof Player) {
            alert("Je bent gesnapt, je moet opnieuw beginnen")

            this.game.restartMainGameScene();
        }
    }
}
