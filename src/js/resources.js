import { ImageSource, Sound, Resource, Loader, ImageWrapping } from 'excalibur'

const Resources = {
    Fish: new ImageSource('images/fish.png'),
    Background: new ImageSource('images/pixel.jpg'),
}
const ResourceLoader = new Loader([
    Resources.Fish,
    Resources.Background
])

export { Resources, ResourceLoader }