import { canvas } from "./Canvas.esm.js";
import Common, { SCREEN_OBJECT } from "./Common.esm.js";
import { gameLevelsInfo } from './levelsInfo.esm.js';
import { DATALOADED_EVENT_NAME } from "./Loader.esm.js";

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
    window.removeEventListener(DATALOADED_EVENT_NAME, this, this.playLevel)
    const lvlInfo = gameLevelsInfo[lvl - 1];
    this.animate();
  }

  animate = () => {
    canvas.drawGameOnCanvas(gameState);
    this.animationFrame = window.requestAnimationFrame(() => this.animate())
  }
}

export const game = new Game();