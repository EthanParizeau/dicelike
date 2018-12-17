import game from './game';
import { KEYS, DIRS } from 'rot-js';
import { PlayerTemplate } from './entities'
import { DisplayOptions } from './const';
import { DebugLog } from './util';
import Entity from './entity';
import World from './world';
import XY from './xy';

import { Map as rotMap} from 'rot-js';

const Screen = {};

// Start screen
Screen.startScreen = {
    enter: () => {
        DebugLog.info("Entered start screen");
    },

    exit: () => {
        DebugLog.info("Exited start screen.");
    },

    render: (display) => {
        display.drawText(1,1, "%c{yellow}Javascript Roguelike");
        display.drawText(1,2, "Press [Enter] to start!");
    },

    handleInput: (inputType, inputData) => {
        if(inputType === 'keydown') {
            if(inputData.keyCode === KEYS.VK_RETURN) {
                game.switchScreen(Screen.playScreen);
            }
        }
    }
}

Screen.playScreen = {
    world: null,
    player: null,
    enter: () => {
        DebugLog.info("Entered play screen.");
        
        // Setup keys
        let player = new Entity(PlayerTemplate);
        this.world = new World(player);
        this.world.switchLevel(0);
        this.world.engine.start();
    },

    exit: () => {
        DebugLog.info("Exited play screen.");
    },

    render: (display) => {
        const screenWidth = DisplayOptions.width;
        const screenHeight = DisplayOptions.height;
        const currentLevel = this.world.currentLevel;
        // Make sure the x axis to the left of the left bound
        let topLeftX = Math.max(0, this.player.xy.x - (screenWidth / 2));
        // Make sure we still have enough space to fit the screen
        topLeftX = Math.floor(Math.min(topLeftX, currentLevel.width - screenWidth));
        // Make sure the y axis doesn't above top bound
        let topLeftY = Math.max(0, this.player.xy.y - (screenHeight / 2));
        // Make sure we still have enough space to fit the screen
        topLeftY = Math.floor(Math.min(topLeftY, currentLevel.height - screenHeight));

        // Iterate through all visible map cells
        for(let x = topLeftX; x < topLeftX + screenWidth; x++) {
            for(let y = topLeftY; y < topLeftY + screenHeight; y++) {
                const tile = currentLevel.getTile(new XY(x, y));
                display.draw(
                    x - topLeftX, 
                    y - topLeftY - 1, 
                    tile.symbol, 
                    tile.foreground, 
                    tile.background);
            }
        }
        
    },

    handleInput: (inputType, inputData) => {

    }
}

Screen.testScreen = {
    enter: () => {
        DebugLog.info("Entered test screen");
        const screenWidth = DisplayOptions.width;
        const screenHeight = DisplayOptions.height;
        const currentLevel = this.world.currentLevel;
        let gen = new rotMap.Digger(screenWidth, screenHeight);
        let map = [];
        map = Array(64).fill(0).map(() => Array(32).fill(0));
        gen.create((x, y, value) => {
            if(value) {
                display.draw(x, y, "#", "grey", "#0F0");
            } else {
                display.draw(x, y, ".", "white", "#F00");
            }
        });
        
    },

    exit: () => {
        DebugLog.info("Exited test screen.");
    },

    render: (display) => {
        display.drawText(1,1, "%c{yellow}Test Screen");
    },

    handleInput: (inputType, inputData) => {

    },
}

Screen.bigTest = {
    world: null,
    player: null,
    enter: function() {
        DebugLog.info("Entered big test screen.");

        // Setup keys
        this.keys = {};
        this.keys[KEYS.VK_UP] = 0;
        this.keys[KEYS.VK_RIGHT] = 1;
        this.keys[KEYS.VK_DOWN] = 2;
        this.keys[KEYS.VK_LEFT] = 3;
        this.keys[KEYS.VK_PERIOD] = -1; // Skip turn

        this.move = (distance) => {
            const newXY = this.player.xy.plus(distance);
            // Try to move
            this.player.tryMove(newXY, this.world.currentLevel);
        }

        this.player = new Entity(PlayerTemplate);
        this.world = new World(this.player);
        this.world.switchLevel(0);
        this.world.engine.start();
    },

    exit: function() {
        DebugLog.info("Exited play screen.");
    },

    render: function(display) {
        const screenWidth = DisplayOptions.width;
        const screenHeight = DisplayOptions.height;
        const currentLevel = this.world.currentLevel;

        // Draw tiles
        for(let x = 0; x < screenWidth; x++) {
            for(let y = 0; y < screenHeight; y++) {
                let tile = currentLevel.getTile(new XY(x, y));
                display.draw(x, y, tile.symbol, tile.foreground, tile.background);
            }
        }

        // Draw entities
        const entities = currentLevel.entities;
        for(let i = 0; i < entities.length; i++) {
            const entity = entities[i];
            const tile = currentLevel.getTile(entity.xy);
            display.draw(entity.xy.x, entity.xy.y, entity.symbol, entity.foreground, tile.background);
        }

        /* FIXME: Source from dung
        // Make sure the x axis to the left of the left bound
        let topLeftX = Math.max(0, this.player.xy.x - (screenWidth / 2));
        // Make sure we still have enough space to fit the screen
        topLeftX = Math.floor(Math.min(topLeftX, currentLevel.width - screenWidth));
        // Make sure the y axis doesn't above top bound
        let topLeftY = Math.max(0, this.player.xy.y - (screenHeight / 2));
        // Make sure we still have enough space to fit the screen
        topLeftY = Math.floor(Math.min(topLeftY, currentLevel.height - screenHeight));
        
        // Iterate through all visible map cells
        for(let x = topLeftX; x < topLeftX + screenWidth; x++) {
            for(let y = topLeftY; y < topLeftY + screenHeight; y++) {
                console.log("X: " + x + "," + "Y: " + y);
                const tile = currentLevel.getTile(new XY(x, y));
                display.draw(
                    x - topLeftX, 
                    y - topLeftY - 1, 
                    tile.symbol, 
                    tile.foreground, 
                    tile.background);
            }
        }
        */
        
    },

    handleInput: function(inputType, inputData)  {
        if(inputType === 'keydown') {
            if(inputData.keyCode in this.keys) {
                const direction = this.keys[inputData.keyCode];
                if(direction === -1) { // Skip turn
                    // Unlock engine
                    this.world.engine.unlock();
                    return true;
                }

                const dir = DIRS[4][direction];
                this.move(new XY(dir[0], dir[1]));

                // Unlock engine
                this.world.engine.unlock();
            }
        }
    }
}

export default Screen;