import {Bomber} from "~/games/BomberPix/phaser/Players/bomber";
import type { Room} from "colyseus.js";
import type {CharacterData, GridEngine, GridEngineConfig} from "grid-engine";
import type {Server} from "~/services/colyseus/colyseus";
import {Rock} from "~/games/BomberPix/phaser/objects/rock";


type Blocks = [
    Array<number>
]

interface ConnectPlayerInterface {
    id: string,
    x: number,
    y: number,
    blocks: Blocks
}

export class BomberPix extends Phaser.Scene {
    static readonly TILE_SIZE = 16
    players: Bomber[] = []

    room: Room | null

    in_movement: boolean = false
    qtd_bombs: number = 1

    // private gridEngine: GridEngine;

    layers: Phaser.Tilemaps.TilemapLayer[] = []

    constructor(private gridEngine: GridEngine) {
        super({
            key: 'BomberPix'
        });

        this.room = null
    }

    async create(data: { server: Server }) {

        const {server} = data

        this.room = server.all_rooms && !server.all_rooms.length ? await server.join() : await server.join(server.all_rooms[0].roomId)
        console.log(this.room.sessionId)
        const map = this.make.tilemap({key: 'map'})

        const grass = map.addTilesetImage("grass", "grass", 16, 16)
        const block = map.addTilesetImage("block", "block", 16, 16) as Phaser.Tilemaps.Tileset
        const rock = map.addTilesetImage('rock', "rock", 16, 16)

        const layer1 = map.createLayer(0, "grass") as Phaser.Tilemaps.TilemapLayer
        this.layers.push(layer1)
        const layer2 = map.createLayer(1, "block") as Phaser.Tilemaps.TilemapLayer
        this.layers.push(layer2)
        const layer3 = map.createLayer(2, "rock") as Phaser.Tilemaps.TilemapLayer
        this.layers.push(layer3)

        const my_group = this.add.group();
        for (let i = 0; i < 1; i++) {
            const rock = this.add.image(2,2, 'rock',)
            my_group.add(rock)
        }


        const gridEngineConfig: GridEngineConfig = {
            characters: [],
        }
        this.room.onMessage("connect_players", (args: ConnectPlayerInterface) => {
            console.log("recebeu", args);
            const has_player = this.players.some(player => player.id === args.id)
            /*this.cameras.main.startFollow(playerSprite, true);
            this.cameras.main.setFollowOffset(-playerSprite.width, -playerSprite.height)*/
            if(!has_player){
                const playerSprite = this.add.sprite(args.x, args.y, "bomber")
                playerSprite.anims.duration = 10
                const player = new Bomber(args.id, playerSprite, new Phaser.Math.Vector2(1, 1))
                this.players.push(player)


                gridEngineConfig.characters.push({
                    id: player.id,
                    sprite: player.sprite,
                    walkingAnimationMapping: {
                        up: {
                            leftFoot: 1,
                            standing: 0,
                            rightFoot: 2
                        },
                        down:{
                          leftFoot: 19,
                          standing: 18,
                          rightFoot: 20
                        },
                        left: {
                          leftFoot: 28,
                          standing: 27,
                          rightFoot: 29,
                        },
                        right:{
                            leftFoot: 10,
                            standing: 9,
                            rightFoot: 11
                        },
                    },
                    collides: {
                      collisionGroups: []
                    },
                    startPosition: {x: player.sprite.x, y: player.sprite.y}
                })

                this.gridEngine.create(map, gridEngineConfig)
                // this.instantiateRocks(args.blocks)
                // this.animations(args.id)
                // this.movements()
            }
        })

        this.room?.onMessage('disconnect_players', (args) => {
            this.players = this.players.filter(p => p.id !== args.id)
            this.gridEngine.getSprite(args.id)?.destroy()
            this.gridEngine.removeCharacter(args.id)
        })


        this.room.onStateChange.once((state) => {
            console.log("Initial State:", state);
        });

        this.room.onStateChange((state) => {
            // console.log("new State:", state);
            for (const [key, value] of state.players.$items){
                let player = this.players.find(player => player.id === key)
                if(!player){
                    return
                }
                // this.gridEngine.setPosition(key, {x: value.x, y: value.y})
                // console.log(value.x, value.y)
            }
        });

        this.room?.onMessage("move_player", (args) => {
            // console.log(args)
            const player = this.players.find(tempplayer => tempplayer.id === args.id)
            console.log(args.id, args.position.x, args.position.y)
            if(player){
                const player_moving = this.gridEngine.isMoving(player.id)
                if(!player_moving) {
                    this.gridEngine.move(player.id, args.position.direction);
                    this.in_movement = true
                }
                // console.log(player.id)
            }
            // this.gridEngine.setPosition(args.id, {...args.position})
        })

        this.room?.onMessage('receive_bomb', (args) => {
            console.log(args.explodes)
            this.instantiateBomb(args.id, args.positions, args.explodes)
        })

        /*{
            id: "player",
                sprite: playerSprite,
            walkingAnimationMapping: 6,
            startPosition: {x: 1, y: 8 },
        }*/

        this.input.keyboard?.on('keydown', (event: KeyboardEvent) => {

            if(event.code === "Space"){
                console.log('espaço')
                const player = this.gridEngine.getPosition(<string>this.room?.sessionId)
                this.room?.send('insert_bomb', {
                    quantity: 4,
                    x: player?.x,
                    y: player?.y
                })
            }

        })

        this.createPlayerAnimation(`explosion_center`, "explosion", [3,8,13,18,23])
        this.createPlayerAnimation(`explosion_left`, "explosion", [2,7,12,17,22])
        this.createPlayerAnimation(`explosion_right`, "explosion", [2,7,12,17,22])
        this.createPlayerAnimation(`explosion_up`, "explosion", [1,6,11,16,21])
        this.createPlayerAnimation(`explosion_down`, "explosion", [1,6,11,16,21])

        this.createPlayerAnimation(`explosion_left_end`, "explosion", [0,5,10,15,20])
        this.createPlayerAnimation(`explosion_right_end`, "explosion", [0,5,10,15,20])
        this.createPlayerAnimation(`explosion_up_end`, "explosion", [0,5,10,15,20])
        this.createPlayerAnimation(`explosion_down_end`, "explosion", [0,5,10,15,20])

        this.createPlayerAnimation(`explosion_rock`, "rock_destroy", [0,1,2,3,4,5])

        this.createPlayerAnimation(`bombinit`, "bomb")
        // this.input.keyboard?.on("Space", this.instantiateBomb, this)

    }


