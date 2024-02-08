import {Bomber} from "~/games/BomberPix/phaser/Players/bomber";
import type {Room} from "colyseus.js";
import type {GridEngine, GridEngineConfig} from "grid-engine";
import {Direction} from "~/games/BomberPix/phaser/Players/constants/Directions";


interface playerBomber {
    player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody,
    id: string
}

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

    create(){
        const map = this.make.tilemap({key: 'map'})

        map.addTilesetImage("grass", "grass", 16, 16)
        map.addTilesetImage("block", "block", 16, 16)

        for(let i = 0; i< map.layers.length; i++){
            if(i < 1 ) {
                const layer = map.createLayer(i, "grass")
            }else{
                const layer = map.createLayer(i, "block")
            }
        }

        const playerSprite = this.add.sprite(0,0, "bomber")
        playerSprite.anims.duration = 10
        this.cameras.main.startFollow(playerSprite, true);
        this.cameras.main.setFollowOffset(-playerSprite.width, -playerSprite.height)


        const player = new Bomber('player', playerSprite, new Phaser.Math.Vector2(1,1))

        this.animations()

        this.players.push(player)


        const gridEngineConfig: GridEngineConfig = {
            characters: [
                {
                    id: player.id,
                    sprite: player.sprite,
                    startPosition: {x: player.sprite.x, y: player.sprite.y}
                }
            ]
        }

        /*{
            id: "player",
                sprite: playerSprite,
            walkingAnimationMapping: 6,
            startPosition: {x: 1, y: 8 },
        }*/

        this.gridEngine.create(map, gridEngineConfig)

        this.gridEngine
            .positionChangeStarted()
            .subscribe(({ charId, exitTile, enterTile }: any) => {
                console.log('changeStarted: ', exitTile.x,exitTile.y)
                console.log('enter: ', enterTile.x, enterTile.y)
                if(enterTile.x < 1 || enterTile.x > 13){
                    this.gridEngine.setPosition(charId, {...exitTile})
                }
                if(enterTile.y < 1 || enterTile.y > 13){
                    this.gridEngine.setPosition(charId, {...exitTile})
                }
            });

        this.gridEngine
            .positionChangeFinished()
            .subscribe(({ charId, exitTile, enterTile }: any) => {
               /* console.log('changeFinished: ', exitTile.x,exitTile.y)
                console.log('enter: ', enterTile.x, enterTile.y)*/
            });

        this.gridEngine.movementStarted().subscribe(({ direction }) => {
            this.players[0].sprite.anims.play(direction);
        });

        this.gridEngine.movementStopped().subscribe(({ direction }) => {
            this.players[0].sprite.anims.stop();
            // @ts-ignore
            this.players[0].sprite.setFrame(this.getStopFrame(direction));
        });

        this.gridEngine.directionChanged().subscribe(({ direction }) => {
            // @ts-ignore
            this.players[0].sprite.setFrame(this.getStopFrame(direction));
        });


    }
    async preload(){}

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


        if(cursors?.left.isDown){
            this.gridEngine.move("player", Direction.LEFT);
            // this.players[0].startAnimation(Direction.LEFT)
            // this.players[0].movementLeft(-1, this.players[0].offsetY)
            // this.room?.send("move", {
            //     x: -1,
            //     y: 0
            // })
            // console.log(this.players[0].offsetX, this.players[0].offsetY)
        }
        if(cursors?.right.isDown){
            this.gridEngine.move("player", Direction.RIGHT);
            // this.players[0].startAnimation(Direction.RIGHT)
            // this.players[0].movementRight(1, this.players[0].offsetY)
            // this.room?.send("move", {
            //     x: 1,
            //     y: 0
            // })
            // console.log(this.players[0].offsetX, this.players[0].offsetY)
        }
        if(cursors?.up.isDown){
            this.gridEngine.move("player", Direction.UP);
            // this.players[0].startAnimation(Direction.UP)
            // this.players[0].movementUp(this.players[0].offsetX, -1)
            // this.room?.send("move", {
            //     x: 0,
            //     y: -1
            // })
            // console.log(this.players[0].offsetX, this.players[0].offsetY)
        }
        if(cursors?.down.isDown){
            this.gridEngine.move("player", Direction.DOWN);
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

    private animations() {
        this.createPlayerAnimation(Direction.UP, 0, 2);
        this.createPlayerAnimation(Direction.RIGHT, 9, 11);
        this.createPlayerAnimation(Direction.DOWN, 18, 20);
        this.createPlayerAnimation(Direction.LEFT, 27, 29);
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
            frameRate: 10,
            repeat: -1,
            yoyo: true,
        });
    }
}