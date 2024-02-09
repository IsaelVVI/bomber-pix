import {Bomber} from "~/games/BomberPix/phaser/Players/bomber";
import type {Client, Room} from "colyseus.js";
import type {GridEngine, GridEngineConfig} from "grid-engine";
import {Direction} from "~/games/BomberPix/phaser/Players/constants/Directions";
import type {Server} from "~/services/colyseus/colyseus";

export class BomberPix extends Phaser.Scene {
    static readonly TILE_SIZE = 16

    // player!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

    key: Phaser.Types.Input.Keyboard.CursorKeys | undefined
    players: Bomber[] = []

    room: Room | null

    // private gridEngine: GridEngine;

    constructor(private gridEngine: GridEngine) {
        super({
            key: 'BomberPix'
        });

        this.room = null
    }

    async create(data: { server: Server }) {

        const {server} = data

        this.room = server.all_rooms && !server.all_rooms.length ? await server.join() : await server.join(server.all_rooms[0].roomId)

        const map = this.make.tilemap({key: 'map'})

        map.addTilesetImage("grass", "grass", 16, 16)
        map.addTilesetImage("block", "block", 16, 16)

        for (let i = 0; i < map.layers.length; i++) {
            if (i < 1) {
                const layer = map.createLayer(i, "grass")
            } else {
                const layer = map.createLayer(i, "block")
            }
        }

        // this.cameras.main.startFollow(playerSprite, true);
        // this.cameras.main.setFollowOffset(-playerSprite.width, -playerSprite.height)


        const gridEngineConfig: GridEngineConfig = {
            characters: []
        }
        this.room.onMessage("connect_players", (args) => {
            console.log("recebeu", args);

            const has_player = this.players.some(player => player.id === args.id)

            if(!has_player){
                const playerSprite = this.add.sprite(args.x, args.y, "bomber")
                playerSprite.anims.duration = 10
                const player = new Bomber(args.id, playerSprite, new Phaser.Math.Vector2(1, 1))
                this.players.push(player)
                gridEngineConfig.characters.push({
                    id: player.id,
                    sprite: player.sprite,
                    startPosition: {x: player.sprite.x, y: player.sprite.y}
                })
                this.gridEngine.create(map, gridEngineConfig)
                this.animations(args.id)
                this.movements()
            }
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
                console.log(value.x, value.y)
            }
        });

        /*{
            id: "player",
                sprite: playerSprite,
            walkingAnimationMapping: 6,
            startPosition: {x: 1, y: 8 },
        }*/


    }


    movements() {
        this.room?.onMessage("move_player", (args) => {
            console.log(args)
            this.gridEngine
                .positionChangeStarted()
                .subscribe(({charId, exitTile, enterTile}: any) => {
                    console.log('changeStarted: ', exitTile.x, exitTile.y)
                    console.log('enter: ', enterTile.x, enterTile.y)
                    this.gridEngine.setPosition(args.id, {...args.position})
                });
        })


        this.gridEngine
            .positionChangeFinished()
            .subscribe(({charId, exitTile, enterTile}: any) => {
                /* console.log('changeFinished: ', exitTile.x,exitTile.y)
                 console.log('enter: ', enterTile.x, enterTile.y)*/
            });

        this.gridEngine.movementStarted().subscribe(({direction}) => {
            const id = this.players[0].id
            this.players[0].sprite.anims.play(`${id}-${direction}`);
        });

        this.gridEngine.movementStopped().subscribe(({direction}) => {
            this.players[0].sprite.anims.stop();
            // @ts-ignore
            this.players[0].sprite.setFrame(this.getStopFrame(direction));
        });

        this.gridEngine.directionChanged().subscribe(({direction}) => {
            // @ts-ignore
            this.players[0].sprite.setFrame(this.getStopFrame(direction));
        });
    }

    async preload() {
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
            const {x,y} = this.gridEngine.getPosition(this.players[0].id)
            this.room?.send('move', {x: x-1, y})
            this.gridEngine.move(this.players[0].id, Direction.LEFT);
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
            this.gridEngine.move(this.players[0].id, Direction.RIGHT);
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
            this.gridEngine.move(this.players[0].id, Direction.UP);
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
            this.gridEngine.move(this.players[0].id, Direction.DOWN);
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

    private animations(id:string) {
        this.createPlayerAnimation(`${id}-${Direction.UP}`, 0, 2);
        this.createPlayerAnimation(`${id}-${Direction.RIGHT}`, 9, 11);
        this.createPlayerAnimation(`${id}-${Direction.DOWN}`, 18, 20);
        this.createPlayerAnimation(`${id}-${Direction.LEFT}`, 27, 29);
    }

    private createPlayerAnimation(
        name: string,
        startFrame: number,
        endFrame: number
    ) {
        this.anims.create({
            key: name,
            frames: this.anims.generateFrameNumbers("bomber", {
                start: startFrame,
                end: endFrame,
            }),
            frameRate: 8,
            repeat: -1
        });
    }
}