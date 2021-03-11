import React from 'react';
import Game from '../PlayerGround/Game';
import LeftPanel from './LeftPanel/LeftPanel';
import { exchange_deck_with_opponent } from '../../Client/Sender'
import { shuffle } from '../PlayerGround/utils/utils'
import { PHASE_START } from '../PlayerGround/utils/constant'
import { initialize_meta } from '../../Store/actions/gameMetaActions'
import { connect } from 'react-redux';
import './Main.css';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
        };
    }


    componentDidUpdate(prevProps) {

        if (this.props.opponent_id && this.props.opponent_id != prevProps.opponent_id) {
            // matched with an opponent; Can right now exchange each other's environment
            // test deck, contains 15 eheros.
            let heros = [20721928, 21844576, 58932615, 84327329, 89943723, 20721928, 21844576, 58932615, 84327329, 89943723, 20721928, 21844576, 58932615, 84327329, 89943723]
            heros = shuffle(heros)
            this.my_deck = heros
            exchange_deck_with_opponent(this.my_deck, this.props.opponent_id)
            console.log(this.props)
        }

        if (this.props.opponent_deck && this.props.opponent_deck != prevProps.opponent_deck) {

            this.raw_environment = {
                // put the cards and players in here
                decks: [
                    this.my_deck.slice(5),
                    this.props.opponent_deck.slice(5)
                ],
                hands: [
                    this.my_deck.slice(0, 5),
                    this.props.opponent_deck.slice(0, 5)
                ]
            };
            console.log(this.props)
            this.raw_meta = {
                [this.props.my_id]: {
                    hp: 8000
                },
                [this.props.opponent_id]: {
                    hp: 8000
                },
                current_turn: this.props.player_starts,
                current_phase: PHASE_START
            }
            this.props.dispatch_initialize_meta(this.raw_meta)
            this.setState({loaded: true});
        }

    }

    render() {
        const { loaded } = this.state;
        const raw_environment = this.raw_environment;

        if (loaded) {
            return(
                <div className="main_container">
                    <LeftPanel />
                    <Game raw_environment={raw_environment} />
                </div>
            )
        } else {
            return(
                <div className="main_waiting">
                    <p>Please wait for an opponent....</p>
                </div>
            )
        }
    }
}

const mapStateToProps = state => {
    const { opponent_id, my_id, player_starts, opponent_deck } = state.serverReducer;
    return { opponent_id, my_id, player_starts, opponent_deck };
};

const mapDispatchToProps = dispatch => ({
    // initialize: (environment) => dispatch(initialize_environment(environment)),
    dispatch_initialize_meta: (game_meta) => dispatch(initialize_meta(game_meta))

});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Main);