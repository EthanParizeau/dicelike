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

export {Tiles};