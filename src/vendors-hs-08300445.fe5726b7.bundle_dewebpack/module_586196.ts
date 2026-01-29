import React, { Component, ReactNode } from 'react';
import Menu, { MenuItem } from './Menu';
import { MentionsContextConsumer } from './MentionsContext';

interface MentionOption {
  key: string;
  disabled?: boolean;
  children?: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

interface DropdownProps {
  prefixCls: string;
  options: MentionOption[];
}

interface RenderDropdownParams {
  notFoundContent: ReactNode;
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  selectOption: (option: MentionOption | undefined) => void;
  onFocus: () => void;
  onBlur: () => void;
}

interface SelectEventParams {
  key: string;
}

/**
 * MentionsDropdown component for displaying mention suggestions
 */
export default class MentionsDropdown extends Component<DropdownProps> {
  /**
   * Renders the dropdown menu with mention options
   */
  renderDropdown = (params: RenderDropdownParams): ReactNode => {
    const { notFoundContent, activeIndex, setActiveIndex, selectOption, onFocus, onBlur } = params;
    const { prefixCls, options } = this.props;
    const activeOption = options[activeIndex] ?? {};

    return (
      <Menu
        prefixCls={`${prefixCls}-menu`}
        activeKey={activeOption.key}
        onSelect={(event: SelectEventParams) => {
          const { key } = event;
          const selectedOption = options.find((option) => option.key === key);
          selectOption(selectedOption);
        }}
        onFocus={onFocus}
        onBlur={onBlur}
      >
        {options.map((option, index) => {
          const { key, disabled, children, className, style } = option;
          return (
            <MenuItem
              key={key}
              disabled={disabled}
              className={className}
              style={style}
              onMouseEnter={() => {
                setActiveIndex(index);
              }}
            >
              {children}
            </MenuItem>
          );
        })}
        {options.length === 0 && (
          <MenuItem disabled={true}>
            {notFoundContent}
          </MenuItem>
        )}
      </Menu>
    );
  };

  render(): ReactNode {
    return (
      <MentionsContextConsumer>
        {this.renderDropdown}
      </MentionsContextConsumer>
    );
  }
}