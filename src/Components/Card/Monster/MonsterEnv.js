/**
 * Decorator class for monster cards
 */


 class MonsterEnv {
     constructor(card) {
         this.card = card;
         this.current_atk = card.atk;
         this.current_effect = card.initiative_effect;
         this.counter_effect = card.counter_effect;         
     }
 }

 export default MonsterEnv;