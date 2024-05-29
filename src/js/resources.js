import { ImageSource, Loader } from 'excalibur';
import { TiledResource } from '@excaliburjs/plugin-tiled';

const Resources = {
    Fish: new ImageSource('images/fish.png'),
    Paper: new ImageSource('images/paper.png'),
    Background: new ImageSource('images/pixel.jpg'),
    SpriteSheet: new ImageSource('images/Adam_run_16x16.png'),
    SpriteSheetPlayer2: new ImageSource('images/Player2_run.png'),
    SpriteSheetAlexPhone: new ImageSource('images/Alex_phone_16x16.png'),
    SpriteSheetAmeliaPhone: new ImageSource('images/Amelia_phone_16x16.png'),
    SpriteSheetBobPhone: new ImageSource('images/Characters_free/Bob_phone_16x16.png'),
    SpriteSheetAlexWalk: new ImageSource('images/Alex_run_16x16.png'),
    SpriteSheetAmeliaWalk: new ImageSource('images/Amelia_run_16x16.png'),
    SpriteSheetBobWalk: new ImageSource('images/Bob_run_16x16.png'),
    StartScherm: new ImageSource('images/startscherm.png'),
    Gesnapt: new ImageSource('images/gesnapt.png'),
    Controls: new ImageSource('images/controls.png'),
    ClassroomMap: new TiledResource('images/school2.tmx')
};

const ResourceLoader = new Loader([
    Resources.Fish,
    Resources.Paper,
    Resources.Background,
    Resources.SpriteSheet,
    Resources.SpriteSheetPlayer2,
    Resources.ClassroomMap,
    Resources.SpriteSheetAlexPhone,
    Resources.SpriteSheetAmeliaPhone,
    Resources.SpriteSheetBobPhone,
    Resources.SpriteSheetAlexWalk,
    Resources.SpriteSheetAmeliaWalk,
    Resources.StartScherm,
    Resources.Gesnapt,
    Resources.Controls,
    Resources.SpriteSheetBobWalk
]);

export { Resources, ResourceLoader };
