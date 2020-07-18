import React from 'react';
import { connect } from 'react-redux';
import { initialize_environment } from '../../Store/actions/environmentActions';
import Field from './Field/Field.jsx';
import Slider from '@material-ui/core/Slider';
import DeleteIcon from '@material-ui/icons/Delete';

import './Game.css';
/**
 * Highest component for one yugioh game
 */
class Game extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            environment: {},
            transformRotateX: '45deg',
            scale: 1.0,
            x_pos: 0, // transform-origin: 50%, 50%
            y_pos: 0
        }

    }

    componentDidMount() {
        // initialize environment
        this.initializeEnvironment(this.props.raw_environment);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextState.transformRotateX != this.state.transformRotateX) {
            console.log("shouldComponentUpdate: game: changedeg" + this.state.transformRotateX);
            console.log("shouldComponentUpdate: game: changedeg" + nextState.transformRotateX);
            return true;
        }
        // if (nextProps.environment.statusKey !== this.props.environment.statusKey) {
        //     console.log("shouldComponentUpdate: game: changeenv")
        //     this.setState({
        //         environment: nextProps.environment
        //     })
        // }
        return false;
    }


    initializeEnvironment = (raw) => {
        let environment = {
            'HAND': {
                monsters: {},
                spells: {},
                traps: {},
            },
            'MONSTER_FIELD': {
                monsters: {},
            },
            'SPELL_FIELD': {
                spells: {},
                traps: {},
                environment_spell: {},
            },
            'GRAVEYARD': {
                monsters: {},
                spells: {},
                traps: {},
            },
            'DECK': {
                monsters: {},
                spells: {},
                traps: {},
            },
            'EXTRA_DECK': {
                monsters: {}
            },
        }
        this.props.initialize(environment);
    }

    getTransformRotateXValue = (event, value) => {
        let valueString = `${value}deg`;
        if (valueString != this.state.transformRotateX) {
            this.setState({ transformRotateX: valueString });
        }
    };

    onChangeSize = (value) => {
        const scale = this.state.scale;
        if (value == 'increase') {
            if (scale < 1.4) {
                this.setState({ scale: scale + 0.1 });
                this.forceUpdate();
            }
        } else {
            if (scale > 0.7) {
                this.setState({ scale: scale - 0.1 });
                this.forceUpdate();
            }
        }
    }

    onChangePosition = (value) => {
        const { x_pos, y_pos } = this.state;
        const MOVE_AMOUNT = 10;
        if (value == 'up') {
            this.setState({ y_pos: y_pos - MOVE_AMOUNT });
            this.forceUpdate();
        } else if (value == 'down') {
            this.setState({ y_pos: y_pos + MOVE_AMOUNT });
            this.forceUpdate();
        } else if (value == 'left') {
            this.setState({ x_pos: x_pos - MOVE_AMOUNT });
            this.forceUpdate();
        } else if (value == 'right') {
            this.setState({ x_pos: x_pos + MOVE_AMOUNT });
            this.forceUpdate();
        } else {
            this.setState({ x_pos: 0, y_pos: 0 });
            this.forceUpdate();
        }
    }

    render() {

        const { transformRotateX, scale, x_pos, y_pos } = this.state;
        return (
            <div className="game_container">
                <div className="field_container">
                    <Field transformRotateX={transformRotateX} scale={scale} x_pos={x_pos} y_pos={y_pos}/>
                </div>
                <div className="settings_container">
                    <div className="translate_button_container">
                        <div className='vertical_container'>
                            <div className='translate_button' onClick={() => this.onChangePosition('up')}>
                                <span className="material-icons">
                                    expand_less
                                </span>
                            </div>
                        </div>
                        <div className='horizontal_container'>
                            <div className='translate_button' onClick={() => this.onChangePosition('left')}>
                                <span className="material-icons">
                                    navigate_before
                                </span>
                            </div>
                            {/* adjusting the poisition back to the original */}
                            <div className='translate_button' onClick={() => this.onChangePosition('return')}>
                                <span className="material-icons">
                                    adjust
                                </span>
                            </div>
                            <div className='translate_button' onClick={() => this.onChangePosition('right')}>
                                <span className="material-icons">
                                    navigate_next
                                </span>
                            </div>
                        </div>
                        <div className='vertical_container'>
                            <div className='translate_button' onClick={() => this.onChangePosition('down')}>
                                <span className="material-icons">
                                    expand_more
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="size_button" onClick={() => this.onChangeSize('increase')}>
                        <span className="material-icons">
                            add
                        </span>
                    </div>
                    <div className="size_button" onClick={() => this.onChangeSize('decrease')}>
                        <span className="material-icons">
                            remove
                        </span>
                    </div>
                    <div className="slider_container">
                        <Slider
                            orientation="vertical"
                            defaultValue={45}
                            aria-labelledby="vertical-slider"
                            onChange={this.getTransformRotateXValue}
                        />
                    </div>

                </div>

            </div>
        )
    }

}

const mapStateToProps = state => {
    const { environment } = state.environmentReducer;
    return { environment };
};

const mapDispatchToProps = dispatch => ({
    initialize: (environment) => dispatch(initialize_environment(environment)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Game);