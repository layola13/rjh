import { useMemo } from 'react';
import React from 'react';
import { ToolTipWrapper } from './ToolTipWrapper';

interface Rect {
  left: number;
  top: number;
  width: number;
  height: number;
}

interface Tip {
  type?: 'popup' | 'tooltip';
  targetEnableClick?: boolean;
}

interface CommonProps {
  rect: Rect;
  popup: React.ReactNode;
  popupPlacement: string;
  tip: Tip;
}

interface FrameStyle {
  left: number;
  top: number;
  width: number;
  height: number;
  outlineWidth: number;
}

interface MaskProps {
  rect: Rect | 'all';
}

interface MaskItemStyle {
  left?: number;
  top?: number;
  width?: number;
  height?: number;
  right?: number;
  bottom?: number;
}

function Mask({ rect }: MaskProps): JSX.Element {
  if (rect === 'all') {
    return (
      <div className="mask-wrapper mask" />
    );
  }

  return (
    <div className="mask-wrapper">
      <div
        className="mask-item mask-left"
        style={{
          left: 0,
          top: 0,
          width: rect.left,
          bottom: 0
        }}
      />
      <div
        className="mask-item mask-right"
        style={{
          left: rect.left + rect.width,
          top: 0,
          right: 0,
          bottom: 0
        }}
      />
      <div
        className="mask-item mask-top"
        style={{
          left: 0,
          right: 0,
          top: 0,
          height: rect.top
        }}
      />
      <div
        className="mask-item mask-bottom"
        style={{
          left: 0,
          right: 0,
          top: rect.top + rect.height,
          bottom: 0
        }}
      />
    </div>
  );
}

export function Common({ rect, popup, popupPlacement, tip }: CommonProps): JSX.Element {
  const frameStyle = useMemo<FrameStyle>(() => {
    const maxDistance = Math.max(
      rect.left,
      document.documentElement.clientWidth - rect.left - rect.width,
      rect.top,
      document.documentElement.clientHeight - rect.top - rect.height
    );

    return {
      left: rect.left - 2,
      top: rect.top - 2,
      width: rect.width,
      height: rect.height,
      outlineWidth: 2 * maxDistance
    };
  }, [rect]);

  const tipType = tip.type || 'popup';

  const handleFrameClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    e.stopPropagation();
  };

  return (
    <div className="new-guide-wrapper">
      <Mask rect={tip.targetEnableClick ? rect : 'all'} />
      <div className="frame" style={frameStyle} onClick={handleFrameClick}>
        {tipType === 'popup' && (
          <div className={`popup ${popupPlacement}`}>
            {popup}
          </div>
        )}
        {tipType === 'tooltip' && <ToolTipWrapper tip={tip} />}
      </div>
    </div>
  );
}