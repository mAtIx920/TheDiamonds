import { canvas } from "./Canvas.esm.js";
import Common, { SCREEN_OBJECT } from "./Common.esm.js";
import { game } from "./Game.esm.js";
import { DATALOADED_EVENT_NAME, loader } from "./Loader.esm.js";
import { media } from "./Media.esm.js";

const LEVEL_SELECT_ID = 'js-level-select-screen';
const LEVEL_SELECT_BUTTON_ID = 'level-select__button';
const gameLevels = [
  {
    level: 1,
  },
  {
    level: 2,
  },
  {
    level: 3,
  }
]

class LevelSelect extends Common {
  constructor() {
    super(LEVEL_SELECT_ID);
    gameLevels.forEach(level => this.createButton(level.level))
  }

  createButton = value => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.classList.add(LEVEL_SELECT_BUTTON_ID);
    btn.textContent = value;
    btn.value = value;
    btn.addEventListener('click', e => this.buttonClickHandler(e));
    this.element.appendChild(btn);
  }

  buttonClickHandler(e) {
    this.changeScreen(this.element, SCREEN_OBJECT.HIDDEN_SCREEN);
    this.changeScreen(canvas.element, SCREEN_OBJECT.VISIBLE_SCREEN);
    console.log(e.currentTarget.value)
    this.loadLevel(e.currentTarget.value);
  }

  loadLevel = lvl => {
    media.backgroundImage = loader.loadImage('SourceFolder/images/levelbackground.png')
    document.addEventListener(DATALOADED_EVENT_NAME, () => game.playLevel(lvl));
  }
}

export const levelSelect = new LevelSelect()