const DisplayOptions = {
    fontSize: 20,
    width: 40,
    height: 20,
    forceSquareRatio: true,
    tileColorize: true,
}

const MapOptions = {
    width: 80,
    height: 40,
}

const Tiles = {
    floor: {
        symbol: ".",
        foreground: "#805500",
        background: "black",
        properties: {
            isWalkable: true
        },
        
    },
    darkTree: {
        symbol: "♣",
        foreground: "green",
        background: "black",
        properties: {
            
        },
    },
    lightTree: {
        symbol: "♠",
        foreground: "lightgreen",
        background: "black",
        properties: {
            
        },
    },
    wall: {
        symbol: "#",
        foreground: "#5a5c60",
        background: "#5a5c60",
        properties: {
            
        }
    }
}

export { DisplayOptions, MapOptions, Tiles };