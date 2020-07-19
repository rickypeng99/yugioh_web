import { CARD_TYPE } from '../../utils/constant';
import NormalMonster from './NormalMonster';
import EffectMonster from './EffectMonster';

const initializeMonsterCard = {
    'NORMAL': (options) => {return new NormalMonster(options)},
    'EFFECT': (options) => {return new EffectMonster(options)},
};

export default initializeMonsterCard;