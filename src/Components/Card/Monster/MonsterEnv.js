/**
 * Decorator class for monster cards (real-time environment)
 */


 class MonsterEnv {
     constructor(card) {
         this.card = card;
         this.current_atk = card.atk;
     }
 }

 export default MonsterEnv;