import React, { useState } from 'react';
import { Input } from 'antd';
import { useTheme } from '@/hooks/useTheme';
import Icon from '@/components/Icon';
import { SmartText, Tooltip } from '@/components/UI';

/**
 * 顶部栏组件的属性接口
 */
interface TeachingTopProps {
  /** 左侧自定义内容 */
  left?: React.ReactNode;
  /** 关闭按钮回调 */
  close?: () => void;
  /** 是否处于搜索状态 */
  inSearch?: boolean;
  /** 搜索按钮点击回调 */
  searchBtnClick?: () => void;
  /** 课程按钮点击回调 */
  curoseBtnClick?: () => void;
  /** 搜索回调 */
  onSearch?: (value?: string) => void;
  /** 是否隐藏搜索按钮 */
  hiddenSearchBtn?: boolean;
  /** 标题文本 */
  title?: string;
}

/**
 * 搜索输入框组件的属性接口
 */
interface SearchInputProps {
  /** 输入框初始值 */
  value?: string;
  /** 搜索回调函数 */
  onSearch?: (value?: string) => void;
}

/**
 * 搜索输入框组件
 * @param props - 搜索输入框属性
 * @returns 搜索输入框元素
 */
function SearchInput(props: SearchInputProps): React.ReactElement {
  const [searchValue, setSearchValue] = useState<string | undefined>(props.value);

  /**
   * 执行搜索操作
   */
  const handleSearch = (): void => {
    props.onSearch?.(searchValue);
  };

  /**
   * 输入框变化处理
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(e.target?.value);
  };

  /**
   * 输入框获得焦点时禁用全局热键
   */
  const handleFocus = (): void => {
    HSApp.App.getApp().hotkey.disable();
  };

  /**
   * 输入框失去焦点时启用全局热键
   */
  const handleBlur = (): void => {
    HSApp.App.getApp().hotkey.enable();
  };

  const placeholderText = ResourceManager.getString('plugin_teaching_placeholder');
  
  const searchIcon = (
    <Icon
      className="input-search-icon"
      onClick={handleSearch}
      style={{ fontSize: 16 }}
      type="hs_xian_sousuo"
    />
  );

  return (
    <Input
      placeholder={placeholderText}
      onChange={handleChange}
      onPressEnter={handleSearch}
      allowClear
      suffix={searchIcon}
      onFocus={handleFocus}
      onBlur={handleBlur}
    />
  );
}

/**
 * 教学模式顶部栏组件
 * 包含左侧内容区、标题、搜索功能和关闭按钮
 * 
 * @param props - 顶部栏属性
 * @returns 顶部栏元素
 */
export default function TeachingTop(props: TeachingTopProps): React.ReactElement {
  const theme = useTheme();
  const {
    left,
    close,
    inSearch,
    searchBtnClick,
    curoseBtnClick,
    onSearch,
    hiddenSearchBtn,
    title
  } = props;

  /** 是否为 FP 租户 */
  const isFpTenant = HSApp.Config.TENANT === 'fp';

  /**
   * 关闭按钮点击处理
   */
  const handleClose = (): void => {
    close?.();
  };

  return (
    <div className={`teaching-top ${theme}`}>
      {/* 左侧内容区域 */}
      {left && (
        <div className="top-left">
          {left}
        </div>
      )}

      {/* 标题区域 */}
      {title && (
        <SmartText
          className="top-title"
          popoverStyle={{ zIndex: '3010' }}
        >
          {title}
        </SmartText>
      )}

      {/* 搜索区域 */}
      <div className="top-search">
        {/* 搜索操作按钮 */}
        {!hiddenSearchBtn && (
          <div className={inSearch ? 'width-none' : 'operate'}>
            {/* 课程按钮（非FP租户显示） */}
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

            {/* 搜索按钮 */}
            <Icon
              className="round-icon-o search-btn-icon"
              onClick={searchBtnClick}
              type="hs_xian_sousuo"
            />
          </div>
        )}

        {/* 搜索输入框 */}
        <div className={`search-input ${inSearch ? '' : 'width-none'}`}>
          <SearchInput onSearch={onSearch} />
        </div>
      </div>

      {/* 关闭按钮 */}
      <div className="top-close" onClick={handleClose}>
        <Icon
          className="round-icon-o"
          type="hs_xian_guanbi"
        />
      </div>
    </div>
  );
}