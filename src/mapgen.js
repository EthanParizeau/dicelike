import { Map as rotMap} from 'rot-js';
import { MapOptions } from './const'
import Map from './map';
import Tile from './tile';
import Entity from './entity';
import { EnemyTemplate } from './entities';

/**
 * Generate a map
 *
 * @param {*} player - Player 
 * @param {*} id - Map ID
 */
function GenerateMap(player, id) {
    let map = [];
    // Generate empty 64 x 32 array
    map = Array(64).fill(0).map(() => Array(32).fill(0));

    // Setup the generator
    const generator = new rotMap.Digger(MapOptions.width, MapOptions.height, { dugPercentage: 0.3 });
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

    // Add the player
    map.addEntityAtRandomPosition(player);
    // Add ememy
    map.addEntityAtRandomPosition(new Entity(EnemyTemplate));
    return map;
}

export default GenerateMap;