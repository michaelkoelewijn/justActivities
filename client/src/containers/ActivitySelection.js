import React from 'react';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FormInput from '../components/FormInput';
import firebase, {snapshotToArray} from '../firebase';
import {setActivities} from '../actions/list';

class ActivitySelection extends React.Component {
    
    constructor() {
        super();
        this.state = {
            fetchedActivities: false,
            activities: []
        }
    }

    componentDidMount() {
        firebase.ref('activities').once('value').then((snapshot) => {
            this.props.actions.setActivities(snapshotToArray(snapshot))
        });
    }

    selectActivity = (e) => {
        this.props.selectActivity(e.currentTarget.value)
    }

    render() {
        const { activities } = this.props;
        return (
            <div>
                <FormInput>
                    <label>Activity: </label>
                    <select onChange={this.selectActivity}>
                        <option>-- Select activity. --</option>
                        {
                            activities.map((child) => <option key={child.id} value={child.id}>{child.name}</option>)
                        }
                    </select>
                </FormInput>
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
        actions: bindActionCreators({ setActivities }, dispatch)
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(ActivitySelection));