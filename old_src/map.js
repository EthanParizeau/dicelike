import { DebugLog } from './util';
import XY from './xy';
import { RNG } from 'rot-js';

class Map {
    constructor(tiles, player) {
        DebugLog.info('Map Created');
        this.id = null;
        this.tiles = tiles;
        this.width = tiles.length;
        this.height = tiles[0].length;
        // List that holds entities
        this.entities = [];
    }

    addEntityAtRandomPosition(entity) {
        entity.xy = this.getRandomFloorTile();
        this.addEntity(entity);
    }

    addEntity(entity) {
        // Update the entity's levelID
        entity.levelID = this.id;
        // Add entity to list
        this.entities.push(entity);
    }

    getEntityAt(xy) {
        for(let i = 0; i < this.entities.length; i++) {
            if(this.entities[i].xy.is(xy)) {
                return this.entities[i];
            }
        }
    }

    removeEntity(entity) {
        for(let i = 0; i < this.entities.length; i++) {
            if(this.entities[i] === entity) {
                this.entities.splice(i, 1);
                entity.levelID = null;
                break;
            }
        }
    }

    getRandomFloorTile() {
        let x, y;
        do {
            x = Math.floor(RNG.getUniform() * this.width);
            y = Math.floor(RNG.getUniform() * this.height);
        } while(!this.isEmptyFloor(new XY(x, y)));
        return new XY(x, y);
    }

    getTile(xy) {
        // Make sure we are inside the bounds. If we aren't, return
        // null tile.
        return this.tiles[xy.x][xy.y];
    }

    isEmptyFloor(xy) {
        // Check if tile is floor and is empty
        return this.getTile(xy).type === "floor" && !this.getEntityAt(xy);
    }

    // OLD
    isInBounds(xy) {
        return (xy.x > 0 && xy.x < this.width && xy.y > 0 && xy.y < this.height);
    }

    test() {
        console.log("MAP");
        console.log(this);
    }
}
export default Map;