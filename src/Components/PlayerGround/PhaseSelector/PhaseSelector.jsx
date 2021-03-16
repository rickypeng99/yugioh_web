import React from 'react';
import { connect } from 'react-redux';
import { PHASE } from '../utils/constant'
import { change_phase } from '../../../Store/actions/gameMetaActions'
import { emit_change_phase } from '../../../Client/Sender'
import './PhaseSelector.css';

class PhaseSelector extends React.Component {
    constructor (props) {
        super(props);
    }

    handlePhaseChange = (next_phase) => {
        const info = {
            next_phase: next_phase
        }

        emit_change_phase(info)
        // update self
        this.props.dispatch_change_phase(info);
    }

    render() {
        const phaseArray = Object.keys(PHASE).map((phase) => {
            return (
                <div className = 'phase_button' onClick={() => this.handlePhaseChange(PHASE[phase])}>
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
    const { environment, game_meta } = state.environmentReducer;
    return { environment, game_meta };
};

const mapDispatchToProps = dispatch => ({
    // initialize: (environment) => dispatch(initialize_environment(environment)),
    dispatch_change_phase: (info) => dispatch(change_phase(info))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PhaseSelector);