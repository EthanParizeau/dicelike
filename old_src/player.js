import game from './game';
import display from './screen';
import { DIRS } from 'rot-js';
class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.draw();
    }

    draw() {
        display.display.draw(this.x, this.y, "@", "#0F0");
        console.log("draw");
    }

    act() {
        game.engine.lock();
        /* Wait for user input */
        window.addEventListener('keydown', this);
    }

    handleEvent(e) {
        /* Process user input */
        let keyMap = {};
        keyMap[38] = 0;
        keyMap[33] = 1;
        keyMap[39] = 2;
        keyMap[34] = 3;
        keyMap[40] = 4;
        keyMap[35] = 5;
        keyMap[37] = 6;
        keyMap[36] = 7;
     
        let code = e.keyCode;
     
        if (!(code in keyMap)) { return; }
     
        let diff = DIRS[8][keyMap[code]];
        let newX = this.x + diff[0];
        let newY = this.y + diff[1];
     
        let newKey = newX + "," + newY;
        if (!(newKey in game.map)) { 
            return; 
        } /* cannot move in this direction */

        //TODO: Strange
        display.display.draw(this.x, this.y, game.map[this.x+","+this.y]);
        this.x = newX;
        this.y = newY;
        this.draw();
        window.removeEventListener("keydown", this);
        game.engine.unlock();
    }

    test() {
        
        
    }
}

export default Player;