import { Icons, SmartText, Tooltip, Select, Option } from './ui-components';

interface DropdownIcon {
  type: string;
  iconPosition?: 'left' | 'right';
  iconColor?: string;
}

interface DropdownOption {
  id: string;
  label: string;
  icon?: string;
}

type SelectMode = 'single' | 'multiple';
type ComponentSize = 'large' | 'medium' | 'small';

interface DropdownListProps {
  data: {
    defaultKey: string;
    title?: string;
    options?: DropdownOption[];
    popWidth?: number | string;
    className?: string;
    tooltip?: string;
    onFocus?: () => void;
    onBlur?: () => void;
    size?: ComponentSize;
    onChange?: (value: string | string[]) => void;
    mode?: SelectMode;
    hideCurrent?: boolean;
    bindSelf?: boolean;
    disabled?: boolean;
    dropdownClassName?: string;
    onClose?: (event: unknown) => void;
    placeholder?: string;
    icon?: DropdownIcon;
  };
}

function renderTitle(props: DropdownListProps): JSX.Element | null {
  const { data } = props;
  const { title, icon, size = 'large' } = data;

  if (!title) {
    return null;
  }

  let hasIcon = false;
  let iconOnLeft = false;
  let iconElement: JSX.Element | null = null;
  let labelClassName = `property-bar-label dropdownlist-label dropdownlist-label-${size}`;

  if (icon) {
    const { type, iconPosition = 'left', iconColor = '#f5aea3' } = icon;
    hasIcon = true;
    iconOnLeft = iconPosition === 'left';
    
    const iconStyle = { color: iconColor };
    labelClassName += ' dropdownlist-label__hasicon';
    
    iconElement = (
      <Icons
        className="property-bar-dropdownlist-title__icon"
        style={iconStyle}
        type={type}
      />
    );
  }

  return (
    <div className={labelClassName}>
      {hasIcon && iconOnLeft && iconElement}
      <SmartText className="hasicon" placement="right">
        {title}
      </SmartText>
      {hasIcon && !iconOnLeft && iconElement}
    </div>
  );
}

function renderOption(option: DropdownOption, mode: SelectMode, size: ComponentSize): JSX.Element {
  const { icon, label, id } = option;
  
  let textClassName = `dropdownlist-label-${size}__text`;
  if (icon) {
    textClassName += '__hasicon';
  }

  const iconClassName = `dropdownlist-label-${size}__icon`;

  let titleContent: React.ReactNode = (
    <>
      {icon && <img className={iconClassName} src={icon} alt="" />}
      <SmartText placement="right" className={textClassName}>
        {label}
      </SmartText>
    </>
  );

  if (mode === 'multiple') {
    titleContent = label;
  }

  return (
    <Option key={id} value={id} title={titleContent}>
      {icon && <img className={iconClassName} src={icon} alt="" />}
      <SmartText placement="right" className={textClassName}>
        {label}
      </SmartText>
    </Option>
  );
}

export default function DropdownList(props: DropdownListProps): JSX.Element {
  const { data } = props;
  const {
    defaultKey,
    title,
    options,
    popWidth,
    className = '',
    tooltip,
    onFocus,
    onBlur,
    size = 'large',
    onChange,
    mode = 'single',
    hideCurrent = true,
    bindSelf,
    disabled,
    dropdownClassName,
    onClose,
    placeholder,
  } = data;

  const handleChange = (value: string | string[]): void => {
    if (onChange) {
      onChange(value);
    }
  };

  const handleClose = (event: unknown): void => {
    if (onClose) {
      onClose(event);
    }
  };

  const dropdownClassNames = dropdownClassName 
    ? `${dropdownClassName} dropdownlist-popdom` 
    : 'dropdownlist-popdom';

  return (
    <div className={`property-bar-dropdownlist ${className}`}>
      {renderTitle(props)}
      
      {tooltip && (
        <Tooltip placement="top" color="dark" title={tooltip}>
          <Icons
            className="dropdownlist-label-tooltip"
            type="hs_shuxingmianban_xiangqing"
          />
        </Tooltip>
      )}

      <div className={`property-bar-comp dropdownlist-comp-${size}`}>
        <Select
          placeholder={placeholder}
          disabled={disabled}
          dropdownClassName={dropdownClassNames}
          mode={mode}
          popWidth={popWidth}
          size={size}
          position="right"
          onBlur={onBlur}
          onFocus={onFocus}
          onClose={handleClose}
          onChange={handleChange}
          hideCurrent={hideCurrent}
          bindSelf={bindSelf}
          value={defaultKey}
        >
          {options?.map((option) => renderOption(option, mode, size))}
        </Select>
      </div>
    </div>
  );
}