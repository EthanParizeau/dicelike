import game from "./game";

const Mixins = {};

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