import { action, observable } from 'mobx';
import Player from './Player';

const STATUS_CONNECTING = 1;
const STATUS_WAITING = 2;
const STATUS_READY = 3;
const STATUS_INGAME = 4;
const STATUS_POST = 5;

class LocalGameStore {
  @observable status = STATUS_READY;

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

export default new LocalGameStore();