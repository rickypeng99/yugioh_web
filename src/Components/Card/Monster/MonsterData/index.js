/**
 * Dictionaries that stores all monster's data
 */
import { CARD_TYPE, ATTRIBUTE } from '../../utils/constant';
import { card_meta } from '../../CardMeta';
import initialize_monster_card from '../MonsterType';

const model_can_normal_summon = (self, environment) => {
    if (environment.CAN_NOT_SUMMON) {
        return false;
    }
    // Normal and effect monsters with level less than 4 can be summoned
    if (self.level <= 4) {
        return true
    }
}

const model_can_special_summon = (self, environment) => {
    return false
}

export const monster_database = {
    // E.hero sparkman
    20721928: () => {
        let options = {
            key: 20721928,
            atk: 1600,
            def: 1400,
            name: 'Elemental Hero Sparkman',
            level: 4,
            fuck: "ddsdsds",
            attribute: ATTRIBUTE.LIGHT,
            type: 'Warrior',
            description: 'An Elemental HERO and a warrior of light who proficiently wields many kinds of armaments. His Static Shockwave cuts off the path of villainy.',
            can_normal_summon: model_can_normal_summon,
            can_special_summon: model_can_special_summon
        }
        return initialize_monster_card[card_meta[options.key].card_type](options);
    }

}