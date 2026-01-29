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
  const indentUnits: React.ReactElement[] = [];

  for (let index = 0; index < level; index += 1) {
    const unitClassNames = classNames(indentUnitClassName, {
      [`${indentUnitClassName}-start`]: isStart[index],
      [`${indentUnitClassName}-end`]: isEnd[index]
    });

    indentUnits.push(
      <span key={index} className={unitClassNames} />
    );
  }

  return (
    <span aria-hidden="true" className={`${prefixCls}-indent`}>
      {indentUnits}
    </span>
  );
}