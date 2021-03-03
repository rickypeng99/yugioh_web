import React from 'react';
import Detail from './Detail'
import { connect } from 'react-redux';
import './LeftPanel.css';

class LeftPanel extends React.Component {

    constructor(props) {
        super(props);
    }

    // 164 pixels wide by 242 pixels tall
    render() {
        const card_url = this.props.left_panel_cardEnv ? 'https://ygoprodeck.com/pics/'+ this.props.left_panel_cardEnv.card.key +'.jpg' : 'https://ms.yugipedia.com//f/fd/Back-Anime-ZX-2.png'
            return(
                <div className="left_panel">
                    <div className="card_pic_container">
                        <div className="card_pic_box">
                            {/* insert card image here */}
                            <img style={{height: '100%', width: '100%'}}src={card_url}/>
                        </div>
                    </div>
                    <Detail cardEnv={this.props.left_panel_cardEnv} />
                </div>
           ) 
      
    }

}

const mapStateToProps = state => {
    const { left_panel_cardEnv } = state.mouseReducer
    const { environment } = state.environmentReducer
    return { left_panel_cardEnv, environment };
};

const mapDispatchToProps = dispatch => ({
    // initialize: (environment) => dispatch(initialize_environment(environment)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LeftPanel);