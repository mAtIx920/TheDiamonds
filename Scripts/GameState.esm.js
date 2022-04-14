import { Diamond } from "./Diamond.esm.js";
import { DIAMONDS_ARRAY_WIDTH } from "./Game.esm.js";

export class GameState {
  constructor(level, leftMovement, pointsToWin, diamonds, diamondsSpriteImage) {
    let _leftMovement = leftMovement;
    let _playerScores = 0;
    let _gameBoard = diamonds.map(({x, y, row, column, kind}) => new Diamond(x, y, row, column, kind, diamondsSpriteImage))
    this._pointsToWin = pointsToWin;
    this._level = level;
    this.isSwaping = false;
    this.isMoving = false;

    //Function which deals with our gameplay, get and set our stats and other
    this.getLeftMovement = () => _leftMovement;
    this.decreasePointsMovement = () => _leftMovement--;
    this.increasePointsMovement = () => _leftMovement++;
    this.getPlayerPoints = () => _playerScores;
    this.increasePlayerPoints = points => _playerScores += points;
    this.clearPLayerPoints = () => _playerScores = 0
    this.isPlayerWon = () => _playerScores >= this._pointsToWin;
    this.getGameBoard = () => _gameBoard;
    this.getIsSwaping = () => this.isSwaping;
    this.getIsMoving = () => this.isMoving;
  }

  get pointsToWin() {
    return this._pointsToWin;
  }

  get level() {
    return this._level;
  }

  mixDiamonds() {
    const mixedDiamonds = _gameBoard.splice(0, DIAMONDS_ARRAY_WIDTH);
    let index = DIAMONDS_ARRAY_WIDTH;

    while(_gameBoard.length) {
      const randomNumber = Math.floor(Math.random() * _gameBoard.length);
      const nextElementToMix = _gameBoard.splice(randomNumber, 1)[0];
      const element = {
        ...nextElementToMix,
        row: index % DIAMONDS_ARRAY_WIDTH,
        column: Math.floor(index / DIAMONDS_ARRAY_WIDTH),
      }

      index++;
      mixedDiamonds.push(element);
    }

    _gameBoard.push(...mixedDiamonds)
  }
}