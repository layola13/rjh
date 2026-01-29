import React from 'react';

interface TipData {
  data: string;
}

interface LabelParam {
  tips?: TipData[];
  command?: string;
  labelButton?: boolean;
  onCancel?: () => void;
  onApply?: () => void;
  onNext?: () => void;
}

interface PropertyLabelProps {
  labelParam?: LabelParam;
}

interface PropertyLabelState {
  currentTip: string;
  step: number;
  tips: TipData[];
  command?: string;
  labelButton: boolean;
}

const LOCALIZED_STRINGS: Record<string, string> = {
  next: '下一步',
  apply: '应用',
  cancel: '取消',
  step: '步骤',
};

export default class PropertyLabel extends React.Component<PropertyLabelProps, PropertyLabelState> {
  constructor(props: PropertyLabelProps) {
    super(props);
    
    const labelParam = this.props.labelParam;
    
    this.state = {
      currentTip: labelParam?.tips?.length ? labelParam.tips[0].data : '',
      step: 0,
      tips: labelParam?.tips ?? [],
      command: labelParam?.command,
      labelButton: Boolean(labelParam?.labelButton),
    };
  }

  cancelClick(): void {
    this.props.labelParam?.onCancel?.();
  }

  applyClick(): void {
    this.props.labelParam?.onApply?.();
  }

  nextClick(): void {
    this.props.labelParam?.onNext?.();
    
    let currentStep = this.state.step;
    const headerElement = document.getElementsByClassName('property-tips-header')[0];
    
    if (headerElement) {
      const currentStepSpan = headerElement.getElementsByTagName('span')[currentStep];
      if (currentStepSpan) {
        currentStepSpan.className = currentStepSpan.className.replace('-active', '');
      }
    }
    
    currentStep++;
    
    if (currentStep >= this.state.tips.length) {
      this.applyClick();
    } else {
      if (headerElement) {
        const nextStepSpan = headerElement.getElementsByTagName('span')[currentStep];
        if (nextStepSpan) {
          nextStepSpan.className += '-active';
        }
      }
      
      this.setState({
        step: currentStep,
        currentTip: this.state.tips[currentStep].data,
      });
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps: PropertyLabelProps): void {
    const labelParam = nextProps.labelParam;
    
    this.setState({
      currentTip: labelParam?.tips?.length ? labelParam.tips[0].data : '',
      step: 0,
      tips: labelParam?.tips ?? [],
      command: labelParam?.command,
      labelButton: Boolean(labelParam?.labelButton),
    });
  }

  createLabelButton(): React.ReactElement {
    const hasMultipleTips = this.props.labelParam?.tips && this.props.labelParam.tips.length > 1;
    
    const actionButton = hasMultipleTips
      ? (
          <span className="command_label_next" onClick={() => this.nextClick()}>
            {LOCALIZED_STRINGS.next}
          </span>
        )
      : (
          <span className="command_label_apply" onClick={() => this.applyClick()}>
            {LOCALIZED_STRINGS.apply}
          </span>
        );
    
    const buttonClassName = this.props.labelParam?.labelButton
      ? 'command_label_button'
      : 'command_label_button_hide';
    
    return (
      <div className={buttonClassName}>
        <span className="command_label_cancel" onClick={() => this.cancelClick()}>
          {LOCALIZED_STRINGS.cancel}
        </span>
        {actionButton}
      </div>
    );
  }

  createLabelTips(): React.ReactElement | undefined {
    if (!this.props.labelParam?.tips?.length) {
      return undefined;
    }
    
    const stepElements: React.ReactElement[] = [];
    
    this.props.labelParam.tips.forEach((tip, index) => {
      const stepElement = index === 0
        ? (
            <span id="first-property-step" className="property-step-active">
              {`${LOCALIZED_STRINGS.step}${(index + 1).toString()}`}
            </span>
          )
        : (
            <span className="property-step">
              {`${LOCALIZED_STRINGS.step}${(index + 1).toString()}`}
            </span>
          );
      
      stepElements.push(stepElement);
    });
    
    const headerElement = <div className="property-tips-header">{stepElements}</div>;
    
    return (
      <div className="property-tips-container">
        {headerElement}
        <div className="property-tips-content">
          {this.state.currentTip}
        </div>
      </div>
    );
  }

  render(): React.ReactElement {
    const buttonElement = this.createLabelButton();
    const tipsElement = this.createLabelTips();
    
    return (
      <div id="propertyplane-label-part" className="property-label-part">
        <span className="command_label_icon" />
        <span className="command_label_name">
          {LOCALIZED_STRINGS[this.props.labelParam?.command ?? '']}
        </span>
        {buttonElement}
        {tipsElement}
      </div>
    );
  }
}