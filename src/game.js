import { Display } from 'rot-js';
import {DisplayOptions} from './const';
import Map from './map';
import GenerateMap from './mapgen';

/**
 * Class to manage the game
 *
 * @class Game
 */
class Game {
    
    constructor() {
        this.display = null;
        this.map = null;
    }

    init() {
        // Setup display
        this.display = new Display(DisplayOptions);
        document.getElementsByClassName('app')[0].appendChild(this.display.getContainer()).setAttribute("class", "screen"); // 1-line SON
        this.map = GenerateMap();
        console.log(this.map);
        for(let item in this.map) {
            
        }
    }

    test() {

    }
}
const game = new Game();
export default game;