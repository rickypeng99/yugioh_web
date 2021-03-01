import React, { Component } from "react";
import { connect } from 'react-redux';
import MonsterView from "../../../Card/Monster/MonsterView";
import { ENVIRONMENT, CARD_TYPE, SIDE} from '../../../Card/utils/constant';
import './Side.css'



/**
 * Field for each player
 */
class Side extends React.Component {
    constructor (props) {
        super(props);
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
                field_cards.push(CARD_TYPE.PLACEHOLDER)
            } else {
                field_cards.push(cards[count])
                count++
            }
        }

        const cardBoxStyle = (index) => {
            const result = {};
            if (leftExtraIndex.includes(index) || rightExtraIndex.includes(index)) {
                result.width = "80%";
                result.height = "80%";
                result.margin = "auto"
            }
            return Object.assign(result, {
                transform: side === SIDE.MINE ? "rotate(0deg)" : "rotate(180deg)",
                // marginRight: leftExtraIndex.includes(index) ? "5px" : "0px",
                // marginLeft: rightExtraIndex.includes(index) ? "5px" : "0px",
            })
        };

        return field_cards.map((cardEnv, index) => {
            const cardView = () => {
                if (cardEnv.card) {
                    return <MonsterView card={cardEnv} />
                }
            }
            return (
                <div className="card_box" key={"side-" + side + index} style={cardBoxStyle(index)}>
                    <div className="card_mask"/>
                    {cardView()}
                </div>
            );
        });
    };
}

const mapStateToProps = state => {
    const { environment } = state.environmentReducer;
    return { environment };
};

const mapDispatchToProps = dispatch => ({
    // initialize: (environment) => dispatch(initialize_environment(environment)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Side);