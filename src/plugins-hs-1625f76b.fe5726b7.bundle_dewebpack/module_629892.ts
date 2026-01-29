import React from 'react';

interface GroupButtonData {
  icon: string;
  text: string;
  onClick: () => void;
}

interface FloatToggleButtonProps {
  data: {
    className?: string;
    groupData: GroupButtonData[];
    icon: string;
  };
}

interface FloatToggleButtonState {
  hoverLeft: boolean;
  hoverRight: boolean;
}

interface IconfontViewProps {
  showType: string;
  customClass: string;
  customStyle: {
    fontSize: string;
    color: string;
  };
}

declare module IconfontModule {
  export const IconfontView: React.ComponentType<IconfontViewProps>;
}

import { IconfontView } from 'IconfontModule';

export default class FloatToggleButton extends React.Component<FloatToggleButtonProps, FloatToggleButtonState> {
  constructor(props: FloatToggleButtonProps) {
    super(props);
    this.state = {
      hoverLeft: false,
      hoverRight: false
    };
  }

  private _onMouseEnterGroupButton(event: React.MouseEvent, index: number): void {
    this.setState({
      hoverLeft: index === 0,
      hoverRight: index === 1
    });
  }

  private _onMouseLeaveGroupButton(event: React.MouseEvent, index: number): void {
    const { hoverLeft, hoverRight } = this.state;
    this.setState({
      hoverLeft: index !== 0 && hoverLeft,
      hoverRight: index !== 1 && hoverRight
    });
  }

  render(): React.ReactElement {
    const { hoverLeft, hoverRight } = this.state;
    const { className, groupData, icon } = this.props.data;
    
    let containerClassName = 'float-toggle-button-container ';
    if (className) {
      containerClassName += className;
    }

    return (
      <div className={containerClassName}>
        <div className="float-toggle-button">
          <div className={`float-button-container ${groupData.length === 1 ? 'one-btn-container' : ''}`}>
            <div className="float-circle-image-container">
              <IconfontView
                showType={icon}
                customClass="icon"
                customStyle={{
                  fontSize: '24px',
                  color: '#19191e'
                }}
              />
            </div>
            <div className="float-group-buttons">
              {groupData.map((buttonData: GroupButtonData, index: number) => {
                let iconColor = '#19191e';
                let buttonClassName = `float-group-button float-group-button${index}`;
                
                if ((index === 0 && hoverLeft) || (index === 1 && hoverRight)) {
                  iconColor = '#fff';
                  buttonClassName += ' float-group-button-hover';
                }

                return (
                  <div
                    key={index}
                    className={buttonClassName}
                    onClick={() => buttonData.onClick()}
                    onMouseEnter={(event) => this._onMouseEnterGroupButton(event, index)}
                    onMouseLeave={(event) => this._onMouseLeaveGroupButton(event, index)}
                  >
                    <IconfontView
                      showType={buttonData.icon}
                      customClass="icon"
                      customStyle={{
                        fontSize: '16px',
                        color: iconColor
                      }}
                    />
                    <span className="float-group-button-label">
                      {buttonData.text}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}