export const DIAMOND_SIZE = 48;
export const GAME_BOARD_X_OFFSET = 40;
export const GAME_BOARD_Y_OFFSET = 20;
export const EMPTY_BLOCK_NUMBER = 99;

export const gameLevelsInfo = [
  {
    level: 1,
    leftMovements: 30,	
    pointsToWin: 7000,
    board: [
      {x: 0 * DIAMOND_SIZE, y: -1 * DIAMOND_SIZE + GAME_BOARD_Y_OFFSET, row: 0, column: 0, kind: EMPTY_BLOCK_NUMBER,},
			{x: 1 * DIAMOND_SIZE, y: -1 * DIAMOND_SIZE + GAME_BOARD_Y_OFFSET, row: 0, column: 1, kind: EMPTY_BLOCK_NUMBER,},
			{x: 2 * DIAMOND_SIZE, y: -1 * DIAMOND_SIZE + GAME_BOARD_Y_OFFSET, row: 0, column: 2, kind: EMPTY_BLOCK_NUMBER,},
			{x: 3 * DIAMOND_SIZE, y: -1 * DIAMOND_SIZE + GAME_BOARD_Y_OFFSET, row: 0, column: 3, kind: EMPTY_BLOCK_NUMBER,},
			{x: 4 * DIAMOND_SIZE, y: -1 * DIAMOND_SIZE + GAME_BOARD_Y_OFFSET, row: 0, column: 4, kind: EMPTY_BLOCK_NUMBER,},
			{x: 5 * DIAMOND_SIZE, y: -1 * DIAMOND_SIZE + GAME_BOARD_Y_OFFSET, row: 0, column: 5, kind: EMPTY_BLOCK_NUMBER,},
			{x: 6 * DIAMOND_SIZE, y: -1 * DIAMOND_SIZE + GAME_BOARD_Y_OFFSET, row: 0, column: 6, kind: EMPTY_BLOCK_NUMBER,},
			{x: 7 * DIAMOND_SIZE, y: -1 * DIAMOND_SIZE + GAME_BOARD_Y_OFFSET, row: 0, column: 7, kind: EMPTY_BLOCK_NUMBER,},

			{x: 0 * DIAMOND_SIZE, y: 0 * DIAMOND_SIZE + GAME_BOARD_Y_OFFSET, row: 1, column: 0, kind: 1,},
			{x: 1 * DIAMOND_SIZE, y: 0 * DIAMOND_SIZE + GAME_BOARD_Y_OFFSET, row: 1, column: 1, kind: 1,},
			{x: 2 * DIAMOND_SIZE, y: 0 * DIAMOND_SIZE + GAME_BOARD_Y_OFFSET, row: 1, column: 2, kind: 0,},
			{x: 3 * DIAMOND_SIZE, y: 0 * DIAMOND_SIZE + GAME_BOARD_Y_OFFSET, row: 1, column: 3, kind: 3,},
			{x: 4 * DIAMOND_SIZE, y: 0 * DIAMOND_SIZE + GAME_BOARD_Y_OFFSET, row: 1, column: 4, kind: 4,},
			{x: 5 * DIAMOND_SIZE, y: 0 * DIAMOND_SIZE + GAME_BOARD_Y_OFFSET, row: 1, column: 5, kind: 5,},
			{x: 6 * DIAMOND_SIZE, y: 0 * DIAMOND_SIZE + GAME_BOARD_Y_OFFSET, row: 1, column: 6, kind: 5,},
			{x: 7 * DIAMOND_SIZE, y: 0 * DIAMOND_SIZE + GAME_BOARD_Y_OFFSET, row: 1, column: 7, kind: 3,},

			{x: 0 * DIAMOND_SIZE, y: 1 * DIAMOND_SIZE + GAME_BOARD_Y_OFFSET, row: 2, column: 0, kind: 0,},
			{x: 1 * DIAMOND_SIZE, y: 1 * DIAMOND_SIZE + GAME_BOARD_Y_OFFSET, row: 2, column: 1, kind: 0,},
			{x: 2 * DIAMOND_SIZE, y: 1 * DIAMOND_SIZE + GAME_BOARD_Y_OFFSET, row: 2, column: 2, kind: 1,},
			{x: 3 * DIAMOND_SIZE, y: 1 * DIAMOND_SIZE + GAME_BOARD_Y_OFFSET, row: 2, column: 3, kind: 0,},
			{x: 4 * DIAMOND_SIZE, y: 1 * DIAMOND_SIZE + GAME_BOARD_Y_OFFSET, row: 2, column: 4, kind: 0,},
			{x: 5 * DIAMOND_SIZE, y: 1 * DIAMOND_SIZE + GAME_BOARD_Y_OFFSET, row: 2, column: 5, kind: 1,},
			{x: 6 * DIAMOND_SIZE, y: 1 * DIAMOND_SIZE + GAME_BOARD_Y_OFFSET, row: 2, column: 6, kind: 1,},
			{x: 7 * DIAMOND_SIZE, y: 1 * DIAMOND_SIZE + GAME_BOARD_Y_OFFSET, row: 2, column: 7, kind: 2,},

			{x: 0 * DIAMOND_SIZE, y: 2 * DIAMOND_SIZE + GAME_BOARD_Y_OFFSET, row: 3, column: 0, kind: 0,},
			{x: 1 * DIAMOND_SIZE, y: 2 * DIAMOND_SIZE + GAME_BOARD_Y_OFFSET, row: 3, column: 1, kind: 4,},
			{x: 2 * DIAMOND_SIZE, y: 2 * DIAMOND_SIZE + GAME_BOARD_Y_OFFSET, row: 3, column: 2, kind: 4,},
			{x: 3 * DIAMOND_SIZE, y: 2 * DIAMOND_SIZE + GAME_BOARD_Y_OFFSET, row: 3, column: 3, kind: 5,},
			{x: 4 * DIAMOND_SIZE, y: 2 * DIAMOND_SIZE + GAME_BOARD_Y_OFFSET, row: 3, column: 4, kind: 5,},
			{x: 5 * DIAMOND_SIZE, y: 2 * DIAMOND_SIZE + GAME_BOARD_Y_OFFSET, row: 3, column: 5, kind: 2,},
			{x: 6 * DIAMOND_SIZE, y: 2 * DIAMOND_SIZE + GAME_BOARD_Y_OFFSET, row: 3, column: 6, kind: 2,},
			{x: 7 * DIAMOND_SIZE, y: 2 * DIAMOND_SIZE + GAME_BOARD_Y_OFFSET, row: 3, column: 7, kind: 5,},

			{x: 0 * DIAMOND_SIZE, y: 3 * DIAMOND_SIZE + GAME_BOARD_Y_OFFSET, row: 4, column: 0, kind: 4,},
			{x: 1 * DIAMOND_SIZE, y: 3 * DIAMOND_SIZE + GAME_BOARD_Y_OFFSET, row: 4, column: 1, kind: 3,},
			{x: 2 * DIAMOND_SIZE, y: 3 * DIAMOND_SIZE + GAME_BOARD_Y_OFFSET, row: 4, column: 2, kind: 3,},
			{x: 3 * DIAMOND_SIZE, y: 3 * DIAMOND_SIZE + GAME_BOARD_Y_OFFSET, row: 4, column: 3, kind: 2,},
			{x: 4 * DIAMOND_SIZE, y: 3 * DIAMOND_SIZE + GAME_BOARD_Y_OFFSET, row: 4, column: 4, kind: 2,},
			{x: 5 * DIAMOND_SIZE, y: 3 * DIAMOND_SIZE + GAME_BOARD_Y_OFFSET, row: 4, column: 5, kind: 1,},
			{x: 6 * DIAMOND_SIZE, y: 3 * DIAMOND_SIZE + GAME_BOARD_Y_OFFSET, row: 4, column: 6, kind: 1,},
			{x: 7 * DIAMOND_SIZE, y: 3 * DIAMOND_SIZE + GAME_BOARD_Y_OFFSET, row: 4, column: 7, kind: 0,},

			{x: 0 * DIAMOND_SIZE, y: 4 * DIAMOND_SIZE + GAME_BOARD_Y_OFFSET, row: 5, column: 0, kind: 1,},
			{x: 1 * DIAMOND_SIZE, y: 4 * DIAMOND_SIZE + GAME_BOARD_Y_OFFSET, row: 5, column: 1, kind: 3,},
			{x: 2 * DIAMOND_SIZE, y: 4 * DIAMOND_SIZE + GAME_BOARD_Y_OFFSET, row: 5, column: 2, kind: 5,},
			{x: 3 * DIAMOND_SIZE, y: 4 * DIAMOND_SIZE + GAME_BOARD_Y_OFFSET, row: 5, column: 3, kind: 2,},
			{x: 4 * DIAMOND_SIZE, y: 4 * DIAMOND_SIZE + GAME_BOARD_Y_OFFSET, row: 5, column: 4, kind: 4,},
			{x: 5 * DIAMOND_SIZE, y: 4 * DIAMOND_SIZE + GAME_BOARD_Y_OFFSET, row: 5, column: 5, kind: 5,},
			{x: 6 * DIAMOND_SIZE, y: 4 * DIAMOND_SIZE + GAME_BOARD_Y_OFFSET, row: 5, column: 6, kind: 0,},
			{x: 7 * DIAMOND_SIZE, y: 4 * DIAMOND_SIZE + GAME_BOARD_Y_OFFSET, row: 5, column: 7, kind: 1,},

			{x: 0 * DIAMOND_SIZE, y: 5 * DIAMOND_SIZE + GAME_BOARD_Y_OFFSET, row: 6, column: 0, kind: 4,},
			{x: 1 * DIAMOND_SIZE, y: 5 * DIAMOND_SIZE + GAME_BOARD_Y_OFFSET, row: 6, column: 1, kind: 5,},
			{x: 2 * DIAMOND_SIZE, y: 5 * DIAMOND_SIZE + GAME_BOARD_Y_OFFSET, row: 6, column: 2, kind: 3,},
			{x: 3 * DIAMOND_SIZE, y: 5 * DIAMOND_SIZE + GAME_BOARD_Y_OFFSET, row: 6, column: 3, kind: 0,},
			{x: 4 * DIAMOND_SIZE, y: 5 * DIAMOND_SIZE + GAME_BOARD_Y_OFFSET, row: 6, column: 4, kind: 5,},
			{x: 5 * DIAMOND_SIZE, y: 5 * DIAMOND_SIZE + GAME_BOARD_Y_OFFSET, row: 6, column: 5, kind: 4,},
			{x: 6 * DIAMOND_SIZE, y: 5 * DIAMOND_SIZE + GAME_BOARD_Y_OFFSET, row: 6, column: 6, kind: 3,},
			{x: 7 * DIAMOND_SIZE, y: 5 * DIAMOND_SIZE + GAME_BOARD_Y_OFFSET, row: 6, column: 7, kind: 2,},

			{x: 0 * DIAMOND_SIZE, y: 6 * DIAMOND_SIZE + GAME_BOARD_Y_OFFSET, row: 7, column: 0, kind: 0,},
			{x: 1 * DIAMOND_SIZE, y: 6 * DIAMOND_SIZE + GAME_BOARD_Y_OFFSET, row: 7, column: 1, kind: 1,},
			{x: 2 * DIAMOND_SIZE, y: 6 * DIAMOND_SIZE + GAME_BOARD_Y_OFFSET, row: 7, column: 2, kind: 2,},
			{x: 3 * DIAMOND_SIZE, y: 6 * DIAMOND_SIZE + GAME_BOARD_Y_OFFSET, row: 7, column: 3, kind: 3,},
			{x: 4 * DIAMOND_SIZE, y: 6 * DIAMOND_SIZE + GAME_BOARD_Y_OFFSET, row: 7, column: 4, kind: 4,},
			{x: 5 * DIAMOND_SIZE, y: 6 * DIAMOND_SIZE + GAME_BOARD_Y_OFFSET, row: 7, column: 5, kind: 5,},
			{x: 6 * DIAMOND_SIZE, y: 6 * DIAMOND_SIZE + GAME_BOARD_Y_OFFSET, row: 7, column: 6, kind: 3,},
			{x: 7 * DIAMOND_SIZE, y: 6 * DIAMOND_SIZE + GAME_BOARD_Y_OFFSET, row: 7, column: 7, kind: 1,},

			{x: 0 * DIAMOND_SIZE, y: 7 * DIAMOND_SIZE + GAME_BOARD_Y_OFFSET, row: 8, column: 0, kind: 5,},
			{x: 1 * DIAMOND_SIZE, y: 7 * DIAMOND_SIZE + GAME_BOARD_Y_OFFSET, row: 8, column: 1, kind: 1,},
			{x: 2 * DIAMOND_SIZE, y: 7 * DIAMOND_SIZE + GAME_BOARD_Y_OFFSET, row: 8, column: 2, kind: 5,},
			{x: 3 * DIAMOND_SIZE, y: 7 * DIAMOND_SIZE + GAME_BOARD_Y_OFFSET, row: 8, column: 3, kind: 2,},
			{x: 4 * DIAMOND_SIZE, y: 7 * DIAMOND_SIZE + GAME_BOARD_Y_OFFSET, row: 8, column: 4, kind: 3,},
			{x: 5 * DIAMOND_SIZE, y: 7 * DIAMOND_SIZE + GAME_BOARD_Y_OFFSET, row: 8, column: 5, kind: 4,},
			{x: 6 * DIAMOND_SIZE, y: 7 * DIAMOND_SIZE + GAME_BOARD_Y_OFFSET, row: 8, column: 6, kind: 5,},
			{x: 7 * DIAMOND_SIZE, y: 7 * DIAMOND_SIZE + GAME_BOARD_Y_OFFSET, row: 8, column: 7, kind: 1,},
    ]
  },
  {
    level: 2
  },
  {
    level: 3
  }
]