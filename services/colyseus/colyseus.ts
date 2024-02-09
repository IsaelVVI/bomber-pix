import {Client, Room, type RoomAvailable} from 'colyseus.js'


export class Server {
    private client: Client

    all_rooms!: RoomAvailable[]

    constructor() {
        this.client = new Client('ws://localhost:3030')
    }


    async join(roomId?: string): Promise<Room>{
        return roomId ? await this.client.joinById(roomId) : await this.client.create("my_room")
    }


    async getAllRooms(){
        this.all_rooms = await this.client.getAvailableRooms()
    }
}