import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Tooltip, IconfontView } from './components';
import './styles.css';

interface TooltipWrapperProps {
  children: React.ReactNode;
  title: React.ReactNode;
  theme?: string;
  defaultShow?: boolean;
  toolTip_Storage?: string;
  placement?: 'top' | 'bottom' | 'left' | 'right' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom';
  pluginName?: string;
}

const DEFAULT_STORAGE_KEY = 'teaching-ability';
const DIRTY_STATE = 'dirty';
const RESTART_GUIDE = 'restart';

export default function TooltipWrapper(props: TooltipWrapperProps): JSX.Element {
  const {
    children,
    title,
    theme,
    defaultShow = true,
    toolTip_Storage,
    placement,
    pluginName = HSFPConstants.PluginType.TeachingAbility
  } = props;

  const storageKey = toolTip_Storage || DEFAULT_STORAGE_KEY;
  const tooltipRef = useRef<any>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    if (!defaultShow) {
      setIsVisible(false);
      return;
    }

    const storage = new HSApp.Util.Storage(pluginName);
    const storedValue = storage.get(storageKey);
    setIsVisible(!storedValue || storedValue !== DIRTY_STATE);
  }, [defaultShow, pluginName, storageKey]);

  const themeClass = theme || '';

  const isRestartGuide = useMemo(() => {
    const queryStrings = HSApp.Util.Url.getQueryStrings();
    return queryStrings?.guide === RESTART_GUIDE;
  }, []);

  if (isRestartGuide) {
    return <>{children}</>;
  }

  const handleClose = (): void => {
    const storage = new HSApp.Util.Storage(pluginName);
    storage.set(storageKey, DIRTY_STATE);
    setIsVisible(false);
    tooltipRef.current?.close();
  };

  const tooltipTitle = isVisible ? (
    <div className={`tool-tip-area ${themeClass}`}>
      <div className="tool-tip-title">{title}</div>
      <IconfontView
        showType="hs_xian_guanbi"
        iconOnclick={handleClose}
        customStyle={{
          fontSize: '14px',
          color: 'rgba(255, 255, 255, 0.3)'
        }}
      />
    </div>
  ) : '';

  return (
    <Tooltip
      ref={tooltipRef}
      placement={placement || 'bottomRight'}
      title={tooltipTitle}
      trigger={isVisible ? 'new' : null}
      overlayClassName={`first-tooltip-overlay ${themeClass}`}
      delayClose={undefined}
      getPopupContainer={(element: HTMLElement) => element?.parentElement ?? document.body}
    >
      {children}
    </Tooltip>
  );
}