import React, { useRef } from 'react';
import { IconfontView } from './IconfontView';

interface TooltipInfo {
  title: string;
  canClose: boolean;
  onClose?: () => void;
}

interface Tip {
  tooltipPlacement: string;
  tooltipInfo: TooltipInfo;
}

interface ToolTipWrapperProps {
  tip: Tip;
}

interface TooltipProps {
  title: string;
  placement: string;
  canClose: boolean;
  onClose?: () => void;
}

const Tooltip: React.FC<TooltipProps> = ({ title, placement, canClose, onClose }) => {
  const tooltipRef = useRef<HTMLDivElement>(null);

  return (
    <div className="guideTip" ref={tooltipRef}>
      <div className="content">
        <div className="content-text">
          <span>{title}</span>
          {canClose && (
            <IconfontView
              iconOnclick={onClose}
              customClass="guideTipCloseBtn"
              showType="hs_xian_guanbi"
              customStyle={{
                fontSize: '16px',
                color: 'white'
              }}
            />
          )}
        </div>
        <div className={`iconArrow ${placement}`} />
      </div>
    </div>
  );
};

export const ToolTipWrapper: React.FC<ToolTipWrapperProps> = ({ tip }) => {
  return (
    <div className={`guide-tooltip ${tip.tooltipPlacement}`}>
      <Tooltip
        placement={tip.tooltipPlacement}
        title={tip.tooltipInfo.title}
        canClose={tip.tooltipInfo.canClose}
        onClose={tip.tooltipInfo.onClose}
      />
    </div>
  );
};

export default Tooltip;