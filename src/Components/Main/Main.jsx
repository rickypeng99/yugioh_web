import React from 'react';
import Game from '../PlayerGround/Game';
import LeftPanel from './Components/LeftPanel';
import './Main.css';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false
        }
    }

    componentDidMount() {
        // for testings
        this.raw_environment = {
            // put the cards and players in here
        };
        this.setState({
            loaded: true
        })
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