import { Display } from 'rot-js';
import { DisplayOptions } from './const';
import { DebugLog } from './util';
import World from './world';

/**
 * Class to manage the game
 *
 * @class Game
 */
class Game {
    
    constructor() {
        DebugLog.info("Game Created");
        this.display = null;
        this.world = null;
    }

    init() {
        DebugLog.info("Game Init");

        // Setup display and append to canvas
        this.display = new Display(DisplayOptions);
        document.getElementsByClassName('app')[0].appendChild(this.display.getContainer()).setAttribute("class", "screen"); // 1-line SON

        // Init world
        this.world = new World(this.display);

    }
}
const game = new Game();
export default game;