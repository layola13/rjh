import { useState, useEffect } from 'react';
import { Tooltip, IconfontView } from './components';

interface ButtonConfig {
  type: string;
  icon: string;
  activeIcon: string;
  tooltip?: string;
}

interface LabelButtonsData {
  rows?: number;
  onClick?: (button: ButtonConfig) => void;
  buttons?: ButtonConfig[];
  className?: string;
  activedType?: string;
}

interface LabelButtonsProps {
  data: LabelButtonsData;
}

const DEFAULT_ROWS = 3;

function renderButton(
  buttonConfig: ButtonConfig,
  rows: number,
  activeType: string | undefined,
  onButtonClick: (button: ButtonConfig) => void
): JSX.Element {
  const { icon, tooltip, type, activeIcon } = buttonConfig;
  
  let className = `property-bar-labelbuttons-item property-bar-labelbuttons-item__${rows}`;
  let displayIcon = icon;

  if (activeType === type) {
    className += ' property-bar-labelbuttons-item-active';
    displayIcon = activeIcon;
  }

  const iconElement = (
    <div
      className={className}
      onClick={() => onButtonClick(buttonConfig)}
    >
      <IconfontView
        customClass="property-bar-labelbuttons-item-icon"
        showType={displayIcon}
        customStyle={{ fontSize: '35px' }}
      />
    </div>
  );

  if (tooltip) {
    return (
      <Tooltip placement="top" color="dark" title={tooltip}>
        {iconElement}
      </Tooltip>
    );
  }

  return iconElement;
}

export default function LabelButtons({ data }: LabelButtonsProps): JSX.Element {
  const {
    rows = DEFAULT_ROWS,
    onClick,
    buttons,
    className = '',
    activedType
  } = data;

  const [activeType, setActiveType] = useState<string | undefined>(activedType);

  useEffect(() => {
    if (data.activedType !== activeType) {
      setActiveType(activedType);
    }
  }, [data, activedType]);

  const handleButtonClick = (button: ButtonConfig): void => {
    const { type } = button;
    setActiveType(type);
    onClick?.(button);
  };

  return (
    <div className={`property-bar-labelbuttons ${className}`}>
      {buttons?.map((button) =>
        renderButton(button, rows, activeType, handleButtonClick)
      )}
    </div>
  );
}