import { canvas } from "./Canvas.esm.js";
import Common, { SCREEN_OBJECT } from "./Common.esm.js";
import { Diamond } from "./Diamond.esm.js";
import { gameLevelsInfo } from './Data/levelsInfo.esm.js';
import { DATALOADED_EVENT_NAME } from "./Loader.esm.js";
import { media } from "./Media.esm.js";

export const GAME_BOARD_X_OFFSET = 40;
export const GAME_BOARD_Y_OFFSET = -5;

const gameState = {
  pointsToWin: 7000,
  getPlayerPoints: () => 1000,
  getLeftMovement: () => 30,
}

class Game extends Common {
  constructor() {
    super()
  }

  //Function which launch our aplication
  playLevel = lvl => {
    this.changeScreen(canvas.element, SCREEN_OBJECT.VISIBLE_SCREEN)
    window.removeEventListener(DATALOADED_EVENT_NAME, this.playLevel)
    this.diamond = new Diamond(50, 50, 1, 1, 2, media.diamondsSprite)
    const lvlInfo = gameLevelsInfo[lvl - 1];
    this.animate();
  }

  animate = () => {
    canvas.drawGameOnCanvas(gameState);
    this.diamond.draw();
    this.animationFrame = window.requestAnimationFrame(() => this.animate())
  }
}

export const game = new Game();