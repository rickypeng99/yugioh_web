import { CARD_POS } from '../utils/constant'
/**
 * Decorator class for spell cards (real-time environment)
 */

 class SpellEnv {
     constructor(card, count) {
         this.unique_count = count;
         this.card = card;
     }
 }

 export default SpellEnv;