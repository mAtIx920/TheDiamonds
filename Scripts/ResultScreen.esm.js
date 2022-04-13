import { userData } from "../Data/UserData.esm.js";
import { canvas } from "./Canvas.esm.js";
import Common from "./Common.esm.js";
import { SCREEN_OBJECT } from "./Common.esm.js";
import { levelSelect } from "./LevelSelect.esm.js";
import { mainMenu } from "./MainMenu.esm.js";
import { game } from './Game.esm.js';

const RESULT_SCREEN_WIN_CLASS = 'end-screen--is-win';
const RESULT_END_SCREEN_ID = 'js-end-screen';
const RESULT_SCREEN_HEADER_ID = 'js-game-result';
const RESULT_SCREEN_USER_POINTS_ID = 'js-user-points';
const RESULT_SCREEN_HIGH_SCORES_ID = 'js-high-scores';
const BACK_BUTTON_ID = 'js-back-to-levels';
const RESTART_LEVEL_BUTTON_ID = 'js-restart-level';

class ResultScreen extends Common {
  constructor() {
    super(RESULT_END_SCREEN_ID);
    this.bindToGameElements();
  }

  bindToGameElements = () => {
    this.resultTextElement = this.bindToElement(RESULT_SCREEN_HEADER_ID);
    this.userPointsElement = this.bindToElement(RESULT_SCREEN_USER_POINTS_ID);
    this.highScoresElement = this.bindToElement(RESULT_SCREEN_HIGH_SCORES_ID);

    const backButtonElement = this.bindToElement(BACK_BUTTON_ID);
    const restartButtonElement = this.bindToElement(RESTART_LEVEL_BUTTON_ID);

    backButtonElement.addEventListener('click', () => this.backButtonClick());
    restartButtonElement.addEventListener('click', () => this.restartButtonClick());
  }

  viewResultScreen = (isGameWin, playerPoints, lvl) => {
    if(isGameWin) {
      this.element.classList.add(RESULT_SCREEN_WIN_CLASS);
    } else {
      this.element.classList.remove(RESULT_SCREEN_WIN_CLASS);
    }

    this.changeScreen(this.element, SCREEN_OBJECT.VISIBLE_SCREEN);
    this.resultTextElement.textContent = isGameWin ? 'YOU WON' : 'YOU LOSE';
    this.userPointsElement.textContent = String(playerPoints);
    this.highScoresElement.textContent = String(userData.getBestScore(lvl));
  }

  backButtonClick() {
    this.changeScreen(canvas.element, SCREEN_OBJECT.HIDDEN_SCREEN);
    this.changeScreen(this.element, SCREEN_OBJECT.HIDDEN_SCREEN);
    mainMenu.showLevelScreen()
  }

  restartButtonClick = () => {
    this.changeScreen(this.element, SCREEN_OBJECT.HIDDEN_SCREEN);
    levelSelect.loadLevel(game.gameState.level);
  }
}

export const resultScreen = new ResultScreen();