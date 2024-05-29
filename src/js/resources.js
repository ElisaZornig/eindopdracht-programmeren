import { ImageSource, Loader } from 'excalibur';
import { TiledResource } from '@excaliburjs/plugin-tiled';

const Resources = {
    Fish: new ImageSource('images/fish.png'),
    Paper: new ImageSource('images/paper.png'),
    Background: new ImageSource('images/pixel.jpg'),
    SpriteSheet: new ImageSource('src/assets/tileset/Modern tiles_Free/Characters_free/Adam_run_16x16.png'),
    SpriteSheetPlayer2: new ImageSource('src/assets/tileset/Modern tiles_Free/Characters_free/Player2_run.png'),
    SpriteSheetAlexPhone: new ImageSource('src/assets/tileset/Modern tiles_Free/Characters_free/Alex_phone_16x16.png'),
    SpriteSheetAmeliaPhone: new ImageSource('src/assets/tileset/Modern tiles_Free/Characters_free/Amelia_phone_16x16.png'),
    SpriteSheetBobPhone: new ImageSource('src/assets/tileset/Modern tiles_Free/Characters_free/Bob_phone_16x16.png'),
    SpriteSheetAlexWalk: new ImageSource('src/assets/tileset/Modern tiles_Free/Characters_free/Alex_run_16x16.png'),
    SpriteSheetAmeliaWalk: new ImageSource('src/assets/tileset/Modern tiles_Free/Characters_free/Amelia_run_16x16.png'),
    SpriteSheetBobWalk: new ImageSource('src/assets/tileset/Modern tiles_Free/Characters_free/Bob_run_16x16.png'),
    StartScherm: new ImageSource('images/startscherm.png'),
    Gesnapt: new ImageSource('images/gesnapt.png'),
    Controls: new ImageSource('images/controls.png'),
    ClassroomMap: new TiledResource('src/assets/maps/school2.tmx') 
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
