import React from 'react';
import { useRemindModalContext } from './remind-modal-context';
import './styles.css';

interface NotRemindProps {
  theme: string;
  className?: string;
}

export function NotRemind({ theme, className }: NotRemindProps): React.ReactElement {
  const { noRemind } = useRemindModalContext();

  return React.createElement(
    'div',
    {
      className: `not-remind ${theme} ${className ?? ''}`,
      onClick: noRemind
    },
    ResourceManager.getString('plugin_teaching_not_remind')
  );
}