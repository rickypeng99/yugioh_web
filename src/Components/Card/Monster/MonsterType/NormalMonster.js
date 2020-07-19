import Monster from './Monster'
import { CARD_TYPE, ENVIRONMENT } from '../../utils/constant';
class NormalMonster extends Monster {
    constructor(options){
       super(options);
       this.card_type = CARD_TYPE.MONSTER.NORMAL;
       this.starting_positon = ENVIRONMENT.DECK;
       // a function that determines if a monster can be normally summoned (based on the environment)
       this.can_normal_summon = options.can_normal_summon;
    }
}

export default NormalMonster;