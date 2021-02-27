import React, { Component } from "react";
import { connect } from 'react-redux';

import './Side.css'

const sides = {
    MINE: "MINE",
    OPPONENT: "OPPONENT",
};



/**
 * Field for each player
 */
class Side extends React.Component {
    constructor (props) {
        super(props);
    }

    componentDidMount() {
        this.side = this.props.side;
        this.environment = this.props.environment;
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.environment.statusKey !== this.environment.statusKey) {
            this.environment = nextProps.environment;
        }
        return true;
    }

    render() {
        const environment = this.environment;
        if (this.environment) {
            return <div className="side_box">{this.field(environment)}</div>;
        } else {

            // initialize field skeleton
            this.field = this.initializeSide();
            return <div className="side_box">{this.field()}</div>;
        }
    }

    initializeSide = (environment) => {
        const { side } = this;

        // for testing
        function ConditionImage(props) {
            const { index, side } = props;
            const opponent_spell = [2, 3];
            const mine_spell = [9, 10, 11];
            if ((index == 10 && side == sides.OPPONENT) || (index == 3 && side == sides.MINE)) {
                return(
                    <img style={{height: '100%', width: '100%', position: 'absolute'}} src={'https://ygoprodeck.com/pics/20721928.jpg'}/>
                )
            } else if((opponent_spell.includes(index) && side == sides.OPPONENT) || (mine_spell.includes(index) && side == sides.MINE)) {
                return (
                    <img style={{height: '100%', width: '100%', position: 'absolute'}} src={'https://ms.yugipedia.com//f/fd/Back-Anime-ZX-2.png'}/>
                )
            }  else {
                return <p></p>
            }
            
        }


        return (environment) => {
            let cardArray = environment['MONSTER_FIELD'].my_cards.concat(environment['SPELL_FIELD'].my_cards);
            let leftExtraIndex = [0, 7];
            let rightExtraIndex = [6, 13];
            const cardBoxStyle = (index) => {
                const result = {};
                if (leftExtraIndex.includes(index) || rightExtraIndex.includes(index)) {
                    result.width = "100px";
                    result.height = "145px";
                }
                return Object.assign(result, {
                    transform: side === sides.MINE ? "rotate(0deg)" : "rotate(180deg)",
                    marginRight: leftExtraIndex.includes(index) ? "20px" : "0px",
                    marginLeft: rightExtraIndex.includes(index) ? "20px" : "0px",
                })
            };
            return cardArray.map((card, index) => {
                return (
                    <div className="card_box" key={"side-" + side + index} style={cardBoxStyle(index)}>
                        <div className="card_mask"/>
                        <ConditionImage index={index} side={side}/>
                    </div>
                );
            });
        };
    };
}

const mapStateToProps = state => {
    const { environment } = state.environmentReducer;
    return { environment };
};

const mapDispatchToProps = dispatch => ({
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Side);
