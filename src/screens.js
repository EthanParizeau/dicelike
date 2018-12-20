import game from './game';
import { KEYS, DIRS } from 'rot-js';
import { PlayerTemplate } from './entities'
import { DisplayOptions } from './const';
import { DebugLog } from './util';
import Entity from './entity';
import World from './world';
import XY from './xy';
import ui from './ui';

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
        display.drawText(1, 1, "Mofucken videogame");
        display.drawText(1, 2, "Press [Enter] to start!");
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
    enter: function() {
        DebugLog.info("Entered play screen.");

        // Setup keys
        this.keys = {};
        this.keys[KEYS.VK_UP] = 0;      // Move up
        this.keys[KEYS.VK_RIGHT] = 1;   // Move Right
        this.keys[KEYS.VK_DOWN] = 2;    // Move Left
        this.keys[KEYS.VK_LEFT] = 3;    // Move Down
        this.keys[KEYS.VK_PERIOD] = -1; // Skip turn
        this.keys[KEYS.VK_C] = 4;       // Character screen

        this.move = (distance) => {
            const newXY = this.player.xy.plus(distance);
            // Try to move
            this.player.tryMove(newXY, this.world.currentLevel);
        }

        this.player = new Entity(PlayerTemplate);
        this.world = new World(this.player);
        // Setup UI
        ui.init(this.player);
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
        // Make sure the x-axis doesn't go to the left of the left bound
        let topLeftX = Math.max(0, this.player.xy.x - (screenWidth / 2 ));
        // Make sure we still have enough space to fit an entire game screen
        topLeftX = Math.floor(Math.min(topLeftX, currentLevel.width - screenWidth));
        // Make sure the y-axis doesn't above the top bound
        let topLeftY = Math.max(0, this.player.xy.y - (screenHeight / 2));
        // Make sure we still have enough space to fit an entire game screen
        topLeftY = Math.floor(Math.min(topLeftY, currentLevel.height - screenHeight));
        for(let x = topLeftX; x < topLeftX + screenWidth; x++) {
            for(let y = topLeftY; y < topLeftY + screenHeight; y++) {
                let tile = currentLevel.getTile(new XY(x, y));
                display.draw(
                    x - topLeftX,
                    y - topLeftY,
                    tile.symbol,
                    tile.foreground,
                    tile.background

                );
            }
        }

        const entities = currentLevel.entities;
        for(let i = 0; i < entities.length; i++) {
            const entity = entities[i];
            const tile = currentLevel.getTile(entity.xy);
            if (entity.xy.x >= topLeftX && entity.xy.y >= topLeftY &&
                entity.xy.x < topLeftX + screenWidth &&
                entity.xy.y < topLeftY + screenHeight) {
                display.draw(
                    entity.xy.x - topLeftX,
                    entity.xy.y - topLeftY,
                    entity.symbol,
                    entity.foreground,
                    tile.background
                );
            }
        }
    },

    handleInput: function(inputType, inputData)  {
        if(inputType === 'keydown') {
            if(inputData.keyCode in this.keys) {
                if(inputData.keyCode === KEYS.VK_C) {
                    game.switchScreen(Screen.testScreen);
                } else {
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
}

Screen.testScreen = {
    player: null,
    enter: (player) => {
        DebugLog.info("Entered test screen");
        this.player = player;
        
    },

    exit: () => {
        DebugLog.info("Exited test screen.");
    },

    render: (display) => {
        display.drawText(1,1, "%c{yellow}Test Screen");
    },

    handleInput: (inputType, inputData) => {

    }
}

export default Screen;