/**
 * 九宫格对齐方式选择组件
 * 用于选择UI元素的对齐位置（九个方位）
 */

import * as React from 'react';
import { HSConstants } from '../constants';
import { SmartText } from '../ui/SmartText';
import { Icons } from '../ui/Icons';

/**
 * 位置坐标类型 [row, column]
 * row: 0=顶部, 1=中部, 2=底部
 * column: 0=左侧, 1=中心, 2=右侧
 */
type BlockCoordinate = [number, number];

/**
 * 九宫格禁用状态矩阵（3x3）
 */
type NinePathDisable = [
  [boolean, boolean, boolean],
  [boolean, boolean, boolean],
  [boolean, boolean, boolean]
];

/**
 * 组件属性接口
 */
interface BlockAlignProps {
  data: {
    /** 当前对齐类型 */
    alignType: HSConstants.Position;
    /** 九宫格禁用状态配置 */
    defaultNinepathDisable?: NinePathDisable;
    /** 九宫格禁用状态（动态） */
    ninepathdisable?: NinePathDisable;
    /** 标签文本 */
    label?: string;
    /** 气泡提示配置 */
    popover?: PopoverConfig;
    /** 网格区域限制（如'tophorizontal'仅显示顶部三格） */
    gridzone?: string;
    /** 组件尺寸 */
    size?: 'small' | 'medium' | 'large';
    /** 值变化回调 */
    onValueChanged?: (alignType: HSConstants.Position) => void;
  };
}

/**
 * 气泡提示配置接口
 */
interface PopoverConfig {
  /** 显示位置 */
  placement?: string;
  /** 触发方式 */
  trigger?: string;
  /** 延迟时间 */
  delay?: number;
  /** 打开延迟 */
  delayOpen?: number;
  /** 关闭延迟 */
  delayClose?: number;
  /** 图片URL */
  imageUrl?: string;
  /** 视频URL */
  videoUrl?: string;
  /** 提示文本 */
  text?: string;
  /** 是否显示按钮 */
  showBtn?: boolean;
  /** 按钮点击回调 */
  onBtnClick?: () => void;
  /** 按钮文本 */
  btnText?: string;
  /** 链接文本 */
  linkText?: string;
  /** 链接URL */
  linkUrl?: string;
}

/**
 * 组件状态接口
 */
interface BlockAlignState {
  /** 当前选中的格子坐标 */
  selectBlock: BlockCoordinate;
  /** 默认选中的格子坐标 */
  defaultSelectBlock: BlockCoordinate;
  /** 九宫格禁用状态 */
  defaultNinepathDisable: NinePathDisable;
}

/**
 * 九宫格图标常量
 */
const ICON_CENTER = 'hs_shuxingmianban_qishicenter';

/**
 * 九宫格对齐选择组件
 * 提供9个方位的对齐位置选择功能
 */
export default class BlockAlignComponent extends React.Component<BlockAlignProps, BlockAlignState> {
  constructor(props: BlockAlignProps) {
    super(props);
    
    this.state = {
      selectBlock: this.getSelectBlock(props.data.alignType),
      defaultSelectBlock: this.getSelectBlock(props.data.alignType),
      defaultNinepathDisable: props.data.defaultNinepathDisable || [
        [false, false, false],
        [false, false, false],
        [false, false, false]
      ]
    };
  }

  /**
   * 属性更新时同步默认选中状态
   */
  UNSAFE_componentWillReceiveProps(nextProps: BlockAlignProps): void {
    if (nextProps.data.alignType) {
      const newSelectBlock = this.getSelectBlock(nextProps.data.alignType);
      if (newSelectBlock !== this.state.defaultSelectBlock) {
        this.setState({
          defaultSelectBlock: newSelectBlock
        });
      }
    }
  }

  /**
   * 点击格子时触发
   * @param alignType - 对齐类型枚举值
   */
  private onclick = (alignType: HSConstants.Position): void => {
    const { onValueChanged } = this.props.data;
    const newSelectBlock = this.getSelectBlock(alignType);
    
    this.setState({
      defaultSelectBlock: newSelectBlock
    });
    
    if (onValueChanged) {
      onValueChanged(alignType);
    }
  };

  /**
   * 根据对齐类型获取提示信息
   * @param hints - 提示信息映射对象
   * @param alignType - 对齐类型
   */
  private getHintByAlignType(hints: Record<string, unknown>, alignType?: HSConstants.Position): unknown {
    if (!hints) return undefined;
    
    const type = alignType !== undefined && alignType !== '' 
      ? alignType 
      : HSConstants.Position.TopLeft;
    
    return hints[type];
  }

  /**
   * 将对齐类型转换为九宫格坐标
   * @param alignType - 对齐类型枚举值
   * @returns 九宫格坐标 [row, column]，无效值返回 [10, 10]
   */
  private getSelectBlock(alignType: HSConstants.Position): BlockCoordinate {
    switch (alignType) {
      case HSConstants.Position.TopLeft:
        return [0, 0];
      case HSConstants.Position.TopCenter:
        return [0, 1];
      case HSConstants.Position.TopRight:
        return [0, 2];
      case HSConstants.Position.LeftMiddle:
        return [1, 0];
      case HSConstants.Position.CenterMiddle:
        return [1, 1];
      case HSConstants.Position.RightMiddle:
        return [1, 2];
      case HSConstants.Position.BottomLeft:
        return [2, 0];
      case HSConstants.Position.BottomCenter:
        return [2, 1];
      case HSConstants.Position.BottomRight:
        return [2, 2];
      default:
        return [10, 10];
    }
  }

