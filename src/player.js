import Being from './being';
import { KEYS, DIRS } from 'rot-js';
import XY from './xy';

class Player extends Being {
    constructor() {
        super("@", 'red', 'yellow');

        // Setup keys
        this.keys = {};
        this.keys[KEYS.VK_UP] = 0;      // Move up
        this.keys[KEYS.VK_RIGHT] = 1;   // Move Right
        this.keys[KEYS.VK_DOWN] = 2;    // Move Left
        this.keys[KEYS.VK_LEFT] = 3;    // Move Down
        this.keys[KEYS.VK_PERIOD] = -1; // Skip turn
        this.keys[KEYS.VK_C] = 4;       // Character screen
    }

    act() {
        console.log("PLAYER ACTING");
    }

    handleKeyEvent(e) {
        let code = e.keyCode;
        if(code in this.keys) {
            if(code === KEYS.VK_C) {
                // Character screen
                console.log("-- Character screen --");
            } else {
                const direction = this.keys[code];
                if(direction === -1) { // Skip turn
                    //TODO: Skip turn
                }

                const dir = DIRS[4][direction];
                super.move(new XY(dir[0], dir[1]), this.map);



            }
        }
        /*
        
        if(code === KEYS.VK_UP) {
            super.moveTo(new XY(dir[0], dir[1]), this.map);
        }
        */
    }

    test() {
        console.log("Player");
    }
}

export default Player;