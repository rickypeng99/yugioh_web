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
            name: 'Elemental HERO Sparkman',
            level: 4,
            attribute: ATTRIBUTE.LIGHT,
            race: 'Warrior',
            description: 'An Elemental HERO and a warrior of light who proficiently wields many kinds of armaments. His Static Shockwave cuts off the path of villainy.',
            can_normal_summon: model_can_normal_summon,
            can_special_summon: model_can_special_summon
        }
        return initialize_monster_card[card_meta[options.key].card_type](options);
    },
    58932615: () => {
        let options = {
            key: 58932615,
            atk: 1200,
            def: 800,
            name: 'Elemental HERO Burstinatrix',
            level: 3,
            attribute: ATTRIBUTE.FIRE,
            race: 'Warrior',
            description: 'A flame manipulator who was the first Elemental HERO woman. Her Burstfire burns away villainy.',
            can_normal_summon: model_can_normal_summon,
            can_special_summon: model_can_special_summon
        }
        return initialize_monster_card[card_meta[options.key].card_type](options);
    },
    84327329: () => {
        let options = {
            key: 84327329,
            atk: 800,
            def: 2000,
            name: 'Elemental HERO Clayman',
            level: 4,
            attribute: ATTRIBUTE.EARTH,
            race: 'Warrior',
            description: 'An Elemental HERO with a clay body built-to-last. He\'ll preserve his Elemental HERO colleagues at any cost.',
            can_normal_summon: model_can_normal_summon,
            can_special_summon: model_can_special_summon
        }
        return initialize_monster_card[card_meta[options.key].card_type](options);
    },
    21844576: () => {
        let options = {
            key: 21844576,
            atk: 1000,
            def: 1000,
            name: 'Elemental HERO Avian',
            level: 3,
            attribute: ATTRIBUTE.WIND,
            race: 'Warrior',
            description: 'A winged Elemental HERO who wheels through the sky and manipulates the wind. His signature move, Featherbreak, gives villainy a blow from sky-high.',
            can_normal_summon: model_can_normal_summon,
            can_special_summon: model_can_special_summon
        }
        return initialize_monster_card[card_meta[options.key].card_type](options);
    },
    89943723: () => {
        let options = {
            key: 89943723,
            atk: 2500,
            def: 2000,
            name: 'Elemental HERO Neos',
            level: 7,
            attribute: ATTRIBUTE.LIGHT,
            race: 'Warrior',
            description: 'A new Elemental HERO has arrived from Neo-Space! When he initiates a Contact Fusion with a Neo-Spacian his unknown powers are unleashed.',
            can_normal_summon: model_can_normal_summon,
            can_special_summon: model_can_special_summon
        }
        return initialize_monster_card[card_meta[options.key].card_type](options);
    }

}