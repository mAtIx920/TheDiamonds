import Common from "./Common.esm.js";
import { gameLevelsInfo } from './levelsInfo.esm.js';
import { DATALOADED_EVENT_NAME } from "./Loader.esm.js";


class Game extends Common {
  constructor() {
    super()
  }

  //Function which launch our aplication
  playLevel = lvl => {
    document.removeEventListener(DATALOADED_EVENT_NAME, this, this.playLevel)
    const lvlInfo = gameLevelsInfo[lvl - 1];
    this.animate();
  }

  animate = () => {
    console.log('Jazda z grą')
    this.animationFrame = window.requestAnimationFrame(() => this.animate())
  }
}

export const game = new Game();