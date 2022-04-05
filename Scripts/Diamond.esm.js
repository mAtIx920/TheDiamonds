import { GAME_BOARD_X_OFFSET, GAME_BOARD_Y_OFFSET } from "../Data/levelsInfo.esm.js";
import { DIAMOND_SIZE } from "../Data/levelsInfo.esm.js";
import { Sprite } from "./Sprite.esm.js";

const DIAMOND_ORIGINAL_SIZE = 32;
export const NUMBER_OF_DIAMONDS_TYPES = 6;

const DIAMOND_ZOOM = DIAMOND_SIZE / DIAMOND_ORIGINAL_SIZE;

export class Diamond extends Sprite {
  constructor(x, y, row, column, kind, spriteImage) {
    const offset = {
      x: GAME_BOARD_X_OFFSET,
      y: GAME_BOARD_Y_OFFSET
    }
    super(x, y, DIAMOND_ORIGINAL_SIZE, DIAMOND_ORIGINAL_SIZE, spriteImage, NUMBER_OF_DIAMONDS_TYPES, offset);
    this.row = row;
    this.column = column;
    this.kind = kind;
    this.match = 0;
  }

  draw = () => {
    super.draw(this.kind, DIAMOND_ZOOM);
  }
}