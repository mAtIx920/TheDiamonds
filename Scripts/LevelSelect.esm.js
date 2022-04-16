import { userData } from "../Data/UserData.esm.js";
import { canvas } from "./Canvas.esm.js";
import Common, { SCREEN_OBJECT } from "./Common.esm.js";
import { game } from "./Game.esm.js";
import { DATALOADED_EVENT_NAME, loader } from "./Loader.esm.js";
import { media } from "./Media.esm.js";
import { gameLevelsInfo } from "../Data/levelsInfo.esm.js";

const LEVEL_SELECT_ID = 'js-level-select-screen';
const LEVEL_SELECT_BUTTON_ID = 'level-select__button';

class LevelSelect extends Common {
  constructor() {
    super(LEVEL_SELECT_ID);
  }

  refreshButtonsHandler = () => {
    while(this.element.firstChild) {
      console.log('przyciski')
      this.element.removeChild(this.element.firstChild);
    }


    gameLevelsInfo.some(gameLevel => this.createButton(gameLevel.level))
  }

  createButton = value => {
    
    if(!userData.checkAvaiabilityLevel(value)) {
      return true;
    }

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
    this.loadLevel(e.currentTarget.value);
  }

  loadLevel = lvl => {
    if(media.backgroundImage && media.diamondsSprite && media.backgroundMusic && media.swapSound) {
      game.playLevel(lvl);
      return;
    }

    if(!media.backgroundImage) {
      media.backgroundImage = loader.loadImage('SourceFolder/images/levelbackground.png');
    }

    if(!media.diamondsSprite) {
      media.diamondsSprite = loader.loadImage('SourceFolder/images/diamonds-transparent.png');
    }
   
    if(!media.swapSound) {
      media.swapSound = loader.loadAudio('./SourceFolder/sounds/stone_rock_or_wood_moved.mp3')
    }

    if(!media.backgroundMusic) {
      media.backgroundMusic = loader.loadAudio('./SourceFolder/sounds/music-background.mp3');
    }

    window.addEventListener(DATALOADED_EVENT_NAME, () => game.playLevel(lvl));
  }
}

export const levelSelect = new LevelSelect()