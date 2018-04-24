import React, {Component, PropTypes} from 'react';

import HeaderStyle from '../scss/header.scss';

const Header = (props) => {
  return (
    <div className="header">
      <div className="select-area">
        <select
          name="priority"
          value={props.todo.priority}
          onChange={props.onChangeCreate}
        >
          <option value="">중요도</option>
          <option value="3">매우 중요</option>
          <option value="2">중요</option>
          <option value="1">보통</option>
        </select>
      </div>
      <div className="input-area">
        <input
          type="text"
          name="title"
          placeholder="할일을 추가하세요."
          value={props.todo.title || ''}
          onChange={props.onChangeCreate}
          onKeyPress={props.onkeyPressCreate}
        />
      </div>
      <div id="addItem" className="btn-add">
        <button onClick={props.onCreate}>추가</button>
      </div>
    </div>
  )
};

export default Header;