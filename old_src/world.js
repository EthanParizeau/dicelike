import { Scheduler, Engine } from 'rot-js';
import GenerateMap from './mapgen';
import { DebugLog } from './util';
import game from './game';

class World {
    constructor(player) {
        this.currentLevel = null;
        this.levels = [];

        // Generate levels
        this.levels[0] = GenerateMap(player, 0);


        // Create the engine and scheduler
        this.scheduler = new Scheduler.Simple();
        this.engine = new Engine(this.scheduler);
        DebugLog.info('World Created');
    }

    switchLevel(levelID) {
        // Remove old being from scheduler
        this.scheduler.clear();
        // Set current map to new map
        this.currentLevel = this.levels[levelID];
        // Refresh screen
        game.refresh();
        // Add new entities to scheduler
        for(let i = 0; i < this.currentLevel.entities.length; i++) {
            this.currentLevel.entities[i].world = this;
            if(this.currentLevel.entities[i].hasMixin('Actor')) {
                this.scheduler.add(this.currentLevel.entities[i], true);
            }
        }
    }

    updateLevel() {
        this.switchLevel(this.currentLevel.id);
    }
}
export default World;