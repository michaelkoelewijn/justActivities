import React from 'react';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Timer from '../../components/Timer';

class Plank extends React.Component {

    stopImWeak(val) {
        console.log(val);
    }

    render() {
        return (
            <div>
                <h1>Plank Challenge</h1>
                <Timer onStop={this.stopImWeak} />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        activities: state.activities.activities
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ }, dispatch)
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Plank));