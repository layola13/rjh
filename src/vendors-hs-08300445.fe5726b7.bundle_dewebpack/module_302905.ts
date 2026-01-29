import React from 'react';
import classNames from 'classnames';

interface IndentProps {
  prefixCls: string;
  level: number;
  isStart: boolean[];
  isEnd: boolean[];
}

export default function Indent({ prefixCls, level, isStart, isEnd }: IndentProps): React.ReactElement {
  const indentUnitClassName = `${prefixCls}-indent-unit`;
  const indentElements: React.ReactElement[] = [];

  for (let index = 0; index < level; index += 1) {
    const classes = classNames(indentUnitClassName, {
      [`${indentUnitClassName}-start`]: isStart[index],
      [`${indentUnitClassName}-end`]: isEnd[index],
    });

    indentElements.push(
      <span key={index} className={classes} />
    );
  }

  return (
    <span aria-hidden="true" className={`${prefixCls}-indent`}>
      {indentElements}
    </span>
  );
}