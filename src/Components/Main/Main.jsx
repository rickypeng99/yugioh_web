import React from 'react';
import Game from '../PlayerGround/Game';
import LeftPanel from './LeftPanel/LeftPanel';
import { exchange_deck_with_opponent } from '../../Client/Sender'
import { shuffle } from '../PlayerGround/utils/utils'
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
            let heros = [20721928, 21844576, 58932615, 84327329, 89943723]
            heros = shuffle(heros)
            this.my_deck = heros
            console.log(this.my_deck)
            exchange_deck_with_opponent(this.my_deck, this.props.opponent_id)
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
    
            this.setState({loaded: true});
        }

    }
    // componentDidMount() {
    //     // for testings
    //     // 5 different eheros

    //     const heros = [20721928, 21844576, 58932615, 84327329, 89943723]
    //     let deck_first_player = [];
    //     let deck_second_player = [];
    //     for (let i = 0; i < 10; i++) {
    //         deck_first_player.push(heros[i%5]);
    //         deck_second_player.push(heros[i%5]);
    //     }

    //     this.raw_environment = {
    //         // put the cards and players in here
    //         decks: [
    //             deck_first_player.slice(5),
    //             deck_second_player.slice(5)
    //         ],
    //         hands: [
    //             deck_first_player.slice(0, 5),
    //             deck_second_player.slice(0, 5)
    //         ]
    //     };

    //     this.setState({loaded: true});
    // }

    //
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
    const { opponent_id, opponent_deck } = state.serverReducer;
    return { opponent_id, opponent_deck };
};

const mapDispatchToProps = dispatch => ({
    // initialize: (environment) => dispatch(initialize_environment(environment)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Main);