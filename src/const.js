const DisplayOptions = {
    fontSize: 15,
    width: (screen.availWidth / 15) / 2,
    height: (screen.availHeight / 15) / 2,
    forceSquareRatio: true
}

const MapOptions = {
    width: 160,
    height: 50
}

const Tiles = {
    "null": {

    },
    floor: {
        symbol: ".",
        foreground: "#444",
        background: "#222",
        properties: {
            isWalkable: true
        },
        
    },
    wall: {
        symbol: "#",
        foreground: "#777",
        background: "@2e2e2e",
    }
}

export { DisplayOptions, MapOptions, Tiles };