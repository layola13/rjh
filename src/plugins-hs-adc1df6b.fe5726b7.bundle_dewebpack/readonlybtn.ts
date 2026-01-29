import React from 'react';
import { Button } from 'antd';
import type { ButtonProps } from 'antd';

interface ReadonlyBtnComProps {
  onClick?: () => void;
  text: string;
  tips?: string;
}

interface TooltipProps {
  title: string;
  toolTip_Storage: string;
  placement: string;
  pluginName: string;
  children: React.ReactNode;
}

declare const HSFPConstants: {
  PluginType: {
    EditStatus: string;
  };
};

declare const Tooltip: React.ComponentType<TooltipProps>;

export const ReadonlyBtnCom: React.FC<ReadonlyBtnComProps> = ({ onClick, text, tips }) => {
  const handleClick = (): void => {
    if (onClick) {
      onClick();
    }
  };

  if (tips) {
    return (
      <div className="readonly-pageheader">
        <Tooltip
          title={tips}
          toolTip_Storage="readonly-btn-tip"
          placement="bottom"
          pluginName={`${HSFPConstants.PluginType.EditStatus}`}
        >
          <Button
            type="primary"
            className="readonly-pageheader-btn"
            onClick={handleClick}
          >
            {text}
          </Button>
        </Tooltip>
      </div>
    );
  }

  return (
    <div className="readonly-pageheader">
      <Button
        type="primary"
        className="readonly-pageheader-btn"
        onClick={handleClick}
      >
        {text}
      </Button>
    </div>
  );
};

interface ReadonlyBtnConfig {
  text: string;
  onClick?: () => void;
  tips?: string;
}

export class ReadonlyBtn {
  text: string;
  onClick?: () => void;
  tips?: string;

  constructor(config: ReadonlyBtnConfig) {
    this.text = config.text;
    this.onClick = config.onClick;
    this.tips = config.tips;
  }

  getRenderItem(): React.ReactElement {
    return React.createElement(ReadonlyBtnCom, {
      text: this.text,
      tips: this.tips,
      onClick: this.onClick,
    });
  }
}