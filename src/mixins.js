import game from "./game";
import { Path } from 'rot-js';
import XY from './xy';
const Mixins = {};

Mixins.Moveable = {
    name: 'Moveable',
    tryMove: function(xy, map) {
        const tile = map.getTile(xy);
        // If entity is on tile
        const target = map.getEntityAt(xy);
        if(target) {
            // If we are an attacker, try to attack
            if(this.hasMixin('Attacker')) {
                this.attack(target);
                return true;
            } else {
                // Nothing we can do
                return false;
            }
        }
        // Check if tile is walkable
        if(tile.properties.isWalkable) {
            // Update position
            this.xy = xy;
            return true;
        }
        return false;
        
    }
}

Mixins.Destructible = {
    name: 'Destructible',
    init: function(template = { "maxHp": 10, "defenseValue": 0 }) {
        this.maxHp = template["maxHp"] || 10;
        this.hp = template['hp'] || this.maxHp;
        this.defenseValue = template['defenseValue'] || 0;
    },
    takeDamage: function(attacker, damage) {
        this.hp -= damage;
        // If 0 or less hp, remove from the map
        if(this.hp <= 0) {
            console.log("You killed " + this.name);
            if(this.hasMixin("PlayerActor")) { // If its player
                this.map.engine.lock();
                // Switch screens
                console.log("GAME OVER");
            }

            this.world.levels[this.levelID].removeEntity(this);
            this.world.updateLevel();
        }
    }
}

Mixins.Attacker = {
    name: 'Attacker',
    groupName: 'Attacker',
    init: function(template = {'attackValue': 10}) {
        this.attackValue = template['attackValue'];
    },
    attack: function(target) {
        if(target.hasMixin('Destructible')) {
            const damage = this.attackValue - target.defenseValue;
            console.log("You smack " + target.name + " for " + damage);
            target.takeDamage(this, damage);
        }
    }
}

Mixins.PlayerActor = {
    name: 'PlayerActor',
    groupName: 'Actor',
    act: function() {
        // Re-render the screen
        game.refresh();
        // Lock the engine and wait async
        this.world.engine.lock();
    }
}

Mixins.EnemyActor = {
    name: 'EnemyActor',
    groupName: 'Actor',
    act: function() {
        console.log(this.name + " IS ACTING")
        
        if(!this.world.levels[this.levelID].entities[0]) {
            return;
        }          
        let x = this.world.levels[this.levelID].entities[0].xy.x;
        let y = this.world.levels[this.levelID].entities[0].xy.y;
        let passableCallback = (x, y) => {
            return this.world.levels[this.levelID].getTile(new XY(x, y)).properties.isWalkable;
        }
        const astar = new Path.AStar(x, y, passableCallback, { "topology": 4});
        let path = [];
        let pathCallback = (x, y) => path.push(new XY(x, y));
        astar.compute(this.xy.x, this.xy.y, pathCallback);
        if(typeof path[1] !== 'undefined') {
            x = path[1].x;
            y = path[1].y;
            this.tryMove(new XY(x, y), this.world.levels[this.levelID]);
        }

    }
}

export default Mixins;