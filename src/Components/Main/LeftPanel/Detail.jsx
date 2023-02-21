import React from 'react';
import { is_monster, is_spell, is_trap } from '../../Card/utils/utils'
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import './LeftPanel.css';

const card_type_to_show = {
    MONSTER_NORMAL: 'Normal Monster',
    MONSTER_EFFECT: 'Effect Monster',
    MONSTER_RITUAL: 'Ritual Monster',
    MONSTER_FUSION: 'Fusion Monster',
    MONSTER_SYNCHRO: 'Synchro Monster',
    SPELL_NORMAL: 'Normal Spell',
    SPELL_QUICK: 'Quick Spell',
    SPELL_EQUIPMENT: 'Equipment Spell',
    SPELL_CONTINUOUS: 'Continuous Spell',
    SPELL_ENVIRONMENT: 'Environment Spell',
    TRAP_NORMAL: 'Normal Trap',
    TRAP_CONTINUOUS: 'Continuous Trap',
    TRAP_COUNTER: 'Counter Trap',
}


class Detail extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {cardEnv} = this.props
        const card_specific = (card) => {
            if (is_monster(card.card_type)) {
                return (
                    <div>
                        <div className="specific">
                            <p className="specific_type">{card_type_to_show[card.card_type]}</p>
                            <div className="specific_others">
                                <img className="specific_others_icon" src={"https://ygoprodeck.com/wp-content/uploads/2017/01/level.png"} title={"Level: " + card.level}></img>
                                <p>{card.level}</p>
                                <img className="specific_others_icon" src={"https://ygoprodeck.com/pics/"+ card.attribute +".jpg"} title={"Attr: " + card.attribute}/>
                                <img className="specific_others_icon" src={"https://ygoprodeck.com/pics/icons/race/" + card.race + ".png"} title={"Race: " + card.race}/>
                            </div>
                            
                        </div>
                        <div className="specific_atk_def">
                            <Chip label={"ATK: " + cardEnv.current_atk} />
                            <Chip label={"DEF: " + cardEnv.current_def} />
                        </div>
                    </div>
                    
                )
            }
        }

        const show_card_specific = () => {
            if (cardEnv) {
                const card = cardEnv.card
                return(
                    <div>
                        <h1 className="heading-name">{card.name}</h1>
                        {card_specific(card)}
                        <Divider variant="middle" />
                        <br/>
                        <p>
                            {card.description}
                        </p>
                    </div>
                )
            } else {
                return(
                    <p>Move the cursor to any card in the field or hand to view its detail.</p>
                )
            }
        }
        return (
            <div className="card_pic_container">
                {show_card_specific()}
            </div>
        )
        
    }
}

export default Detail;