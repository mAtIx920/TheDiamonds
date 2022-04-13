class UserData {
  constructor() {
    if(!localStorage.length) {
      localStorage.setItem('1', JSON.stringify({active: true, bestScore: 0}))
    }
  }

  checkAvaiabilityLevel = lvl => {
    const levelItems = localStorage.getItem(String(lvl));

    if(!levelItems) { 
      return false;

    } else {
      const { active } = JSON.parse(levelItems);

      return active;
    }
  }

  addNewLevel = lvlNumber => {
    localStorage.setItem(String(lvlNumber), JSON.stringify({active: true, bestScore: 0}));
  }

  getBestScore = lvlNumber => {
    const levelItems = localStorage.getItem(String(lvlNumber));
    const { bestScore } = JSON.parse(levelItems);

    return bestScore;
  }

  setBestScore = (lvlNumber, newBestScore) => {
    localStorage.setItem(String(lvlNumber), JSON.stringify({active: true, bestScore: newBestScore}))
  }

}

export const userData = new UserData();