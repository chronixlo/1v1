import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Player from './Player';

@inject('store')
@observer
class App extends Component {
  render() {
    return (
      <div>
        <h1>1v1</h1>

        <div className="container">
          <Player player={this.props.store.player1} keys={{cast: 'a', cancel: 's', interrupt: 'd'}} />
          <Player player={this.props.store.player2} keys={{cast: 'j', cancel: 'k', interrupt: 'l'}} />
        </div>

        <div>
          jou
        </div>
      </div>
    );
  }
}

export default App;
