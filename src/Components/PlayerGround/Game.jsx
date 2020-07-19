import React from 'react';
import { connect } from 'react-redux';
import { initialize_environment } from '../../Store/actions/environmentActions';
import Field from './Field/Field.jsx';
import Settings from './Components/Settings.jsx';

import './Game.css';
/**
 * Highest component for one yugioh game
 */
class Game extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
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
        if (nextProps.environment.statusKey !== this.environment.statusKey) {
            this.environment = nextProps.environment;
        }
        return true;
    }


    initializeEnvironment = (raw) => {
        let environment = {
            'HAND': {
                cards: [],
            },
            'MONSTER_FIELD': {
                cards: [],
            },
            'SPELL_FIELD': {
                cards: [],
            },
            'GRAVEYARD': {
                cards: [],
            },
            'DECK': {
                cards: [],
            },
            'EXTRA_DECK': {
                cards: [],
            },
            monsters: {}, 
            spells: {},
            traps: {},
            environment_spell: {},            
        }
        this.environment = environment;
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
                <Settings onChangePosition={this.onChangePosition} onChangeSize={this.onChangeSize} getTransformRotateXValue={this.getTransformRotateXValue}/>
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