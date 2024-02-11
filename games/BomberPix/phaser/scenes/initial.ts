import {Server} from "~/services/colyseus/colyseus";
import {tempMap} from "~/games/BomberPix/phaser/maps/initial";

export class BomberPixInitial extends Phaser.Scene {


    private server!: Server

    constructor() {
        super({
            key: 'BomberPixInitial'
        });
    }

    async init(){
        this.server = new Server()
    }

    preload(){
        this.load.on('complete', async () => {
            await this.server.getAllRooms()
            if(this.server.all_rooms && !this.server.all_rooms.length) console.log('sem rooms')
            this.scene.start('BomberPix', {
                server: this.server
            })
        })


        this.load.spritesheet('grass', './assets/terrain/grass.png', {
            frameHeight: 16,
            frameWidth: 16,
            startFrame: 0
        })

        this.load.spritesheet('black', './assets/terrain/black.png', {
            frameHeight: 16,
            frameWidth: 16,
            startFrame: 0
        })
        this.load.spritesheet('block', './assets/terrain/block.png', {
            frameHeight: 16,
            frameWidth: 16,
            startFrame: 0
        })
        /*this.load.spritesheet('rock', './assets/terrain/rock.png', {
            frameHeight: 16,
            frameWidth: 16,
            startFrame: 0
        })*/
        this.load.spritesheet('rock', './assets/terrain/rock.png', {
            frameHeight: 16,
            frameWidth: 16,
            startFrame: 0
        })
        this.load.spritesheet('rock_destroy', './assets/terrain/rock_destroy.png', {
            frameHeight: 16,
            frameWidth: 16,
            endFrame: 5,
        })
        this.load.spritesheet('bomb', './assets/terrain/bomb2.png', {
            frameHeight: 16,
            frameWidth: 16,
            spacing: 1,
        })
        this.load.spritesheet('explosion', './assets/terrain/explosion2.png', {
            frameHeight: 16,
            frameWidth: 16,
            startFrame: 0,
            endFrame: 24
        })
        this.load.spritesheet('bomber', './assets/characters/bomberman.png', {
            frameHeight: 32,
            frameWidth: 32
        })
        this.load.tilemapTiledJSON("map", tempMap)

    }

    create(){}

    update(time: number, delta: number) {
        super.update(time, delta);
    }
}