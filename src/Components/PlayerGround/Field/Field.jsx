import React from 'react';
import { connect } from 'react-redux';
import Side from './Side/Side';
import './Field.css';
class Field extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            environment: {},
        }

    }

    render() {
        return(
            <div className="field_box">
                <Side side="OPPONENT"></Side>
                <div style={{height: "30px"}}></div>
                <Side side="MINE"></Side>
            </div>
        )
    }

}



export default Field;