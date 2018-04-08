import React, { Component } from 'react';
const cn = (...args) => args.filter(i => i).join(' ');
class Ability extends Component {
  cooldownInterval;

  componentWillReceiveProps(nextProps) {
    if (this.props.noBar) {
      return;
    }

    clearInterval(this.cooldownInterval);
    
    setInterval(() => {
      this.forceUpdate();
    }, 16);
  }
  

  render() {
    const date = Date.now();
    
    const cooldownActive = this.props.cooldownStart && this.props.cooldownStart + this.props.cooldownLength > date;

    const width = cooldownActive ? ((date - this.props.cooldownStart) / this.props.cooldownLength * 100) + '%' : (this.props.reverse ? '0%' : '100%');
    
    return (
      <div className="ability">
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