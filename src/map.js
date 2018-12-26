import * as beings from './beings';
import XY from './xy';
import { MapOptions } from './const';
import { RNG } from 'rot-js';
/**
 * Manage entities and players
 *
 * @class Map
 */
class Map {
    constructor() {
        this.entities = [];
        this.player = null;
        this.tiles = null;
        this.world = null;
        this.width = MapOptions.width;
        this.height = MapOptions.height;
    }

    addPlayer(player) {
        console.log("ADDING PLAYER");
        this.player = player;
        this.addBeingAtRandom(player);
    }

    addEntity(entity) {
        this.entities.push(entity);
    }

    addBeingAtRandom(being) {
        being.xy = this.getEmptyTile();
        this.addEntity(being);
    }

    getEmptyTile() {
        let x, y;
        do {
            x = Math.floor(RNG.getUniform() * this.width);
            y = Math.floor(RNG.getUniform() * this.height);
        } while(!this.isEmptyFloor(new XY(x, y)));
        return new XY(x, y);
    }

    isEmptyFloor(xy) {
        // Check if tile is floor and is empty
        return this.getTile(xy).type === "floor" && !this.getEntityAt(xy);
    }

    getEntityAt(xy) {
        for(let i = 0; i < this.entities.length; i++) {
            if(this.entities[i].xy.is(xy)) {
                return this.entities[i];
            }
        }
    }

    getEntities() {
        return this.entities;
    }

    getTiles() {
        return this.tiles;
    }

    getTile(xy) {
        return this.tiles[xy.x][xy.y];
    }

    test() {
        console.log("MAP");
    }
}

export default Map;