    // movements() {
    //     this.gridEngine
    //         .positionChangeStarted()
    //         .subscribe(({charId, exitTile, enterTile}: any) => {
    //             /*console.log('changeStarted: ', exitTile.x, exitTile.y)
    //             console.log('enter: ', enterTile.x, enterTile.y)*/
    //             // this.gridEngine.setPosition(args.id, {...args.position})
    //         });
    //
    //     this.gridEngine
    //         .positionChangeFinished()
    //         .subscribe(({charId, exitTile, enterTile}: any) => {
    //             this.in_movement = false
    //             console.log(this.in_movement)
    //             /* console.log('changeFinished: ', exitTile.x,exitTile.y)
    //              console.log('enter: ', enterTile.x, enterTile.y)*/
    //         });
    //
    //     this.gridEngine.movementStarted().subscribe(({direction}) => {
    //         // const player_moving = this.gridEngine.isMoving(this.players[0].id)
    //         // if(!player_moving){
    //         //     const id = this.players[0].id
    //         //     this.players[0].sprite.anims.play(`${id}-${direction}`);
    //         // }
    //     });
    //
    //     this.gridEngine.movementStopped().subscribe(({direction}) => {
    //         // const player_moving = this.gridEngine.isMoving(this.players[0].id)
    //         // if(!player_moving){
    //         //     this.players[0].sprite.anims.stop();
    //         //     // @ts-ignore
    //         //     this.players[0].sprite.setFrame(this.getStopFrame(direction));
    //         // }
    //     });
    //
    //     this.gridEngine.directionChanged().subscribe(({direction}) => {
    //         // @ts-ignore
    //         // this.players[0].sprite.setFrame(this.getStopFrame(direction));
    //     });
    // }

