import Common, { SCREEN_OBJECT } from './Common.esm.js';
import { levelSelect } from './LevelSelect.esm.js';
import { CANVAS_HEIGHT, CANVAS_WIDTH } from './Canvas.esm.js';
import { settings } from './Settings.sem.js';

export const SCALE_PROPERTY = '--scale-value';
const START_GAME_BUTTON_ID = 'js-start-game';
const START_SCREEN_ID = 'js-start-screen';
const START_SETTINGS_BUTTON_ID = 'js-settings-button';

//Class where is start layout the game
class MainMenu extends Common {
  constructor() {
    super(START_SCREEN_ID);
    this.bindGameElements();
    this.resizeGameWindow()
    window.addEventListener('resize', this.resizeGameWindow)
  }
  
  bindGameElements = () => {
    const gameStartButton = this.bindToElement(START_GAME_BUTTON_ID);
    const gamesSettingsButton = this.bindToElement(START_SETTINGS_BUTTON_ID);

    gameStartButton.addEventListener('click', this.showLevelScreen);
    gamesSettingsButton.addEventListener('click', this.showSettingsScreen);    
  }

  showLevelScreen = () => {
    levelSelect.refreshButtonsHandler();
    this.changeScreen(this.element, SCREEN_OBJECT.HIDDEN_SCREEN)
    this.changeScreen(levelSelect.element, SCREEN_OBJECT.VISIBLE_SCREEN)
  }

  showSettingsScreen = () => {
    this.changeScreen(settings.element, SCREEN_OBJECT.VISIBLE_SCREEN);
  }

  //Function which answer for resizeing game window
  resizeGameWindow = () => {
    const { innerWidth: width, innerHeight: height } = window;
    const scale = Math.min(width / CANVAS_WIDTH, height / CANVAS_HEIGHT)

    document.documentElement.style.setProperty(SCALE_PROPERTY, scale)
  }
}

export const mainMenu = new MainMenu()