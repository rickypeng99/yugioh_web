/**
 * Dictionaries that stores all monster's data
 */
import { CARD_TYPE, ATTRIBUTE } from '../../src/Components/Card/utils/constant';
import initialize_monster_card from '../../src/Components/Card/Monster/MonsterType';

 export const normal_monster_database = {
    // E.hero sparkman
    20721928: () => {
        let options = {
            atk: 1600,
            def: 1400,
            name: 'Elemental Hero Sparkman',
            level: 4,
            attribute: ATTRIBUTE.LIGHT,
            type: 'Warrior',
            description: 'An Elemental HERO and a warrior of light who proficiently wields many kinds of armaments. His Static Shockwave cuts off the path of villainy.',
            // can_normal_summon: () => {
            //     return this.
            // }
        }
        return initialize_monster_card[CARD_TYPE.MONSTER.NORMAL](options);
    }

 }