import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import * as listActions from '../actions/list';

class DefaultComponent extends React.Component {
    render() {
       
    }
}

function mapStateToProps(state) {
    return {
        list: state.list
    }
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(listActions, dispatch)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(DefaultComponent);