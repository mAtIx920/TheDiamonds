import { canvas } from "./Canvas.esm.js";
import Common, { SCREEN_OBJECT } from "./Common.esm.js";
import { DATALOADED_EVENT_NAME } from "./Loader.esm.js";
import { media } from "./Media.esm.js";
import { DIAMOND_SIZE, gameLevelsInfo, GAME_BOARD_X_OFFSET, GAME_BOARD_Y_OFFSET } from "../Data/levelsInfo.esm.js";
import { GameState } from "./GameState.esm.js";
import { mouseController } from "./MouseController.esm.js";

const DIAMONDS_ARRAY_WIDTH = 8;
const DIAMONDS_ARRAY_HEIGHT = DIAMONDS_ARRAY_WIDTH + 1; //+1 is invisible line of diamonds

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
    this.handleMouseState();
    this.handleMouseClick();
    canvas.drawGameOnCanvas(this.gameState);
    this.gameState.getGameBoard().forEach(diamond => diamond.draw())
    this.animationFrame = window.requestAnimationFrame(() => this.animate())
  }

  //Function which checks whether diamond was clicked
  handleMouseState = () => {
    if(mouseController.clicked && !this.gameState.isSwaping && !this.gameState.isMoving) {
      mouseController.state++;
    }
  }

  handleMouseClick = () => {
    if(!mouseController.clicked) {
      return;
    }

    //Here are number of diamond on which we clicked
    const xClicked = Math.floor((mouseController.x - GAME_BOARD_X_OFFSET) / DIAMOND_SIZE);
    const yClicked = Math.floor((mouseController.y - GAME_BOARD_Y_OFFSET) / DIAMOND_SIZE);

    //Condition which proceeds when we click apart from table with diamonds
    if(!yClicked || xClicked >= DIAMONDS_ARRAY_WIDTH || yClicked >= DIAMONDS_ARRAY_HEIGHT) {
      mouseController.state = 0;
      return;
    }

    //Checking whether we have clicked on one or two diamonds
    if(mouseController.state === 1) {
      mouseController.firstClick = {
        x: xClicked,
        y: yClicked,
      }
    } else if(mouseController.state === 2) {
      mouseController.secondClick = {
        x: xClicked,
        y: yClicked,
      }

      mouseController.state = 0;

      //Condition allows to change only one diamond is being next to other diamond 
      if(
        Math.abs(mouseController.firstClick.x - mouseController.secondClick.x) +
        Math.abs(mouseController.firstClick.y - mouseController.secondClick.y) !==
        1
      ) {
        return;
      }

      // this.swapDiamonds();
      this.gameState.isSwaping = true;
      this.gameState.decreasePointsMovement();
      mouseController.state = 0;
    }

    mouseController.clicked = false;
  }
}

export const game = new Game();