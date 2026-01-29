import React from 'react';
import warning from '../warning';
import Base from './Base';
import { tupleNum } from '../utils';

type OmitLevelProps<T> = Omit<T, 'level'>;

type TitleLevel = 1 | 2 | 3 | 4 | 5;

interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: TitleLevel;
  component?: string;
}

const VALID_TITLE_LEVELS = tupleNum(1, 2, 3, 4, 5);

const Title: React.FC<TitleProps> = (props) => {
  const { level = 1, ...restProps } = props;
  
  let component: string;
  
  if (VALID_TITLE_LEVELS.indexOf(level) !== -1) {
    component = `h${level}`;
  } else {
    warning(
      false,
      'Typography.Title',
      'Title only accept `1 | 2 | 3 | 4 | 5` as `level` value. And `5` need 4.6.0+ version.'
    );
    component = 'h1';
  }
  
  return React.createElement(Base, {
    ...restProps,
    component
  });
};

export default Title;