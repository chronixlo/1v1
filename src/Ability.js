import React, { Component } from 'react';
const cn = (...args) => args.filter(i => i).join(' ');
class Ability extends Component {
  cooldownInterval;
  lastUseTrigger = 0;

  componentWillMount() {
    setInterval(() => {
      this.forceUpdate();
    }, 16);
  }
  
  componentWillUnmount() {
    clearInterval(this.cooldownInterval);
  }

  render() {
    const date = Date.now();
    
    const cooldownActive = this.props.cooldownStart && this.props.cooldownStart + this.props.cooldownLength > date;

    const width = cooldownActive ? ((date - this.props.cooldownStart) / this.props.cooldownLength * 100) + '%' : (this.props.reverse ? '0%' : '100%');
    
    // interruptTrigger

    return (
      <div className={cn('ability', this.props.noBorder && 'ability-no-border', ((date - this.props.useTrigger) < 100) && 'ability-used')} >
        {
          (!this.props.hideInactive || cooldownActive) &&
          <div className={cn('bar', this.props.className + 'bar')}>
            <div className={cn('bar-face', this.props.className + 'bar-face')} style={{width}}></div>
            <div className={cn('bar-text', this.props.className + 'bar-text')}>
              {
                (!cooldownActive || !this.props.nameActive) ?
                this.props.name :
                this.props.nameActive
              }
              
              {
                this.props.keybind &&
                <span>
                  &nbsp;(
                    {
                      (!cooldownActive || !this.props.keybindActive) ?
                      this.props.keybind :
                      this.props.keybindActive
                    }
                  )
                </span>
              }
            </div>
          </div>
        }
      </div>
    );
  }
}

export default Ability;