import Common, { SCREEN_OBJECT } from './Common.esm.js';

const LOAD_CURRENT_ID = 'js-loading-screen-current';
const LOAD_TOTAL_ID = 'js-loading-screen-total';
const LOADER_ELEMENT_ID = 'js-loading-screen';
export const DATALOADED_EVENT_NAME = 'dataLoaded';

class Loader extends Common {
  constructor() {
    super(LOADER_ELEMENT_ID);
    this.clearProps();
    this.bindToElements();
  }

  bindToElements = () => {
    this.currentElement = this.bindToElement(LOAD_CURRENT_ID);
    this.totalElement = this.bindToElement(LOAD_TOTAL_ID);
  }
  
  //Function loading main image background layout
  loadImage = imageUrl => {
    this.changeScreen(this.element, SCREEN_OBJECT.VISIBLE_SCREEN);
    this.isAllLoaded = false;
    this.totalElement = ++this.totalCounter;
    const image = new Image();

    image.src = imageUrl;
    image.addEventListener('load', e => this.loadItem(e), false);

    return image;
  }

  loadAudio = soundUrl => {
    this.changeScreen(this.element, SCREEN_OBJECT.VISIBLE_SCREEN);
    this.isAllLoaded = false;
    this.totalCounter++;

    const audio = new Audio();
    audio.src = soundUrl;
    audio.addEventListener('canplaythrough', e => this.loadItem(e), false);

    return audio;
  }

  //Function which manage for loading items of the game
  loadItem = e => {
    e.target.removeEventListener(e.type, this.loadItem, false);
    this.loadedCounter++;
    this.currentElement.textContent = this.loadedCounter;
    
    if(this.loadedCounter === this.totalCounter) {
      this.clearProps();
      this.changeScreen(this.element, SCREEN_OBJECT.HIDDEN_SCREEN);
      window.dispatchEvent(new CustomEvent(DATALOADED_EVENT_NAME));
    }
  }

  clearProps = () => {
    this.isAllLoaded = true;
    this.loadedCounter = 0;
    this.totalCounter = 0;
  }

}

export const loader = new Loader();