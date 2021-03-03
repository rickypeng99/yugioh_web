import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import './HealthBar.css';

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 20,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  bar: {
    backgroundColor: '#a7fabe',
    transition: 'transform 1s'
  },
}))(LinearProgress);


class HealthBar extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={"health_bar health_bar_" + this.props.side}>
                <div className={"health_bar_avatar_username_container"}>
                    <img className="health_bar_avatar" src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/84dc13b7-a2e7-4b45-83ec-311e72e82900/ddg84ua-02d600ad-dc7f-4cdf-b510-c1916324803a.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvODRkYzEzYjctYTJlNy00YjQ1LTgzZWMtMzExZTcyZTgyOTAwXC9kZGc4NHVhLTAyZDYwMGFkLWRjN2YtNGNkZi1iNTEwLWMxOTE2MzI0ODAzYS5wbmcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.U8nOU_7_z8s5trKUg4ZrbNCm8n5Cg4u3b18-_BgkC3U" />
                    <div className="health_bar_username_container">
                        <p className="health_bar_username">Player 1</p>
                        <p>Platinum</p>
                    </div>
                </div>
                <BorderLinearProgress variant="determinate" value={50} />
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
)(HealthBar);