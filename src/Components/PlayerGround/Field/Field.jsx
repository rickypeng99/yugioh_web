import React from 'react';
import { connect } from 'react-redux';
import Side from './Side/Side';
import './Field.css';
class Field extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            environment: {},
        }

    }

    render() {

        const {transformRotateX, scale, x_pos, y_pos} = this.props

        const fieldStyle = {
            transform: transformRotateX && scale && x_pos != undefined && y_pos !== undefined ? "perspective(1000px) rotateX(" + transformRotateX + ") scale(" + scale + ") translate(" + x_pos + "px, " + y_pos + "px)" : "perspective(1000px) rotateX(45deg) scale(1.0) translate(0px, 0px)",
        }
        return (
            <div className="field_wrap">
                <div className="field_box" style={fieldStyle}>
                    <Side side="OPPONENT"></Side>
                    <div style={{ height: "50px" }}></div>
                    <Side side="MINE" call_card_selector={this.props.call_card_selector}></Side>
                </div>
            </div>

        )
    }

}



export default Field;