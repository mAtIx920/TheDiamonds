import Common, { SCREEN_OBJECT } from "./Common.esm.js";

const SCREEN_SETTINGS_ID = 'js-setting-screen';
const BUTTON_MUSIC_ID = 'js-music-on-off';
const BUTTON_INCREASE_MUSIC_VOLUME_ID = 'js-music-volume-increase';
const BUTTON_DECREASE_MUSIC_VOLUME_ID = 'js-music-volume-decrease';
const BUTTON_SOUND_ID = 'js-sound-on-off';
const BUTTON_INCREASE_SOUND_ID = 'js-sound-volume-increase';
const BUTTON_DECREASE_SOUND_ID = 'js-sound-volume-decrease';
const BUTTON_EXIT_ID = 'js-setting-screen-exit';

class Settings extends Common {
  constructor() {
    super(SCREEN_SETTINGS_ID);
    this.bindToGameElements();
  }

  bindToGameElements = () => {
    const exitButton = this.bindToElement(BUTTON_EXIT_ID);
    
    exitButton.addEventListener('click', () => this.changeScreen(this.element, SCREEN_OBJECT.HIDDEN_SCREEN))
  }
}

export const settings = new Settings();