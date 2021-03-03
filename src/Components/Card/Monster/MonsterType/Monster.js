/**
 * Base class for all monsters
 * Defining public attributes and methods that all monsters will share
 */

 class Monster {
     constructor(options) {
        this.key = options.key;
        /**
         * Basic data
         */
        this.atk = options.atk;
        this.def = options.def;
        this.name = options.name;
        this.level = options.level;
        this.attribute = options.attribute;
        this.race = options.race;
        this.description = options.description;

        // card-picture: right now just uses an url
        this.card_pic = options.card_pic;   

        this.can_normal_summon = options.can_normal_summon;
        this.can_special_summon = options.can_special_summon;
     }


 }

 export default Monster;

