import React from 'react';
import { Icons } from './Icons';
import { useTheme } from './hooks/useTheme';
import { useRemindModalContext } from './contexts/RemindModalContext';
import './GotoTeaching.css';

interface GotoTeachingProps {
  className?: string;
  content: unknown;
}

export function GotoTeaching(props: GotoTeachingProps): React.ReactElement {
  const { className = '', content } = props;
  const theme = useTheme();
  const { checkTeaching } = useRemindModalContext();

  const handleClick = (): void => {
    checkTeaching?.(content);
  };

  return (
    <div
      className={`goto-teaching ${className} ${theme}`}
      onClick={handleClick}
    >
      <div className="goto-teaching-split">｜</div>
      <div className="goto-teaching-title">
        {ResourceManager.getString('check_detail')}
      </div>
      <Icons
        className="goto-teaching-icon"
        size={12}
        type="hs_xiao_danjiantou_you"
      />
    </div>
  );
}