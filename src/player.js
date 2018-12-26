import Being from './being';

class Player extends Being {
    constructor() {
        super("@", 'red', 'yellow');
    }

    act() {
        console.log("PLAYER ACTING");
    }

    handleKeyEvent(e) {
        
    }

    test() {
        console.log("Player");
    }
}

export default Player;