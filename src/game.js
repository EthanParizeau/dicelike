import { Display } from 'rot-js';
import { DisplayOptions } from './const';
import { DebugLog } from './util';
import Level from './level';

/**
 * Class to manage the game
 *
 * @class Game
 */
class Game {
    
    constructor() {
        DebugLog.info("Game Created");
        this.display = null;
        this.currentScreen = null;
    }

    init() {
        DebugLog.info("Game Init");

        // Setup display and append to canvas
        this.display = new Display(DisplayOptions);
        document.getElementsByClassName('app')[0].appendChild(this.display.getContainer()).setAttribute("class", "screen"); // 1-line SON

        // Helper function
        const bindEventToScreen = event => {
            window.addEventListener(event, (e) => {
                // On event, send to screen if it exist
                if(this.currentScreen !== null) {
                    // Send the event to screen
                    this.currentScreen.handleInput(event, e);
                }
            });
            
        }
        bindEventToScreen('keydown');

        // Switch to start screen
        this.switchScreen(Screen.playScreen);
    }

    switchScreen(screen) {
        // If we had a screen before, exit it
        if(this.currentScreen !== null) {
            this.currentScreen.exit();
        }
        // Clear the display
        this.display.clear();
        // Update current screen
        this.currentScreen = screen;
        if(this.currentScreen) {
            this.currentScreen.enter();
            this.refresh();
        }
    }

    refresh() {
        // Clear the display
        this.display.clear();
        // Render the screen
        this.currentScreen.render(this.display);
    }

    test() {

    }
}
const game = new Game();
export default game;