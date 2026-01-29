import React, { useState } from 'react';
import { CheckBox } from './CheckBox';
import { IconfontView } from './IconfontView';
import './AuthPopupComponent.css';

const AUTH_POPUP_CONTAINER_CLASS = 'auth-popup-container';

interface ActionButton {
  text: string;
  icon: string;
  onClick?: () => void;
}

interface CheckboxConfig {
  checkState: boolean;
  checkboxText: string;
  callback: (checked: boolean) => void;
}

interface AuthPopupComponentProps {
  title?: string;
  description?: string;
  diablePrev?: boolean;
  diableNext?: boolean;
  prev?: ActionButton;
  next?: ActionButton;
  className?: string;
  renderItem?: React.ReactNode;
  checkbox?: CheckboxConfig;
}

export const AuthPopupComponent: React.FC<AuthPopupComponentProps> = ({
  title = ResourceManager.getString('plugin_single_device_login_continue_title'),
  description = ResourceManager.getString('plugin_single_device_login_continue_content'),
  diablePrev,
  diableNext,
  prev,
  next,
  className = '',
  renderItem,
  checkbox
}) => {
  const [isChecked, setIsChecked] = useState<boolean>(checkbox?.checkState ?? false);

  const handleCheckboxChange = (checked: boolean): void => {
    setIsChecked(checked);
    checkbox?.callback(checked);
  };

  const handlePrevClick = (): void => {
    prev?.onClick?.();
  };

  const handleNextClick = (): void => {
    next?.onClick?.();
  };

  return (
    <div className={`${AUTH_POPUP_CONTAINER_CLASS} ${className}`}>
      {renderItem || (
        <div className={`${AUTH_POPUP_CONTAINER_CLASS}-content`}>
          <div className={`${AUTH_POPUP_CONTAINER_CLASS}-content-title`}>
            {title}
          </div>
          
          <div className={`${AUTH_POPUP_CONTAINER_CLASS}-content-description ${checkbox ? 'has-checkbox' : ''}`}>
            {description}
          </div>
          
          {checkbox && (
            <div className={`${AUTH_POPUP_CONTAINER_CLASS}-content-checkbox`}>
              <CheckBox onChange={handleCheckboxChange} checked={isChecked}>
                {checkbox.checkboxText}
              </CheckBox>
            </div>
          )}
          
          <div className={`${AUTH_POPUP_CONTAINER_CLASS}-content-action`}>
            {prev && !diablePrev && (
              <div
                onClick={handlePrevClick}
                className={`${AUTH_POPUP_CONTAINER_CLASS}-content-action-btn ${AUTH_POPUP_CONTAINER_CLASS}-content-action-prev`}
              >
                <IconfontView
                  customStyle={{ fontSize: '20px' }}
                  showType={prev.icon}
                />
                <div className={`${AUTH_POPUP_CONTAINER_CLASS}-content-action-btn-text`}>
                  {prev.text}
                </div>
              </div>
            )}
            
            {next && !diableNext && (
              <div
                onClick={handleNextClick}
                className={`${AUTH_POPUP_CONTAINER_CLASS}-content-action-btn ${AUTH_POPUP_CONTAINER_CLASS}-content-action-next`}
              >
                <IconfontView
                  customStyle={{ fontSize: '20px', color: '#fff' }}
                  showType={next.icon}
                />
                <div className={`${AUTH_POPUP_CONTAINER_CLASS}-content-action-btn-text`}>
                  {next.text}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};