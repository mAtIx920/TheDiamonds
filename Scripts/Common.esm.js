export const SCREEN_OBJECT = {
  HIDDEN_CLASS: 'hidden',
  HIDDEN_SCREEN: false,
  VISIBLE_SCREEN: true
}

// Class which answer for finding elements in game
class Common {
  constructor(elementId) {
    if(typeof elementId === 'undefined') {
      return;
    } else {
      this.element = this.bindToElement(elementId)
    } 
  }

  bindToElement = elementFindById => {
    const element = document.getElementById(elementFindById);
    if(!element) {
      throw new Error(`Not found element id: ${elementFindById}`);

    } else return element
    
  }

  changeScreen = (element, mode) => {
    mode === SCREEN_OBJECT.VISIBLE_SCREEN 
      ? element.classList.remove(SCREEN_OBJECT.HIDDEN_CLASS)
    : element.classList.add(SCREEN_OBJECT.HIDDEN_CLASS)
  }
}

export default Common