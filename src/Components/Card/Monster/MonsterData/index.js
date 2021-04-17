/**
 * Dictionaries that stores all monster's data
 */
import { CARD_TYPE, ATTRIBUTE, SIDE, ENVIRONMENT } from '../../utils/constant';
import { card_meta } from '../../CardMeta';
import initialize_monster_card from '../MonsterType';

const get_my_monster_on_field = (environment) => {
    const current_monsters = environment[SIDE.MINE][ENVIRONMENT.MONSTER_FIELD];
    let count = 0;
    for (const monster of current_monsters) {
        if (monster.card) {
            count++
        }
    }
    return count
}

const model_can_normal_summon = (self, environment) => {
    if (environment.CAN_NOT_SUMMON) {
        return false;
    }
    // monsters in extra deck can't be normal summoned
    if (self.card_type == CARD_TYPE.MONSTER.FUSION) {
        return false;
    }


    // Normal and effect monsters with level less than 4 can be summoned, 5-6 can be summoned using 1 tribute, and 7 and higher needs 2
    if (self.level <= 4) {
        return true
    } else if (self.level > 4 && self.level < 7) {
        if (get_my_monster_on_field(environment) >= 1) {
            return true
        }
    } else if (self.level >= 7) {
        if (get_my_monster_on_field(environment) >= 2) {
            return true
        }
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
    },
    35809262: () => {
        let options = {
            key: 35809262,
            atk: 2100,
            def: 1200,
            name: 'Elemental HERO Flame Wingman',
            level: 6,
            attribute: ATTRIBUTE.WIND,
            race: 'Warrior',
            description: '\"Elemental HERO Avian\" + \"Elemental HERO Burstinatrix\"\nMust be Fusion Summoned and cannot be Special Summoned by other ways. When this card destroys a monster by battle and sends it to the Graveyard: Inflict damage to your opponent equal to the ATK of the destroyed monster in the Graveyard.',
            can_normal_summon: model_can_normal_summon,
            can_special_summon: model_can_special_summon,
            fusion_materials: [21844576, 58932615]
        }
        return initialize_monster_card[card_meta[options.key].card_type](options);
    }

}