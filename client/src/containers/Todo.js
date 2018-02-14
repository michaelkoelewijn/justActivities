import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as listActions from '../actions/list';

class Todo extends React.Component {

    componentDidMount() {
        console.log(this)
    }


    handleSubmit = (e) => {
        e.preventDefault();
        this.props.actions.addTodo(this.input.value);
        this.input.value = '';
    }

    handleStatusChange = (id) => (e) => {
        this.props.actions.statusChange(id);
    }

    removeTodo(id) {
        this.props.actions.removeTodo(id)
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" ref={(input) => this.input = input} />
                    <button type="submit">Add TODO</button>
                </form>

                <ul>
                    {
                        this.props.todos.map((todo, index) => {
                            let style = todo.done ? { color: 'red' } : {};
                            return (
                                <li style={style} key={index}>
                                    {todo.title}
                                    
                                    <button onClick={ this.handleStatusChange(todo.id) }>check</button>
                                    <button onClick={this.removeTodo.bind(this, todo.id)}>x</button>



                                </li>
                            )
                        })
                    }
                </ul>

            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        todos: state.list.todos
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(listActions,dispatch)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Todo);