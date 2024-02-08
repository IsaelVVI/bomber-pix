import * as Colyseus from "colyseus.js"

//Socket Client
const colyseus = new Colyseus.Client('ws://localhost:3030');

export default defineNuxtPlugin(() => {
  return {
    provide: {
        colyseus: colyseus
    }
  }
})
// console.log('')