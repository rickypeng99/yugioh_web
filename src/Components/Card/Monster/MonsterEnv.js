import { CARD_POS } from '../utils/constant'
/**
 * Decorator class for monster cards (real-time environment)
 */

 class MonsterEnv {
     constructor(card, count) {
         this.unique_count = count;
         this.card = card;
         this.current_atk = card.atk;
         this.current_def = card.def;
         this.current_pos = CARD_POS.UNSURE;
     }
 }

 export default MonsterEnv;