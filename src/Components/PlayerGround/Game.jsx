import React from 'react';
import { connect } from 'react-redux';
import { initialize_environment } from '../../Store/actions/environmentActions';
// import { monster_database } from '../Card/Monster/MonsterData/index';
// import MonsterEnv from '../Card/Monster/MonsterEnv.js';
import { create_card, load_card_to_environment } from '../Card/utils/utils'
import { CARD_TYPE, SIDE, ENVIRONMENT } from '../Card/utils/constant'
import Field from './Field/Field.jsx';
import Hand from './Hand/Hand.jsx';
import Settings from './Settings/Settings.jsx';
import PhaseSelector from './PhaseSelector/PhaseSelector'
import HealthBar from './HealthBar/HealthBar'
import CardSelector from './CardSelector/CardSelector'
import PhaseAnimator from './PhaseSelector/PhaseAnimator'
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
            y_pos: -180,
            show_card_selector: false,
            card_selector_info: undefined,
        }
    }

    componentDidMount() {
        // initialize environment
        this.initializeEnvironment(this.props.raw_environment);
    }



    initializeEnvironment = (raw_environment) => {
        const make_placeholders = () => {
            let placeholderArray = []
            for(let i = 0; i < 5; i++) {
                placeholderArray.push(CARD_TYPE.PLACEHOLDER)
            }
            return placeholderArray;
        }
        

        let environment = {

            [SIDE.MINE]: {
                [ENVIRONMENT.HAND]: 
                    raw_environment.hands[0].map((card_key, index) => {
                        // create an object based on id, inject it into monsterenv
                        this.current_game_unique_count++;
                        return load_card_to_environment(create_card(card_key));
                    }),
                [ENVIRONMENT.MONSTER_FIELD]:
                    make_placeholders(),
                [ENVIRONMENT.SPELL_FIELD]:
                    make_placeholders(),
                [ENVIRONMENT.GRAVEYARD]:
                    [],
                [ENVIRONMENT.DECK]:
                    raw_environment.decks[0].map((card_key) => {
                        return create_card(card_key)
                    }),
                [ENVIRONMENT.EXTRA_DECK]:
                    [],
            },
            [SIDE.OPPONENT]: {
                [ENVIRONMENT.HAND]: 
                    raw_environment.hands[1].map((card_key, index) => {
                        // create an object based on id, inject it into monsterenv
                        this.current_game_unique_count++;
                        return load_card_to_environment(create_card(card_key));
                    }),
                [ENVIRONMENT.MONSTER_FIELD]:
                    make_placeholders(),
                [ENVIRONMENT.SPELL_FIELD]:
                    make_placeholders(),
                [ENVIRONMENT.GRAVEYARD]:
                    [],
                [ENVIRONMENT.DECK]:
                    raw_environment.decks[1].map((card_key) => {
                        return create_card(card_key)
                    }),
                [ENVIRONMENT.EXTRA_DECK]:
                    [],
            },
            monsters: {},
            spells: {},
            traps: {},
            environment_spell: {},
            // statusKey: Math.random(),
        }
        console.log(environment)
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
                //this.forceUpdate();
            }
        } else {
            if (scale > 0.7) {
                this.setState({ scale: scale - 0.1 });
                //this.forceUpdate();
            }
        }
    }

    onChangePosition = (value) => {
        const { x_pos, y_pos } = this.state;
        const MOVE_AMOUNT = 10;
        if (value === 'up') {
            this.setState({ y_pos: y_pos - MOVE_AMOUNT });
            //this.forceUpdate();
        } else if (value === 'down') {
            this.setState({ y_pos: y_pos + MOVE_AMOUNT });
            //this.forceUpdate();
        } else if (value === 'left') {
            this.setState({ x_pos: x_pos - MOVE_AMOUNT });
            //this.forceUpdate();
        } else if (value === 'right') {
            this.setState({ x_pos: x_pos + MOVE_AMOUNT });
            //this.forceUpdate();
        } else {
            this.setState({ x_pos: 0, y_pos: 0 });
            //this.forceUpdate();
        }
    }

    close_card_selector = () => {
        this.setState({show_card_selector: false})
    }

    call_card_selector = (info) => {
        this.setState({show_card_selector: true, card_selector_info: info})
    }

    render() {

        const { transformRotateX, scale, x_pos, y_pos, show_card_selector, card_selector_info } = this.state;
        return (
            <div className="game_container">
                <div className="field_settings_container">
                    <PhaseAnimator />
                    <CardSelector key={"selector-" + Math.random()} show_card_selector={show_card_selector} close_card_selector={this.close_card_selector} card_selector_info={card_selector_info}/>
                    <HealthBar side='MINE' />
                    <HealthBar side='OPPONENT' />
                    <PhaseSelector />
                    <div className="hand_field_container">
                        <Hand side='OPPONENT' />
                        <div className="field_container">
                            <Field transformRotateX={transformRotateX} scale={scale} x_pos={x_pos} y_pos={y_pos} />
                        </div>
                        <Hand side='MINE' call_card_selector={this.call_card_selector}/>
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
    initialize: (environment) => dispatch(initialize_environment(environment)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Game);