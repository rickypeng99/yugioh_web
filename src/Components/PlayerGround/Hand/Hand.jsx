import React from 'react';
import { connect } from 'react-redux';
import { ENVIRONMENT, CARD_TYPE, SIDE} from '../../Card/utils/constant';
import { is_monster, is_spell, is_trap } from '../../Card/utils/utils'
import MonsterView from '../../Card/Monster/MonsterView';
import { normal_summon, set_summon } from '../../../Store/actions/environmentActions';

import './Hand.css'


class Hand extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // which card in the hand is clicked (to show the options)
            cardClicked: -1,
        }
    }


    cardOnClickHandler = (cardIndex) => {
        this.setState({cardClicked: cardIndex})
    }

    cardMouseMoveHandler = () => {
        this.setState({cardClicked: -1})
    }

    normalSummonOnclick = (info) => event => {
        this.props.dispatch_normal_summon(info)
        this.setState({cardClicked: -1})
        event.stopPropagation();

    }

    setSummonOnclick = (info) => event =>{
        this.props.dispatch_set_summon(info)
        this.setState({cardClicked: -1})
        event.stopPropagation();

    }

    render() {
        const {side, environment} = this.props;
        if (environment) {
            const hand_array = side == SIDE.MINE ? environment[side][ENVIRONMENT.HAND].map((cardEnv, cardIndex) => {
                if (is_monster(cardEnv.card.card_type)) {
                    const hasOptions = cardIndex == this.state.cardClicked ? "show_hand_option" : "no_hand_option"
                    const can_normal_summon = cardEnv.card.can_normal_summon(cardEnv.card, environment) ? "show_summon" : "no_hand_option"
                    const can_set = can_normal_summon ? "show_summon" : "no_hand_option"
                    const can_special_summon = cardEnv.card.can_special_summon(cardEnv.card, environment)? "show_summon" : "no_hand_option"
                    const info = {
                        side: side,
                        card: cardEnv,
                        index: cardIndex
                    }
                    return (
                        <div className = "hand_card" onClick={() => this.cardOnClickHandler(cardIndex)} onMouseLeave={() => this.cardMouseMoveHandler()}>
                            <div className={hasOptions}>
                                <div className={can_normal_summon} onClick={this.normalSummonOnclick(info)}>Summon</div>
                                <div className={can_special_summon}>Special</div>
                                <div className={can_set} onClick={this.setSummonOnclick(info)}>Set</div>
                            </div>
                            <MonsterView card={cardEnv} key={cardEnv.card.key + Math.random()} />
                        </div>
                    )
                } else if (is_spell(cardEnv.card.card_type)) {
                    return <p>fuck</p>
                } else {
                    //traps
                    return <p>fuck</p>
                }
            }) : environment[side][ENVIRONMENT.HAND].map(() => {
                return (
                    // back side for the opponent's
                    <img style={{width: '5%', marginRight: '10px'}} src={'https://ms.yugipedia.com//f/fd/Back-Anime-ZX-2.png'}/>
                )
            })
            return(
                <div className={side == SIDE.MINE ? "hand_container_mine" : "hand_container_opponent"}>
                    {hand_array}
                </div>
            )
        } else {
            return <p>loading</p>
        }
        
    }
}


const mapStateToProps = state => {
    const { environment } = state.environmentReducer;
    return { environment };
};

const mapDispatchToProps = dispatch => ({
    // initialize: (environment) => dispatch(initialize_environment(environment)),
    dispatch_normal_summon: (info) => dispatch(normal_summon(info)),
    dispatch_set_summon: (info) => dispatch(set_summon(info))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Hand);