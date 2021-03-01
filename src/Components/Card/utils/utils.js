import { monster_database } from '../Monster/MonsterData';
import MonsterEnv from '../Monster/MonsterEnv.js';
import { card_meta } from '../CardMeta';
import { CARD_TYPE } from '../utils/constant'

export const is_monster = (card_type) => {
    return card_type.substring(0, 7) == 'MONSTER'
}

export const is_spell = (card_type) => {
    return card_type.substring(0, 5) == 'SPELL'
}

export const is_trap = (card_type) => {
    return card_type.substring(0, 4) == 'TRAP'
}

export const load_card_to_environment = (card) => {
    const card_type = card_meta[card.key].card_type;
    if (is_monster(card_type)) {
        return new MonsterEnv(card);
    } else if (is_spell(card_type)) {
        return;
    } else {
        return;
    }
}

export const create_card = (card_key) => {
    const card_type = card_meta[card_key].card_type;
    if (is_monster(card_type)) {
        return monster_database[card_key]();
    } else if (is_spell(card_type)) {
        return;
    } else {
        return;
    }
}
