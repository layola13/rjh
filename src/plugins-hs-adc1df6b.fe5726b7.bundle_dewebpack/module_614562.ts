import { useState, useMemo, default as React } from 'react';
import { IconfontView, Button, SmartText } from './components';

type ButtonType = 'normal' | 'icon';
type LabelPosition = 'left' | 'right';
type ButtonLevel = string | number;

interface PropertyBarButtonData {
  level: ButtonLevel;
  type?: ButtonType;
  label?: React.ReactNode;
  icon?: string;
  className?: string;
  text?: React.ReactNode;
  hoverColor?: string;
  disabled?: boolean;
  labelPosition?: LabelPosition;
  onClick: (event: React.MouseEvent) => void;
  getBenefitAmount?: () => number;
  showMarketModal?: () => void;
}

interface PropertyBarButtonProps {
  data: PropertyBarButtonData;
}

const PropertyBarButton: React.FC<PropertyBarButtonProps> = ({ data }) => {
  const {
    level,
    type = 'normal',
    label,
    icon,
    className = '',
    text,
    hoverColor,
    disabled = false,
    labelPosition,
    onClick,
    getBenefitAmount,
    showMarketModal
  } = data;

  const [isHovered, setIsHovered] = useState<boolean>(false);

  const iconStyle = isHovered && hoverColor ? { color: hoverColor } : {};

  const renderContent = useMemo(() => {
    if (type === 'icon') {
      const iconElement = (
        <IconfontView
          customClass="property-bar-button__icon"
          customStyle={iconStyle}
          showType={icon}
        />
      );

      if (labelPosition === 'left') {
        return (
          <>
            {label}
            {iconElement}
          </>
        );
      }

      if (labelPosition === 'right') {
        return (
          <>
            {iconElement}
            {label}
          </>
        );
      }

      return iconElement;
    }

    return text;
  }, [text, label, type, isHovered, icon, iconStyle, labelPosition]);

  const benefitAmount = getBenefitAmount?.();
  const showVipIcon = typeof benefitAmount === 'number' && benefitAmount >= 0;

  const handleMarketModalClick = (event: React.MouseEvent): void => {
    showMarketModal?.();
    event.stopPropagation();
  };

  const handleMouseEnter = (): void => {
    setIsHovered(true);
  };

  const handleMouseLeave = (): void => {
    setIsHovered(false);
  };

  const renderBenefitIndicator = (): React.ReactNode => {
    if (benefitAmount === undefined) {
      return null;
    }

    if (benefitAmount > 0) {
      return (
        <span className="freeTrialItem" onClick={handleMarketModalClick}>
          {benefitAmount} {ResourceManager.getString('plugin_structure_free_trial')}
        </span>
      );
    }

    if (benefitAmount === 0) {
      return (
        <span className="vipIcon" onClick={handleMarketModalClick}>
          <img src="https://img.alicdn.com/imgextra/i1/O1CN01WLxnTI1iQSY9ncMiX_!!6000000004407-2-tps-44-36.png" />
        </span>
      );
    }

    return null;
  };

  return (
    <div className={`property-bar-button ${className} ${showVipIcon ? 'show-vip-icon' : ''}`}>
      <Button
        disabled={disabled}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        level={level}
        type={type}
      >
        <SmartText>{renderContent}</SmartText>
        {renderBenefitIndicator()}
      </Button>
    </div>
  );
};

export default PropertyBarButton;