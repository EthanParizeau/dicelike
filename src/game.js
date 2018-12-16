import { Display } from 'rot-js';
import {DisplayOptions} from './const';
import GenerateMap from './mapgen';
import { DebugLog } from './util';

/**
 * Class to manage the game
 *
 * @class Game
 */
class Game {
    
    constructor() {
        DebugLog.info("Game Created");
        this.display = null;
        this.map = null;
    }

    init() {
        DebugLog.info("Game Init");
        // Setup display
        this.display = new Display(DisplayOptions);
        document.getElementsByClassName('app')[0].appendChild(this.display.getContainer()).setAttribute("class", "screen"); // 1-line SON
        this.map = GenerateMap();
    }

    test() {

    }
}
const game = new Game();
export default game;