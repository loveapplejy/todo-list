import React, { Component } from 'react';
import Header from './components/Header';
import Filter from './components/Filter';
import List from './components/List';
import update from 'react-addons-update';
import Moment from 'moment';
import { arrayMove } from 'react-sortable-hoc';

import AppStyle from './scss/app.scss';
import ResetStyle from './scss/reset.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTodo: {},
      todos: [],
      filter: {
        priority: 'all',
        completed: 'all'
      }
    };

    this.handleCreateTodo = this.handleCreateTodo.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleChangeCreate = this.handleChangeCreate.bind(this);
    this.handleToggleTodo = this.handleToggleTodo.bind(this);
    this.handleChangeFilter = this.handleChangeFilter.bind(this);
    this.handleSortEnd = this.handleSortEnd.bind(this);
  }

  componentWillMount() {
    const todos = localStorage.todos;
    if (todos) {
      this.setState({
        todos: JSON.parse(todos)
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (JSON.stringify(prevState.todos) != JSON.stringify(this.state.todos)) {
      localStorage.todos = JSON.stringify(this.state.todos);
    }
  }

  handleToggleTodo(e) {
    const id = e.target.getAttribute('id');
    const index = e.target.getAttribute('data-index');
    const completed = e.target.checked;

    this.setState({
      todos: update(this.state.todos,
        {
          [index] : {
            completed: { $set:  completed}
          }
        }
      )
    });
  }

  handleCreateTodo(e) {
    let { currentTodo } = this.state;

    if (!currentTodo.priority) {
      alert('중요도를 선택해주세요');
      return;
    }

    if (!currentTodo.title) {
      alert('할일을 입력해주세요.');
      return;
    }

    const today = new Date();

    currentTodo.id = `${today.getTime()}_todo`;
    currentTodo.completed = false;
    currentTodo.date = Moment(today).format('YYYY.MM.DD');

    this.setState({
      currentTodo: {
        title: '',
        priority: ''
      },
      todos: update(this.state.todos, { $push: [currentTodo]})
    });

  }

  handleKeyPress(e) {
    if (e.charCode === 13) {
      this.handleCreateTodo(e);
    }
  }

  handleChangeCreate(e) {
    let { currentTodo } = this.state;
    currentTodo[e.target.name] = e.target.value;
    this.setState({
      currentTodo: currentTodo
    });
  }

  handleChangeFilter(e) {
    let { filter } = this.state;
    const filter_type = e.target.getAttribute('data-type');
    const filter_value = e.target.getAttribute('data-value');

    filter[filter_type] = filter_value;
    this.setState({
      filter: filter
    });
  }

  handleSortEnd({ oldIndex, newIndex }) {
    this.setState({
      todos: arrayMove(this.state.todos, oldIndex, newIndex),
    });
  }

  render() {
    return (
      <div className="content">
        <Header
          todo={this.state.currentTodo}
          onCreate={this.handleCreateTodo}
          onChangeCreate={this.handleChangeCreate}
          onkeyPressCreate={this.handleKeyPress}
        />
        <Filter
          filter={this.state.filter}
          onChangeFilter={this.handleChangeFilter}
        />
        <List
          todos={this.state.todos}
          filter={this.state.filter}
          onCompleteToggle={this.handleToggleTodo}
          onSortEnd={this.handleSortEnd}
        />
      </div>
  )
  }
}

export default App;