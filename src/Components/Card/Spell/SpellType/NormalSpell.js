import Spell from './Spell'
import { CARD_TYPE, ENVIRONMENT } from '../../utils/constant';
class NormalSpell extends Spell {
    constructor(options){
       super(options);
       this.card_type = CARD_TYPE.SPELL.NORMAL;
       this.positon = ENVIRONMENT.DECK;
    }
}

export default NormalSpell;