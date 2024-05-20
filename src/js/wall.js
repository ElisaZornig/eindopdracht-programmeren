import { Actor, CollisionType, Vector } from "excalibur";
// import any other classes you might need

export class Wall extends Actor {
    constructor(x, y, width, height) {
        super({
            pos: new Vector(x, y),
            width: width,
            height: height,
            collisionType: CollisionType.Fixed
        });
        // other properties, such as color and opacity, can be set here as well
    }
}