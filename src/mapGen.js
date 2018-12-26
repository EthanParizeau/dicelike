import { Map as rotMap, RNG } from 'rot-js';
import * as beings from './beings';
import Map from './map';
import Tile from './tile';
import { MapOptions } from './const'
import { DebugLog } from './util';

/**
 * Generate a map
 *
 */
function generateMap() {
    DebugLog.info('Generated Map');

    let map = new Map();
    // Generate empty mapWidth x mapHeight array
    map.tiles = Array(MapOptions.width).fill(0).map(() => Array(MapOptions.height).fill(0));
    let generator = new rotMap.Arena(MapOptions.width, MapOptions.height);
    generator.create((x, y, value) => {
        if(value) {
            map.tiles[x][y] = new Tile("wall");
        } else {
            if(RNG.getUniform() <= 0.05) {
                if(RNG.getUniform() <= .5) {
                    map.tiles[x][y] = new Tile("lightTree");
                } else {
                    map.tiles[x][y] = new Tile("darkTree");
                }
            } else {
                map.tiles[x][y] = new Tile("floor");
            }
        }
    });

    map.addBeingAtRandom(new beings.Rat);
    
    return map;
}

export default generateMap;