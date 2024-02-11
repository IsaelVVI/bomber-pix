/*
export const mapInitial = [
    [
        "b", "b", "b", "b",
        "b", "b", "b", "b",
        "b", "b", "b", "b",
        "b", "b", "b"
    ],
    [
        "b", "g", "r", "g",
        "g", "g", "g", "g",
        "g", "g", "g", "g",
        "g", "g", "b"
    ],
    [
        "b", "r", "b", "g",
        "b", "g", "b", "g",
        "b", "g", "b", "g",
        "b", "g", "b"
    ],
    [
        "b", "g", "g", "g",
        "g", "g", "g", "g",
        "g", "g", "g", "g",
        "g", "g", "b"
    ],
    [
        "b", "g", "b", "g",
        "b", "g", "b", "g",
        "b", "g", "b", "g",
        "b", "g", "b"
    ],
    [
        "b", "g", "g", "g",
        "g", "g", "g", "g",
        "g", "g", "g", "g",
        "g", "g", "b"
    ],
    [
        "b", "g", "b", "g",
        "b", "g", "b", "g",
        "b", "g", "b", "g",
        "b", "g", "b"
    ],
    [
        "b", "g", "g", "g",
        "r", "g", "g", "g",
        "g", "g", "g", "g",
        "g", "g", "b"
    ],
    [
        "b", "g", "b", "g",
        "b", "g", "b", "g",
        "b", "g", "b", "g",
        "b", "g", "b"
    ],
    [
        "b", "g", "g", "g",
        "g", "g", "g", "g",
        "g", "g", "g", "g",
        "g", "g", "b"
    ],
    [
        "b", "g", "b", "g",
        "b", "g", "b", "g",
        "b", "g", "b", "g",
        "b", "g", "b"
    ],
    [
        "b", "g", "g", "g",
        "r", "g", "g", "g",
        "g", "g", "r", "g",
        "g", "g", "b"
    ],
    [
        "b", "g", "b", "g",
        "b", "g", "b", "g",
        "b", "g", "b", "g",
        "b", "g", "b"
    ],
    [
        "b", "g", "g", "g",
        "r", "g", "g", "g",
        "g", "g", "g", "g",
        "g", "g", "b"
    ],
    [
        "b", "b", "b", "b",
        "b", "b", "b", "b",
        "b", "b", "b", "b",
        "b", "b", "b"
    ]
];*/


export const mapInitial = [
    [
        1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1,
        1, 1, 1
    ],
    [
        1, 0, 2, 0, 0, 0,
        0, 0, 0, 0, 0, 0,
        0, 0, 1
    ],
    [
        1, 2, 1, 0, 1, 0,
        1, 0, 1, 0, 1, 0,
        1, 0, 1
    ],
    [
        1, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0,
        0, 0, 1
    ],
    [
        1, 0, 1, 0, 1, 0,
        1, 0, 1, 0, 1, 0,
        1, 0, 1
    ],
    [
        1, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0,
        0, 0, 1
    ],
    [
        1, 0, 1, 0, 1, 0,
        1, 0, 1, 0, 1, 0,
        1, 0, 1
    ],
    [
        1, 0, 0, 0, 2, 0,
        0, 0, 0, 0, 0, 0,
        0, 0, 1
    ],
    [
        1, 0, 1, 0, 1, 0,
        1, 0, 1, 0, 1, 0,
        1, 0, 1
    ],
    [
        1, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0,
        0, 0, 1
    ],
    [
        1, 0, 1, 0, 1, 0,
        1, 0, 1, 0, 1, 0,
        1, 0, 1
    ],
    [
        1, 0, 0, 0, 2, 0,
        0, 0, 0, 0, 2, 0,
        0, 0, 1
    ],
    [
        1, 0, 1, 0, 1, 0,
        1, 0, 1, 0, 1, 0,
        1, 0, 1
    ],
    [
        1, 0, 0, 0, 2, 0,
        0, 0, 0, 0, 0, 0,
        0, 0, 1
    ],
    [
        1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1,
        1, 1, 1
    ]
]


export const collision_tile = {
    EMPTY: 0,
    WALL: 20,
    BLOCK: 30
}

