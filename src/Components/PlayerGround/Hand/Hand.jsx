import React from 'react';
import { connect } from 'react-redux';
import { ENVIRONMENT, CARD_TYPE} from '../../Card/utils/constant';
import MonsterView from '../../Card/Monster/MonsterView';
import './Hand.css'
const monster_types = [Object.values(CARD_TYPE.MONSTER)];
const spell_types = [Object.values(CARD_TYPE.SPELL)];

class Hand extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        // my hands or the opponent's hands
        this.side = this.props.side;
        this.environment = this.props.environment;
    }

    shouldComponentUpdate(nextProps) {
        if ((!this.environment && nextProps.environment) || nextProps.environment.statusKey !== this.environment.statusKey) {
            this.environment = nextProps.environment;
        }
        return true
    }

    render() {
        const {side, environment} = this;
        console.log(environment);
        if (environment) {
            const hand_array = environment[ENVIRONMENT.HAND].my_cards.map((cardEnv, index) => {
                console.log(cardEnv.card)
                if (monster_types[0].includes(cardEnv.card.card_type)) {
                    return <MonsterView card={cardEnv} environment={environment} key={cardEnv.card.key + Math.random()}></MonsterView>
                } else if (spell_types[0].includes(cardEnv.card.card_type)) {
                    return <p>fuck</p>
                } else {
                    //traps
                    return <p>fuck</p>
                }
            })
            return(
                <div className="hand_container">
                    {hand_array}
                </div>
            )
        } else {
            return <p>loading</p>
        }
        
    }
}


const mapStateToProps = state => {
    const { environment } = state.environmentReducer;
    return { environment };
};

const mapDispatchToProps = dispatch => ({
    // initialize: (environment) => dispatch(initialize_environment(environment)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Hand);