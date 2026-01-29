import { useTheme } from './hooks/theme';
import { SmartText, Tooltip } from './components/ui';
import React, { useState } from 'react';
import Input from './components/Input';
import Icon from './components/Icon';
import SearchIcon from './components/SearchIcon';

interface TopBarProps {
  left?: React.ReactNode;
  close?: () => void;
  inSearch: boolean;
  searchBtnClick: () => void;
  curoseBtnClick: () => void;
  onSearch?: (value: string) => void;
  hiddenSearchBtn?: boolean;
  title?: string;
}

interface SearchInputProps {
  value?: string;
  onSearch?: (value: string) => void;
}

const THEME_FP = 'fp';
const SEARCH_ICON_SIZE = 16;
const POPOVER_Z_INDEX = '3010';

function SearchInput({ value, onSearch }: SearchInputProps): React.ReactElement {
  const [searchValue, setSearchValue] = useState<string>(value ?? '');

  const handleSearch = (): void => {
    onSearch?.(searchValue);
  };

  const placeholder = ResourceManager.getString('plugin_teaching_placeholder');

  const suffixIcon = (
    <SearchIcon
      className="input-search-icon"
      onClick={handleSearch}
      style={{ fontSize: SEARCH_ICON_SIZE }}
      type="hs_xian_sousuo"
    />
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(e.target?.value ?? '');
  };

  const handleFocus = (): void => {
    HSApp.App.getApp().hotkey.disable();
  };

  const handleBlur = (): void => {
    HSApp.App.getApp().hotkey.enable();
  };

  return (
    <Input
      placeholder={placeholder}
      onChange={handleChange}
      onPressEnter={handleSearch}
      allowClear={true}
      suffix={suffixIcon}
      onFocus={handleFocus}
      onBlur={handleBlur}
    />
  );
}

export default function TopBar({
  left,
  close,
  inSearch,
  searchBtnClick,
  curoseBtnClick,
  onSearch,
  hiddenSearchBtn,
  title
}: TopBarProps): React.ReactElement {
  const theme = useTheme();
  const isFpTenant = HSApp.Config.TENANT === THEME_FP;

  const handleClose = (): void => {
    close?.();
  };

  return (
    <div className={`teaching-top ${theme}`}>
      {left && (
        <div className="top-left">
          {left}
        </div>
      )}

      {title && (
        <SmartText
          className="top-title"
          popoverStyle={{ zIndex: POPOVER_Z_INDEX }}
        >
          {title}
        </SmartText>
      )}

      <div className="top-search">
        {!hiddenSearchBtn && (
          <div className={inSearch ? 'width-none' : 'operate'}>
            {!isFpTenant && (
              <Tooltip
                overlayClassName="coruse-icon-popover"
                placement="bottom"
                title={ResourceManager.getString('page_header_3D_video_course_tip')}
                color="dark"
              >
                <div>
                  <Icon
                    className="round-icon-o search-btn-icon"
                    onClick={curoseBtnClick}
                    type="hs_xian_shejiketang"
                  />
                </div>
              </Tooltip>
            )}

            <Icon
              className="round-icon-o search-btn-icon"
              onClick={searchBtnClick}
              type="hs_xian_sousuo"
            />
          </div>
        )}

        <div className={`search-input ${inSearch ? '' : 'width-none'}`}>
          <SearchInput onSearch={onSearch} />
        </div>
      </div>

      <div className="top-close" onClick={handleClose}>
        <Icon
          className="round-icon-o"
          type="hs_xian_guanbi"
        />
      </div>
    </div>
  );
}