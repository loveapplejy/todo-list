import React, {Component} from 'react';

import HeaderStyle from '../scss/sort.scss';

const Filter = (props) => {
  const {filter, onChangeFilter} = props;
  const PRIORITY_ARR = [
    {
      value: 'all',
      name: '모두',
    },
    {
      value: '3',
      name: '매우중요',
    },
    {
      value: '2',
      name: '중요',
    },
    {
      value: '1',
      name: '보통',
    },
  ];

  const COMPLETED_ARR = [
    {
      value: 'all',
      name: '모두',
    },
    {
      value: '1',
      name: '완료',
    },
    {
      value: '0',
      name: '미완료',
    },
  ];

  const mapToPriority = (list, active) => {
    return list.map((data, i) => {
      return (<li className={data.value === active ? "active" : ""} key={i} data-type="priority" data-value={data.value}
                  onClick={onChangeFilter}>{data.name}</li>)
    });
  };

  const mapToComplete = (list, active) => {
    return list.map((data, i) => {
      return (
        <li className={data.value === active ? "active" : ""} key={i} data-type="completed" data-value={data.value}
            onClick={onChangeFilter}>{data.name}</li>)
    });
  };

  return (
    <div className="sort-area">
      <ul>
        {mapToPriority(PRIORITY_ARR, filter.priority)}
      </ul>
      <ul>
        {mapToComplete(COMPLETED_ARR, filter.completed)}
      </ul>
    </div>
  )
}

export default Filter;