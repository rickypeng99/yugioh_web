import React from 'react';
/**
 * Real-time environment container for a monster card
 */
class MonsterView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            card: undefined
        }
    }

    componentDidMount() {
        this.environment = this.props.environment;
        this.setState({card: this.props.card});
    }

    shouldComponentUpdate(nextProps) {
        // const {current_place} = this.state;
        // if (nextProps.environment.current_place.monsters[this.props.id].statusKey != current_place.monsters[this.props.id].statusKey) {
        //     // status changes
        //     let consequence = nextProps.environment.current_place.monsters[this.props.id].consequence;
        //     if (consequence) {
        //         // let "this" in the opponent's card's effect points to the current card
        //         this.consequence.apply(this);
        //     }
        // }
        if (nextProps.environment.statusKey !== this.environment.statusKey) {
            this.environment = nextProps.environment;
        }
        return true;
    }

    // componentDidUpdate(prevProps) {
    //     // monster needs to react to some situations
    // }

    // /**
    //  * Life cycle of a monster
    //  */

    // summon() {
    //     if (this.card.effective.summon) {
    //         // If effective upon summon
    //         this.card.onSummon.apply(this);
    //     }
    // }

    // mainPhase() {
    //     if (this.card.effective.mainPhase) {
    //         // can use effect in mainphase
    //     }
    // }

// 1.傷害步驟開始時
// 2.傷害計算前
// 3.傷害計算時
// 4.傷害計算後
// 5.傷害步驟結束時
    // battleBeforeCalculate() {
    //     if (this.card.effective.battleBeforeCalculate) {
    //         //can use effect in battle
    //     }
    // }

    // battleAfterCalculate() {
    //     if (this.card.effective.battleAfterCalculate) {

    //     }
    // }

    // /**
    //  * A monster uses its effect
    //  */
    // useEffect = () => {
    //     let environments = this.props.environments;
    //     let consequences = [];
    //     for (let environment of environments) {
    //         consequences.push(this.state.card.useEffect(environment));
    //     }
    //     // broadcast the effects to other cards
    //     // this.props.useEffect(this.props.id, consequences);
    // }

    // /**
    //  * A monster is being effected by an effect.
    //  */
    // effected = (consequence) => {
    //     // consequences will be returned before the effected() is called
    //     if (!consequence) return;
    //     for (let impact_key of Object.keys(consequence)) {
    //         let actual_effect = this.state.card.effected(impact_key); 
            
    //         if (actual_effect.status !== 'invulnerable') {
    //             if (actual_effect.effect) {
    //                 actual_effect.effect.apply(this, consequence.arguments);
    //             } else {
    //                 IMPACT_DICT[impact_key].apply(this, consequence.arguments);
    //             }
    //         }
    //     }    
    // }

 



    render() {
        const {card} = this.state;
        if (card) {
            return (
                <img style={{width: '10%'}} src={'https://ygoprodeck.com/pics/' + card.card.key + '.jpg'}/>
            )
        } else {
            return (
                <p>Loading...</p>
            )
        }
        
    }

}

export default MonsterView;
