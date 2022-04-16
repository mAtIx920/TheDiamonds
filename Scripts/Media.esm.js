class Media {
  constructor() {
    this._backgroundImage = null;
    this._diamondsSprite = null;
    this.musicVolume = 0.3;
    this.soundVolume = 0.5;
    this.allowedMusic = true;
    this.allowedSound = true;
    this._swapSound = null;
    this._backgroundMusic = null;
    this.isInLevel = false;
  }

  //Music service
  increaseMusicVolume = () => {
    this.musicVolume += 0.1;
    if(this.musicVolume > 1) {
      this.musicVolume = 1;
    }

    this._backgroundMusic.volume = this.musicVolume;
  }

  decreaseMusicVolume = () => {
    this.musicVolume -= 0.1;
    if(this.musicVolume < 0) {
      this.musicVolume = 0;
    }

    this._backgroundMusic.volume = this.musicVolume;
  }

  //Sound swaping diamonds service
  increaseSoundVolume = () => {
    this.soundVolume  += 0.1;
    if(this.soundVolume  > 1) {
      this.soundVolume  = 1;
    }

    this._swapSound.volume = this.soundVolume ;
  }

  decreaseSoundVolume = () => {
    this.soundVolume -= 0.1;
    if(this.soundVolume  < 0) {
      this.soundVolume  = 0;
    }

    this._swapSound.volume = this.soundVolume ;
  }

  //Turn on music
  playBackgroundMusic = () => {
    //Check if user is allowed on play music background
    if(!this.allowedMusic) {
      return;
    }

    this._backgroundMusic.loop = true;
    this._backgroundMusic.play();
  }

  //Play music while diamond is being swaped
  swapAudio = () => {
    this._swapSound.play();
  }
  
  //Turn off music
  stopBackgroundMusic = () => {
    this._backgroundMusic.pause();
  }

  //This takes the music swaping of diamond
  set swapSound(sound) {
    this._swapSound = sound;
    this._swapSound.volume = this.soundVolume;
  }

  get swapSound() {
    return !!this._swapSound;
  }

  //This takes the music of background
  set backgroundMusic(music) {
    this._backgroundMusic = music;
    this._backgroundMusic.volume = this.musicVolume;
  }

  get backgroundMusic() {
    return !!this._backgroundMusic;
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

  onOffMusicHandler = () => {
    if(this.allowedMusic) {
      this.allowedMusic = false;
      this.stopBackgroundMusic();
    } else {
      this.allowedMusic = true;
      this.playBackgroundMusic();
    }
  }
}

export const media = new Media();