  /**
   * 根据选中坐标生成周围3x3图标矩阵
   * @param coordinate - 选中的坐标
   * @returns 3x3图标名称矩阵
   */
  private getImgArr(coordinate: BlockCoordinate): string[][] {
    const iconTemplate = [
      ['hs_shuxingmianban_qishizuoshang', 'hs_shuxingmianban_qishishang', 'hs_shuxingmianban_qishiyoushang'],
      ['hs_shuxingmianban_qishizuo', ICON_CENTER, 'hs_shuxingmianban_qishiyou'],
      ['hs_shuxingmianban_qishizuoxia', 'hs_shuxingmianban_qishixia', 'hs_shuxingmianban_qishiyouxia']
    ];
    
    const result: string[][] = Array(3).fill(null).map(() => ['', '', '']);
    
    for (let rowOffset = -1; rowOffset <= 1; rowOffset++) {
      for (let colOffset = -1; colOffset <= 1; colOffset++) {
        const targetRow = coordinate[0] + rowOffset;
        const targetCol = coordinate[1] + colOffset;
        
        if (targetRow >= 0 && targetRow <= 2 && targetCol >= 0 && targetCol <= 2) {
          result[targetRow][targetCol] = iconTemplate[rowOffset + 1][colOffset + 1];
        }
      }
    }
    
    return result;
  }

  /**
   * 鼠标悬停时更新选中状态
   */
  private handleMouseEnter = (alignType: HSConstants.Position): void => {
    const selectBlock = this.getSelectBlock(alignType);
    this.setState({ selectBlock });
  };

  /**
   * 鼠标离开时恢复默认选中状态
   */
  private handleMouseLeave = (): void => {
    const { defaultSelectBlock } = this.state;
    this.setState({ selectBlock: defaultSelectBlock });
  };

  render(): React.ReactNode {
    const { label, popover, gridzone, ninepathdisable, size = 'small' } = this.props.data;
    const disableMatrix = ninepathdisable || this.state.defaultNinepathDisable;
    const { selectBlock } = this.state;
    
    const iconMatrix = this.getImgArr(selectBlock);
    
    /** CSS类名矩阵 */
    const classNameMatrix = [
      ['leftTop', 'centerTop', 'rightTop'],
      ['leftMiddle', 'centerMiddle', 'rightMiddle'],
      ['leftBottom', 'centerBottom', 'rightBottom']
    ];
    
    /** 对齐类型枚举矩阵 */
    const positionMatrix = [
      [HSConstants.Position.TopLeft, HSConstants.Position.TopCenter, HSConstants.Position.TopRight],
      [HSConstants.Position.LeftMiddle, HSConstants.Position.CenterMiddle, HSConstants.Position.RightMiddle],
      [HSConstants.Position.BottomLeft, HSConstants.Position.BottomCenter, HSConstants.Position.BottomRight]
    ];
    
    /** 渲染单个格子 */
    const renderBlock = (position: HSConstants.Position, row: number, col: number): React.ReactElement => {
      const isDisabled = disableMatrix[row][col];
      const className = `block ${classNameMatrix[row][col]}${isDisabled ? ' disabled' : ''}`;
      
      const iconElement = iconMatrix[row][col] === ICON_CENTER
        ? <div className="center-box" />
        : <Icons type={iconMatrix[row][col]} />;
      
      return (
        <div
          className={className}
          onClick={() => !isDisabled && this.onclick(position)}
          onMouseEnter={() => !isDisabled && this.handleMouseEnter(position)}
        >
          <div className={`${classNameMatrix[row][col]}Inner`} />
          {!isDisabled && iconElement}
        </div>
      );
    };
    
    /** 渲染九宫格 */
    const gridElements = positionMatrix.map((row, rowIndex) =>
      row.map((position, colIndex) => renderBlock(position, rowIndex, colIndex))
    );
    
    const containerClassName = `block-align-container block-align-container__${size}`;
    
    let alignComponent = (
      <div className={containerClassName}>
        <SmartText className="block-align-label">{label}</SmartText>
        <div className="block-align" onMouseLeave={this.handleMouseLeave}>
          {gridElements}
        </div>
      </div>
    );
    
    /** 处理网格区域限制 */
    if (gridzone) {
      const alignGrid = (alignComponent.props as any).children[1];
      const filteredChildren: React.ReactElement[] = [];
      
      (alignGrid.props as any).children.forEach((rowElements: React.ReactElement[]) => {
        rowElements.forEach((element: React.ReactElement) => {
          if (gridzone === 'tophorizontal') {
            const className = element.props.className;
            if (
              className === 'block rightTop' ||
              className === 'block centerTop' ||
              className === 'block leftTop'
            ) {
              element.props.className = className.replace('Top', 'Middle');
              filteredChildren.push(element);
            }
          }
        });
      });
      
      alignGrid.props.children = filteredChildren;
    }
    
    /** 包裹气泡提示 */
    if (popover && typeof popover === 'object') {
      return (
        <HSApp.UI.Popover.Heavy
          placement={popover.placement}
          trigger={popover.trigger}
          delay={popover.delay}
          delayOpen={popover.delayOpen}
          delayClose={popover.delayClose}
          imageUrl={popover.imageUrl}
          videoUrl={popover.videoUrl}
          text={popover.text}
          showBtn={popover.showBtn}
          onBtnClick={popover.onBtnClick}
          btnText={popover.btnText}
          linkText={popover.linkText}
          linkUrl={popover.linkUrl}
        >
          {alignComponent}
        </HSApp.UI.Popover.Heavy>
      );
    }
    
    return alignComponent;
  }
}