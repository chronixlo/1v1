import { action, observable } from 'mobx';
import Player from './Player';

class Store {
  @observable player1 = new Player('Player 1', this.p1action);
  @observable player2 = new Player('Player 2', this.p2action);

  @action.bound
  p1action(action) {
    this.player2.receive(action);
  }

  @action.bound
  p2action(action) {
    this.player1.receive(action);
  }
}

export default new Store();