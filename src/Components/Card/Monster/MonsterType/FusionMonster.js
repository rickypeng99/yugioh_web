import Monster from './Monster'
import { CARD_TYPE, ENVIRONMENT } from '../../utils/constant';
class FusionMonster extends Monster{
    constructor(options){
        super(options);
        this.card_type = CARD_TYPE.MONSTER.FUSION;
        this.positon = ENVIRONMENT.DECK;
        
        this.fusion_materials = options.fusion_materials
    
    }
}

export default FusionMonster;