import React, { Component } from "react";
import { connect } from 'react-redux';
import CardView from "../../../Card/CardView";
import { ENVIRONMENT, CARD_TYPE, SIDE, CARD_POS} from '../../../Card/utils/constant';
import { left_panel_mouse_in } from '../../../../Store/actions/mouseActions';
import { CSSTransitionGroup } from 'react-transition-group' // ES6
import './Side.css'



/**
 * Field for each player
 */
class Side extends React.Component {
    constructor (props) {
        super(props);
    }

    onMouseEnterHandler = (info) => {
        if (info.cardEnv.card) {
            this.props.mouse_in_view(info);
        }
    }


    render() {
        return <div className={"side_box_" + this.props.side}>{this.initializeSide()}</div>;
    }

    initializeSide = () => {
        const { side, environment} = this.props;

        if (!environment) {
            return <p>Loading</p>
        }
        let leftExtraIndex = [0, 7];
        let rightExtraIndex = [6, 13];
        let field_cards = []


        const cards = environment[side][ENVIRONMENT.MONSTER_FIELD].concat(environment[side][ENVIRONMENT.SPELL_FIELD])        
        let count = 0
        
        for (let i = 0; i < 14; i++) {
            if (i == 0 || leftExtraIndex.includes(i) || rightExtraIndex.includes(i)) {
                if (i == 6) {
                    field_cards.push(environment[side][ENVIRONMENT.GRAVEYARD])
                }
                field_cards.push(CARD_TYPE.PLACEHOLDER)
            } else {
                field_cards.push(cards[count])
                count++
            }
        }

        return field_cards.map((cardEnv, index) => {
            const cardView = () => {
                if (index == 6 && cardEnv.length > 0) {
                    return (
                        <CardView card={cardEnv[cardEnv.length - 1]} key="side_card" />
                    )
                }
                if (cardEnv.card) {
                    if (cardEnv.current_pos == CARD_POS.FACE) {
                        return (
                            <CardView card={cardEnv} key="side_card" />
                        )
                    } else if (cardEnv.current_pos == CARD_POS.SET) {
                        return <img className="side_card_set" key="side_card_set" src={'https://ms.yugipedia.com//f/fd/Back-Anime-ZX-2.png'}/>
                    }
                }
            }
            const info = {
                cardEnv: cardEnv
            }

            const special_class = (index) => {
                if (leftExtraIndex.includes(index) || rightExtraIndex.includes(index)) {
                    return ' special_class'
                } else {
                    return ''
                }
            }

            return (
                <div className={"card_box" + (side === SIDE.MINE ? "" : " opponent_side") + special_class(index)} 
                    key={"side-" + side + index} onMouseEnter={()=>this.onMouseEnterHandler(info)}>
                    <div className={"card_mask" + (cardEnv.current_pos != CARD_POS.SET ? "" : " side_card_set")}/>
                    <CSSTransitionGroup
                    transitionName="side"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}>
                        {cardView()}
                    </CSSTransitionGroup>

                </div>
            );
        });
    };
}

const mapStateToProps = state => {
    const { left_panel_cardEnv } = state.mouseReducer
    const { environment } = state.environmentReducer
    return { left_panel_cardEnv, environment };
};

const mapDispatchToProps = dispatch => ({
    // initialize: (environment) => dispatch(initialize_environment(environment)),
    mouse_in_view: (info) => dispatch(left_panel_mouse_in(info)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Side);