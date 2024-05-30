import { Engine, DisplayMode, Scene, Label, TextAlign, Color, Input, Vector, Loader, ScaleTo, Random, Font, DisplayMode} from 'excalibur';
import { Resources, ResourceLoader } from './resources.js';
import { Player } from './player.js';
import { NPC } from './students.js';
import { TiledResource } from '@excaliburjs/plugin-tiled';

import { IntroScene } from './IntroScene.js';
import { MainGameScene } from './MainGameScene.js';
import { EndScene } from './EndScene.js'
import { ControlScene } from './ControlScene.js';

export class Game extends Engine {
    constructor() {
        super({
            width: 600,
            height: 400,
            displayMode: DisplayMode.FitScreen
            antialiasing: false
        });
        this.start(ResourceLoader).then(() => this.showIntro());
    }

    showIntro() {

        const introScene = new IntroScene(this);
        this.addScene('intro', introScene);
        this.goToScene('intro');
    }

    goToControlScene() {
        const controlScene = new ControlScene(this)
        this.addScene('controlscene', controlScene);
        this.goToScene('controlscene');

    }

    goToMainGameScene() {
        const mainScene = new MainGameScene(this);
        this.addScene('main', mainScene);
        this.goToScene('main');

    }
    goToEndScene() {
        const endScene = new EndScene(this);
        this.addScene('end', endScene);
        this.goToScene('end');
    }



}


new Game();
