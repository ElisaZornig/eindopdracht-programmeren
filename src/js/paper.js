import { Actor, CollisionType } from "excalibur";
import { Resources } from './resources.js';
import { Player } from "./player.js";
import { Player2 } from "./player2.js";

export class Paper extends Actor {
    score = 0;
    constructor(scorecounter) {
        super({
            width: 20,
            height: 32,
        });
        this.scorecounter = scorecounter;
    }

    onInitialize(engine) {
        this.graphics.use(Resources.Paper.toSprite());
        this.on('collisionstart', (evt) => this.onCollisionStart(evt));
    }

    onCollisionStart(evt) {
        if (evt.other instanceof Player) {
            this.scorecounter.updateScore();
            this.kill();
        }
    }
}
