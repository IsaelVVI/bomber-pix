<template>

</template>

<script setup lang="ts">


import kaboom from "kaboom";
import type {PlayerInterface} from "~/interfaces";

const { width, height } = useWindowSize()
const socket = useNuxtApp().$nuxtSocket({name: 'bomberpix'})


socket.emit('join', 'room01')


const game = kaboom({
  scale: 4,
  background: '#000000',
})

const MOVE_SPEED = 1

const pressed_key = ref("")
const anim_play = ref("")

game.loadSprite("bomber", "./assets/characters/bomberman.png", {
  sliceX: 9,
  sliceY: 20,
  anims: {
    // animações paradas
    idle_left: {
      from: 27, to: 27
    },
    idle_right: {
      from: 9, to: 9
    },
    idle_up: {
      from: 0, to: 0
    },
    idle_down: {
      from: 18, to: 18
    },
    // animações andando
    walk_left: {
      from: 27, to: 29
    },
    walk_right: {
      from: 9, to: 11
    },
    walk_up: {
      from: 0, to: 2
    },
    walk_down: {
      from: 18, to: 20
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

  const players: PlayerInterface[] = []

  /*const player = game.add([
      game.sprite('bomber', {
        animSpeed: 1,
        frame: 18,
      }),
      game.pos(6, 0),
      game.area({
        offset: game.vec2(8, 0),
        shape: new Rect(game.vec2(0, 14), 16, 16),
      }),
      game.body(),
      // eixo vetor 2 direção inicial, pra frente na horizontal
      {dir: game.vec2(0,20)}
  ])*/

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

  socket.on('messageClient', (args) => {
    newPlayers(args)
  })

  const newPlayers = (player_id: string) => {
    const randx = Math.floor(Math.random() * (100 - 1 + 1))
    const randy = Math.floor(Math.random() * (100 - 1 + 1))
    let has_player = false
    if(!players.some(player => player.id === player_id)){
      players.push({
        id: player_id,
        player: game.add([
          game.sprite('bomber', {
            animSpeed: 1,
            frame: 18,
          }),
          game.pos(randx,randy),
          game.area({
            offset: game.vec2(6, 0),
            shape: new Rect(game.vec2(2.5, 14), 16, 16),
          }),
          game.body(),
          // eixo vetor 2 direção inicial, pra frente na horizontal
          {dir: game.vec2(0,20)}
        ])
      })
    }
  }

  interface PlayerMovementInterface {
    x: number,
    y: number,
    id: string
  }

  socket.on('playerMovements', (args: PlayerMovementInterface) => {
    players.forEach(player => {
      if(args.id === player.id){
        player.player.pos.x = args.x
        player.player.pos.y = args.y
      }
    })


  })


  game.onKeyDown('left', () => {
      socket.emit('movement', {
        x: <number>players.find(player => player.id === socket.id)?.player.pos.x - MOVE_SPEED,
        y: <number>players.find(player => player.id === socket.id)?.player.pos.y
      })
  })

  game.onKeyDown('right', () => {
      socket.emit('movement', {
        x: <number>players.find(player => player.id === socket.id)?.player.pos.x + MOVE_SPEED,
        y: <number>players.find(player => player.id === socket.id)?.player.pos.y
      })
  })

  game.onKeyDown('up', () => {
    socket.emit('movement', {
      x: <number>players.find(player => player.id === socket.id)?.player.pos.x,
      y: <number>players.find(player => player.id === socket.id)?.player.pos.y - MOVE_SPEED
    })
  })

  game.onKeyDown('down', () => {
    socket.emit('movement', {
      x: <number>players.find(player => player.id === socket.id)?.player.pos.x,
      y: <number>players.find(player => player.id === socket.id)?.player.pos.y + MOVE_SPEED
    })
  })


  /*  game.onKeyDown('left', () => {
      if(pressed_key.value === "" || pressed_key.value === 'left'){
        pressed_key.value = 'left'
        player.move(-MOVE_SPEED, 0)
        player.dir = game.vec2(-1, 0)
      }


    })
    game.onKeyDown('right', () => {
      if(pressed_key.value === "" || pressed_key.value === 'right'){
        pressed_key.value = 'right'
        player.move(MOVE_SPEED, 0)
        player.dir = game.vec2(-1, 0)
      }
    })
    game.onKeyDown('up', () => {
      if(pressed_key.value === "" || pressed_key.value === 'up'){
        pressed_key.value = 'up'
        player.move(0, -MOVE_SPEED)
        player.dir = game.vec2(-1, 0)
      }

    })
    game.onKeyDown('down', () => {
      if(pressed_key.value === "" || pressed_key.value === 'down'){
        pressed_key.value = 'down'
        player.move(0, MOVE_SPEED)
        player.dir = game.vec2(-1, 0)
      }

    })

    game.onKeyRelease("left", () => {
      if(!game.isKeyDown() || pressed_key.value === "left"){
        pressed_key.value = ''
        anim_play.value = ""
        if(!game.isKeyDown()) player.play('idle_left', {speed: 10})
      }
    })

    game.onKeyRelease("right", () => {
      if(!game.isKeyDown() || pressed_key.value === "right"){
        pressed_key.value = ''
        anim_play.value = ""
        if(!game.isKeyDown()) player.play('idle_right', {speed: 10})
      }
    })

    game.onKeyRelease("up", () => {
      if(!game.isKeyDown() || pressed_key.value === "up"){
        pressed_key.value = ''
        anim_play.value = ""
        if(!game.isKeyDown()) player.play('idle_up', {speed: 10})
      }
    })

    game.onKeyRelease("down", () => {
      if(!game.isKeyDown() || pressed_key.value === "down"){
        pressed_key.value = ''
        anim_play.value = ""
        if(!game.isKeyDown()) player.play('idle_down', {speed: 10})
      }
    })

    game.onKeyPress('left', () => {
      if(game.isKeyDown('right') || game.isKeyDown('up') || game.isKeyDown('down')) return
      if(player.curAnim() !== "walk_left"){
        anim_play.value = "walk_left"
        player.play('walk_left', {speed: 10, loop: true})
      }else {
        return
      }
    })

    game.onKeyPress('right', () => {
      if(game.isKeyDown('left') || game.isKeyDown('up') || game.isKeyDown('down')) return
      if(player.curAnim() !== "walk_right"){
        anim_play.value = "walk_right"
        player.play('walk_right', {speed: 10, loop: true})
      }else {
        return
      }
    })

    game.onKeyPress('up', () => {
      if(game.isKeyDown('left') || game.isKeyDown('right') || game.isKeyDown('down')) return
      if(player.curAnim() !== "walk_up"){
        anim_play.value = "walk_up"
        player.play('walk_up', {speed: 10, loop: true})
      }else {
        return
      }
    })

    game.onKeyPress('down', () => {
      if(game.isKeyDown('left') || game.isKeyDown('right') || game.isKeyDown('up')) return
      if(player.curAnim() !== "walk_down"){
        anim_play.value = "walk_down"
        player.play('walk_down', {speed: 10, loop: true})
      }else {
        return
      }
    })*/

})

game.go("game")

game.debug.inspect = true

</script>
<style scoped>

</style>