import React from 'react';
import { connect } from 'react-redux';
import { PHASE } from '../utils/constant'
import './PhaseSelector.css';

class PhaseSelector extends React.Component {
    constructor (props) {
        super(props);
    }


    render() {
        const { environment } = this.props; 
        const phaseArray = Object.keys(PHASE).map((phase) => {
            return (
                <div className = 'phase_button'>
                    {PHASE[phase]}
                </div>
            )
        })
        return(
            <div className = "turn_selector_container">
                {phaseArray}
            </div>
        )
    }
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
)(PhaseSelector);