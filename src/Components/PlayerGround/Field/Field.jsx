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

    shouldComponentUpdate(nextProps) {
        if (nextProps.transformRotateX != this.transformRotateX) {
            this.transformRotateX = nextProps.transformRotateX
        } 
        if (nextProps.scale != this.scale) {
            this.scale = nextProps.scale;
        }
        if (nextProps.x_pos != this.x_pos || nextProps.y_pos != this.y_pos) {
            this.x_pos = nextProps.x_pos;
            this.y_pos = nextProps.y_pos;
        }
        return true;

    }


    render() {
        const fieldStyle = {
            transform: this.transformRotateX && this.scale && this.x_pos != undefined && this.y_pos != undefined ? "perspective(1000px) rotateX(" + this.transformRotateX + ") scale(" + this.scale + ") translate(" + this.x_pos + "px, " + this.y_pos + "px)" : "perspective(1000px) rotateX(45deg) scale(1.0) translate(0px, 0px)",
        }
        return (
            <div className="field_wrap">
                <div className="field_box" style={fieldStyle}>
                    <Side side="OPPONENT"></Side>
                    <div style={{ height: "50px" }}></div>
                    <Side side="MINE"></Side>
                </div>
            </div>

        )
    }

}



export default Field;