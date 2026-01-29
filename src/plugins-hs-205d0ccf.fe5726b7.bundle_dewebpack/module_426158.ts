import React, { useContext, useState, useEffect, useMemo, CSSProperties } from 'react';
import { Select } from 'antd';
import { ThemeContext } from './ThemeContext';
import { Icons } from './Icons';
import './styles.css';

interface RoundSelectProps {
  icon?: React.ReactNode;
  style?: CSSProperties;
  selectStyle?: CSSProperties;
  [key: string]: any;
}

export default function RoundSelect(props: RoundSelectProps) {
  const { icon, style, selectStyle, ...restProps } = props;

  const theme = useContext(ThemeContext);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const suffixIconElement = useMemo(() => {
    const iconType = isDropdownOpen 
      ? 'hs_xiao_danjiantou_shang' 
      : 'hs_xiao_danjiantou_xia';

    return (
      <Icons
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="suffix-icon"
        type={iconType}
      />
    );
  }, [isDropdownOpen]);

  const wrapperClassName = `round-select-wrapper ${theme} ${
    isMounted ? '' : 'round-select-wrapper-unmounted'
  }`;

  const dropdownClassName = `teaching-select-dropdown ${theme}`;

  const handleDropdownVisibleChange = (visible: boolean): void => {
    setIsDropdownOpen(visible);
  };

  return (
    <div
      id="round-select-wrapper"
      style={style}
      className={wrapperClassName}
    >
      {icon && <span className="icon">{icon}</span>}
      <Select
        className="round-select"
        dropdownClassName={dropdownClassName}
        style={selectStyle}
        width={154}
        suffixIcon={suffixIconElement}
        open={isDropdownOpen}
        onDropdownVisibleChange={handleDropdownVisibleChange}
        {...restProps}
      />
    </div>
  );
}