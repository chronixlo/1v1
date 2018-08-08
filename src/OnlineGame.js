import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Player from './Player';

@inject('onlineGameStore')
@observer
class OnlineGame extends Component {
  componentDidMount() {
    this.props.onlineGameStore.connect();
  }
  
  componentWillUnmount() {
    this.props.onlineGameStore.disconnect();
  }

  render() {
    const { onlineGameStore } = this.props;

    return (
      <div>
        <h1>Online 1v1</h1>

        <div className="container">
          <Player player={onlineGameStore.player1} keys={{cast: 'a', cancel: 's', interrupt: 'd'}} />
          <Player player={onlineGameStore.player2} />
        </div>

        <h2>
          {
            onlineGameStore.status === 1 ?
            'connecting' :

            onlineGameStore.status === 2 ?
            'waiting for opponent' :
            'game on'
          }
        </h2>
      </div>
    );
  }
}

export default OnlineGame;
