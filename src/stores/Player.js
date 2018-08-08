import { action, computed, observable, reaction } from 'mobx';
import { CAST_TIME, PLAYER_HP, INTERRUPT_COOLDOWN, SILENCE_TIME, STUN_DAMAGE, CAST_DAMAGE } from '../consts';

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

  constructor(name, action = () => {}) {
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
    if (input.event && input.event === 'defeat') {
      this.win();
      return;
    }

    if (input.damage) {
      this.hpLost += input.damage;
    }

    if (input.effect) {
      if (input.effect === 'stun') {
        this.hpLost += STUN_DAMAGE;
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

    this.action({
      name: 'startcast'
    });

    const castTime = CAST_TIME;

    this.casting = {
        name: 'spell',
        started: Date.now(),
        time: castTime
    };

    this.spellTimeout = setTimeout(() => {
      this.action({
        damage: CAST_DAMAGE
      });

      this.casting = false;
    }, castTime);
  }

  @action.bound
  cancel() {
    if (!this.casting) {
      return;
    }

    this.action({
      name: 'cancel'
    });

    clearTimeout(this.spellTimeout);

    this.casting = false;
  }

  @action.bound
  interrupt() {
    const now = Date.now();

    if (this.casting || (this.lastInterrupt + INTERRUPT_COOLDOWN) > now || (this.silenced + SILENCE_TIME) > now) {
      return;
    }

    this.lastInterrupt = now;
    
    this.action({
      effect: 'interrupt'
    });
  };
}