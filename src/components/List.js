import React, {Component} from 'react';
import Item from './Item';
import { SortableContainer } from 'react-sortable-hoc';

import ListStyle from '../scss/list.scss';

const SortableList = SortableContainer((props) => {
  const { todos, filter, onCompleteToggle } = props;
  const { priority, completed } = filter;

  let displayData = todos.filter((todo) => {
    return priority === 'all' ? todo : todo.priority == priority
  }).filter((todo) => {
    return completed === 'all' ? todo : todo.completed == completed
  });
  
  return (
    <ul>
      {
        !displayData.length ? <li className="todo-item blank"><span>할일을 추가하세요.</span></li> :
          displayData.map((todo, i) => {
            return (<Item
              todo={todo}
              key={i}
              id={i}
              index={i}
              onCompleteToggle={onCompleteToggle}
            />);
          })
      }
    </ul>
  );
});


class List extends Component {
  render() {

    return (
      <div className="list-area">
        <SortableList {...this.props} onSortEnd={this.props.onSortEnd} />
      </div>
    )
  }
};

export default List;