import React from 'react';
import { connect } from 'react-redux';
import { initialize_environment } from '../../Store/actions/environmentActions';
/**
 * Highest component for one yugioh game
 */
class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            environment: {},
        }

    }

    componentDidMount() {
        // initialize environment
        this.initializeEnvironment(this.props.raw_environment);
    }

    shouldComponentUpdate(nextProps) {
        if (nextProps.environment.statusKey !== this.props.environment.statusKey) {
            this.setState({
                environment: nextProps.environment
            })
        }
    }

    initializeEnvironment = (raw) => {
        let environment = {
            'HAND': {
                monsters: {},
                spells: {},
                traps: {},
            },
            'MONSTER_FIELD': {
                monsters: {},
            },
            'SPELL_FIELD': {
                spells: {},
                traps: {},
                environment_spell: {},
            },
            'GRAVEYARD': {
                monsters: {},
                spells: {},
                traps: {},
            },
            'DECK': {
                monsters: {},
                spells: {},
                traps: {},
            },
            'EXTRA_DECK': {
                monsters: {}
            },
        }
        this.props.dispatch(environment);
    }
}

const mapStateToProps = state => {
    const { environment } = state.environment;
    return { environment };
};

const mapDispatchToProps = dispatch => ({
    initialize: (environment) => dispatch(initialize_environment(environment)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
    )(Game);