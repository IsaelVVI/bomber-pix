export const direction = {
    UP: 'direction-up',
    DOWN: 'direction-down',
    LEFT: 'direction-left',
    RIGHT: 'direction-right'
}

export const movement_lookup = {
    [direction.LEFT]: {x: -1, y:0},
    [direction.RIGHT]: {x: 1, y: 0},
    [direction.UP]: {x: 0, y: -1},
    [direction.DOWN]: {x: 0, y: 1}
}

export const counter_directions_lookup = {
    [direction.LEFT]: [direction.DOWN, direction.UP],
    [direction.RIGHT]: [direction.DOWN, direction.UP],
    [direction.UP]: [direction.RIGHT, direction.LEFT],
    [direction.DOWN]: [direction.RIGHT, direction.LEFT],
}