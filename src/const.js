const DisplayOptions = {
    fontSize: 15,
    width: 50,
    height: 25,
    forceSquareRatio: true,
    tileColorize: true,
}

const MapOptions = {
    width: 50,
    height: 25,
}

const Tiles = {
    floor: {
        symbol: ".",
        foreground: "#797b7f",
        background: "#797b7f",
        properties: {
            isWalkable: true
        },
        
    },
    wall: {
        symbol: "#",
        foreground: "#5a5c60",
        background: "#5a5c60",
        properties: {
            test: true
        }
    }
}

export { DisplayOptions, MapOptions, Tiles };