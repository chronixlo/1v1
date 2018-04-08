import React, { Component } from 'react';

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
          <div className="bar">
            <div className="bar-face" style={{width}}></div>
            <div className="bar-text">
              {this.props.name}
              
              {
                this.props.keybind &&
                <span>({this.props.keybind})</span>
              }
            </div>
          </div>
        }
      </div>
    );
  }
}

export default Ability;