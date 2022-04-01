import { canvas } from "./Canvas.esm.js";
import Common, { SCREEN_OBJECT } from "./Common.esm.js";
import { DATALOADED_EVENT_NAME } from "./Loader.esm.js";
import { media } from "./Media.esm.js";
import { gameLevelsInfo } from "../Data/levelsInfo.esm.js";
import { GameState } from "./GameState.esm.js";

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
    const {leftMovements, pointsToWin, board} = gameLevelsInfo[lvl - 1];
    this.gameState = new GameState(lvl, leftMovements, pointsToWin, board, media.diamondsSprite)
    this.changeScreen(canvas.element, SCREEN_OBJECT.VISIBLE_SCREEN)
    window.removeEventListener(DATALOADED_EVENT_NAME, this.playLevel)
    this.animate();
  }

  animate = () => {
    canvas.drawGameOnCanvas(gameState);
    this.gameState.getGameBoard().forEach(diamond => diamond.draw())
    this.animationFrame = window.requestAnimationFrame(() => this.animate())
  }
}

export const game = new Game();