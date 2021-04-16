import React from 'react';
import Game from '../PlayerGround/Game';
import LeftPanel from './LeftPanel/LeftPanel';
import { exchange_deck_with_opponent } from '../../Client/Sender'
import { shuffle } from '../PlayerGround/utils/utils'
import { PHASE_START } from '../PlayerGround/utils/constant'
import { initialize_meta } from '../../Store/actions/gameMetaActions'
import { connect } from 'react-redux';
import './Main.css';
import { SIDE } from '../Card/utils/constant';
import Sky from 'react-sky';

// images
import yugi_sky from './assets/yugi_sky.png'
import jaden_sky from './assets/jaden_sky.png'
import neos_sky from './assets/neos_sky.png'
import yusei_sky from './assets/yusei_sky.png'

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
            // let heros = [24094653, 24094653, 24094653, 24094653, 24094653, 20721928, 21844576, 58932615, 84327329, 89943723, 20721928, 21844576, 58932615, 84327329, 89943723, 20721928, 21844576, 58932615, 84327329, 89943723]
            
            // for fusion tests
            let heros = [24094653, 24094653, 24094653, 58932615, 58932615, 58932615, 21844576, 21844576, 21844576]
            
            heros = shuffle(heros)
            this.my_deck = {
                deck: heros,
                extra_deck: [35809262, 35809262, 35809262]
            }
            exchange_deck_with_opponent(this.my_deck)
        }

        if (this.props.opponent_deck && this.props.opponent_deck != prevProps.opponent_deck) {

            this.raw_environment = {
                decks: [
                    // put the cards and players in here
                    this.props.my_id == this.props.player_starts ? this.my_deck : this.props.opponent_deck,
                    this.props.opponent_id == this.props.player_starts ? this.my_deck : this.props.opponent_deck
                ],
                first_side: this.props.my_id == this.props.player_starts ? SIDE.MINE : SIDE.OPPONENT
            }
            
            this.raw_meta = {
                current_turn: this.props.player_starts,
                current_phase: PHASE_START,
                my_id: this.props.my_id,
                opponent_id: this.props.opponent_id
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
                    <div style={{position: 'absolute', width: '100%', height: '100%', zIndex: '-10'}}>
                        <Sky
                            images={{
                                /* FORMAT AS FOLLOWS */
                                0: yugi_sky,  /* You can pass as many images as you want */
                                1: jaden_sky,
                                2: yusei_sky, /* you can pass images in any form: link, imported via webpack... */
                                3: neos_sky
                                /* 4: your other image... */
                                /* 5: your other image... */
                                /* ... */
                            }}
                            how={30} /* Pass the number of images Sky will render chosing randomly */
                            time={20} /* time of animation */
                            size={'200px'} /* size of the rendered images */
                            background={'#f2f2f2'} /* color of background */
                        />
                    </div>
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