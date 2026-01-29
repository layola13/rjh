import React from 'react';
import { Tooltip } from 'antd';
import { IconfontView } from './IconfontView';

interface SliderInputOption {
  // 根据实际使用情况定义属性
  [key: string]: unknown;
}

interface ProportionalOption {
  checked: boolean;
  disabled?: boolean;
  showTooltip?: boolean;
  onChange?: (checked: boolean) => void;
}

interface SliderInputGroupData {
  sliderInputOptions: SliderInputOption[];
  proportionalOption?: ProportionalOption;
  parentTips?: string;
}

interface SliderInputGroupProps {
  data: SliderInputGroupData;
}

interface SliderInputGroupState {
  showTooltip: boolean;
  isHoverAction: boolean;
  proportionalIconOffset?: number;
}

class SliderInputGroup extends React.Component<SliderInputGroupProps, SliderInputGroupState> {
  private hoverActionTimer: NodeJS.Timeout | null = null;
  private sliderInputGroupRef = React.createRef<HTMLDivElement>();

  constructor(props: SliderInputGroupProps) {
    super(props);
    
    this.state = {
      showTooltip: props.data.proportionalOption?.showTooltip ?? false,
      isHoverAction: false,
      proportionalIconOffset: undefined
    };

    this.handleProportionalClick = this.handleProportionalClick.bind(this);
  }

  UNSAFE_componentWillReceiveProps(nextProps: SliderInputGroupProps): void {
    const newShowTooltip = nextProps.data.proportionalOption?.showTooltip;
    
    if (newShowTooltip !== this.state.showTooltip) {
      this.setState({
        showTooltip: newShowTooltip ?? false,
        isHoverAction: false
      });
    }

    if (this.hoverActionTimer) {
      clearTimeout(this.hoverActionTimer);
      this.hoverActionTimer = null;
    }
  }

  componentDidMount(): void {
    this.computeProportionalIconOffset();
  }

  handleProportionalClick(): void {
    const { proportionalOption } = this.props.data;
    
    if (proportionalOption?.disabled) {
      return;
    }

    if (proportionalOption?.onChange) {
      proportionalOption.onChange(!proportionalOption.checked);
    }
  }

  getProportionalIcon(
    option: ProportionalOption,
    topOffset: number,
    showTooltip: boolean
  ): React.ReactElement {
    if (!this.state.isHoverAction) {
      if (this.hoverActionTimer) {
        clearTimeout(this.hoverActionTimer);
        this.hoverActionTimer = null;
      }

      this.hoverActionTimer = setTimeout(() => {
        this.setState({ isHoverAction: true });
      }, 500);
    }

    const iconColor = option.disabled
      ? '#EAECF1'
      : this.state.isHoverAction
      ? option.checked
        ? '#33353B'
        : '#979797'
      : '#396EFE';

    const icon = (
      <span
        className="property-bar-slider-input-proportional-icon"
        onClick={this.handleProportionalClick}
        style={{ top: topOffset }}
      >
        <IconfontView
          showType={option.checked ? 'hs_mian_lianjie' : 'hs_mian_jiebang'}
          customStyle={{
            color: iconColor,
            fontSize: '16px'
          }}
          bgExtendSize={0}
        />
      </span>
    );

    if (showTooltip) {
      const tooltipTitle = option.checked
        ? ResourceManager.getString('plugin_cancel_scalecontent_su')
        : ResourceManager.getString('plugin_scalecontent_su');

      return (
        <Tooltip
          title={tooltipTitle}
          placement="topRight"
          arrowPointAtCenter={true}
          overlayClassName="property-bar-slider-input-proportional-tooltip"
          color="dark"
        >
          {icon}
        </Tooltip>
      );
    }

    return icon;
  }

  renderContent(content: React.ReactElement): React.ReactElement {
    const { parentTips } = this.props.data;

    if (parentTips) {
      return (
        <Tooltip
          placement="left"
          title={parentTips}
          color="dark"
          getPopupContainer={(element) => element}
          overlayClassName="property-bar-parent-tips"
        >
          {content}
        </Tooltip>
      );
    }

    return content;
  }

  getElementSize(element: HTMLElement): DOMRect {
    return element.getBoundingClientRect();
  }

  computeProportionalIconOffset(): void {
    if (!this.sliderInputGroupRef.current) {
      return;
    }

    const groupSize = this.getElementSize(this.sliderInputGroupRef.current);
    const inputWrappers = this.sliderInputGroupRef.current.querySelectorAll<HTMLElement>(
      '.property-bar-slider-input-wrapper'
    );

    if (inputWrappers.length <= 1) {
      return;
    }

    const firstWrapper = inputWrappers[0];
    const lastWrapper = inputWrappers[inputWrappers.length - 1];
    const firstSize = this.getElementSize(firstWrapper);

    const topOffset = firstSize.height - 12 - 7;
    const bottomOffset = groupSize.height - 12 - 7;

    this.setState({
      proportionalIconOffset: (topOffset + bottomOffset) / 2
    });
  }

  render(): React.ReactElement {
    const { sliderInputOptions, proportionalOption } = this.props.data;
    const { proportionalIconOffset, showTooltip } = this.state;

    const groupClassName = [
      'property-bar-slider-input-group',
      proportionalOption && 'property-bar-slider-input-group-proportional',
      proportionalOption?.checked && 'property-bar-slider-input-group-proportional-checked',
      proportionalOption?.disabled && 'property-bar-slider-input-group-proportional-disabled'
    ]
      .filter(Boolean)
      .join(' ');

    return this.renderContent(
      <div className="property-bar-slider-input-group-wrapper">
        <div ref={this.sliderInputGroupRef} className={groupClassName}>
          {sliderInputOptions.map((option, index) => (
            <div key={index} className="property-bar-slider-input-wrapper">
              <SliderInput data={option} />
            </div>
          ))}
          {proportionalOption && proportionalIconOffset && (
            this.getProportionalIcon(proportionalOption, proportionalIconOffset, showTooltip)
          )}
        </div>
      </div>
    );
  }
}

export default SliderInputGroup;