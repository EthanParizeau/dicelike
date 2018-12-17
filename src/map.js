import { DebugLog } from './util';
import Tile from './tile';
import XY from './xy';

class Map {
    constructor(tiles, player) {
        DebugLog.info('Map Created');
        this.id = null;
        this.world = null;
        this.tiles = tiles;
        this.width = tiles.length;
        this.height = tiles[0].length;
        // List that holds entities
        this.entities = [];
    }

    getTile(xy) {
        // Make sure we are inside the bounds. If we aren't, return
        // null tile.
        if(!this.isInBounds(xy)) {
            return new Tile("null");
        } else {
            return this.tiles[xy.x][xy.y] || new Tile("null");
        }
    }

    isInBounds(xy) {
        return (xy.x > 0 && xy.x < this.width && xy.y > 0 && xy.y < this.height);
    }

    test() {
        console.log("MAP");
        console.log(this);
    }
}
export default Map;