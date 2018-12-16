import { Tiles } from './const';

class Tile {
    constructor(type) {
        const properties = Tiles[type];
        this.type = type;
        this.symbol = properties.symbol;
        this.foreground = properties.foreground;
        this.background  = properties.background;
        this.properties = properties.properties;
    }
}

export default Tile;