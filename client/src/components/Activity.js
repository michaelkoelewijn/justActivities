import React from "react";
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Sally from '../containers/challenges/Sally';
import Plank from '../containers/challenges/Plank';

const _Activity = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
`

class Activity extends React.Component {

    getTemplate() {
        switch(this.props.activities.currentUser.activity) {
            case 0: 
                return <Sally />;
                break;
            case 1:
                return <Plank />;
                break; 
            default:
                return (
                    <div>
                        <h1>No challenge selected.</h1>
                        <a href="/">Select one now.</a>
                    </div>
                );
                break;       
        }
    }

    render() {
        return (
            <_Activity>
                { this.getTemplate() }
            </_Activity>
        )
    }
}

function mapStateToProps(state) {
    return {
        activities: state.activities
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ }, dispatch)
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Activity))