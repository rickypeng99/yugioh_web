import React from 'react';
import './LeftPanel.css';

class LeftPanel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            card: {},
        };
    }

    // 164 pixels wide by 242 pixels tall
    render() {
       return(
            <div className="left_panel">
                <div className="card_pic_container">
                    <div className="card_pic_box">
                        {/* insert card image here */}
                        <img style={{height: '100%', width: '100%'}}src='https://ygoprodeck.com/pics/20721928.jpg'/>
                    </div>
                </div>
                <div className="card_detail_box">
                    <p>Name: Elemental Hero Spark man</p>
                    <p>ATK: 1600</p>
                    <p>DEF: 800</p>
                </div>
            </div>
       )
    }

}

export default LeftPanel;