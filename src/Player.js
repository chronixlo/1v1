import React, { Component } from 'react';
import { observer } from 'mobx-react';
import Ability from './Ability';
import { INTERRUPT_COOLDOWN, SILENCE_TIME } from './consts';

@observer
class Player extends Component {
  componentDidMount() {
    document.addEventListener('keyup', this.keyUp);
  }

  keyUp = (e) => {
    switch (e.key) {
      case this.props.keys.cast: this.props.player.cast(); break;
      case this.props.keys.cancel: this.props.player.cancel(); break;
      case this.props.keys.interrupt: this.props.player.interrupt(); break;
      default:
    }
  }

  render() {
    const { player } = this.props;

    return (
      <div className="player">
        <div>
          <div className="player-wins">
            wins: {player.wins}
          </div>

          <div className="bar healthbar">
            <div className="bar-face healthbar-face" style={{width: (player.currentHp / player.hp * 100) + '%'}}></div>
            <div className="bar-text healthbar-text">{player.name}</div>
          </div>
        </div>

        <div className="player-abilities">
          <Ability name="Interrupt" keybind={this.props.keys.interrupt} cooldownStart={player.lastInterrupt} cooldownLength={INTERRUPT_COOLDOWN} />
          
          <Ability name="Cast" keybind={this.props.keys.cast} cooldownStart={player.casting && player.casting.started} cooldownLength={player.casting && player.casting.time} reverse />

          <Ability name="Silenced" cooldownStart={player.silenced} cooldownLength={SILENCE_TIME} hideInactive />
        </div>
      </div>
    );
  }
}

export default Player;