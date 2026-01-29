import React from 'react';
import { useTheme } from './hooks/useTheme';
import { useRemindModalContext } from './context/RemindModalContext';
import { GotoTeaching } from './components/GotoTeaching';
import { NotRemind } from './components/NotRemind';
import Icon from './components/Icon';
import './CardTips.css';

interface CardTipsData {
  title: string;
  introduction: string;
}

interface CardTipsProps {
  type: string;
  data: CardTipsData[];
}

export const CardTips: React.FC<CardTipsProps> = (props) => {
  const { data } = props;
  const content = data[0];
  const theme = useTheme();
  const { close } = useRemindModalContext();
  
  const notRemindTheme = theme === 'teaching-black' ? 'black' : 'light';

  const handleClose = (): void => {
    close?.();
  };

  return (
    <div className={`card-tips-wrapper ${theme}`}>
      <div className="card-tips-top">
        <div className="card-tips-title">{content.title}</div>
        <div className="top-close" onClick={handleClose}>
          <Icon 
            className="round-icon-o" 
            type="hs_xian_guanbi" 
          />
        </div>
        <NotRemind 
          theme={notRemindTheme} 
          className="card-tips-not-remind" 
        />
      </div>
      <div className="card-tips-word">
        <div className="card-tips-word-introduction">
          {content.introduction}
        </div>
        <div className="goto-wrapper">
          <GotoTeaching 
            className="card-tips-goto" 
            content={content} 
          />
        </div>
      </div>
    </div>
  );
};