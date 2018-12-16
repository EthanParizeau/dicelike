import {
    Scheduler,
    Engine,
    Map,
    RNG
} from 'rot-js';
import display from './screen';
import Player from './player';

import './styles/index.css';

class Game {
    constructor() {
        this.display = null;
        this.map = {};
        this.player = null;
        console.log("Game created");
    }

    init() {
        console.log("Game init");
        this.display = display;
        
        this.scheduler = new Scheduler.Simple();
        this.engine = new Engine(this.scheduler);
        
        this.generateMap(); 
        this.start();
    }
    
    start() {
        this.engine.start();
    }

    createPlayer(freeCells) {
        let index = Math.floor(RNG.getUniform() * freeCells.length);
        let key = freeCells.splice(index, 1)[0];
        let parts = key.split(",");
        let x = parseInt(parts[0]);
        let y = parseInt(parts[1]);
        this.player = new Player(x, y);
        this.scheduler.add(this.player, true);
    }

    drawMap() {
        for (let key in this.map) {
            var parts = key.split(",");
            var x = parseInt(parts[0]);
            var y = parseInt(parts[1]);
            this.display.display.draw(x, y, this.map[key]);
        }
    }

    generateMap() {
        let digger = new Map.Digger();
        let freeCells = [];

        let digCallback = (x, y, value) => {
            let key = x + ',' + y;

            if (value) { /* walls */
                this.map[key] = '#';
                return;
            }
            
            freeCells.push(key);
            this.map[key] = ".";
        }
        digger.create(digCallback.bind(this));

        this.generateBoxes(freeCells);

        this.drawMap();
        this.createPlayer(freeCells);
    }

    generateBoxes(freeCells) {
        for (let i = 0; i < 10; i++) {
            let index = Math.floor(RNG.getUniform() * freeCells.length);
            let key = freeCells.splice(index, 1)[0];
            this.map[key] = "*";
        }
    }

    test(x,y,value) {
        this.display.display.draw(x, y, value);
    }
}

const game = new Game();
export default game;