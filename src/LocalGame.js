import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Player from './Player';

@inject('localGameStore')
@observer
class LocalGame extends Component {
  render() {
    return (
      <div className="container">
        <Player player={this.props.localGameStore.player1} keys={{cast: 'a', cancel: 's', interrupt: 'd'}} />
        <Player player={this.props.localGameStore.player2} keys={{cast: 'j', cancel: 'k', interrupt: 'l'}} />
      </div>
    );
  }
}

export default LocalGame;
