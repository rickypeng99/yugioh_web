import React from 'react';
import { connect } from 'react-redux';
import ENV from '../../Store/actions/environment/environmentActions';
import { normal_monster_database } from '../Card/Monster/MonsterData/index';
import MonsterEnv from '../Card/Monster/MonsterEnv.js';
import Field from './Field/Field.jsx';
import Hand from './Hand/Hand.jsx';
import Settings from './Components/Settings.jsx';

import './Game.css';
/**
 * Highest component for one yugioh game
 */
class Game extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            transformRotateX: '45deg', // rotateX(45deg)
            scale: 1.0, // scale(1.0)
            x_pos: 0, // translate(0px, 0px)
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
            // console.log(this.environment)
        }
        return true;
    }


    initializeEnvironment = (raw_environment) => {
        let environment = {
            'HAND': {
                my_cards: raw_environment.hands[0].map((card, index) => {
                    // create an object based on id, inject it into monsterenv
                    return new MonsterEnv(normal_monster_database[card]());
                }),
                opponent_cards: raw_environment.hands[1].map((card, index) => {
                    return new MonsterEnv(normal_monster_database[card]());
                }),
            },
            'MONSTER_FIELD': {
                my_cards: [],
                opponent_cards: []
            },
            'SPELL_FIELD': {
                my_cards: [],
                opponent_cards: []
            },
            'GRAVEYARD': {
                my_cards: [],
                opponent_cards: []
            },
            'DECK': {
                my_cards: raw_environment.decks[0].map((card, index) => {
                    return normal_monster_database[card]();
                }),
                opponent_cards: raw_environment.decks[1].map((card, index) => {
                    return normal_monster_database[card]();
                }),
            },
            'EXTRA_DECK': {
                my_cards: [],
                opponent_cards: []
            },
            monsters: {},
            spells: {},
            traps: {},
            environment_spell: {},
            statusKey: Math.random(),
        }
        this.environment = environment;
        this.props.initialize(environment);
    }

    getTransformRotateXValue = (event, value) => {
        let valueString = `${value}deg`;
        if (valueString !== this.state.transformRotateX) {
            this.setState({ transformRotateX: valueString });
        }
    };

    onChangeSize = (value) => {
        const scale = this.state.scale;
        if (value === 'increase') {
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
        if (value === 'up') {
            this.setState({ y_pos: y_pos - MOVE_AMOUNT });
            this.forceUpdate();
        } else if (value === 'down') {
            this.setState({ y_pos: y_pos + MOVE_AMOUNT });
            this.forceUpdate();
        } else if (value === 'left') {
            this.setState({ x_pos: x_pos - MOVE_AMOUNT });
            this.forceUpdate();
        } else if (value === 'right') {
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
                <div className="field_settings_container">
                    <div className="hand_field_container">
                        <Hand side='OPPONENT' />
                        <div className="field_container">
                            <Field transformRotateX={transformRotateX} scale={scale} x_pos={x_pos} y_pos={y_pos} />
                        </div>
                        <Hand side='MINE' />
                    </div>
                    <Settings onChangePosition={this.onChangePosition} onChangeSize={this.onChangeSize} getTransformRotateXValue={this.getTransformRotateXValue} />
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
    initialize: (environment) => dispatch(ENV.initialize_environment(environment)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Game);