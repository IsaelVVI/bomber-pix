import {Room, type RoomAvailable} from "colyseus.js";


const colyseus = useNuxtApp().$colyseus


interface roomsInterface {
    all_rooms: RoomAvailable[]
    room: Room | null
}


export const useColyseus = defineStore('colyseus', {
    state: (): roomsInterface => ({
        all_rooms: [] as RoomAvailable[],
        room: null
    }),
    actions: {
        async checkRooms () {
            this.all_rooms = await colyseus.getAvailableRooms()
        },

        async conectRoom(roomID?: string) {
            this.room = roomID ? await colyseus.joinById(roomID) : await colyseus.create("my_room");
        }

    }
})