<template>

</template>

<script setup lang="ts">

import kaboom from "kaboom";

const game = kaboom({
  scale: 4,
  background: '#000000'
})

const MOVE_SPEED = 100

game.loadSprite("bomber", "./assets/characters/bomber_alt.png", {
  sliceX: 3,
  sliceY: 4,
  anims: {
  // animações paradas
    idle_left: {
      from: 9, to: 9
    },
    idle_right: {
      from: 3, to: 3
    },
    idle_up: {
      from: 0, to: 0
    },
    idle_down: {
      from: 6, to: 6
    },
  // animações andando
    walk_left: {
      from: 9, to: 11
    },
    walk_right: {
      from: 3, to:5
    },
    walk_up: {
      from: 0, to: 2
    },
    walk_down: {
      from: 6, to: 8
    }
  }
})
game.loadSprite("block", "./assets/terrain/block.png")
game.loadSprite("grass", "./assets/terrain/grass.png")
game.loadSprite("grass_1", "./assets/terrain/grass_1.png")
game.loadSprite("rock", "./assets/terrain/rock.png")
game.loadSprite("rock_destroy", "./assets/terrain/rock_destroy.png")

game.scene('game', () => {


  const maps = [
      [
          'bbbbbbbbbbbbbbb',
          'bgggggggggggggb',
          'bgbgbgbgbgbgbgb',
          'bgggggggggggggb',
          'bgbgbgbgbgbgbgb',
          'bgggggggggggggb',
          'bgbgbgbgbgbgbgb',
          'bgggggggggggggb',
          'bgbgbgbgbgbgbgb',
          'bgggggggggggggb',
          'bgbgbgbgbgbgbgb',
          'bgggggggggggggb',
          'bgbgbgbgbgbgbgb',
          'bgggggggggggggb',
          'bbbbbbbbbbbbbbb',
      ]
  ]

  const level_config = {
    tileWidth: 16,
    tileHeight: 16,
    tiles: {
      b: () => [game.sprite('block'), game.area(), game.body({isStatic: true}), 'block'],
      r: () => [game.sprite('rock'), game.area(), game.body({isStatic: true}), 'rock'],
      g: () => [game.sprite('grass'), 'grass'],
    }

  }

  const game_leve = game.addLevel(maps[0], level_config)

  const player = game.add([
      game.sprite('bomber', {
        animSpeed: 0.1,
        frame: 6,
      }),
      game.pos(6, 0),
      game.area({
        shape: new Rect(game.vec2(0, 14), 16, 16),
      }),
      game.body(),
      // eixo vetor 2 direção inicial, pra frente na horizontal
      {dir: game.vec2(0,20)}
  ])

/*  player.onCollide((obj, col) => {
    if(col?.isRight()){
      player.move(-MOVE_SPEED, 0)
    }
    if(col?.isLeft()){
      player.move(MOVE_SPEED, 0)
    }
    if(col?.isTop()){
      player.move(0, -MOVE_SPEED)
    }
    if(col?.isBottom()){
      player.move(0, MOVE_SPEED)
    }
  })*/

  game.onKeyDown('left', () => {
    player.move(-MOVE_SPEED, 0)
    player.dir = game.vec2(-1, 0)
  })
  game.onKeyDown('right', () => {
    player.move(MOVE_SPEED, 0)
    player.dir = game.vec2(-1, 0)
  })
  game.onKeyDown('up', () => {
    player.move(0, -MOVE_SPEED)
    player.dir = game.vec2(-1, 0)
  })
  game.onKeyDown('down', () => {
    player.move(0, MOVE_SPEED)
    player.dir = game.vec2(-1, 0)
  })

})

game.go("game")

game.debug.inspect = false

</script>
<style scoped>

</style>