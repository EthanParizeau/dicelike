import Entity from "./entity";
class Being extends Entity {
    constructor(sym, fg, bg) {
        super(sym, fg, bg);
        this.xy = null;
		this.level = null;
    }
    
    act() {
        console.log("IM ACTING");
    }

    getXY() {
        return this.xy;
    }
}

export default Being;