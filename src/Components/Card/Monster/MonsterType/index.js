import { CARD_TYPE } from '../../utils/constant';
import NormalMonster from './NormalMonster';
import RitualMonster from './RitualMonster';

const initializeMonsterCard = {};
initializeMonsterCard[CARD_TYPE.MONSTER.NORMAL] = (options) => new NormalMonster(options);
initializeMonsterCard[CARD_TYPE.MONSTER.RITUAL] = (options) => new RitualMonster(options);

export default initializeMonsterCard;