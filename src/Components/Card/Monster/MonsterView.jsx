import React from 'react';
/**
 * View container for a monster card
 */
class MonsterView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {card} = this.props;
        if (card) {
            return (
                <img style={{width:"100%"}}src={'https://ygoprodeck.com/pics/' + card.card.key + '.jpg'}/>
            )
        } else {
            return (
                <p>Loading...</p>
            )
        }
        
    }

}

export default MonsterView;
