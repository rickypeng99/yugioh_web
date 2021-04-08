/**
 * Base class for all spells
 */

 class Spell {
    constructor(options) {
       this.key = options.key;
       /**
        * Basic data
        */
       this.name = options.name;
       this.description = options.description;
    }


}

export default Spell;

