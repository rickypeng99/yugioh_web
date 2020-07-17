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
        return (environment) => {
            let cardArray = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
            return cardArray.map((card, index) => {
                return (
                    <div className="card_box" key={"side-" + side + index} style={{transform: side == sides.MINE ? "rotate(0deg)" : "rotate(180deg)"}}>
                        <img style={{height: '100%', width: '100%'}}src='https://ygoprodeck.com/pics/20721928.jpg'/>
                    </div>
                );
            });
        };
    };
}

export default Side;
