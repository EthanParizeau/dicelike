import { Scheduler, Engine } from 'rot-js';
import generateMap from './mapGen';
import Player from './player';
import XY from './xy';
import { DebugLog } from './util';
import { DisplayOptions } from './const';

/**
 * Manages the maps
 *
 * @class World
 */
class World {
    constructor(display) {
        DebugLog.info('World Created');
        this.maps = [];
        this.currentMap = null;
        this.player = null;
        this.display = display;
        this.scheduler = new Scheduler.Simple();
        this.engine = new Engine(this.scheduler);

        this.init();
    }

    init() {
        
        this.createMap();
        this.player = new Player();
        this.player.map = this.currentMap;
        this.currentMap.addPlayer(this.player);

        const bindEventToScreen = event => {
            window.addEventListener(event, (e) => {
                // On event, send to screen if it exist
                if(this.player !== null) {
                    // Send the event to player
                    this.player.handleKeyEvent(e);
                }
            });
            
        }

        bindEventToScreen('keydown');

        this.draw();
        this.info();
    }

    // Draw world
    draw() {
        const screenWidth = DisplayOptions.width;
        const screenHeight = DisplayOptions.height;
        const map = this.currentMap;

        // Make sure the x-axis doesn't go to the left of the left bound
        let topLeftX = Math.max(0, this.player.xy.x - (screenWidth / 2 ));
        // Make sure we still have enough space to fit an entire game screen
        topLeftX = Math.floor(Math.min(topLeftX, map.width - screenWidth));
        // Make sure the y-axis doesn't above the top bound
        let topLeftY = Math.max(0, this.player.xy.y - (screenHeight / 2));
        // Make sure we still have enough space to fit an entire game screen
        topLeftY = Math.floor(Math.min(topLeftY, map.height - screenHeight));

        // Render tiles
        for(let x = 0; x < screenWidth; x++) {
            for(let y = 0; y < screenHeight; y++) {
                let tile = map.getTile(new XY(x, y));
                this.display.draw(
                    x,
                    y,
                    tile.symbol,
                    tile.foreground,
                    tile.background

                );
            }
        }

        
        // Render entities
        const entities = this.currentMap.entities;
        for(let i = 0; i < entities.length; i++) {
            const entity = entities[i];
            const tile = this.currentMap.getTile(entity.xy);
            if (entity.xy.x >= topLeftX && entity.xy.y >= topLeftY &&
                entity.xy.x < topLeftX + screenWidth &&
                entity.xy.y < topLeftY + screenHeight) {
                this.display.draw(
                    entity.xy.x - topLeftX,
                    entity.xy.y - topLeftY,
                    entity.symbol,
                    entity.foreground,
                    tile.background
                );
            }
        }
       
 
    }

    createMap() {
        var map = generateMap();
        map.world = this;
        this.currentMap = map;
        this.maps.push(map);
    }

    info() {
        console.dir(this);
    }
}

export default World;