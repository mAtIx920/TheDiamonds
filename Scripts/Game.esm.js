import { canvas } from "./Canvas.esm.js";
import Common, { SCREEN_OBJECT } from "./Common.esm.js";
import { DATALOADED_EVENT_NAME } from "./Loader.esm.js";
import { media } from "./Media.esm.js";
import { DIAMOND_SIZE, gameLevelsInfo, GAME_BOARD_X_OFFSET, GAME_BOARD_Y_OFFSET, EMPTY_BLOCK_NUMBER } from "../Data/levelsInfo.esm.js";
import { GameState } from "./GameState.esm.js";
import { mouseController } from "./MouseController.esm.js";
import { NUMBER_OF_DIAMONDS_TYPES } from "./Diamond.esm.js";
import { resultScreen } from "./ResultScreen.esm.js";
import { userData } from "../Data/UserData.esm.js";

const SWAPING_SPEED = 8;
export const DIAMONDS_ARRAY_WIDTH = 8;
const DIAMONDS_ARRAY_HEIGHT = DIAMONDS_ARRAY_WIDTH + 1; // +1 is invisible line of diamonds
const LAST_ELEMENT_DIAMONDS_ARRAY = DIAMONDS_ARRAY_WIDTH * DIAMONDS_ARRAY_HEIGHT - 1;
const TRANSPARENCY_SPEED = 30;

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
    media.isInLevel = true;
    media.playBackgroundMusic();
    this.animate();
  }

  animate = () => {
    this.handleMouseState();
    this.handleMouseClick();
    this.findMatches();
    this.moveDiamonds();
    this.hideAnimation();
    this.countScores();
    this.revertSwap();
    this.clearMatches(); 
    canvas.drawGameOnCanvas(this.gameState);
    this.gameState.getGameBoard().forEach(diamond => diamond.draw());
    this.checkPossibilityMovement();
    this.checkEndGameHandler();
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

      this.swapDiamonds();
      media.swapAudio();
      this.gameState.isSwaping = true;
      this.gameState.decreasePointsMovement();
      mouseController.state = 0;
    }

    mouseController.clicked = false;
  }

  //Function checking whether previous diamond and subsequent diamonds have the same kind
  findMatches = () => {
    this.gameState.getGameBoard().forEach((diamond, index, diamondsBoard) => {
      //Checkind diamonds in horizontal axis
      if(diamond.kind === EMPTY_BLOCK_NUMBER || index < DIAMONDS_ARRAY_WIDTH || index === LAST_ELEMENT_DIAMONDS_ARRAY) {
        return;
      }

      if(diamondsBoard[index - 1].kind === diamond.kind && diamondsBoard[index + 1].kind === diamond.kind) {
        console.log('jest')
        if(Math.floor((index - 1) / DIAMONDS_ARRAY_WIDTH) === Math.floor((index + 1) / DIAMONDS_ARRAY_WIDTH)) {
          for(let counter = -1; counter <= 1; counter++) {
            diamondsBoard[index + counter].match++;
            
            // console.log('jest')
          }
        }
      }

      //Checking diamonds in vertical axis
      if(
        index >= DIAMONDS_ARRAY_WIDTH && index < LAST_ELEMENT_DIAMONDS_ARRAY - DIAMONDS_ARRAY_WIDTH + 1 &&
        diamondsBoard[index - DIAMONDS_ARRAY_WIDTH].kind === diamond.kind &&
        diamondsBoard[index + DIAMONDS_ARRAY_WIDTH].kind === diamond.kind
      ) {
        if((index - DIAMONDS_ARRAY_WIDTH) % DIAMONDS_ARRAY_WIDTH === (index + DIAMONDS_ARRAY_WIDTH) % DIAMONDS_ARRAY_WIDTH) {
          for(let counter = -DIAMONDS_ARRAY_WIDTH; counter <= DIAMONDS_ARRAY_WIDTH; counter += DIAMONDS_ARRAY_WIDTH) {
            diamondsBoard[index + counter].match++;
          }
        }
      }
    })
  }

  //Function which creates index of diamond in table
  swapDiamonds = () => {
    const firstDiamond = mouseController.firstClick.y * DIAMONDS_ARRAY_WIDTH + mouseController.firstClick.x;
    const secondDiamond = mouseController.secondClick.y * DIAMONDS_ARRAY_WIDTH + mouseController.secondClick.x;

    this.swap(this.gameState.getGameBoard()[firstDiamond], this.gameState.getGameBoard()[secondDiamond]);
  }

  //Function answering for swaping diamonds
  moveDiamonds() {
    this.gameState.isMoving = false;
    this.gameState.getGameBoard().forEach(diamond => {
      let dx;
      let dy;

      //Checking whether diamond was swaped
      for(let speedSwap = 0; speedSwap < SWAPING_SPEED; speedSwap++) {
        dx = diamond.x - diamond.column * DIAMOND_SIZE;
        dy = diamond.y - diamond.row * DIAMOND_SIZE;
        
        if(dx) {
          diamond.x -= dx/Math.abs(dx);
        }
        
        if(dy) {
          diamond.y -= dy/Math.abs(dy);
        }
      }
      
      if(dx || dy) {
        this.gameState.isMoving = true; 
      }
    })
  }

  hideAnimation = () => {
    if(this.gameState.getIsMoving()) {
      return;
    }

    this.gameState.getGameBoard().forEach(diamond => {
      if(diamond.match && diamond.alpha > TRANSPARENCY_SPEED) {
        diamond.alpha -= TRANSPARENCY_SPEED;
        this.gameState.isMoving = true;
      }
    })
  }

  //Function which counts our points and diamonds matches
  countScores = () => {
    this.scores = 0;
    this.gameState.getGameBoard().forEach(diamond => this.scores += diamond.match);

    if(!this.gameState.getIsMoving() && this.scores) {
      this.gameState.increasePlayerPoints(this.scores);
    }
  }

  //Undo when diamonds are not being matched
  revertSwap = () => {
    if(this.gameState.getIsSwaping() && !this.gameState.getIsMoving()) {
      if(!this.scores) {
        this.swapDiamonds();
        this.gameState.increasePointsMovement();
      }

      this.gameState.isSwaping = false;
    }
  }

  //Clear matching diamonds when diamonds are being matched 
  clearMatches = () => {
    if(this.gameState.getIsMoving()) {
      return;
    }

    //Here we check if one diamonds match to the others
    this.gameState.getGameBoard().forEach((_, index, diamondsBoard) => {
      const diamondsIndex = diamondsBoard.length - 1 - index;
      const column = Math.floor(diamondsIndex / DIAMONDS_ARRAY_WIDTH);
      const row = Math.floor(diamondsIndex % DIAMONDS_ARRAY_WIDTH);

      if(diamondsBoard[diamondsIndex].match) {
        for(let counter = column; counter >= 0; counter--) {
          if(!diamondsBoard[counter * DIAMONDS_ARRAY_WIDTH + row].match) {
            this.swap(diamondsBoard[counter * DIAMONDS_ARRAY_WIDTH + row], diamondsBoard[diamondsIndex]);
            break;
          }
        }
      }
    })

    //Here we add another diamond
    this.gameState.getGameBoard().forEach((diamond, index) => {
      const row = Math.floor(index % DIAMONDS_ARRAY_WIDTH) * DIAMOND_SIZE;

      if(index < DIAMONDS_ARRAY_WIDTH){
        diamond.kind = EMPTY_BLOCK_NUMBER;
        diamond.match = 0;
      } else if(diamond.match || diamond.kind === EMPTY_BLOCK_NUMBER) {
        diamond.kind = Math.floor(Math.random() * NUMBER_OF_DIAMONDS_TYPES);
        diamond.y = 0;
        diamond.x = row;
        diamond.match = 0;
        diamond.alpha = 255;
      }
    })
  }

  checkPossibilityMovement = () => {
    if(this.gameState.getIsMoving()) {
      return false;
    }

    this.isPossibleToMove = this.gameState.getGameBoard().some((diamond, index, diamondsBoard) => {
      if(diamond.kind === EMPTY_BLOCK_NUMBER) {
        return false;
      }

      //move right diamonds => check in row
      if(
        index % DIAMONDS_ARRAY_WIDTH < DIAMONDS_ARRAY_WIDTH - 3 &&
        diamond.kind === diamondsBoard[index + 2].kind &&
        diamond.kind === diamondsBoard[index + 3].kind
      ) {
        return true;
      }

      //move right diamonds => check if diamond is in the middle of column
      if(
        index % DIAMONDS_ARRAY_WIDTH < DIAMONDS_ARRAY_WIDTH - 1 &&
        Math.floor(index / DIAMONDS_ARRAY_WIDTH) > 1 &&
        Math.floor(index / DIAMONDS_ARRAY_WIDTH) < DIAMONDS_ARRAY_HEIGHT - 1 &&
        diamond.kind === diamondsBoard[index - DIAMONDS_ARRAY_WIDTH + 1].kind &&
        diamond.kind === diamondsBoard[index + DIAMONDS_ARRAY_WIDTH + 1].kind
      ) {
        return true;
      }

      //move right diamonds => check if diamond is on the top of the column
      if(
        index % DIAMONDS_ARRAY_WIDTH < DIAMONDS_ARRAY_WIDTH - 1 &&
        Math.floor(index / DIAMONDS_ARRAY_WIDTH) < DIAMONDS_ARRAY_HEIGHT - 2 &&
        diamond.kind === diamondsBoard[index + DIAMONDS_ARRAY_WIDTH + 1].kind &&
        diamond.kind === diamondsBoard[index + DIAMONDS_ARRAY_WIDTH * 2 + 1].kind
      ) {
        return true;
      }

      //move right diamonds => check if diamond is in the bottom of the column
      if(
        index % DIAMONDS_ARRAY_WIDTH < DIAMONDS_ARRAY_WIDTH - 1 &&
        Math.floor(index / DIAMONDS_ARRAY_WIDTH) > 2 &&
        diamond.kind === diamondsBoard[index - DIAMONDS_ARRAY_WIDTH + 1].kind &&
        diamond.kind === diamondsBoard[index - DIAMONDS_ARRAY_WIDTH * 2 + 1].kind
      ) {
        return true;
      }

      //move left diamonds => check in row
      if(
        index % DIAMONDS_ARRAY_WIDTH > 2 &&
        diamond.kind === diamondsBoard[index - 2].kind &&
        diamond.kind === diamondsBoard[index - 3].kind
      ) {
        return true;
      }

      //move left diamonds => check if diamond is in the middle of column
      if(
        index % DIAMONDS_ARRAY_WIDTH &&
        Math.floor(index / DIAMONDS_ARRAY_WIDTH) > 1 &&
        Math.floor(index / DIAMONDS_ARRAY_WIDTH) < DIAMONDS_ARRAY_HEIGHT - 1 &&
        diamond.kind === diamondsBoard[index - DIAMONDS_ARRAY_WIDTH - 1].kind &&
        diamond.kind === diamondsBoard[index + DIAMONDS_ARRAY_WIDTH - 1].kind
      ) {
        return true;
      }

      //move left diamonds => check if diamond is on the top of column
      if(
        index % DIAMONDS_ARRAY_WIDTH &&
        Math.floor(index / DIAMONDS_ARRAY_WIDTH) < DIAMONDS_ARRAY_HEIGHT - 2 &&
        diamond.kind === diamondsBoard[index + DIAMONDS_ARRAY_WIDTH - 1].kind &&
        diamond.kind === diamondsBoard[index + DIAMONDS_ARRAY_WIDTH * 2 - 1].kind
      ) {
        return true;
      }

      //move left diamonds => check if diamond is on the bottom of column
      if(
        index % DIAMONDS_ARRAY_WIDTH &&
        Math.floor(index / DIAMONDS_ARRAY_WIDTH) > 2 &&
        diamond.kind === diamondsBoard[index - DIAMONDS_ARRAY_WIDTH - 1].kind &&
        diamond.kind === diamondsBoard[index - DIAMONDS_ARRAY_WIDTH * 2 - 1].kind
      ) {
        return true;
      }

      //move down diamonds => check if diamond is in column
      if(
        Math.floor(index / DIAMONDS_ARRAY_WIDTH) < DIAMONDS_ARRAY_HEIGHT - 3 &&
        diamond.kind === diamondsBoard[index + DIAMONDS_ARRAY_WIDTH * 2].kind &&
        diamond.kind === diamondsBoard[index + DIAMONDS_ARRAY_WIDTH * 3].kind
      ) {
        return true;
      }

      //move down diamonds => check if diamond is in the middle of row
      if(
        index % DIAMONDS_ARRAY_WIDTH &&
        index % DIAMONDS_ARRAY_WIDTH < DIAMONDS_ARRAY_WIDTH - 1 &&
        Math.floor(index / DIAMONDS_ARRAY_WIDTH) < DIAMONDS_ARRAY_HEIGHT - 1 &&
        diamond.kind === diamondsBoard[index + DIAMONDS_ARRAY_WIDTH - 1].kind &&
        diamond.kind === diamondsBoard[index + DIAMONDS_ARRAY_WIDTH + 1].kind
      ) {
        return true;
      }

      //move down diamonds =>check if diamond is on the left edge of row
      if(
        index % DIAMONDS_ARRAY_WIDTH < DIAMONDS_ARRAY_WIDTH - 2 &&
        Math.floor(index / DIAMONDS_ARRAY_WIDTH) < DIAMONDS_ARRAY_HEIGHT - 1 &&
        diamond.kind === diamondsBoard[index + DIAMONDS_ARRAY_WIDTH + 1].kind &&
        diamond.kind === diamondsBoard[index + DIAMONDS_ARRAY_WIDTH + 2].kind
      ) {
        return true;
      }

      //move down diamonds => check if diamond is on the right edge of row
      if(
        index % DIAMONDS_ARRAY_WIDTH > 1 &&
        Math.floor(index / DIAMONDS_ARRAY_WIDTH) < DIAMONDS_ARRAY_HEIGHT - 1 &&
        diamond.kind === diamondsBoard[index + DIAMONDS_ARRAY_WIDTH - 1].kind &&
        diamond.kind === diamondsBoard[index + DIAMONDS_ARRAY_WIDTH - 2].kind
      ) {
        return true;
      }

      //move up diamonds => check in column
      if(
        Math.floor(index / DIAMONDS_ARRAY_WIDTH) > 3 &&
        diamond.kind === diamondsBoard[index - DIAMONDS_ARRAY_WIDTH * 2].kind &&
        diamond.kind === diamondsBoard[index - DIAMONDS_ARRAY_WIDTH * 3].kind
      ) {
        return true;
      }

      //move up diamond => check if diamond is in the middle of row
      if(
        Math.floor(index / DIAMONDS_ARRAY_WIDTH) > 1 &&
        index % DIAMONDS_ARRAY_WIDTH &&
        index % DIAMONDS_ARRAY_WIDTH < DIAMONDS_ARRAY_WIDTH - 1 &&
        diamond.kind === diamondsBoard[index - DIAMONDS_ARRAY_WIDTH - 1].kind &&
        diamond.kind === diamondsBoard[index - DIAMONDS_ARRAY_WIDTH + 1].kind
      ) {
        return true;
      }

      //move up diamonds => check if diamond is on the left edge of row
      if(
        Math.floor(index / DIAMONDS_ARRAY_WIDTH) > 1 &&
        index % DIAMONDS_ARRAY_WIDTH < DIAMONDS_ARRAY_WIDTH - 2 &&
        diamond.kind === diamondsBoard[index - DIAMONDS_ARRAY_WIDTH + 1].kind &&
        diamond.kind === diamondsBoard[index - DIAMONDS_ARRAY_WIDTH + 2].kind
      ) {
        return true;
      }

      //move up diamonds => check if diamond is on the right edge of row
      if(
        Math.floor(index / DIAMONDS_ARRAY_WIDTH) > 1 &&
        index % DIAMONDS_ARRAY_WIDTH > 1 &&
        diamond.kind === diamondsBoard[index - DIAMONDS_ARRAY_WIDTH - 1].kind &&
        diamond.kind === diamondsBoard[index - DIAMONDS_ARRAY_WIDTH - 2].kind
      ) {
        return true;
      }
         
      return false;
    });

    if(!this.isPossibleToMove) {
      this.gameState.mixDiamonds()
    }
  }

  checkEndGameHandler = () => {
    if(
      !this.gameState.getLeftMovement() && 
      !this.gameState.getIsMoving() && 
      !this.gameState.getIsSwaping()
    ) {
      media.isInLevel =  false;
      media.stopBackgroundMusic();
      const isPlayerWin = this.gameState.isPlayerWon();
      const currentLevel = Number(this.gameState.level);

      if(isPlayerWin && gameLevelsInfo[currentLevel]) {
        console.log('tu')
        if(!userData.checkAvaiabilityLevel(currentLevel + 1)) {
          userData.addNewLevel(currentLevel + 1);
        }
      }

      if(userData.getBestScore(currentLevel) < this.gameState.getPlayerPoints()) {
        userData.setBestScore(currentLevel, this.gameState.getPlayerPoints());
      }

      resultScreen.viewResultScreen(isPlayerWin, this.gameState.getPlayerPoints(), currentLevel)
    } else {
      this.animationFrame = window.requestAnimationFrame(() => this.animate())
    }
  }

  //Function changing props of diamonds
  swap(firstDiamond, secondDiamond) {
    [
      firstDiamond.kind,
      firstDiamond.alpha,
      firstDiamond.match,
      firstDiamond.x,
      firstDiamond.y,
      secondDiamond.kind,
      secondDiamond.alpha,
      secondDiamond.match,
      secondDiamond.x,
      secondDiamond.y,
    ] = [
      secondDiamond.kind,
      secondDiamond.alpha,
      secondDiamond.match,
      secondDiamond.x,
      secondDiamond.y,
      firstDiamond.kind,
      firstDiamond.alpha,
      firstDiamond.match,
      firstDiamond.x,
      firstDiamond.y,
    ];

    this.gameState.isMoving = true;
  }
}

export const game = new Game();