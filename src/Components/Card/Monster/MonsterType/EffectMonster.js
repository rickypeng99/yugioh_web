import NormalMonster from './NormalMonster';

class EffectMonster extends NormalMonster {
    constructor(options) {
        super(options);
         // a dictionary that contains effects which can be initiated during a particular phase
         this.initiative_effect = options.initiative_effect; 

         // a dictionary that contains effects which can be triggered based on other cards' effects
         this.counter_effect = options.counter_effect;
    }
}

export default EffectMonster;