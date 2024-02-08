
/*
import kaboom from "kaboom";
import type {Key} from "kaboom";
import type {PlayerInterface} from "~/interfaces";
import {usePeerStore} from "~/stores/peer";
import type Peer from "peerjs";
import type {RoomAvailable} from "colyseus.js";
import {Room} from "colyseus.js";

const {width, height} = useWindowSize()
// const socket = useNuxtApp().$nuxtSocket({name: 'bomberpix'})


const {$colyseus} = useNuxtApp()

const all_rooms = ref<RoomAvailable[]>(await $colyseus.getAvailableRooms())

const room = ref<Room>()


const peerStore = usePeerStore()

// peerStore.initializePeer()


const game = kaboom({
    scale: 4,
    background: '#000000',
})

const MOVE_SPEED = 80

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

game.scene('lobby', async () => {
    const rooms = []
    if (!all_rooms.value.length) {
        console.log('sem')
        game.go("game")
    }

    all_rooms.value.forEach(temp_room => {
        rooms.push(game.add([
            game.text(temp_room.roomId, {
                width: 100,
                size: 8,
                align: "center"
            }),
            game.area(),
            "room"
        ]))
    })


    game.onClick("room", async (temp_room) => {
        if(!room.value?.name){
            game.go("game", temp_room.text)
            // room.value = await $colyseus.joinById(temp_room.text)
        }
    })

})

game.scene('game', async (name?: string) => {
    room.value = !room.value?.id && name ? await $colyseus.joinById(name) : await $colyseus.create("my_room")

    const maps = [
        [
            'bbbbbbbbbbbbbbb',
            'bgrgggggggggggb',
            'brbgbgbgbgbgbgb',
            'bgggggggggggggb',
            'bgbgbgbgbgbgbgb',
            'bgggggggggggggb',
            'bgbgbgbgbgbgbgb',
            'bgggrgggggggggb',
            'bgbgbgbgbgbgbgb',
            'bgggggggggggggb',
            'bgbgbgbgbgbgbgb',
            'bgggrgggggrgggb',
            'bgbgbgbgbgbgbgb',
            'bgggrgggggggggb',
            'bbbbbbbbbbbbbbb',
        ]
    ]

    const level_config = {
        tileWidth: 16,
        tileHeight: 16,
        tiles: {
            b: () => [
                game.sprite('block'),
                game.area(),
                game.body({isStatic: true}),
                'block'
            ],
            r: () => [game.sprite('rock'), game.area(),
                game.body({isStatic: true}),'rock'],
            g: () => [game.sprite('grass'), 'grass'],
        }

    }

    const game_leve = game.addLevel(maps[0], {
        ...level_config,
        pos: game.toWorld(new Vec2(16, 16))
    })

    const players: PlayerInterface[] = []

    /!*const player = game.add([
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
    ])*!/

    /!*  player.onCollide((obj, col) => {
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
      })*!/

    room.value?.onStateChange.once((state) => {
        // console.log('primeiro estado da sala', state.players.$items)
        for (const [key, value] of state.players.$items){
            console.log(value.x, value.y)
        }
    })

    room.value?.onStateChange((state) => {
        // console.log('novo estado da sala', state)
        for (const [key, value] of state.players.$items){
            let player = players.find(player => player.id === key)?.player
            if(!player){
                return
            }
            player.pos.x = <number>value.x
            player.pos.y = <number>value.y
            console.log(value.x, value.y)
        }
    })

    room.value?.onMessage("connect_players", (args) => {
        newPlayers(args)
        console.log(args)
    })



    /!*  socket.on('messageClient', (args) => {
        newPlayers(args)
      })*!/

    const newPlayers = (temp_player: any) => {
        let has_player = false
        console.log(temp_player)
        if (!players.some(player => player.id === temp_player.id)) {
            players.push({
                id: temp_player.id,
                text: game.add([
                    game.text(String(temp_player.id), {
                        size: 6,
                    }),
                    game.z(200),
                    game.pos(temp_player.x, temp_player.y)
                ]),
                player: game.add([
                    game.sprite('bomber', {
                        animSpeed: 1,
                        frame: 18,
                    }),
                    game.anchor("center"),
                    game.pos(temp_player.x, temp_player.y),
                    game.area({
                        offset: game.vec2(6, 0),
                        shape: new Rect(game.vec2(2.5, 14), 16, 16),
                    }),
                    game.body({
                        mass: 1000
                    }),
                    // eixo vetor 2 direção inicial, pra frente na horizontal
                    {dir: game.vec2(0, 20)},
                    'player'
                ])
            })
        }
    }

    interface PlayerMovementInterface {
        x: number,
        y: number,
        id: string
    }

    /!* socket.on('playerMovements', (args: PlayerMovementInterface) => {
       players.forEach(player => {
         if (args.id === player.id && args.id !== socket.id) {
           player.player.pos.x = args.x
           player.player.pos.y = args.y
         }
       })
     })*!/


    /!*game.onKeyDown('left', () => {
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
    })*!/


    game.onKeyDown('left', () => {
        pressed_key.value = 'left'
        room.value?.send("move", {
            x: -1,
            y: 0
        })
        // let temp_player = players.find(player => player.id === socket.id)
        // temp_player?.player.move(-MOVE_SPEED, 0)
    })

    game.onKeyDown('right', () => {
        pressed_key.value = 'right'
        room.value?.send("move", {
            x: 1,
            y: 0
        })
        // let temp_player = players.find(player => player.id === socket.id)
        // temp_player?.player.move(MOVE_SPEED, 0)
    })

    game.onKeyDown('up', () => {
        pressed_key.value = 'up'
        room.value?.send("move", {
            x: 0,
            y: -1
        })
        // let temp_player = players.find(player => player.id === socket.id)
        // temp_player?.player.move(0, -MOVE_SPEED)
    })

    game.onKeyDown('down', () => {
        pressed_key.value = 'down'
        room.value?.send("move", {
            x: 0,
            y: 1
        })
        // let temp_player = players.find(player => player.id === socket.id)
        // temp_player?.player.move(0, MOVE_SPEED)
    })

    game.onKeyDown((key: Key) => {
        if (key === 'left' || key === 'right' || key === 'up' || key === 'down') {
            /!*socket.emit('movement', {
              ...players.find(player => player.id === socket.id)?.player.pos
            })*!/
        }
    })


    game.onKeyRelease("left", () => {
        // socket.emit('anim', "idle_left")
        // if (!game.isKeyDown()) players.find(player => player.id === socket.id)?.player.play('idle_left', {speed: 10})
    })

    game.onKeyRelease("right", () => {
        // socket.emit('anim', "idle_right")
        // if (!game.isKeyDown()) players.find(player => player.id === socket.id)?.player.play('idle_right', {speed: 10})
        /!*if(!game.isKeyDown() || pressed_key.value === "right"){
          pressed_key.value = ''
          anim_play.value = ""
        }*!/
    })

    game.onKeyRelease("up", () => {
        // socket.emit('anim', "idle_up")
        // if (!game.isKeyDown()) players.find(player => player.id === socket.id)?.player.play('idle_up', {speed: 10})
    })

    game.onKeyRelease("down", () => {
        // socket.emit('anim', "idle_down")
        // if (!game.isKeyDown()) players.find(player => player.id === socket.id)?.player.play('idle_down', {speed: 10})
        /!*if(!game.isKeyDown() || pressed_key.value === "down"){
          pressed_key.value = ''
          anim_play.value = ""
        }*!/
    })

    game.onKeyPress('left', () => {
        if (game.isKeyDown('right') || game.isKeyDown('up') || game.isKeyDown('down')) return
        /!* if (players.find(player => player.id === socket.id)?.player.curAnim() !== "walk_left") {
           anim_play.value = "walk_left"
           // socket.emit('anim', "walk_left")
           players.find(player => player.id === socket.id)?.player.play('walk_left', {speed: 10, loop: true})
         } else {
           return
         }*!/
    })

    game.onKeyPress('right', () => {
        if (game.isKeyDown('left') || game.isKeyDown('up') || game.isKeyDown('down')) return
        /!* if (players.find(player => player.id === socket.id)?.player.curAnim() !== "walk_right") {
           anim_play.value = "walk_right"
           // socket.emit('anim', "walk_right")
           players.find(player => player.id === socket.id)?.player.play('walk_right', {speed: 10, loop: true})
         } else {
           return
         }*!/
    })

    game.onKeyPress('up', () => {
        if (game.isKeyDown('left') || game.isKeyDown('right') || game.isKeyDown('down')) return
        /!* if (players.find(player => player.id === socket.id)?.player.curAnim() !== "walk_up") {
           anim_play.value = "walk_up"
           // socket.emit('anim', "walk_up")
           players.find(player => player.id === socket.id)?.player.play('walk_up', {speed: 10, loop: true})
         } else {
           return
         }*!/
    })

    game.onKeyPress('down', () => {
        if (game.isKeyDown('left') || game.isKeyDown('right') || game.isKeyDown('up')) return
        /!* if (players.find(player => player.id === socket.id)?.player.curAnim() !== "walk_down") {
           anim_play.value = "walk_down"
           // socket.emit('anim', "walk_down")
           players.find(player => player.id === socket.id)?.player.play('walk_down', {speed: 10, loop: true})
         } else {
           return
         }*!/
    })
    /!*socket.on("changeAnimation", (args) => {
      players.forEach(player => {
        if (args.id === player.id && args.id !== socket.id) {
          player.player.play(args.anim, {speed: 10, loop: true})
        }
      })
    })*!/


})

game.go("lobby")

game.debug.inspect = true*/
