import { Display } from 'rot-js';

class Game {
    constructor() {
        this.width = 20;
        this.height = 5;
        this.display = null;
    }

    test() {
        this.display = new Display({width: this.width, height: this.height});
        let _display = this.display.getContainer();
        _display.setAttribute("id", "screen");
        document.body.appendChild(_display);
    }
}

var game = new Game();
game.test();