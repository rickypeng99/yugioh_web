import React from 'react';
import Game from '../PlayerGround/Game';
import LeftPanel from './Components/LeftPanel';
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
        // 10 ehero sparkman
        let deck_first_player = [];
        let deck_second_player = [];
        for (let i = 0; i < 10; i++) {
            deck_first_player.push(20721928);
            deck_second_player.push(20721928);
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