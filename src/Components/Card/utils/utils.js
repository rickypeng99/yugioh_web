import { monster_database } from '../Monster/MonsterData';
import MonsterEnv from '../Monster/MonsterEnv.js';

import { spell_database } from '../Spell/SpellData'

import { card_meta } from '../CardMeta';
import { CARD_TYPE } from '../utils/constant'
import SpellEnv from '../Spell/SpellEnv';

let current_game_unique_count = 0

export const is_monster = (card_type) => {
    return card_type.substring(0, 7) == 'MONSTER'
}

export const is_spell = (card_type) => {
    return card_type.substring(0, 5) == 'SPELL'
}

export const is_trap = (card_type) => {
    return card_type.substring(0, 4) == 'TRAP'
}

export const load_card_to_environment = function (card) {
    const card_type = card_meta[card.key].card_type;
    current_game_unique_count++;
    if (is_monster(card_type)) {
        return new MonsterEnv(card, current_game_unique_count);
    } else if (is_spell(card_type)) {
        return new SpellEnv(card, current_game_unique_count);
    } else {
        return;
    }
}

export const create_card = (card_key) => {
    const card_type = card_meta[card_key].card_type;
    if (is_monster(card_type)) {
        return monster_database[card_key]();
    } else if (is_spell(card_type)) {
        return spell_database[card_key]();
    } else {
        return;
    }
}
