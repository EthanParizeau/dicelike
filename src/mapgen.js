import { Map as rotMap, RNG} from 'rot-js';
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
    // Generate empty mapWidth x mapHeight array
    map = Array(MapOptions.width).fill(0).map(() => Array(MapOptions.height).fill(0));
    // Create map generator
    const generator = new rotMap.Arena(MapOptions.width, MapOptions.height);
    // Create map
    generator.create((x, y, value) => {
        if(value) {
            map[x][y] = new Tile("wall");
        } else {
            if(RNG.getUniform() <= 0.05) {
                if(RNG.getUniform() <= .5) {
                    map[x][y] = new Tile("lightTree");
                } else {
                    map[x][y] = new Tile("darkTree");
                }
            } else {
                map[x][y] = new Tile("floor");
            }
        }
    });
    
 
    map = new Map(map, player);
    map.id = id;
    map.addEntityAtRandomPosition(player);
    map.addEntityAtRandomPosition(new Entity(EnemyTemplate));

    return map;
}

export default GenerateMap;