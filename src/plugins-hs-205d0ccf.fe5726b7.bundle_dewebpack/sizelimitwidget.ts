import React from 'react';
import { Icons } from './Icons';
import { Modal, Tooltip } from './Modal';

interface SizeLimitData {
  getValue(): boolean;
  onClick(): void;
  getImgStr(): string;
  getText(): string;
}

interface SizeLimitWidgetProps {
  data: SizeLimitData;
}

interface SizeLimitWidgetState {
  value: boolean;
}

interface Storage {
  get(key: string): boolean;
  set(key: string, value: boolean): void;
}

declare global {
  const HSApp: {
    Util: {
      Storage: new (key: string) => Storage;
    };
  };
  const ResourceManager: {
    getString(key: string): string;
  };
}

export class SizeLimitWidget extends React.Component<SizeLimitWidgetProps, SizeLimitWidgetState> {
  private _isDisableTip: boolean = false;

  constructor(props: SizeLimitWidgetProps) {
    super(props);
    this.state = {
      value: props.data.getValue()
    };
  }

  private onClick(event: React.MouseEvent<HTMLDivElement>): void {
    const storage = new HSApp.Util.Storage('hsw.plugin.sizelimit');
    this._isDisableTip = storage.get('disable_tip');

    if (this._isDisableTip || this.props.data.getValue()) {
      this.onSureClick();
    } else {
      const boldStyle: React.CSSProperties = {
        fontWeight: '600'
      };

      Modal.basic({
        title: ResourceManager.getString('size_limit_unlock'),
        content: (
          <div>
            <text>
              {ResourceManager.getString('size_limit_content_1')}
              <text style={boldStyle}>
                {ResourceManager.getString('size_limit_content_2')}
              </text>
              {ResourceManager.getString('size_limit_content_3')}
            </text>
            <text style={{ fontSize: '12px' }}>
              {ResourceManager.getString('size_limit_content_4')}
              <text style={boldStyle}>
                {ResourceManager.getString('size_limit_content_5')}
              </text>
              {ResourceManager.getString('size_limit_content_6')}
            </text>
          </div>
        ),
        okButtonContent: ResourceManager.getString('messageDialog_OK'),
        hideCancelButton: true,
        onOk: () => {
          this.onSureClick();
          storage.set('disable_tip', this._isDisableTip);
          Modal.close('basic');
        },
        checkbox: {
          checkboxText: ResourceManager.getString('hot_key_duplicate_content_no_tip'),
          callback: (checked: boolean) => {
            this._isDisableTip = checked;
          }
        }
      });
    }
  }

  private onSureClick(): void {
    this.props.data.onClick();
    this.setState({
      value: this.props.data.getValue()
    });
  }

  render(): React.ReactNode {
    const iconType = this.props.data.getImgStr();
    const tooltipText = this.props.data.getText();

    return (
      <Tooltip
        placement="top"
        trigger="hover"
        title={tooltipText}
        color="dark"
      >
        <div
          className="statusbar-float-right size-limit"
          onClick={(event) => this.onClick(event)}
        >
          <Icons type={iconType} />
        </div>
      </Tooltip>
    );
  }
}