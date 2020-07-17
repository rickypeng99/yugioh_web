import React from 'react';
import { ATTRIBUTE, ENVIRONMENT } from '../utils/constant';
import { IMPACT_DICT } from '../utils/impact';

/**
 * Real-time environment container for a monster card
 */
class MonsterEnv extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            card: undefined,
            current_atk: 0,
            current_def: 0,
            current_attribute: ATTRIBUTE.LIGHT,
            current_place: ENVIRONMENT.DECK
        }
    }

    componentDidMount() {
        this.card_type = this.props.card_type;

        // create object based on type
        let card = this.props.card;

        this.setState({
            card: card,
            current_atk: card.atk,
            current_def: card.def,
            current_attribute: card.attribute
        })
    }

    shouldComponentUpdate(nextProps) {
        const {current_place} = this.state;
        if (nextProps.environment.current_place.monsters[this.props.id].statusKey != current_place.monsters[this.props.id].statusKey) {
            // status changes
            let consequence = nextProps.environment.current_place.monsters[this.props.id].consequence;
            if (consequence) {
                // let "this" in the opponent's card's effect points to the current card
                this.consequence.apply(this);
            }
        }
    }

    componentDidUpdate(prevProps) {
        // monster needs to react to some situations
    }

    /**
     * Life cycle of a monster
     */

    summon() {
        if (this.card.effective.summon) {
            // If effective upon summon
            this.card.onSummon.apply(this);
        }
    }

    mainPhase() {
        if (this.card.effective.mainPhase) {
            // can use effect in mainphase
        }
    }

// 1.傷害步驟開始時
// 2.傷害計算前
// 3.傷害計算時
// 4.傷害計算後
// 5.傷害步驟結束時
    battleBeforeCalculate() {
        if (this.card.effective.battleBeforeCalculate) {
            //can use effect in battle
        }
    }

    battleAfterCalculate() {
        if (this.card.effective.battleAfterCalculate) {

        }
    }

    /**
     * A monster uses its effect
     */
    useEffect = () => {
        let environments = this.props.environments;
        let consequences = [];
        for (let environment of environments) {
            consequences.push(this.state.card.useEffect(environment));
        }
        // broadcast the effects to other cards
        // this.props.useEffect(this.props.id, consequences);
    }

    /**
     * A monster is being effected by an effect.
     */
    effected = (consequence) => {
        // consequences will be returned before the effected() is called
        if (!consequence) return;
        for (let impact_key of Object.keys(consequence)) {
            let actual_effect = this.state.card.effected(impact_key); 
            
            if (actual_effect.status !== 'invulnerable') {
                if (actual_effect.effect) {
                    actual_effect.effect.apply(this, consequence.arguments);
                } else {
                    IMPACT_DICT[impact_key].apply(this, consequence.arguments);
                }
            }
        }    
    }

 



    render() {
        const {card} = this;
        return (
            <h1>
                {card.name}
            </h1>
        )
    }

}

export default MonsterEnv;