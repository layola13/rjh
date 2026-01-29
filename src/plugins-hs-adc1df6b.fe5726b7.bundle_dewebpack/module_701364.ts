import { SmartText, Tooltip, Switch } from './components';
import { Icons } from './icons';

interface IconConfig {
  type?: string;
  tooltip?: string;
}

interface SwitchData {
  label?: string;
  className?: string;
  disabled?: boolean;
  icon?: IconConfig;
  [key: string]: unknown;
}

interface PropertyBarSwitchProps {
  data: SwitchData;
  id: string;
}

export default function PropertyBarSwitch({ data, id }: PropertyBarSwitchProps): JSX.Element {
  const { label, className, disabled, icon, ...restProps } = data;
  
  const isDisabled = disabled ?? false;
  const iconType = icon?.type ?? 'hs_shuxingmianban_xiangqing';
  const iconTooltip = icon?.tooltip ?? '';
  const componentClassName = className ?? '';

  return (
    <div
      id={id}
      className={`property-bar-switch ${componentClassName}${isDisabled ? ' disabled' : ''}`}
    >
      <div className="property-bar-label switch-label">
        {label && (
          <SmartText className="property-bar-label-text">
            {label}
          </SmartText>
        )}
        {icon && (
          <Tooltip
            placement="top"
            title={
              <div className="property-bar-switch-label-tooltip">
                {iconTooltip}
              </div>
            }
            color="dark"
          >
            <Icons
              className="property-bar-label-icon"
              type={iconType}
            />
          </Tooltip>
        )}
      </div>
      <div className="property-bar-switch-button">
        <Switch {...restProps} disabled={isDisabled} />
      </div>
    </div>
  );
}