import React from 'react';
import { is_monster, is_spell, is_trap } from './utils/utils'
import { left_panel_mouse_in } from '../../Store/actions/mouseActions';
import { connect } from 'react-redux';
import MonsterView from './Monster/MonsterView'
import SpellView from './Spell/SpellView'
/**
 * View container for a card
 */
class CardView extends React.Component {
    constructor(props) {
        super(props);
    }

    onMouseEnterHandler = (info) => {
        this.props.mouse_in_view(info);
    }

    render() {
        const {card, style} = this.props;
        if (card) {
            const card_type = card.card.card_type // card is decorated with env\
            const info = {
                cardEnv: card
            }

            if (is_monster(card_type)) {
                return <MonsterView style={style} card={this.props.card}/>
            } else if (is_spell(card_type)) {
                return <SpellView style={style} card={this.props.card}/>
            } else {
                return <p>Developing...</p>
            }
        } else {
            return (
                <p>Loading...</p>
            )
        }
        
    }

}

const mapStateToProps = state => {
    const { left_panel_cardEnv } = state.mouseReducer
    const { environment } = state.environmentReducer
    return { left_panel_cardEnv, environment };
};

const mapDispatchToProps = dispatch => ({
    mouse_in_view: (info) => dispatch(left_panel_mouse_in(info)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CardView);
