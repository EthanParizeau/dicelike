import { DebugLog } from './util';
class Map {
    constructor(tiles, player) {
        DebugLog.info('Map Created');
        this.tiles = tiles;
    }

    test() {
        console.log("MAP");
        console.log(this);
    }
}
export default Map;