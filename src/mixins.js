import game from "./game";
import XY from './xy';
const Mixins = {};

Mixins.Moveable = {
    name: 'Moveable',
    tryMove: function(xy, map) {
        const tile = map.getTile(xy);
        // Check if tile is walkable
        if(tile.properties.isWalkable) {
            // Update position
            this.xy = xy;
            return true;
        }
        return false;
        
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

export default Mixins;