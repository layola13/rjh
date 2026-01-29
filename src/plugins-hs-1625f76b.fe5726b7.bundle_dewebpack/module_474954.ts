import React from 'react';

interface HintViewProps {
  show?: boolean;
  hint?: React.ReactNode | string;
  icon?: string;
  btn?: React.ReactNode;
  className?: string;
}

interface HintViewState {
  value: string;
}

export default class HintView extends React.Component<HintViewProps, HintViewState> {
  constructor(props: HintViewProps) {
    super(props);
    this.state = {
      value: ""
    };
  }

  render(): React.ReactElement {
    const visibilityClass = this.props.show ? "" : "hidden ";
    
    const hintContent: React.ReactNode = typeof this.props.hint === "string" 
      ? <span>{this.props.hint}</span> 
      : this.props.hint;
    
    const productsInfoHeight = $(".products-info").height();
    const minHeightClass = productsInfoHeight && productsInfoHeight < 460 ? "min-hight " : "";
    
    return (
      <div className={`hint-view ${visibilityClass}${minHeightClass}${this.props.className ?? ''}`}>
        <div 
          className="icon" 
          style={{ backgroundImage: `url(${this.props.icon})` }}
        />
        <div className="tooltipstext">
          {hintContent}
        </div>
        {this.props.btn && (
          <div className="btn-style">
            {this.props.btn}
          </div>
        )}
      </div>
    );
  }
}