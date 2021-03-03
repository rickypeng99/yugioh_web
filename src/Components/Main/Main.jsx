import React from 'react';
import Game from '../PlayerGround/Game';
import LeftPanel from './LeftPanel/LeftPanel';
import './Main.css';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
        };
    }

    componentDidMount() {
        // for testings
        // 5 different eheros
        const heros = [20721928, 21844576, 58932615, 84327329, 89943723]
        let deck_first_player = [];
        let deck_second_player = [];
        for (let i = 0; i < 10; i++) {
            deck_first_player.push(heros[i%5]);
            deck_second_player.push(heros[i%5]);
        }

        this.raw_environment = {
            // put the cards and players in here
            decks: [
                deck_first_player.slice(5),
                deck_second_player.slice(5)
            ],
            hands: [
                deck_first_player.slice(0, 5),
                deck_second_player.slice(0, 5)
            ]
        };

        this.setState({loaded: true});
    }

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
                <p>Loading...</p>
            )
        }
    }
}

export default Main;