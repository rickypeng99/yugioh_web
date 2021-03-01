import { CARD_TYPE } from '../../utils/constant';
import NormalMonster from './NormalMonster';
import EffectMonster from './EffectMonster';

const initializeMonsterCard = {
    'MONSTER_NORMAL': (options) => {return new NormalMonster(options)},
    'MONSTER_EFFECT': (options) => {return new EffectMonster(options)},
};

export default initializeMonsterCard;