import React from 'react';
import { CARD_TYPE } from '../../Card/utils/constant'

/**
 * Class to output detail based on the card's type
 */
class LeftDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            card_type: undefined
        }
    }

    componentDidMount() {
        this.setState({
            card_type: this.props.card_type
        })
    }

}