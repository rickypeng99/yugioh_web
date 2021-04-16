import React from 'react';
import { connect } from 'react-redux';

/**
 * redux functions
 */
import { initialize_environment, draw_card } from '../../Store/actions/environmentActions';
import { change_phase } from '../../Store/actions/gameMetaActions'

import { create_card, load_card_to_environment } from '../Card/utils/utils'
import { CARD_TYPE, SIDE, ENVIRONMENT } from '../Card/utils/constant'
import { PHASE, PHASE_START } from '../PlayerGround/utils/constant'

// sender functions
import { emit_change_phase } from '../../Client/Sender'

import Field from './Field/Field.jsx';
import Hand from './Hand/Hand.jsx';
import Settings from './Settings/Settings.jsx';
import PhaseSelector from './PhaseSelector/PhaseSelector'
import HealthBar from './HealthBar/HealthBar'
import CardSelector from './CardSelector/CardSelector'
import PhaseAnimator from './PhaseSelector/PhaseAnimator'
import './Game.css';
import { TOOL_TYPE } from '../../Store/actions/actionTypes';
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
            y_pos: -100,
            show_card_selector: false,
            card_selector_info: undefined,
        }
    }

    componentDidMount() {
        // initialize environment
        this.initializeEnvironment(this.props.raw_environment);
    }

    auto_next_phase(next_phase) {

        const WAIT_TIME = 2100
        setTimeout(() => {
            // change to next phase
            const info = {
                next_phase: next_phase
            }
            // this.props.dispatch_change_phase(info);
            emit_change_phase(info);
            this.props.dispatch_change_phase(info);
        }, WAIT_TIME);
    }

    componentDidUpdate(prevProps) {
        const current_phase = this.props.game_meta.current_phase
        if (current_phase == PHASE_START) {
            this.auto_next_phase(PHASE.DRAW_PHASE)
        }

        if (current_phase != prevProps.game_meta.current_phase) {
            if(current_phase == PHASE.DRAW_PHASE) {
                const info = {
                    side: this.props.my_id == this.props.game_meta.current_turn ? SIDE.MINE : SIDE.OPPONENT,
                    amount: 1
                }
                this.props.dispatch_draw_card(info);
                this.auto_next_phase(PHASE.STANDBY_PHASE)
            } else if(current_phase == PHASE.STANDBY_PHASE) {
                this.auto_next_phase(PHASE.MAIN_PHASE_1)
            } else if(current_phase == PHASE.END_PHASE) {
                this.auto_next_phase(PHASE_START)
            }
        }
           
    }



    initializeEnvironment = (raw_environment) => {
        const make_placeholders = () => {
            let placeholderArray = Array(5).fill(CARD_TYPE.PLACEHOLDER)
            return placeholderArray;
        }

        const loaded_card_env = raw_environment.decks.map(deck => {
            return deck.deck.map(card_key => {
                return load_card_to_environment(create_card(card_key));
            })
        })

        const load_extra_card_env = raw_environment.decks.map(deck => {
            return deck.extra_deck.map(card_key => {
                return load_card_to_environment(create_card(card_key));
            })
        })
        
        const mine_index = raw_environment.first_side == SIDE.MINE ? 0 : 1;
        const opponent_index = raw_environment.first_side == SIDE.OPPONENT ? 0 : 1;

        let environment = {

            [SIDE.MINE]: {
                [ENVIRONMENT.HAND]: 
                   loaded_card_env[mine_index].slice(0, 5),
                [ENVIRONMENT.MONSTER_FIELD]:
                    make_placeholders(),
                [ENVIRONMENT.SPELL_FIELD]:
                    make_placeholders(),
                [ENVIRONMENT.GRAVEYARD]:
                    [],
                [ENVIRONMENT.DECK]:
                    loaded_card_env[mine_index].slice(5),
                [ENVIRONMENT.EXTRA_DECK]:
                    load_extra_card_env[mine_index].slice(0, 3),
                hp: 8000,
            },
            [SIDE.OPPONENT]: {
                [ENVIRONMENT.HAND]: 
                    loaded_card_env[opponent_index].slice(0, 5),
                [ENVIRONMENT.MONSTER_FIELD]:
                    make_placeholders(),
                [ENVIRONMENT.SPELL_FIELD]:
                    make_placeholders(),
                [ENVIRONMENT.GRAVEYARD]:
                    [],
                [ENVIRONMENT.DECK]:
                    loaded_card_env[opponent_index].slice(5),
                [ENVIRONMENT.EXTRA_DECK]:
                    load_extra_card_env[opponent_index].slice(3),
                hp: 8000
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

    // close_card_selector = () => {
    //     this.setState({show_card_selector: false})
    // }

    // call_card_selector = (info) => {
    //     this.setState({show_card_selector: true, card_selector_info: info})
    // }

    render() {

        const { transformRotateX, scale, x_pos, y_pos} = this.state;
        const { tools } = this.props;
        return (
            <div className="game_container">
                <div className="field_settings_container">
                    <PhaseAnimator />
                    <CardSelector key={"selector-" + Math.random()} show_card_selector={tools[TOOL_TYPE.CARD_SELECTOR].status} card_selector_info={tools[TOOL_TYPE.CARD_SELECTOR].info}/>
                    <HealthBar side='MINE' />
                    <HealthBar side='OPPONENT' />
                    <PhaseSelector />
                    <div className="hand_field_container">
                        <Hand side='OPPONENT' />
                        <div className="field_container">
                            <Field transformRotateX={transformRotateX} scale={scale} x_pos={x_pos} y_pos={y_pos} call_card_selector={this.call_card_selector}/>
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
    const { game_meta } = state.gameMetaReducer;
    const { my_id } = state.serverReducer;
    const { tools } = state.toolReducer;
    return { environment, game_meta, my_id, tools};
};

const mapDispatchToProps = dispatch => ({
    initialize: (environment) => dispatch(initialize_environment(environment)),
    dispatch_draw_card: (info) => dispatch(draw_card(info)),
    dispatch_change_phase: (info) => dispatch(change_phase(info))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Game);