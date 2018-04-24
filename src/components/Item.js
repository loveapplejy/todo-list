import React, {Component} from 'react';
import { SortableElement } from 'react-sortable-hoc';

import ItemStyle from '../scss/item.scss';

const SortableItem = SortableElement((props) => {
  const priorityStr = {
    3: '매우중요',
    2: '중요',
    1: '보통',
  };

  return (
    <li className="todo-item" index={props.index}>
      <div className="todo-check">
        <input type="checkbox"
               id={props.todo.id}
               onChange={props.onCompleteToggle}
               checked={props.todo.completed}
               data-index={props.id}
        />
        {/*<label htmlFor={props.todo.id}></label>*/}
      </div>
      <div className="todo-content">
        <div className="todo-info">중요도: {priorityStr[props.todo.priority]}</div>
        <div className="todo-info">추가일: {props.todo.date}</div>
        <div className="todo-title" style={{textDecoration: props.todo.completed ? 'line-through' : 'none'}}>
          {props.todo.title}
        </div>
      </div>
      <div className="todo-move">

      </div>
    </li>
  );
});

const Item = (props) => {

  return (
      <SortableItem {...props} />
  )
};

export default Item;