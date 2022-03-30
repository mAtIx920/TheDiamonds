class Media {
  constructor() {
    this._backgroundImage = null;
    this._diamondsSprite = null;
  }

  //This takes background images
  set backgroundImage(imageObject) {
    if(!(imageObject instanceof Image)) return;
    this._backgroundImage = imageObject;
  }

  get backgroundImage() {
    return this._backgroundImage;
  }

  //This takes diamond images
  set diamondsSprite(imageObject) {
    if(!(imageObject instanceof Image)) return;
    this._diamondsSprite = imageObject;
  }

  get diamondsSprite() {
    return this._diamondsSprite;
  }
}

export const media = new Media();