import { useTheme } from './theme';
import { useRemindModalContext } from './remindModalContext';
import { Icons } from './Icons';
import { NotRemind } from './NotRemind';

interface TeachingData {
  function: string;
  [key: string]: unknown;
}

interface BallonTipsProps {
  type: string;
  data: TeachingData[];
}

interface BallonTipWrapperProps {
  theme: string;
  children: React.ReactNode;
}

interface RemindModalContext {
  close?: () => void;
  checkTeaching?: (data: TeachingData) => void;
}

export function BallonTipWrapper({ theme, children }: BallonTipWrapperProps): JSX.Element {
  return (
    <div className={`ballon-tip-wrapper ${theme}`}>
      {children}
    </div>
  );
}

export function BallonTips({ data }: BallonTipsProps): JSX.Element {
  const teachingData = data[0];
  const { close, checkTeaching } = useRemindModalContext() as RemindModalContext;
  const currentTheme = useTheme();
  const notRemindTheme = currentTheme === 'teaching-black' ? 'light' : 'black';

  const handleWordClick = (): void => {
    checkTeaching?.(teachingData);
  };

  const handleCloseClick = (): void => {
    close?.();
  };

  return (
    <BallonTipWrapper theme={currentTheme}>
      <div className="ballon-tip-content">
        <div className="ballon-tip-word" onClick={handleWordClick}>
          <span>{ResourceManager.getString('plugin_teaching_click_check')}</span>
          <span className="word-title">【{teachingData.function}】</span>
          <span>{ResourceManager.getString('plugin_teaching_article')}</span>
        </div>
        <NotRemind theme={notRemindTheme} className="ballon-not-remind" />
        <div className="ballon-tip-close" onClick={handleCloseClick}>
          <Icons type="hs_xian_guanbi" />
        </div>
      </div>
    </BallonTipWrapper>
  );
}