export const mapArray = [
    [29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29],
    [29, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 29],
    [29, 30, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 30, 29],
    [29, 30, 59, 30, 59, 30, 59, 30, 59, 30, 59, 30, 59, 30, 59, 30, 29],
    [29, 30, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 30, 29],
    [29, 30, 59, 30, 59, 30, 59, 30, 59, 30, 59, 30, 59, 30, 59, 30, 29],
    [29, 30, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 30, 29],
    [29, 30, 59, 30, 59, 30, 59, 30, 59, 30, 59, 30, 59, 30, 59, 30, 29],
    [29, 30, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 30, 29],
    [29, 30, 59, 30, 59, 30, 59, 30, 59, 30, 59, 30, 59, 30, 59, 30, 29],
    [29, 30, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 30, 29],
    [29, 30, 59, 30, 59, 30, 59, 30, 59, 30, 59, 30, 59, 30, 59, 30, 29],
    [29, 30, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 30, 29],
    [29, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 29],
    [29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29],
]

export const collision_map = [
    [
        collision_tile.BLOCK,
        collision_tile.BLOCK,
        collision_tile.BLOCK,
        collision_tile.BLOCK,
        collision_tile.BLOCK,
        collision_tile.BLOCK,
        collision_tile.BLOCK,
        collision_tile.BLOCK,
        collision_tile.BLOCK,
        collision_tile.BLOCK,
        collision_tile.BLOCK,
        collision_tile.BLOCK,
        collision_tile.BLOCK,
        collision_tile.BLOCK,
        collision_tile.BLOCK,
        collision_tile.BLOCK,
        collision_tile.BLOCK
    ],
    [
        collision_tile.BLOCK,
        collision_tile.BLOCK,
        collision_tile.BLOCK,
        collision_tile.BLOCK,
        collision_tile.BLOCK,
        collision_tile.BLOCK,
        collision_tile.BLOCK,
        collision_tile.BLOCK,
        collision_tile.BLOCK,
        collision_tile.BLOCK,
        collision_tile.BLOCK,
        collision_tile.BLOCK,
        collision_tile.BLOCK,
        collision_tile.BLOCK,
        collision_tile.BLOCK,
        collision_tile.BLOCK,
        collision_tile.BLOCK
    ],
    [
        collision_tile.BLOCK,
        collision_tile.BLOCK,
        collision_tile.EMPTY,
        collision_tile.EMPTY,
        collision_tile.EMPTY,
        collision_tile.EMPTY,
        collision_tile.EMPTY,
        collision_tile.EMPTY,
        collision_tile.EMPTY,
        collision_tile.EMPTY,
        collision_tile.EMPTY,
        collision_tile.EMPTY,
        collision_tile.EMPTY,
        collision_tile.EMPTY,
        collision_tile.EMPTY,
        collision_tile.BLOCK,
        collision_tile.BLOCK
    ],
    [
        collision_tile.BLOCK,
        collision_tile.BLOCK,
        collision_tile.EMPTY,
        collision_tile.BLOCK,
        collision_tile.EMPTY,
        collision_tile.BLOCK,
        collision_tile.EMPTY,
        collision_tile.BLOCK,
        collision_tile.EMPTY,
        collision_tile.BLOCK,
        collision_tile.EMPTY,
        collision_tile.BLOCK,
        collision_tile.EMPTY,
        collision_tile.BLOCK,
        collision_tile.EMPTY,
        collision_tile.BLOCK,
        collision_tile.BLOCK
    ],
    [
        collision_tile.BLOCK,
        collision_tile.BLOCK,
        collision_tile.EMPTY,
        collision_tile.EMPTY,
        collision_tile.EMPTY,
        collision_tile.EMPTY,
        collision_tile.EMPTY,
        collision_tile.EMPTY,
        collision_tile.EMPTY,
        collision_tile.EMPTY,
        collision_tile.EMPTY,
        collision_tile.EMPTY,
        collision_tile.EMPTY,
        collision_tile.EMPTY,
        collision_tile.EMPTY,
        collision_tile.BLOCK,
        collision_tile.BLOCK
    ],
    [
        collision_tile.BLOCK,
        collision_tile.BLOCK,
        collision_tile.EMPTY,
        collision_tile.BLOCK,
        collision_tile.EMPTY,
        collision_tile.BLOCK,
        collision_tile.EMPTY,
        collision_tile.BLOCK,
        collision_tile.EMPTY,
        collision_tile.BLOCK,
        collision_tile.EMPTY,
        collision_tile.BLOCK,
        collision_tile.EMPTY,
        collision_tile.BLOCK,
        collision_tile.EMPTY,
        collision_tile.BLOCK,
        collision_tile.BLOCK
    ],
    [
        collision_tile.BLOCK,
        collision_tile.BLOCK,
        collision_tile.EMPTY,
        collision_tile.EMPTY,
        collision_tile.EMPTY,
        collision_tile.EMPTY,
        collision_tile.EMPTY,
        collision_tile.EMPTY,
        collision_tile.EMPTY,
        collision_tile.EMPTY,
        collision_tile.EMPTY,
        collision_tile.EMPTY,
        collision_tile.EMPTY,
        collision_tile.EMPTY,
        collision_tile.EMPTY,
        collision_tile.BLOCK,
        collision_tile.BLOCK
    ],
    [
        collision_tile.BLOCK,
        collision_tile.BLOCK,
        collision_tile.EMPTY,
        collision_tile.BLOCK,
        collision_tile.EMPTY,
        collision_tile.BLOCK,
        collision_tile.EMPTY,
        collision_tile.BLOCK,
        collision_tile.EMPTY,
        collision_tile.BLOCK,
        collision_tile.EMPTY,
        collision_tile.BLOCK,
        collision_tile.EMPTY,
        collision_tile.BLOCK,
        collision_tile.EMPTY,
        collision_tile.BLOCK,
        collision_tile.BLOCK
    ],
    [
        collision_tile.BLOCK,
        collision_tile.BLOCK,
        collision_tile.EMPTY,
        collision_tile.EMPTY,
        collision_tile.EMPTY,
        collision_tile.EMPTY,
        collision_tile.EMPTY,
        collision_tile.EMPTY,
        collision_tile.EMPTY,
        collision_tile.EMPTY,
        collision_tile.EMPTY,
        collision_tile.EMPTY,
        collision_tile.EMPTY,
        collision_tile.EMPTY,
        collision_tile.EMPTY,
        collision_tile.BLOCK,
        collision_tile.BLOCK
    ],
    [
        collision_tile.BLOCK,
        collision_tile.BLOCK,
        collision_tile.EMPTY,
        collision_tile.BLOCK,
        collision_tile.EMPTY,
        collision_tile.BLOCK,
        collision_tile.EMPTY,
        collision_tile.BLOCK,
        collision_tile.EMPTY,
        collision_tile.BLOCK,
        collision_tile.EMPTY,
        collision_tile.BLOCK,
        collision_tile.EMPTY,
        collision_tile.BLOCK,
        collision_tile.EMPTY,
        collision_tile.BLOCK,
        collision_tile.BLOCK
    ],
    [
        collision_tile.BLOCK,
        collision_tile.BLOCK,
        collision_tile.EMPTY,
        collision_tile.EMPTY,
        collision_tile.EMPTY,
        collision_tile.EMPTY,
        collision_tile.EMPTY,
        collision_tile.EMPTY,
        collision_tile.EMPTY,
        collision_tile.EMPTY,
        collision_tile.EMPTY,
        collision_tile.EMPTY,
        collision_tile.EMPTY,
        collision_tile.EMPTY,
        collision_tile.EMPTY,
        collision_tile.BLOCK,
        collision_tile.BLOCK
    ],
    [
        collision_tile.BLOCK,
        collision_tile.BLOCK,
        collision_tile.EMPTY,
        collision_tile.BLOCK,
        collision_tile.EMPTY,
        collision_tile.BLOCK,
        collision_tile.EMPTY,
        collision_tile.BLOCK,
        collision_tile.EMPTY,
        collision_tile.BLOCK,
        collision_tile.EMPTY,
        collision_tile.BLOCK,
        collision_tile.EMPTY,
        collision_tile.BLOCK,
        collision_tile.EMPTY,
        collision_tile.BLOCK,
        collision_tile.BLOCK
    ],
    [
        collision_tile.BLOCK,
        collision_tile.BLOCK,
        collision_tile.EMPTY,
        collision_tile.EMPTY,
        collision_tile.EMPTY,
        collision_tile.EMPTY,
        collision_tile.EMPTY,
        collision_tile.EMPTY,
        collision_tile.EMPTY,
        collision_tile.EMPTY,
        collision_tile.EMPTY,
        collision_tile.EMPTY,
        collision_tile.EMPTY,
        collision_tile.EMPTY,
        collision_tile.EMPTY,
        collision_tile.BLOCK,
        collision_tile.BLOCK
    ],
    [
        collision_tile.BLOCK,
        collision_tile.BLOCK,
        collision_tile.BLOCK,
        collision_tile.BLOCK,
        collision_tile.BLOCK,
        collision_tile.BLOCK,
        collision_tile.BLOCK,
        collision_tile.BLOCK,
        collision_tile.BLOCK,
        collision_tile.BLOCK,
        collision_tile.BLOCK,
        collision_tile.BLOCK,
        collision_tile.BLOCK,
        collision_tile.BLOCK,
        collision_tile.BLOCK,
        collision_tile.BLOCK,
        collision_tile.BLOCK
    ],
    [
        collision_tile.BLOCK,
        collision_tile.BLOCK,
        collision_tile.BLOCK,
        collision_tile.BLOCK,
        collision_tile.BLOCK,
        collision_tile.BLOCK,
        collision_tile.BLOCK,
        collision_tile.BLOCK,
        collision_tile.BLOCK,
        collision_tile.BLOCK,
        collision_tile.BLOCK,
        collision_tile.BLOCK,
        collision_tile.BLOCK,
        collision_tile.BLOCK,
        collision_tile.BLOCK,
        collision_tile.BLOCK,
        collision_tile.BLOCK
    ]
]


