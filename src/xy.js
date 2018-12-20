class XY {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    is(xy) {
        return (this.x === xy.x && this.y === xy.y);
    }

    plus(xy) {
        return new XY(this.x + xy.x, this.y + xy.y);
    }

    toString() {
        return this.x + "," + this.y;
    }
}

export default XY;