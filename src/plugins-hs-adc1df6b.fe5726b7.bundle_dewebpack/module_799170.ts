import { Component, ReactElement, MouseEvent } from 'react';
import { SmartText } from './SmartText';
import { Icons } from './Icons';
import { HSConstants } from './HSConstants';

interface NinePathDisableMatrix {
  [rowIndex: number]: boolean[];
}

interface PopoverConfig {
  placement?: string;
  trigger?: string;
  delay?: number;
  delayOpen?: number;
  delayClose?: number;
  imageUrl?: string;
  videoUrl?: string;
  text?: string;
  showBtn?: boolean;
  onBtnClick?: () => void;
  btnText?: string;
  linkText?: string;
  linkUrl?: string;
}

interface BlockAlignProps {
  data: {
    label: string;
    alignType: string;
    onValueChanged?: (alignType: string) => void;
    popover?: PopoverConfig;
    gridzone?: string;
    ninepathdisable?: boolean[][];
    defaultNinepathDisable?: boolean[][];
    size?: 'small' | 'medium' | 'large';
  };
}

interface BlockAlignState {
  selectBlock: [number, number];
  defaultSelectBlock: [number, number];
  defaultNinepathDisable: boolean[][];
}

type PositionType = 
  | typeof HSConstants.Position.TopLeft
  | typeof HSConstants.Position.TopCenter
  | typeof HSConstants.Position.TopRight
  | typeof HSConstants.Position.LeftMiddle
  | typeof HSConstants.Position.CenterMiddle
  | typeof HSConstants.Position.RightMiddle
  | typeof HSConstants.Position.BottomLeft
  | typeof HSConstants.Position.BottomCenter
  | typeof HSConstants.Position.BottomRight;

const CENTER_ICON_CLASS = 'hs_shuxingmianban_qishicenter';

const ICON_MATRIX: string[][] = [
  ['hs_shuxingmianban_qishizuoshang', 'hs_shuxingmianban_qishishang', 'hs_shuxingmianban_qishiyoushang'],
  ['hs_shuxingmianban_qishizuo', CENTER_ICON_CLASS, 'hs_shuxingmianban_qishiyou'],
  ['hs_shuxingmianban_qishizuoxia', 'hs_shuxingmianban_qishixia', 'hs_shuxingmianban_qishiyouxia']
];

const POSITION_CLASS_MATRIX: string[][] = [
  ['leftTop', 'centerTop', 'rightTop'],
  ['leftMiddle', 'centerMiddle', 'rightMiddle'],
  ['leftBottom', 'centerBottom', 'rightBottom']
];

const POSITION_VALUE_MATRIX: PositionType[][] = [
  [HSConstants.Position.TopLeft, HSConstants.Position.TopCenter, HSConstants.Position.TopRight],
  [HSConstants.Position.LeftMiddle, HSConstants.Position.CenterMiddle, HSConstants.Position.RightMiddle],
  [HSConstants.Position.BottomLeft, HSConstants.Position.BottomCenter, HSConstants.Position.BottomRight]
];

const DEFAULT_NINEPATH_DISABLE: boolean[][] = [
  [false, false, false],
  [false, false, false],
  [false, false, false]
];

export default class BlockAlign extends Component<BlockAlignProps, BlockAlignState> {
  constructor(props: BlockAlignProps) {
    super(props);
    
    const initialSelectBlock = this.getSelectBlock(props.data.alignType);
    
    this.state = {
      selectBlock: initialSelectBlock,
      defaultSelectBlock: initialSelectBlock,
      defaultNinepathDisable: props.data.defaultNinepathDisable || DEFAULT_NINEPATH_DISABLE
    };
  }

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
   * Handles click event on alignment blocks
   */
  private onclick = (alignType: string): void => {
    const { onValueChanged } = this.props.data;
    const newSelectBlock = this.getSelectBlock(alignType);
    
    this.setState({
      defaultSelectBlock: newSelectBlock
    });
    
    onValueChanged?.(alignType);
  };

  /**
   * Gets hint text by alignment type
   */
  private getHintByAlignType(hints: Record<string, string> | undefined, alignType: string): string | undefined {
    if (!hints) return undefined;
    
    const type = alignType !== undefined && alignType !== '' 
      ? alignType 
      : HSConstants.Position.TopLeft;
      
    return hints[type];
  }

