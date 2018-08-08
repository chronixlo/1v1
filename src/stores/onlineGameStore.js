import { action, observable } from 'mobx';
import io from 'socket.io-client';
import Player from './Player';
import { WS_PORT } from '../consts';

const STATUS_CONNECTING = 1;
const STATUS_WAITING = 2;
const STATUS_READY = 3;
const STATUS_INGAME = 4;
const STATUS_POST = 5;

class OnlineGameStore {
  socket;

  @observable status = STATUS_CONNECTING;

  @observable player1 = new Player('You', this.p1action);
  @observable player2 = new Player('Enemy');

  @action.bound
  reset() {
    this.status = STATUS_CONNECTING;
  }

  @action.bound
  p1action(action) {
    if (this.status !== STATUS_INGAME)
      return;

    this.player2.receive(action);

    this.socket.emit('game_event', action);
  }

  @action.bound
  p2action(action) {
    if (action.effect && action.effect === 'interrupt') {
      this.player2.interrupt();
    }

    if (action.name && action.name === 'startcast') {
      this.player2.cast();
    }

    if (action.name && action.name === 'cancel') {
      this.player2.cancel();
    }

    this.player1.receive(action);
  }

  @action.bound
  connect() {
    const port = WS_PORT ? ':' + WS_PORT : '';
    this.socket = io(port + '?gameId=' + window.location.pathname.slice(1));
    // this.socket.on('connect', () ;
    this.socket.on('game_event', this.p2action);
    this.socket.on('join', this.joinRoom);
    this.socket.on('player_join', this.playerJoined);
    this.socket.on('player_quit', this.playerQuit);
  }

  @action.bound
  disconnect() {

    this.socket.close();
    // this.socket.off('connect', this.joinRoom);
    this.socket.off('game_event', this.p2action);
    this.socket.off('join', this.joinRoom);
    this.socket.off('player_join', this.playerJoined);
    this.socket.off('player_quit', this.playerQuit);
  }

  @action.bound
  playerJoined() {
    this.status = STATUS_READY;
  }

  @action.bound
  playerQuit() {
    this.status = STATUS_WAITING;
  }

  @action.bound
  joinRoom(info) {
    this.status = STATUS_WAITING;
    window.history.pushState(null, null, '/' + info.gameId);

    if (info.players === 1) {
      this.playerJoined();
    }
  }
}

export default new OnlineGameStore();