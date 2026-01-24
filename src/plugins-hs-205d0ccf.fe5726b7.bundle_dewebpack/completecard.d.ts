/**
 * CompleteCard 组件模块
 * 用于展示可选择的图片卡片，支持新标记、复选框和详情查看
 */

import React from 'react';
import { Badge, Checkbox } from 'antd'; // 假设使用 antd 组件库
import { CardTooltip } from './CardTooltip';

/**
 * 卡片项数据接口
 */
export interface CardItem {
  /** 任务ID */
  taskId: string;
  /** 图片名称 */
  imageName: string;
  /** 分辨率比例 */
  resolutionRatio: string;
  [key: string]: unknown;
}

/**
 * 工具提示项接口
 */
export interface TooltipItem {
  label: string;
  value: string | number;
}

/**
 * CompleteCard 组件属性接口
 */
export interface CompleteCardProps {
  /** 图片源地址 */
  src: string;
  /** 是否为新项目 */
  isNew: boolean;
  /** 卡片项数据 */
  item: CardItem;
  /** 复选框选中状态 */
  checked: boolean;
  /** 复选框状态变化回调 */
  onCheckedChange?: (item: CardItem) => void;
  /** 点击查看详情回调 */
  handleClick: (item: CardItem) => void;
  /** 工具提示项列表 */
  tooltipItems?: TooltipItem[];
}

/**
 * 完整卡片组件
 * 展示带有图片、标题、选择框和悬停操作的卡片
 * 
 * @param props - 组件属性
 * @returns React 组件
 */
export const CompleteCard: React.FC<CompleteCardProps> = (props) => {
  const {
    src,
    isNew,
    item,
    checked,
    onCheckedChange,
    handleClick,
    tooltipItems
  } = props;

  // 管理内部选中状态
  const [isChecked, setIsChecked] = React.useState<boolean>(checked);
  
  // 管理内部新标记状态
  const [isNewItem, setIsNewItem] = React.useState<boolean>(isNew);

  // 同步外部 checked 状态变化
  React.useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  // 同步外部 isNew 状态变化
  React.useEffect(() => {
    setIsNewItem(isNew);
  }, [isNew]);

  /**
   * 处理复选框变化事件
   */
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newChecked = event.target.checked;
    setIsChecked(newChecked);
    onCheckedChange?.(item);
  };

  /**
   * 处理点击查看更多
   */
  const handleViewMore = (): void => {
    handleClick(item);
  };

  return (
    <Badge dot={isNewItem}>
      <div className="grid-viewer-card">
        <div className="card-wrapper">
          {/* 卡片图片区域 */}
          <div
            className="card-img"
            style={{ backgroundImage: `url(${src})` }}
          >
            <div className="card-corner-sign">
              {ResourceManager.getString(item.resolutionRatio)}
            </div>
          </div>

          {/* 卡片底部信息 */}
          <div className="card-bottom">
            <div className="card-name">{item.imageName}</div>
          </div>

          {/* 复选框 */}
          <Checkbox
            className={isChecked ? 'card-checkbox checked' : 'card-checkbox'}
            data-item-uid={item.taskId}
            checked={checked}
            onChange={handleCheckboxChange}
          />

          {/* 悬停遮罩 */}
          <div className="hover-mask" />

          {/* 点击查看详情 */}
          <div className="click-view-more" onClick={handleViewMore}>
            {ResourceManager.getString('plugin_render_view_detail')}
          </div>
        </div>

        {/* 工具提示 */}
        <CardTooltip tooltipItems={tooltipItems} />
      </div>
    </Badge>
  );
};

/**
 * 全局资源管理器接口声明
 */
declare global {
  const ResourceManager: {
    getString(key: string): string;
  };
}