import { Diamond } from "./Diamond.esm.js";

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
    this.isPlayerWon = () => _playerScores >= this._pointsToWin;
    this.getGameBoard = () => _gameBoard;
  }

  get pointsToWin() {
    return this._pointsToWin;
  }

  get level() {
    return this._level;
  }
}