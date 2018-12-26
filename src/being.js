import Entity from "./entity";
class Being extends Entity {
    constructor(sym, fg, bg) {
        super(sym, fg, bg);
        this.xy = null;
		this.map = null;
    }
    
    act() {
        console.log("IM ACTING");
    }

    move(xy, map) {
        console.log("MOVING");
        console.log("OLD: " + this.xy);
       
        this.xy = this.xy.plus(xy);
        console.log("NEW: " + this.xy);
        map.world.draw();
        
    }

    getXY() {
        return this.xy;
    }
}

export default Being;