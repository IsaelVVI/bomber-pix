import {defineStore} from "pinia";

import Peer from 'peerjs';


interface peerStoreInterface {
    peer: Peer
}
export const usePeerStore = defineStore('peer', {
    /*state: (): peerStoreInterface => ({
        peer: new Peer({
            host: "localhost",
            port: 3003,
            path: 'peer-server'
        })
    }),

    actions: {
        initializePeer() {
            this.peer = new Peer({
                host: "localhost",
                port: 3003,
                path: 'peer-server'
            })
        }
    }*/
})