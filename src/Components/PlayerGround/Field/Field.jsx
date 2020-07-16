import React from 'react';
import { connect } from 'react-redux';
class Field extends React.Component {
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

    initializeEnvironment = () => {

    }
}

const mapStateToProps = state => {
    const { environment } = state.environment;
    return { environment };
};

export default Field;