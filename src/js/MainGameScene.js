import { Scene, Random, Vector, Actor, Util } from 'excalibur';
import { Resources } from './resources.js';
import { Player } from './player.js';
import { NPC } from './students.js';
import { Paper } from './paper.js';
import { Player2 } from './player2.js';
import { Score } from './score.js';

export class MainGameScene extends Scene {
    constructor(game) {
        super();
        this.game = game; 
    }

    onInitialize() {
        this.FillMainScene();
    }

    restartMainGameScene() {
        this.scorecounter.resetScore();
        this.clear()
        this.FillMainScene()
    }
    FillMainScene() {
        this.scorecounter = new Score(); 
        this.scorecounter.pos = new Vector(40, 40); 
        this.scorecounter.visible = true;
        this.scorecounter.z = 999;
        this.add(this.scorecounter);
        const xcoordinates = [1120, 1344, 833, 1726, 2252, 1836, 1216]
        const ycoordinates = [300, 320, 608, 608, 736, 1180, 1120]
        Resources.ClassroomMap.addToScene(this);

        const player = new Player(this.game);
        player.z = 8;
        player.pos = new Vector(1000, 1000);

        this.add(player);
        const player2 = new Player2(this.game);
        player2.z = 8;
        player2.pos = new Vector(1000, 900);

        this.add(player2);
        const random = new Random();
        for (let j = 0; j < 7; j++) {
            const teacher = new NPC(this);
            // teacher.target = player;
            teacher.z = 2;
            teacher.pos = new Vector(xcoordinates[j], ycoordinates[j])
            this.add(teacher);
        }

        for (let i = 0; i < 7; i++) {
            const paper = new Paper(this.scorecounter);
            paper.z = 1;
            paper.pos = new Vector(xcoordinates[i], ycoordinates[i])
            this.add(paper);
        }
        this.updateCamera(player, player2);
    }

    updateCamera(player, player2) {
        this.camera.clearAllStrategies();

        this.on('postupdate', () => {
            // Calculate midpoint
            const midpoint = player.pos.add(player2.pos).scale(0.5);

            // Calculate distance
            const distance = player.pos.distance(player2.pos);

            // Set camera position to midpoint
            this.camera.pos = midpoint;

            // Adjust zoom based on distance
            const zoomLevel = clamp(1 / (distance / 400), 0.5, 2); // Adjust 400 to fit your game's scale
            this.camera.zoom = zoomLevel;
        });
    }
}

// Clamp function to restrict values within a range
function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}
