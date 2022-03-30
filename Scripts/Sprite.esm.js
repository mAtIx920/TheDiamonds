import { canvas } from "./Canvas.esm.js";

 export class Sprite {
  constructor(x, y, width, height, spriteImage, numberOfSprites = 1, offset = {x: 0, y: 0}) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.spriteImage = spriteImage;
    this.numberOfSprites = numberOfSprites;
    this.offset = {...offset};
    this.alpha = 255;
  }

  draw = (numberOfSprite = 0, ratio = 1) => {
    if(numberOfSprite > this.numberOfSprites) {
      return;
    }

    if(this.alpha !== 255) {
      canvas.context.globalAlpha = this.alpha / 255;
    }

    canvas.context.drawImage(
      this.spriteImage,
      numberOfSprite * this.width,
      0,
      this.width,
      this.height,
      this.x + this.offset.x,
      this.y + this.offset.y,
      this.width * ratio,
      this.height * ratio,
    )

    if(this.alpha !== 255) {
      canvas.context.globalAlpha = 1;
    }
  }
}