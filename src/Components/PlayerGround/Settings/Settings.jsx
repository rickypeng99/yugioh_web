import React from 'react';
import './Settings.css';
import Slider from '@mui/material/Slider';

class Settings extends React.Component {
    constructor (props) {
        super(props);
    }

    componentDidMount () {
        this.onChangePosition = this.props.onChangePosition.bind(this);
        this.onChangeSize = this.props.onChangeSize.bind(this);
        this.getTransformRotateXValue = this.props.getTransformRotateXValue.bind(this);
    }

    render() {
        return (
            <div className="settings_container">
                <div className="translate_button_container">
                    <div className='vertical_container'>
                        <div className='translate_button' onClick={() => this.onChangePosition('up')}>
                            <span className="material-icons">
                                expand_less
                                </span>
                        </div>
                    </div>
                    <div className='horizontal_container'>
                        <div className='translate_button' onClick={() => this.onChangePosition('left')}>
                            <span className="material-icons">
                                navigate_before
                                </span>
                        </div>
                        {/* adjusting the poisition back to the original */}
                        <div className='translate_button' onClick={() => this.onChangePosition('return')}>
                            <span className="material-icons">
                                cached
                            </span>
                        </div>
                        <div className='translate_button' onClick={() => this.onChangePosition('right')}>
                            <span className="material-icons">
                                navigate_next
                                </span>
                        </div>
                    </div>
                    <div className='vertical_container'>
                        <div className='translate_button' onClick={() => this.onChangePosition('down')}>
                            <span className="material-icons">
                                expand_more
                                </span>
                        </div>
                    </div>
                </div>
                <div className="size_button" onClick={() => this.onChangeSize('increase')}>
                    <span className="material-icons">
                        add
                        </span>
                </div>
                <div className="size_button" onClick={() => this.onChangeSize('decrease')}>
                    <span className="material-icons">
                        remove
                        </span>
                </div>
                <div className="slider_container">
                    <Slider
                        orientation="vertical"
                        defaultValue={45}
                        aria-labelledby="vertical-slider"
                        onChange={this.getTransformRotateXValue}
                        max={80}
                    />
                </div>

            </div>
        )
    }

}

export default Settings;