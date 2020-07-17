import React from 'react';
import { connect } from 'react-redux';
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
                <p>fuck</p>
            </div>
        )
    }

}



export default Field;