    async preload() {
    }


    instantiateRocks(blocks: any[]){
        for (let row = 0; row < blocks.length; row++) {
            for (let col = 0; col < 14; col++) {
                if (blocks[row][col] === 3){
                    const rockSprite = this.add.sprite(1,1, "rock")
                    const rock = new Rock(rockSprite, new Phaser.Math.Vector2(col, row))
                    this.gridEngine.addCharacter({
                        id: `rock-${col}-${row}`,
                        sprite: rock.sprite,
                        collides: {
                            collisionGroups: []
                        },
                        startPosition: {x: col, y: row}
                    })
                }
            }
        }
    }


    instantiateBomb(id: string, positions: any[], explodes: any[]) {
        if(this.qtd_bombs){
            const player = this.players.find(p => p.id === id)
            const grid_player = this.gridEngine.getPosition(id)
            if(player){
                const bomb_sprite = this.add.sprite(1,1, "bomb", 0)
                this.gridEngine.addCharacter({
                    id: `bomb-${id}`,
                    sprite: bomb_sprite,
                    collides: {
                        collisionGroups: []
                    },
                    startPosition: {x: grid_player.x, y: grid_player.y}
                })
                this.gridEngine.getSprite(`bomb-${id}`)?.play('bombinit')

                const position_bomb = positions

                let bombs: CharacterData[] = []

                setTimeout(() => {
                    this.gridEngine.getSprite(`bomb-${id}`)?.play('explosion_center')
                    for (const [index, value] of position_bomb.entries()) {
                        const tempbomb_sprite = this.add.sprite(1,1, "bomb", 0)
                        this.gridEngine.addCharacter({
                            id: `bomb-${id}-${index}`,
                            sprite: tempbomb_sprite,
                            collides: {
                                collisionGroups: ['3']
                            },
                            startPosition: {x: value.x, y: value.y}
                        })

                        bombs.push({
                            id: `bomb-${id}-${index}`,
                            sprite: tempbomb_sprite,
                            collides: {
                                collisionGroups: ['3']
                            },
                            startPosition: {x: value.x, y: value.y}
                        })

                        this.gridEngine.getSprite(`bomb-${id}-${index}`)?.play(value.anim)

                        if(value.anim.includes('right') && value.anim !== 'explosion_right_end'){
                            this.gridEngine.getSprite(`bomb-${id}-${index}`)?.play(value.anim).setFlipX(true)
                        }

                        if(value.anim.includes('down')){
                            this.gridEngine.getSprite(`bomb-${id}-${index}`)?.play(value.anim).setFlipY(true)
                        }

                        if(value.anim === 'explosion_left_end'){
                            this.gridEngine.getSprite(`bomb-${id}-${index}`)?.play(value.anim).setFlipX(true)
                        }

                        if(value.anim === 'explosion_up_end'){
                            this.gridEngine.getSprite(`bomb-${id}-${index}`)?.play(value.anim)
                                .setAngle(90)
                                .setOrigin(0, 1)
                                .setFlip(true, true)
                        }

                        if(value.anim === 'explosion_down_end'){
                            this.gridEngine.getSprite(`bomb-${id}-${index}`)?.play(value.anim)
                                .setAngle(90)
                                .setOrigin(0, 1)
                                .setFlip(false, true)
                        }
                    }
                    for (const [index, value] of explodes.entries()){
                        const layer = this.layers[2]

                        const temprock = this.add.sprite(1,1, "rock", 0)

                        this.gridEngine.addCharacter({
                            id: `rock-${value.x}-${value.y}`,
                            sprite: temprock,
                            collides: {
                                collisionGroups: ['3']
                            },
                            startPosition: {x: value.x, y: value.y}
                        })


                        this.gridEngine.getSprite(`rock-${value.x}-${value.y}`)?.play('explosion_rock')
                        setTimeout(() => {
                            this.gridEngine.getSprite(`rock-${value.x}-${value.y}`)?.destroy()
                            this.gridEngine.removeCharacter(`rock-${value.x}-${value.y}`)
                            layer.removeTileAt(value.x, value.y)
                        }, 1000)
                    }
                }, 2000)
                setTimeout(() => {
                    this.gridEngine.getSprite(`bomb-${id}`)?.destroy()
                    this.gridEngine.removeCharacter(`bomb-${id}`)

                    for (const bomb of bombs) {
                        this.gridEngine.getSprite(bomb.id)?.destroy()
                        this.gridEngine.removeCharacter(bomb.id)
                    }

                    /*for(const explode of explodes){
                        this.gridEngine.getSprite(`rock-${explode.x}-${explode.y}`)?.destroy()
                        this.gridEngine.removeCharacter(`rock-${explode.x}-${explode.y}`)
                        console.log(this.gridEngine.getSprite(`rock-${explode.x}-${explode.y}`))
                    }*/

                    bombs = []
                    this.room?.send('explode_bomb')
                }, 3000)
                console.log('bomba', grid_player.x, grid_player.y)
                // this.qtd_bombs -= this.qtd_bombs
            }
        }
    }


