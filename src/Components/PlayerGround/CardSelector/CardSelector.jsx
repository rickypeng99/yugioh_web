import React from 'react'
import { Button, Modal } from 'semantic-ui-react'
import CardView from '../../Card/CardView'
import { CARD_SELECT_TYPE } from '../utils/constant'
import { SIDE, ENVIRONMENT } from '../../Card/utils/constant'
import { connect } from 'react-redux';
import { normal_summon, set_summon, tribute } from '../../../Store/actions/environmentActions';

import './CardSelector.css';


class CardSelector extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            num_selected: 0,
            selected_cards: {},
            executable: false
        }
    }

    cardOnClickHandler = (card_unique_key, num_needs_selected) => {
        let {selected_cards, num_selected } = this.state
        if (card_unique_key in selected_cards) {
            delete selected_cards[card_unique_key]
            num_selected--
        } else {
            selected_cards[card_unique_key] = true
            num_selected++
        }
        
        this.setState({
            selected_cards: selected_cards,
            num_selected: num_selected,
            executable: num_selected == num_needs_selected
        })
    }

    get_card_selector_content = (card_selector_info, environment) => {
        const selector_type = card_selector_info.type;
        const cardEnv = card_selector_info.cardEnv;
        if (selector_type == CARD_SELECT_TYPE.CARD_SELECT_TRIBUTE_SUMMON) {
            const num_needs_selected = cardEnv.card.level >= 7 ? 2 : 1;
            // get current cards to tribute
            const cards = environment[SIDE.MINE][ENVIRONMENT.MONSTER_FIELD].filter(cardEnv => cardEnv.card).map((cardEnv) => {
                const card_unique_key = cardEnv.card.key + "_" + cardEnv.unique_count
                return(                
                <div className={"selector_card_box" + (card_unique_key in this.state.selected_cards ? " selected" : 
                "")} key={"select_card_" + card_unique_key} onClick={()=>{this.cardOnClickHandler(card_unique_key, num_needs_selected)}}>
                    <CardView card={cardEnv} />
                </div>
                )
            })
            return {
                title: 'Please select ' + num_needs_selected + " monster(s) from the following",
                content: (
                    <div className="card_selector_content">
                        {cards}
                    </div>
                )
            }
        }
    }

    render() {
        const {show_card_selector, close_card_selector, card_selector_info, environment} = this.props
        let card_selector_content = {}
        if (show_card_selector) {
            card_selector_content = this.get_card_selector_content(card_selector_info, environment)
        }
        return (
            <Modal
                open={show_card_selector}
            >
            <Modal.Header>{card_selector_content.title}</Modal.Header>
            <Modal.Content>
                {card_selector_content.content}
            </Modal.Content>
            <Modal.Actions>
            <Button negative onClick={() => close_card_selector()}>
                Cancel
            </Button>
            <Button positive onClick={() => {
                const info = {
                    cardEnvs: Object.keys(this.state.selected_cards)
                }
                this.props.dispatch_tribute(info)
                card_selector_info.resolve()
                close_card_selector()
            }} disabled={!this.state.executable}>
                Confirm
            </Button>
            </Modal.Actions>
        </Modal>
        )
    }

}

const mapStateToProps = state => {
    const { environment } = state.environmentReducer
    return { environment };
};

const mapDispatchToProps = dispatch => ({
    // initialize: (environment) => dispatch(initialize_environment(environment)),
    dispatch_tribute: (info) => dispatch(tribute(info))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CardSelector);