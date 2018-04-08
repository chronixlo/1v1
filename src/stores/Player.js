import { action, computed, observable, reaction } from 'mobx';
import { PLAYER_HP, INTERRUPT_COOLDOWN, SILENCE_TIME } from '../consts';

export default class Player {
  name;
  hp = PLAYER_HP;
  
  @observable defeated = false;
  @observable hpLost = 0;
  @observable casting = false;
  @observable lastInterrupt = null;
  @observable wins = 0;
  @observable silenced = false;

  @computed
  get currentHp() {
    return this.hp - this.hpLost;
  }

  constructor(name, action) {
    this.name = name;
    this.action = action;

    reaction(
      () => this.hpLost > this.hp && !this.defeated,
      (shouldDie) => shouldDie && this.defeat()
    );
  }

  @action.bound
  reset() {
    clearTimeout(this.spellTimeout);

    this.defeated = false;
    this.hpLost = 0;
    this.casting = false;
    this.lastInterrupt = null;
    this.silenced = false;
  }

  @action.bound
  win() {
    this.reset();
    this.wins++;
  }

  @action.bound
  defeat() {
    this.defeated = true;
    this.action({event: 'defeat'});
    this.reset();
  }

  @action.bound
  receive(input) {
    if (input.damage) {
      this.hpLost += input.damage;
    }

    if (input.effect) {
      if (input.effect === 'stun') {
        this.hpLost += 2000;
      } else if (input.effect === 'interrupt') {

        if (this.casting) {
            this.silenced = Date.now();
            clearTimeout(this.spellTimeout);
            this.casting = false;
        }
        else {
          this.action({
            effect: 'stun'
          });
        }
      }
    }
  }

  @action.bound
  cast() {
    if (this.casting || (this.silenced + SILENCE_TIME) > Date.now()) {
      return;
    }

    const castTime = 1000;

    this.casting = {
        name: 'spell',
        started: Date.now(),
        time: castTime
    };

    this.spellTimeout = setTimeout(() => {
      this.action({
        damage: 200
      });

      this.casting = false;
    }, castTime);
  }

  @action.bound
  cancel() {
    if (!this.casting) {
      return;
    }

    clearTimeout(this.spellTimeout);

    this.casting = false;
  }

  @action.bound
  interrupt() {
    if (this.casting || (this.lastInterrupt + INTERRUPT_COOLDOWN) > Date.now()) {
      return;
    }

    this.lastInterrupt = Date.now();
    
    this.action({
      effect: 'interrupt'
    });
  };
}