    /*
    async create(data: {server: Server})
    const {server} = data

     this.room = await server.join()*/

    update(time: number, delta: number) {
        const cursors = this.input.keyboard?.createCursorKeys();
        /*if(cursors?.left.isUp) this.players[0].stopAnimation()
        if(cursors?.right.isUp) this.players[0].stopAnimation()
        if(cursors?.up.isUp) this.players[0].stopAnimation()
        if(cursors?.down.isUp) this.players[0].stopAnimation()*/


        if (cursors?.left.isDown) {
            const {x,y} = this.gridEngine.getPosition(<string>this.room?.sessionId)
            this.room?.send('move', {x: x-1, y, direction: 'left'})
            // this.players[0].startAnimation(Direction.LEFT)
            // this.players[0].movementLeft(-1, this.players[0].offsetY)
            // this.room?.send("move", {
            //     x: -1,
            //     y: 0
            // })
            // console.log(this.players[0].offsetX, this.players[0].offsetY)
        }
        if (cursors?.right.isDown) {
            // this.room?.send('move', 'right')
            const {x,y} = this.gridEngine.getPosition(<string>this.room?.sessionId)
            this.room?.send('move', {x: x+1, y, direction: 'right'})
            // this.gridEngine.move(<string>this.room?.sessionId, Direction.RIGHT);
            // this.players[0].startAnimation(Direction.RIGHT)
            // this.players[0].movementRight(1, this.players[0].offsetY)
            // this.room?.send("move", {
            //     x: 1,
            //     y: 0
            // })
            // console.log(this.players[0].offsetX, this.players[0].offsetY)
        }
        if (cursors?.up.isDown) {
            // this.room?.send('move', 'up')
            const {x,y} = this.gridEngine.getPosition(<string>this.room?.sessionId)
            this.room?.send('move', {x, y: y-1, direction: 'up'})
            // this.gridEngine.move(<string>this.room?.sessionId, Direction.UP);
            // this.players[0].startAnimation(Direction.UP)
            // this.players[0].movementUp(this.players[0].offsetX, -1)
            // this.room?.send("move", {
            //     x: 0,
            //     y: -1
            // })
            // console.log(this.players[0].offsetX, this.players[0].offsetY)
        }
        if (cursors?.down.isDown) {
            // this.room?.send('move', 'down')
            const {x,y} = this.gridEngine.getPosition(<string>this.room?.sessionId)
            this.room?.send('move', {x, y: y+1, direction: 'down'})
            // this.gridEngine.move(<string>this.room?.sessionId, Direction.DOWN);
            // this.players[0].startAnimation(Direction.DOWN)
            // this.players[0].movementDown(this.players[0].offsetX, 1)
            // this.room?.send("move", {
            //     x: 0,
            //     y: 1
            // })
            // console.log(this.players[0].offsetX, this.players[0].offsetY)
        }
        // console.log(this.players[0].offsetX, this.players[0].offsetY)
    }


