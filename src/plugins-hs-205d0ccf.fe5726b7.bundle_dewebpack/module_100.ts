import React from 'react';
import ReactDOM from 'react-dom';
import { Icons } from './678797';
import './13258';

interface TipPosition {
  x: number;
  y: number;
  width: number;
  height: number;
}

type ArrowPosition = 'top' | 'bottom' | 'left' | 'right';

interface ShowTipsOptions {
  rec: TipPosition;
  arrowPosition?: ArrowPosition;
  contentMdsKeyValue: string;
  canClose?: boolean;
  autoClose?: boolean;
  duration?: number;
  onClose?: () => void;
}

interface TipComponentProps extends ShowTipsOptions {
  onClose: () => void;
}

interface TipStyle extends React.CSSProperties {
  left: number;
  top: number;
  width?: number;
  height?: number;
  justifyContent?: string;
  alignItems?: string;
}

const DEFAULT_AUTO_CLOSE_DURATION = 5;
const AUTO_CLOSE_MULTIPLIER = 1000;
const BOTTOM_OFFSET = 50;
const TOP_OFFSET = 10;
const LEFT_OFFSET = 10;

function getOrCreateContainer(): HTMLElement {
  const containerId = 'task_popup_container';
  let container = document.getElementById(containerId);
  
  if (!container) {
    container = document.createElement('div');
    container.id = containerId;
    document.body.appendChild(container);
  }
  
  return container;
}

function TipComponent(props: TipComponentProps): JSX.Element {
  const arrowClassName = props.arrowPosition 
    ? `task_tip_${props.arrowPosition}_arrow` 
    : '';
  
  const style: TipStyle = {
    left: props.rec.x,
    top: props.rec.y
  };
  
  let shouldApplyLeftFix = false;
  
  switch (props.arrowPosition) {
    case 'bottom':
      style.top -= BOTTOM_OFFSET;
      style.width = props.rec.width;
      style.justifyContent = 'center';
      break;
      
    case 'top':
      style.justifyContent = 'center';
      style.width = props.rec.width;
      style.top += props.rec.height + TOP_OFFSET;
      break;
      
    case 'left':
      style.alignItems = 'center';
      style.height = props.rec.height;
      style.left += props.rec.width + LEFT_OFFSET;
      break;
      
    case 'right':
      style.alignItems = 'center';
      style.height = props.rec.height;
      shouldApplyLeftFix = true;
      break;
  }
  
  const insideClassName = `task_wrapper_inside ${arrowClassName} ${
    shouldApplyLeftFix ? 'task_wrapper_left_fix' : ''
  }`;
  
  return (
    <div className="task_wrapper_container" style={style}>
      <div className={insideClassName}>
        <div className="content_wrapper">
          <span>{props.contentMdsKeyValue}</span>
        </div>
        {props.canClose && (
          <div className="img_wrapper">
            <Icons
              type="hs_xian_guanbi"
              className="task_arrow"
              onClick={props.onClose}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export function showTips(options: ShowTipsOptions): void {
  const container = getOrCreateContainer();
  
  const handleClose = (): void => {
    ReactDOM.render(<React.Fragment />, container);
  };
  
  if (options.autoClose) {
    const duration = options.duration ?? DEFAULT_AUTO_CLOSE_DURATION;
    setTimeout(() => handleClose(), AUTO_CLOSE_MULTIPLIER * duration);
  }
  
  ReactDOM.render(
    <TipComponent {...options} onClose={handleClose} />,
    container
  );
}

export function closeTips(): void {
  const container = getOrCreateContainer();
  ReactDOM.render(<React.Fragment />, container);
}