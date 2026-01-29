import React, { forwardRef } from 'react';
import { Tooltip, Icons } from './components';

interface TeachingAbilityButtonProps {
  onClick?: () => void;
  theme?: string;
  className?: string;
  defaultShowTip?: boolean;
  closeModel?: () => void;
}

export const TeachingAbilityButton = forwardRef<HTMLDivElement, TeachingAbilityButtonProps>(
  (props, ref) => {
    const title = ResourceManager.getString("plugin_teaching_ability_title");
    const { onClick, theme, className } = props;

    return (
      <div className="teaching-ability-button-container">
        <Tooltip
          color="dark"
          title={<span className="title">{title}</span>}
        >
          <div
            className={`teaching-ability-button-wrapper ${className || ""} ${theme}`}
            ref={ref}
          >
            <div
              className="button"
              onClick={() => {
                onClick?.();
              }}
            >
              <Icons
                type="hs_xian_gongnengjiaocheng1"
                style={{ fontSize: "20px" }}
                className="menu-arrow"
              />
            </div>
          </div>
        </Tooltip>
      </div>
    );
  }
);

interface TeachingAbilityButtonOptionsConfig {
  showModel?: () => void;
  closeModel?: () => void;
  theme?: string;
}

export class TeachingAbilityButtonOptions {
  showModel?: () => void;
  closeModel?: () => void;
  order: number;
  theme: string;

  constructor(config: TeachingAbilityButtonOptionsConfig) {
    this.showModel = config.showModel;
    this.closeModel = config.closeModel;
    this.theme = config.theme || "teaching-light";
    this.order = 10;
  }

  getRenderItem(): React.ReactElement {
    return React.createElement(TeachingAbilityButton, {
      defaultShowTip: true,
      onClick: this.showModel,
      closeModel: this.closeModel,
      theme: this.theme
    });
  }
}