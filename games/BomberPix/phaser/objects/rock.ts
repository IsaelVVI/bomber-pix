import {BomberPix} from "~/games/BomberPix/phaser/scenes/game";


export class Rock {
    sprite: Phaser.GameObjects.Sprite

    constructor(
        private tempsprite: Phaser.GameObjects.Sprite,
        private tilePos: Phaser.Math.Vector2
    ) {
        const offsetX = BomberPix.TILE_SIZE / 2
        const offsetY = BomberPix.TILE_SIZE
        this.sprite = tempsprite


        this.sprite.setOrigin(0.5, 1);
        this.sprite.setPosition(
            tilePos.x,
            tilePos.y
        );

        this.sprite.setFrame(0)
    }


    stopAnimation() {
        if (this.sprite.anims.currentAnim) {
            const standingFrame = this.sprite.anims.currentAnim.frames[0].frame.name;
            this.sprite.anims.stop();
            this.sprite.setFrame(standingFrame);
        }
    }

    startAnimation(direction: any) {
        this.sprite.anims.play(direction);
    }

}