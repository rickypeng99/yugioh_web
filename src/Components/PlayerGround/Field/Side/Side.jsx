import React, { Component } from "react";
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
        this.state = {
            side: sides.MINE,
            environment: undefined,
        };
    }

    componentDidMount() {
        this.setState({side: this.props.side})
        if (this.props.environment) {
            this.setState({
                environment: this.props.environment,
            });
        }
    }

    render() {

        const { environment } = this.state;
        if (environment) {
            return <div className="side_box">{this.field(environment)}</div>;
        } else {

            // initialize field skeleton
            this.field = this.initializeSide();
            return <div className="side_box">{this.field()}</div>;
        }
    }

    initializeSide = () => {
        const { side } = this.state;

        function ConditionImage(props) {
            const { index, side } = props;
            const opponent_spell = [1, 2];
            const mine_spell = [6, 7, 8];
            if ((index == 7 && side == sides.OPPONENT) || (index == 2 && side == sides.MINE)) {
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
            let cardArray = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
            return cardArray.map((card, index) => {
                return (
                    <div className="card_box" key={"side-" + side + index} style={{transform: side == sides.MINE ? "rotate(0deg)" : "rotate(180deg)"}}>
                        <div className="card_mask"/>
                        <ConditionImage index={index} side={side}/>
                    </div>
                );
            });
        };
    };
}

export default Side;
