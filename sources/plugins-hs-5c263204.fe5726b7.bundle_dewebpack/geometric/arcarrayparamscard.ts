import React from 'react';
import { NumberInput, SmartText } from './components';

interface Position {
  isShow: boolean;
  width: number;
  height: number;
  top: number;
  left: number;
  isModal?: boolean;
}

interface LayoutPosition {
  left?: number;
  maxWidth?: number;
}

interface ArcArrayParamsData {
  position?: Position;
  angle: number;
  num: number;
  isShow?: boolean;
  tip: string;
  updateParam?: (params: { angle?: number; arrayNum?: number }) => void;
  onPreview?: () => void;
}

interface ArcArrayParamsCardProps {
  data: ArcArrayParamsData;
}

interface LayoutManager {
  register: (id: string, element: HTMLElement) => void;
  addConstrain: (source: string, target: string, callback: (data: unknown) => void) => string;
  removeConstrain: (source: string, constrainId: string) => void;
  update: (id: string, config: Record<string, unknown>) => void;
  getPosition: (id: string) => Position;
}

interface HSApp {
  App: {
    getApp: () => {
      layoutMgr: LayoutManager;
      cmdManager: {
        receive: (command: string, data: Record<string, unknown>) => void;
      };
    };
  };
  Util: {
    Keyboard: {
      KeyCodes: {
        TAB: number;
        EQUALS: number;
        DASH: number;
      };
    };
  };
}

declare const HSApp: HSApp;
declare const ResourceManager: {
  getString: (key: string) => string;
};

export class ArcArrayParamsCard extends React.Component<ArcArrayParamsCardProps> {
  private angleInputRef?: NumberInput;
  private numberInputRef?: NumberInput;
  private selectAngle: boolean = true;
  private position?: Position;
  private constrainId?: string;

  constructor(props: ArcArrayParamsCardProps) {
    super(props);
    this.position = props.data.position;
  }

  componentDidMount(): void {
    const container = document.getElementById('arc-array-params-setting-container');
    const layoutManager = HSApp.App.getApp().layoutMgr;

    if (this.props.data.position) {
      this.positionChange(this.props.data.position);
    } else {
      this.updatePosition();
      if (container) {
        layoutManager.register('arcArraySetting', container);
        this.constrainId = layoutManager.addConstrain('CatalogLib', 'arcArraySetting', () => {
          return this.updatePosition();
        });
        this.constrainId = layoutManager.addConstrain('PropertyBar', 'arcArraySetting', () => {
          return this.updatePosition();
        });
        this.constrainId = layoutManager.addConstrain('ThumbnailView', 'arcArraySetting', () => {
          return this.updatePosition();
        });
        this.constrainId = layoutManager.addConstrain('Window', 'arcArraySetting', () => {
          return this.updatePosition();
        });
        layoutManager.update('arcArraySetting', {
          display: 'block'
        });
      }
    }
  }

  componentWillUnmount(): void {
    const layoutManager = HSApp.App.getApp().layoutMgr;
    layoutManager.update('arcArraySetting', {
      display: 'none'
    });
    if (this.constrainId) {
      layoutManager.removeConstrain('CatalogLib', this.constrainId);
      this.constrainId = undefined;
    }
  }

  private updatePosition(): void {
    const layoutManager = HSApp.App.getApp().layoutMgr;
    const catalogLibPosition = layoutManager.getPosition('CatalogLib');
    const propertyBarPosition = layoutManager.getPosition('PropertyBar');
    const thumbnailViewPosition = layoutManager.getPosition('ThumbnailView');
    const windowPosition = layoutManager.getPosition('Window');

    const baseLeft = catalogLibPosition.isShow ? 60 + catalogLibPosition.width : 60;
    const overlappingPanel = [thumbnailViewPosition, propertyBarPosition].find(
      (pos) =>
        !pos.isModal &&
        pos.top <= 54 &&
        pos.top + pos.height > 54 &&
        pos.left < windowPosition.width
    );
    const maxWidth = overlappingPanel
      ? overlappingPanel.left - baseLeft - 16
      : windowPosition.width - baseLeft - 16;

    this.setPosition({
      left: baseLeft,
      maxWidth
    });
  }

