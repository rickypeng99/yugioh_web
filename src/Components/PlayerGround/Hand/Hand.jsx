import React from 'react';

class Hand extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.side = this.props.side;
        this.environment = this.props.environment;
    }

    shouldComponentUpdate(nextProps) {
        if (nextProps.environment.statusKey !== this.environment.statusKey) {
            this.environment = nextProps.environment;
        }
        return true
    }

    render() {
        const {side, environment} = this;
        
    }
}


const mapStateToProps = state => {
    const { environment } = state.environmentReducer;
    return { environment };
};

const mapDispatchToProps = dispatch => ({
    initialize: (environment) => dispatch(initialize_environment(environment)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Hand);