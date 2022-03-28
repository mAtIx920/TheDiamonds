import Common from './Common.esm.js';

export const CANVAS_WIDTH = 640;
export const CANVAS_HEIGHT = 480;

const GAME_SCREEN_ID = 'js-game-screen';

class Canvas extends Common {
  constructor() {
    super(GAME_SCREEN_ID);
    this.setCanvas();
  }

  setCanvas = () => {
    this.context = this.element.getContext('2d');
    this.context.canvas.width = CANVAS_WIDTH;
    this.context.canvas.height = CANVAS_HEIGHT;
    this.context.font = '20px Arial white';
    this.context.fillStyle = 'white';
  }
}

export const canvas = new Canvas()