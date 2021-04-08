import { CARD_TYPE } from '../../utils/constant';
import NormalMonster from './NormalMonster';
import EffectMonster from './EffectMonster';
import FusionMonster from './FusionMonster'


const initializeMonsterCard = {
    [CARD_TYPE.MONSTER.NORMAL]: (options) => {return new NormalMonster(options)},
    [CARD_TYPE.MONSTER.EFFECT]: (options) => {return new EffectMonster(options)},
    [CARD_TYPE.MONSTER.FUSION]: (options) => {return new FusionMonster(options)}

};

export default initializeMonsterCard;