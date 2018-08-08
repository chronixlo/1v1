import { action, observable } from 'mobx';
import { GAMEMODE_LOCAL, GAMEMODE_ONLINE } from '../consts';
import onlineGameStore from './onlineGameStore';

class AppStore {
  @observable gamemode = GAMEMODE_LOCAL;

  constructor() {
    const pathname = window.location.pathname.slice(1);

    if (pathname) {
      this.setMode(GAMEMODE_ONLINE, pathname);
    }
  }

  @action.bound
  toggleMode() {
    onlineGameStore.reset();
    this.gamemode = (this.gamemode + 1) % 2;
    window.history.pushState(null, null, '/');
  }

  @action.bound
  setMode(mode, gameId) {
    this.gamemode = mode || ((this.gamemode + 1) % 2);
    
    if (gameId)
      window.history.pushState(null, null, '/' + gameId);
  }
}

export default new AppStore();