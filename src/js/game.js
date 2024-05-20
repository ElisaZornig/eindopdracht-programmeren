import '../css/style.css'
import { Actor, Engine, Vector, DisplayMode } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Wall } from './wall.js'
import { Player } from './player.js'

export class Game extends Engine {

    constructor() {
        super({
            width: 1280,
            height: 700,
            displayMode: DisplayMode.FitScreen
        })
        this.start(ResourceLoader).then(() => this.startGame())

    }

    startGame() {
        let background = new Actor();
        background.graphics.use(Resources.Background.toSprite())
        this.add(background)
        console.log("start de game!")
        const leftWall = new Wall(400, 200, 100, 100)
        this.add(leftWall)
        const player = new Player()
        this.add(player)
    }
}

new Game()
