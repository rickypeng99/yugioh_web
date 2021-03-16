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


    handlePhaseChange = (next_phase, phase_button_class) => (event) => {

        if (phase_button_class == 'phase_button_disabled') {
            event.preventDefault();
            return
        }

        const info = {
            next_phase: next_phase
        }

        emit_change_phase(info)
        // update self
        this.props.dispatch_change_phase(info);
    }

    render() {
        const phaseArray = Object.keys(PHASE).map((phase) => {

            const phase_button_class = (phase) => {
                
                const current_phase = this.props.game_meta.current_phase

                if (current_phase == phase) {
                    return 'phase_button_current'
                }

                if (phase == PHASE.DRAW_PHASE || 
                    phase == PHASE.STANDBY_PHASE ||
                    current_phase == PHASE.DRAW_PHASE ||
                    current_phase == PHASE.STANDBY_PHASE) {
                    return 'phase_button_disabled'
                }


                if (Object.values(PHASE).indexOf(current_phase) 
                < Object.values(PHASE).indexOf(phase)) {
                    return `phase_button_enabled phase_button_enabled_${phase}`
                } else {
                    return 'phase_button_disabled'
                }
            }

            return (
                <div className = {`phase_button ${phase_button_class(PHASE[phase])}`} 
                    onClick={() => this.handlePhaseChange(PHASE[phase], phase_button_class)}>
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
    const { game_meta } = state.gameMetaReducer;
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