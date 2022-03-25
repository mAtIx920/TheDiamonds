import Common, { SCREEN_OBJECT } from "./Common.esm.js";

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
    this.changeScreen(this.element, SCREEN_OBJECT.HIDDEN_SCREEN)
    //here will be changed screen on canvas with game
  }
}

export const levelSelect = new LevelSelect()