  /**
   * Converts alignment type to grid coordinates
   */
  private getSelectBlock(alignType: string): [number, number] {
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
   * Generates icon array based on selected block position
   */
  private getImgArr(selectedBlock: [number, number]): string[][] {
    const resultMatrix: string[][] = [];
    
    for (let row = 0; row < 3; row++) {
      resultMatrix[row] = ['', '', ''];
    }

    for (let rowOffset = -1; rowOffset < 2; rowOffset++) {
      for (let colOffset = -1; colOffset < 2; colOffset++) {
        const targetRow = selectedBlock[0] + rowOffset;
        const targetCol = selectedBlock[1] + colOffset;
        
        if (targetRow >= 0 && targetRow <= 2 && targetCol >= 0 && targetCol <= 2) {
          resultMatrix[targetRow][targetCol] = ICON_MATRIX[rowOffset + 1][colOffset + 1];
        }
      }
    }

    return resultMatrix;
  }

  /**
   * Handles mouse enter event on alignment blocks
   */
  private handleMouseEnter = (alignType: string): void => {
    const newSelectBlock = this.getSelectBlock(alignType);
    this.setState({
      selectBlock: newSelectBlock
    });
  };

  /**
   * Handles mouse leave event, resets to default selection
   */
  private handleMouseLeave = (): void => {
    this.setState({
      selectBlock: this.state.defaultSelectBlock
    });
  };

  /**
   * Renders a single alignment block
   */
  private renderBlock(
    positionType: PositionType,
    rowIndex: number,
    colIndex: number,
    iconClass: string,
    isDisabled: boolean
  ): ReactElement {
    const positionClassName = POSITION_CLASS_MATRIX[rowIndex][colIndex];
    const className = `block ${positionClassName}${isDisabled ? ' disabled' : ''}`;

    const iconElement = iconClass === CENTER_ICON_CLASS
      ? <div className="center-box" />
      : <Icons type={iconClass} />;

    return (
      <div
        className={className}
        onClick={() => !isDisabled && this.onclick(positionType)}
        onMouseEnter={() => !isDisabled && this.handleMouseEnter(positionType)}
      >
        <div className={`${positionClassName}Inner`} />
        {!isDisabled && iconElement}
      </div>
    );
  }

  render(): ReactElement {
    const { label, popover, gridzone, ninepathdisable, size = 'small' } = this.props.data;
    const disableMatrix = ninepathdisable || this.state.defaultNinepathDisable;
    const { selectBlock } = this.state;
    const iconMatrix = this.getImgArr(selectBlock);

    const blockGrid = POSITION_VALUE_MATRIX.map((row, rowIndex) =>
      row.map((positionType, colIndex) =>
        this.renderBlock(
          positionType,
          rowIndex,
          colIndex,
          iconMatrix[rowIndex][colIndex],
          disableMatrix[rowIndex][colIndex]
        )
      )
    );

    const containerClassName = `block-align-container block-align-container__${size}`;

    let content = (
      <div className={containerClassName}>
        <SmartText className="block-align-label">{label}</SmartText>
        <div className="block-align" onMouseLeave={this.handleMouseLeave}>
          {blockGrid}
        </div>
      </div>
    );

    if (gridzone) {
      const filteredBlocks: ReactElement[] = [];
      
      blockGrid.forEach((row) => {
        row.forEach((block) => {
          if (gridzone === 'tophorizontal') {
            const blockClassName = block.props.className;
            if (
              blockClassName === 'block rightTop' ||
              blockClassName === 'block centerTop' ||
              blockClassName === 'block leftTop'
            ) {
              const modifiedBlock = {
                ...block,
                props: {
                  ...block.props,
                  className: blockClassName.replace('Top', 'Middle')
                }
              };
              filteredBlocks.push(modifiedBlock);
            }
          }
        });
      });

      content = (
        <div className={containerClassName}>
          <SmartText className="block-align-label">{label}</SmartText>
          <div className="block-align" onMouseLeave={this.handleMouseLeave}>
            {filteredBlocks}
          </div>
        </div>
      );
    }

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
          {content}
        </HSApp.UI.Popover.Heavy>
      );
    }

    return content;
  }
}