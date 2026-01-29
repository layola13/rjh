import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BallonTipWrapper } from './BallonTipWrapper';
import { PositionTooltip } from './PositionTooltip';

interface Theme {
  [key: string]: unknown;
}

interface TargetRect {
  top: number;
  left: number;
  width: number;
  height: number;
  bottom: number;
  right: number;
}

interface CardTipsBallonTipsContentProps {
  theme: Theme;
}

interface CardTipsBallonTipsProps {
  theme: Theme;
  targetRect: TargetRect;
  onClosed?: () => void;
}

interface ShowCardTipsBallonTipsOptions {
  theme: Theme;
  targetRect: TargetRect;
}

let containerElement: HTMLDivElement | null = null;

export function CardTipsBallonTipsContent(props: CardTipsBallonTipsContentProps): JSX.Element {
  const { theme } = props;
  
  return (
    <BallonTipWrapper theme={theme}>
      <div style={{ fontSize: 12, margin: '8px' }}>
        {ResourceManager.getString('plugin_teaching_click_check_article')}
      </div>
    </BallonTipWrapper>
  );
}

export function CardTipsBallonTips(props: CardTipsBallonTipsProps): JSX.Element {
  const [visible, setVisible] = useState<boolean>(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleClosed = (): void => {
    props.onClosed?.();
  };
  
  return (
    <PositionTooltip
      visible={visible}
      targetRect={props.targetRect}
      onClosed={handleClosed}
      arrowWidth={12}
      transitionDuration={200}
    >
      <CardTipsBallonTipsContent theme={props.theme} />
    </PositionTooltip>
  );
}

export function showCardTipsBallonTips(options: ShowCardTipsBallonTipsOptions): void {
  if (!containerElement) {
    containerElement = document.createElement('div');
    containerElement.className = 'card-tips-ballon-tips-container';
    document.body.appendChild(containerElement);
  }
  
  const handleClosed = (): void => {
    if (containerElement) {
      ReactDOM.unmountComponentAtNode(containerElement);
    }
  };
  
  ReactDOM.render(
    <CardTipsBallonTips
      {...options}
      onClosed={handleClosed}
    />,
    containerElement
  );
}