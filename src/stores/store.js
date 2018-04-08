import { action, observable } from 'mobx';
import Player from './Player';

class Store {
  @observable player1 = new Player('Player 1', this.p1action);
  @observable player2 = new Player('Player 2', this.p2action);

  @action.bound
  p1action(action) {
    if (action.event && action.event === 'defeat') {
      this.player2.win();
      return;
    }
    this.player2.receive(action);
  }

  @action.bound
  p2action(action) {
    if (action.event && action.event === 'defeat') {
      this.player1.win();
      return;
    }
    this.player1.receive(action);
  }
}

export default new Store();