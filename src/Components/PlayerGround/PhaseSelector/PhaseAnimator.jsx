import React from 'react';
import { connect } from 'react-redux';
import { PHASE, PHASE_START} from '../utils/constant'
import './PhaseSelector.css';

class PhaseAnimator extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            phaseClass: 'phase_before phase_invisible'
        }
    }

    broadcastPhase() {
        this.setState({phaseClass: 'phase_before'}, () => {
            setTimeout(() => this.setState({phaseClass: ''}, () => {
                setTimeout(()=> this.setState({phaseClass: 'phase_after'}, () => {
                    setTimeout(() => this.setState({phaseClass:'phase_before phase_invisible'}), 1000)
                }), 1000)
            }), 1000)
        })
    }
        

    componentDidMount() {
        this.broadcastPhase();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.game_meta.current_phase != this.props.game_meta.current_phase) {
            this.broadcastPhase();
        }
    }

    render() {
        const { game_meta } = this.props; 
        console.log(this.state.phaseClass)
        return(
            <div className = {`phase_block ${this.state.phaseClass}`}>
                <h1>{game_meta.current_phase}</h1>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const { environment } = state.environmentReducer;
    const { game_meta } = state.gameMetaReducer;
    return { environment, game_meta};
};

const mapDispatchToProps = dispatch => ({
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PhaseAnimator);