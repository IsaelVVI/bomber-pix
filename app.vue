<template>
  <div id="game_bomb" class="h-[100vh] w-screen bg-zinc-900">
  </div>
</template>


<script setup lang="ts">
import * as PIXI from 'pixi.js';

let app: PIXI.Application<HTMLCanvasElement>
const character = ref<PIXI.Sprite>(new PIXI.Sprite)


const keys_movement = ref({
  ArrowRight: false,
  ArrowLeft: false,
  ArrowUp: false,
  ArrowDown: false
})


const loaderAssets = async () => {
  const texture = await PIXI.Assets.load('https://png.pngtree.com/png-clipart/20230407/original/pngtree-cute-school-anime-chibi-character-png-image_9035249.png');
  character.value = new PIXI.Sprite(texture);
  character.value.x = app.screen.width / 2;
  character.value.y = app.screen.height / 2;
  character.value.height = 128
  character.value.width = 128

  app.stage.addChild(character.value);
  app.ticker.add(movementPlayer)
}


const loaderGame = async () => {
  // Add the view to the DOM
  const element: HTMLElement = document.querySelector("#game_bomb") as HTMLElement
  element.appendChild(app.view)
}

const movementPlayerListener = () => {
  window.addEventListener('keydown', keysDown);
  window.addEventListener('keyup', keysUp);
}


const keysDown = (e: KeyboardEvent) => {
  if(e.code === "ArrowRight") keys_movement.value.ArrowRight = true
  if(e.code === "ArrowLeft") keys_movement.value.ArrowLeft = true
  if(e.code === "ArrowUp") keys_movement.value.ArrowUp = true
  if(e.code === "ArrowDown") keys_movement.value.ArrowDown = true
}

const keysUp = (e: KeyboardEvent) => {
  if(e.code === "ArrowRight") keys_movement.value.ArrowRight = false
  if(e.code === "ArrowLeft") keys_movement.value.ArrowLeft = false
  if(e.code === "ArrowUp") keys_movement.value.ArrowUp = false
  if(e.code === "ArrowDown") keys_movement.value.ArrowDown = false
  console.log('keyup => ',e.code)
}

const movementPlayer = () => {
  if(keys_movement.value.ArrowRight) character.value.x += 3
  else if(keys_movement.value.ArrowLeft) character.value.x -= 3
  if(keys_movement.value.ArrowUp) character.value.y -= 3
  else if(keys_movement.value.ArrowDown) character.value.y += 3
}



onMounted(async () => {
  // Create the application
  app = new PIXI.Application<HTMLCanvasElement>({
    // resizeTo: document.getElementById('game_bomb') as HTMLElement,
    height: 360,
    width: 640
  })
  await loaderGame()
  await loaderAssets()
  movementPlayerListener()
})
</script>