    getStopFrame(direction: string) {
        switch (direction) {
            case 'up':
                return 0;
            case 'right':
                return 9;
            case 'down':
                return 18;
            case 'left':
                return 27;
        }
    }

    /*private animations(id:string) {
        this.createPlayerAnimation(`${id}-${Direction.UP}`, 0, 2);
        this.createPlayerAnimation(`${id}-${Direction.RIGHT}`, 9, 11);
        this.createPlayerAnimation(`${id}-${Direction.DOWN}`, 18, 20);
        this.createPlayerAnimation(`${id}-${Direction.LEFT}`, 27, 29);
    }*/

    private createPlayerAnimation(name: string, key: string, frames?: number[] ) {
        const config = frames ? {frames} : {}
        this.anims.create({
            key: name,
            frames: this.anims.generateFrameNumbers(key, {...config}),
            frameRate: 8,
            repeat: frames ? 0 : -1
        });
    }


    gerarPosicoes(quantidade: number, potencia: number, posicaoInicial: {x: number, y: number}) {
        interface posicoesInterface {
            x: number,
            y: number,
            direcao: string,
            anim: string
        }
        const posicoes: posicoesInterface[] = [];

        // Função para verificar se uma posição já existe na lista
        function posicaoJaExiste(x: number, y: number) {
            return posicoes.some(posicao => posicao.x === x && posicao.y === y);
        }

        // Função para adicionar uma posição em uma direção específica
        function adicionarPosicao(direcao: string, xOffset: number, yOffset: number, anim: string) {
            let tempX = posicaoInicial.x + xOffset;
            let tempY = posicaoInicial.y + yOffset;

            // Verificar se a posição já existe e ajustar
            while (posicaoJaExiste(tempX, tempY)) {
                tempX += xOffset;
                tempY += yOffset;
            }

            // Adicionar a propriedade anim de acordo com as regras
            posicoes.push({
                x: tempX,
                y: tempY,
                direcao,
                anim,
            });
        }

        // Definir o sufixo padrão para animações
        let animPadrao = '_end';
        if (quantidade < 8) {
            animPadrao = '_end';
        }

        // Adicionar posições de acordo com a quantidade especificada
        for (let i = 1; i <= quantidade; i++) {
            let anim = (quantidade <= 4 || i % 2 === 0) ? animPadrao : '';
            adicionarPosicao('cima', 0, -1, 'explosion_up');
            adicionarPosicao('direita', 1, 0, 'explosion_right');
            adicionarPosicao('baixo', 0, 1, 'explosion_down');
            adicionarPosicao('esquerda', -1, 0, 'explosion_left');
        }

        // Limitar o número de posições ao valor especificado
        posicoes.splice(quantidade);

        let temp_pos = []

        temp_pos = posicoes.map((p, i) => {
            if(posicoes.length == 4){
                return {
                    ...p,
                    anim: `${p.anim}_end`
                }
            }

            if(posicoes.length - i <= 4){
                return {
                    ...p,
                    anim: `${p.anim}_end`
                }
            }

            return p

        })

        return temp_pos;
    }

}