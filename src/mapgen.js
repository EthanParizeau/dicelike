import { Map as rotMap} from 'rot-js';
import { MapOptions } from './const'
import Map from './map';
import Tile from './tile';

/**
 * Generate a map
 *
 * @param {*} player - Player 
 * @param {*} id - ID
 */
function GenerateMap(player, id) {
    let map = [];

    for (let x = 0; x < MapOptions.width; x++) {
        // Create nested array for y values
        map.push([]);
        for (let y = 0; y < MapOptions.height; y++) {
            // Add tiles
            map[x].push(new Tile("null"));
        }
    }

    // Setup the generator
    const generator = new rotMap.Digger(MapOptions.width, MapOptions.height);
    generator.create((x, y, value) => {
        if(value) {
            map[x][y] = new Tile("wall");
        } else {
            map[x][y] = new Tile("floor");
        }
    });
    // Create map from tiles
    map = new Map(map, player);
    map.id = id;
    return map;
}

export default GenerateMap;