export const tempMap = {
    "compressionlevel":-1,
    "height":15,
    "infinite":false,
    "layers":[
        {
            "data":[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            "height":15,
            "id":1,
            "name":"grass",
            "opacity":1,
            "type":"tilelayer",
            "visible":true,
            "width":15,
            "x":0,
            "y":0
        },
        {
            "data":[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
                2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2,
                2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
                2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2,
                2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
                2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2,
                2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
                2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2,
                2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
                2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2,
                2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
                2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2,
                2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
                2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
            "height":15,
            "id":3,
            "name":"block",
            "opacity":1,
            "type":"tilelayer",
            "visible":true,
            "width":15,
            "x":0,
            "y":0
        },
        {
            "data":[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 3, 0, 0, 3, 0, 3, 0, 0, 0, 0, 0,
                0, 0, 0, 3, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0,
                0, 3, 3, 3, 3, 3, 0, 3, 0, 3, 3, 0, 3, 3, 0,
                0, 0, 0, 3, 0, 3, 0, 0, 0, 0, 0, 0, 0, 3, 0,
                0, 3, 3, 3, 0, 3, 3, 3, 3, 3, 0, 3, 3, 3, 0,
                0, 0, 0, 0, 0, 3, 0, 3, 0, 3, 0, 0, 0, 3, 0,
                0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 0, 3, 3, 3, 0,
                0, 0, 0, 3, 0, 3, 0, 3, 0, 0, 0, 0, 0, 0, 0,
                0, 3, 3, 3, 0, 3, 3, 3, 0, 3, 0, 3, 3, 3, 0,
                0, 3, 0, 0, 0, 3, 0, 0, 0, 3, 0, 3, 0, 3, 0,
                0, 0, 3, 3, 3, 3, 0, 3, 3, 3, 0, 3, 3, 0, 0,
                0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0,
                0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 3, 3, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            "height":15,
            "id":5,
            "name":"rock",
            "opacity":1,
            "type":"tilelayer",
            "visible":true,
            "width":15,
            "x":0,
            "y":0
        }],
    "nextlayerid":6,
    "nextobjectid":1,
    "orientation":"orthogonal",
    "renderorder":"right-down",
    "tiledversion":"1.10.2",
    "tileheight":16,
    "tilesets":[
        {
            "columns":1,
            "firstgid":1,
            "image":"./grass.png",
            "imageheight":16,
            "imagewidth":16,
            "margin":0,
            "name":"grass",
            "spacing":0,
            "tilecount":1,
            "tileheight":16,
            "tilewidth":16
        },
        {
            "columns":1,
            "firstgid":2,
            "image":"./block.png",
            "imageheight":16,
            "imagewidth":16,
            "margin":0,
            "name":"block",
            "spacing":0,
            "tilecount":1,
            "tileheight":16,
            "tilewidth":16
        },
        {
            "columns":1,
            "firstgid":3,
            "image":"./rock.png",
            "imageheight":16,
            "imagewidth":16,
            "margin":0,
            "name":"rock",
            "spacing":0,
            "tilecount":1,
            "tileheight":16,
            "tilewidth":16
        }],
    "tilewidth":16,
    "type":"map",
    "version":"1.10",
    "width":15
}