  private setPosition(position: LayoutPosition): void {
    const { left, maxWidth } = position;
    const container = document.querySelector<HTMLElement>('#arc-array-params-setting-container');
    
    if (container) {
      container.style.left = left !== undefined ? `${left}px` : 'unset';
      container.style.maxWidth = maxWidth !== undefined ? `${maxWidth}px` : 'unset';
    }

    HSApp.App.getApp().layoutMgr.update('arcArraySetting', {
      updateLeft: true,
      left,
      maxWidth
    });
  }

  private positionChange(position: Position): void {
    const left = position.isShow ? 60 + position.width : 60;
    const container = document.querySelector<HTMLElement>('#arc-array-params-setting-container');
    
    if (container) {
      container.style.left = `${left}px`;
    }

    HSApp.App.getApp().layoutMgr.update('arcArraySetting', {
      updateLeft: true,
      left
    });
  }

  private onAngleChange(angle: number | string): void {
    this.props.data.updateParam?.({ angle: Number(angle) });
  }

  private onNumberChange(num: number | string): void {
    HSApp.App.getApp().cmdManager.receive('numchange', {
      number: num
    });
    this.props.data.updateParam?.({ arrayNum: Number(num) });
  }

  private switchInputHandler(): void {
    if (this.selectAngle) {
      this.numberInputRef?.select();
    } else {
      this.angleInputRef?.select();
    }
    this.selectAngle = !this.selectAngle;
  }

  private onAngleEnter(value: number | string, isValid: boolean): void {
    if (!isValid) {
      this.angleInputRef?.blur();
      this.angleInputRef?.select();
      return;
    }
    this.onAngleChange(value);
    this.props.data.onPreview?.();
  }

  private onNumberEnter(value: number | string, isValid: boolean): void {
    if (!isValid) {
      this.angleInputRef?.blur();
      this.angleInputRef?.select();
      return;
    }
    this.onNumberChange(value);
    this.props.data.onPreview?.();
  }

  private numberValidator(value: number | string): boolean {
    const numValue = Number(value);
    return numValue > 1 && numValue < 21;
  }

  private onChangeNum(num: number): void {
    if (this.numberValidator(num)) {
      this.onNumberChange(num);
    }
  }

  private onKeyDown(event: React.KeyboardEvent): void {
    const { keyCode, altKey } = event;
    const KeyCodes = HSApp.Util.Keyboard.KeyCodes;

    switch (keyCode) {
      case KeyCodes.TAB:
        this.switchInputHandler();
        event.preventDefault();
        event.stopPropagation();
        break;
      case altKey && KeyCodes.EQUALS:
        this.onChangeNum(this.props.data.num + 1);
        event.preventDefault();
        event.stopPropagation();
        break;
      case altKey && KeyCodes.DASH:
        this.onChangeNum(this.props.data.num - 1);
        event.preventDefault();
        event.stopPropagation();
        break;
    }
  }

  render(): React.ReactNode {
    const { angle, num, isShow = true, tip } = this.props.data;

    return (
      <div className="arc-array-params-card">
        {isShow ? (
          <div className="arc-array-params-input-card">
            <div className="arc-array-params-angle">
              {ResourceManager.getString('plugin_right_propertybar_room_angle')}
              <NumberInput
                ref={(ref) => (this.angleInputRef = ref ?? undefined)}
                value={angle}
                unit="°"
                onValueChange={(value) => this.onAngleChange(value)}
                min={0}
                max={360}
                onKeyDown={(event) => this.onKeyDown(event)}
                onEnter={(value, valid) => this.onAngleEnter(value, valid)}
                autoFocus={this.selectAngle}
                autoSelect={this.selectAngle}
              />
            </div>
            <div className="arc-array-params-number">
              {ResourceManager.getString('sketch2d_array_number')}
              <NumberInput
                ref={(ref) => (this.numberInputRef = ref ?? undefined)}
                value={num}
                unit={ResourceManager.getString('unitType_ge')}
                min={2}
                max={20}
                validator={(value) => this.numberValidator(value)}
                onValueChange={(value) => this.onNumberChange(value)}
                onKeyDown={(event) => this.onKeyDown(event)}
                onEnter={(value, valid) => this.onNumberEnter(value, valid)}
              />
            </div>
            <SmartText
              ellipseLine={2}
              ellipseLineIgnoreHeight={2}
              className="arc-array-params-tip"
            >
              {tip}
            </SmartText>
          </div>
        ) : (
          <div className="arc-array-params-label">{tip}</div>
        )}
      </div>
    );
  }
}