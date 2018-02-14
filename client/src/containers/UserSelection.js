import React from 'react';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import firebase, { snapshotToArray } from '../firebase';

import FormInput from '../components/FormInput';
import { setUsers } from '../actions/list';


class userSelection extends React.Component {

    componentDidMount() {
        firebase.ref('users').once('value').then((snapshot) => {
            this.props.actions.setUsers(snapshotToArray(snapshot));
        });
    }

    selectUser = (e) => {
        this.props.selectUser(e.currentTarget.value);
    }

    selectGameMaster = (e) => {
        this.props.selectGameMaster(e.currentTarget.checked);
    }

    render() {

        const { users } = this.props;

        return (
            <div>
                
                <FormInput>
                    <label id="name">Your name: </label>
                    <select onChange={this.selectUser} htmlFor="name">
                        <option>-- Kimi no Na   Wa. --</option>
                        {
                            users.map((child) => <option key={child.id} value={child.id}>{child.name}</option>)
                        }
                    </select>
                </FormInput>

                <FormInput>
                    <label id="gamemaster">Is gamemaster?</label>
                    <input onChange={this.selectGameMaster} htmlFor="gamemaster" type="checkbox" />
                </FormInput>

            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        users: state.activities.users
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ setUsers }, dispatch)
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(userSelection));