import {direction} from "~/games/BomberPix/phaser/Players/constants/entitiesBomber";

export const WALK_SPEED = 40

export const bomberman_state_type = {
    IDLE: 'idle',
    MOVING: 'moving'
}


export const animations = {
    moveAnimations: {
        [direction.LEFT]: [
            ['idle-side', 8], ['move-side-1', 8], ['idle-side', 8], ['move-side-2', 8]
        ],
        [direction.RIGHT]: [
            ['idle-side', 8], ['move-side-1', 8], ['idle-side', 8], ['move-side-2', 8]
        ],
        [direction.UP]: [
            ['idle-side', 8], ['move-side-1', 8], ['idle-side', 8], ['move-side-2', 8]
        ],
        [direction.DOWN]: [
            ['idle-side', 8], ['move-side-1', 8], ['idle-side', 8], ['move-side-2', 8]
        ],
    }
}