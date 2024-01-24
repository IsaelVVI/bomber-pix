<template>
  <div id="game_bomb" class="h-[100vh] w-screen bg-zinc-900">
  </div>
</template>


<script setup lang="ts">
import * as PIXI from 'pixi.js';
import { useWindowSize } from '@vueuse/core'

let app: PIXI.Application<HTMLCanvasElement>

const loaderAssets = async () => {
  const texture = await PIXI.Assets.load('https://png.pngtree.com/png-clipart/20230407/original/pngtree-cute-school-anime-chibi-character-png-image_9035249.png');
  const character = new PIXI.Sprite(texture);
  character.x = app.screen.width / 2;
  character.y = app.screen.height / 2;
  character.height = 128
  character.width = 128

// Rotate around the center
  character.anchor.x = 0.5;
  character.anchor.y = 0.5;

  app.stage.addChild(character);
}


const loaderGame = async () => {
  // Add the view to the DOM
  const element: HTMLElement = document.querySelector("#game_bomb") as HTMLElement
  element.appendChild(app.view)
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
})
</script>