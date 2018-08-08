import React, { Component } from 'react';
import { observer } from 'mobx-react';
import Ability from './Ability';
import { INTERRUPT_COOLDOWN, SILENCE_TIME } from './consts';

@observer
class Player extends Component {
  componentDidMount() {
    if (this.props.keys)
      document.addEventListener('keyup', this.keyUp);
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this.keyUp);
  }

  keyUp = (e) => {
    switch (e.key) {
      case this.props.keys.cast: this.castTrigger = Date.now(); this.props.player.cast(); break;
      case this.props.keys.cancel: this.castTrigger = Date.now(); this.props.player.cancel(); break;
      case this.props.keys.interrupt: this.interruptTrigger = Date.now(); this.props.player.interrupt(); break;
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
          <Ability
            name="Interrupt"
            keybind={this.props.keys && this.props.keys.interrupt}
            cooldownStart={player.lastInterrupt}
            cooldownLength={INTERRUPT_COOLDOWN}
            useTrigger={player.lastInterrupt}
          />
          
          <Ability
            name="Cast"
            nameActive="Cancel"
            keybind={this.props.keys && this.props.keys.cast}
            keybindActive={this.props.keys && this.props.keys.cancel}
            cooldownStart={player.casting && player.casting.started}
            cooldownLength={player.casting && player.casting.time}
            useTrigger={player.casting && player.casting.started}
            className="cast"
            reverse
          />

          <Ability
            name="Silenced!"
            cooldownStart={player.silenced}
            cooldownLength={SILENCE_TIME}
            className="debuff"
            noBorder
            hideInactive
          />
        </div>
      </div>
    );
  }
}

export default Player;