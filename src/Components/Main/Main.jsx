import React from 'react';
import Game from '../PlayerGround/Game';



class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false
        }
    }

    componentDidMount() {
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
                <Game raw_environment={raw_environment} />
            )
        } else {
            return(
                <p>Loading...</p>
            )
        }
    }
}

export default Main;