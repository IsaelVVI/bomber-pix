<template>
</template>

<script setup lang="ts">

import * as phaser from "phaser";
import {BomberPix} from "~/games/BomberPix/phaser/scenes/game";
import {BomberPixInitial} from "~/games/BomberPix/phaser/scenes/initial";
import type {RoomAvailable} from "colyseus.js";
import {Room} from "colyseus.js";
import {GridEngine} from "grid-engine";


const game = new phaser.Game({
  title: "Sample",
  render: {
    antialias: false,
  },
  physics: {
    default: 'arcade',
    arcade: {
      debug: true
    }
  },
  pixelArt: true,
  width: 240,
  height: 240,
  type: Phaser.AUTO,
  plugins: {
    scene: [
      {
        key: "gridEngine",
        plugin: GridEngine,
        mapping: "gridEngine"
      }
    ]
  },
  scale: {
    mode: phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  parent: "bomber-pix",
  scene: [
    BomberPixInitial,
    BomberPix
  ],
})


</script>