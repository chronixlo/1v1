import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import LocalGame from './LocalGame';
import OnlineGame from './OnlineGame';
import { GAMEMODE_LOCAL } from './consts';

@inject('appStore')
@observer
class App extends Component {
  render() {
    return (
    <div>
      <button className="online-toggle" onClick={this.props.appStore.toggleMode}>
        {
          this.props.appStore.gamemode === GAMEMODE_LOCAL ?
          'Go online' :
          'Go local'
        }
      </button>
      
      <div className="game-content">
        <div>
          {
            this.props.appStore.gamemode === GAMEMODE_LOCAL ?
            <LocalGame /> :
            <OnlineGame />
          }
        </div>
      </div>
    </div>
    );
  }
}

export default App;
