import React from 'react';
import { connect } from 'react-redux';

/**
 * View renderer for a monster card
 */
class MonsterView extends React.Component {
    constructor(props) {
        super(props);
    }


    handleOnClick = (event) => {
        this.props.summon(this.props.card);
    }


    render() {
        const {card} = this.state;
        if (card) {
            return (
                <img style={{width: '10%', marginRight: '10px'}} src={'https://ygoprodeck.com/pics/' + card.card.key + '.jpg'} onClick={this.handleOnClick()}/>
            )
        } else {
            return (
                <p>Loading...</p>
            )
        }
        
    }

}


const mapStateToProps = state => {
    const { environment } = state.environmentReducer;
    return { environment };
};

const mapDispatchToProps = dispatch => ({
    // summon: (monster) => dispatch(ENV.summon(monster)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MonsterView);
