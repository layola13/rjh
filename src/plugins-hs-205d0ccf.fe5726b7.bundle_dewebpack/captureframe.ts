import React, { Component, ReactPortal } from 'react';
import ReactDOM from 'react-dom';
import { CameraPitchLine } from './CameraPitchLine';

interface Proportion {
  width: number;
  height: number;
}

interface Bounds {
  left: number;
  top: number;
  width: number;
  height: number;
}

interface CaptureFrameProps {
  proportion: Proportion;
  setBound?: (bounds: Bounds) => void;
}

interface FrameStyle {
  width: number;
  height: number;
  top: number;
  left: number;
}

interface CaptureFrameState {
  style?: FrameStyle;
}

interface View2DSize {
  frameWidth: number;
  frameHeight: number;
  borderH: number;
  borderW: number;
  deltaH: number;
  deltaW: number;
}

declare global {
  interface Window {
    HSApp: {
      App: {
        getApp(): App;
      };
    };
    HSFPConstants: {
      Environment: {
        SparkPicEnv: string;
      };
    };
  }
}

interface App {
  activeEnvironmentId: string;
  getActive3DView(): View3D;
  is2DViewActive(): boolean;
  is3DViewActive(): boolean;
}

interface View3D {
  context: {
    signalCanvasRectChanged: {
      listen(callback: () => void): void;
      unlisten(callback: () => void): void;
    };
  };
}

const EDITOR_LEFT_OFFSET = 282;
const EDITOR_TOP_OFFSET = 57;
const WINDOW_HORIZONTAL_PADDING = 282 + 242;
const WINDOW_VERTICAL_PADDING = 57 + 121;
const DELTA_H_MULTIPLIER = -64;
const DELTA_W_MULTIPLIER = 40;
const INITIAL_UPDATE_DELAY = 500;

export class CaptureFrame extends Component<CaptureFrameProps, CaptureFrameState> {
  private app: App;
  private editor3d: HTMLElement | null;

  constructor(props: CaptureFrameProps) {
    super(props);
    
    this.state = {};
    this.app = window.HSApp.App.getApp();
    this.editor3d = document.querySelector<HTMLElement>('#editor3d');
  }

  static getDerivedStateFromProps(props: CaptureFrameProps, state: CaptureFrameState): Partial<CaptureFrameState> | null {
    const { width: proportionWidth, height: proportionHeight } = props.proportion;
    const availableWidth = window.innerWidth - WINDOW_HORIZONTAL_PADDING;
    const availableHeight = window.innerHeight - WINDOW_VERTICAL_PADDING;
    const availableRatio = availableWidth / availableHeight;
    const proportionRatio = proportionWidth / proportionHeight;
    const orientation = availableRatio > proportionRatio ? 'horizon' : 'vertical';

    if (orientation === 'horizon') {
      const calculatedWidth = (availableHeight / proportionHeight) * proportionWidth;
      return {
        style: {
          width: calculatedWidth,
          height: availableHeight,
          top: 0,
          left: (availableWidth - calculatedWidth) / 2,
        },
      };
    }

    const calculatedHeight = (availableWidth / proportionWidth) * proportionHeight;
    return {
      style: {
        width: availableWidth,
        height: calculatedHeight,
        top: (availableHeight - calculatedHeight) / 2,
        left: 0,
      },
    };
  }

  componentDidMount(): void {
    this.app.getActive3DView().context.signalCanvasRectChanged.listen(this.updateView);
    window.setTimeout(() => {
      this.updateView();
    }, INITIAL_UPDATE_DELAY);
  }

  componentWillUnmount(): void {
    this.app.getActive3DView().context.signalCanvasRectChanged.unlisten(this.updateView);
  }

  componentDidUpdate(prevProps: CaptureFrameProps): void {
    if (prevProps.proportion !== this.props.proportion) {
      this.updateBound();
    }
  }

  private updateView = (): void => {
    this.forceUpdate();
    this.updateBound();
  };

  private updateBound(): void {
    if (!this.state.style || !this.props.setBound) {
      return;
    }

    let left = this.state.style.left + EDITOR_LEFT_OFFSET;
    let top = this.state.style.top + EDITOR_TOP_OFFSET;
    let width = this.state.style.width;
    let height = this.state.style.height;

    if (this.app.is2DViewActive()) {
      const view2DSize = this.get2DViewActiveSize();
      left = view2DSize.borderW + view2DSize.deltaW;
      top = view2DSize.borderH + view2DSize.deltaH;
      width = view2DSize.frameWidth;
      height = view2DSize.frameHeight;
    }

    this.props.setBound({ left, top, width, height });
  }

  private get2DViewActiveSize(): View2DSize {
    if (!this.state.style || !this.editor3d) {
      throw new Error('Style or editor3d is not initialized');
    }

    const { width: stateWidth, height: stateHeight } = this.state.style;
    const windowHeight = window.innerHeight;
    const editorRect = this.editor3d.getBoundingClientRect();
    const scale = editorRect.height / windowHeight;
    const frameWidth = scale * stateWidth;
    const frameHeight = scale * stateHeight;
    const deltaH = (DELTA_H_MULTIPLIER * scale) / 2;
    const deltaW = (DELTA_W_MULTIPLIER * scale) / 2;

    return {
      frameWidth,
      frameHeight,
      borderH: (editorRect.height - frameHeight) / 2,
      borderW: (editorRect.width - frameWidth) / 2,
      deltaH,
      deltaW,
    };
  }

  render(): React.ReactNode {
    if (!this.editor3d || this.app.activeEnvironmentId !== window.HSFPConstants.Environment.SparkPicEnv) {
      return null;
    }

    if (this.app.is3DViewActive()) {
      return (
        <div className="spark_pic_center_radius">
          <div className="frame_border_radius" style={this.state.style}>
            <CameraPitchLine {...this.state.style} />
          </div>
        </div>
      );
    }

    if (!this.state.style) {
      return null;
    }

    const { frameWidth, frameHeight, borderH, borderW, deltaH, deltaW } = this.get2DViewActiveSize();
    const borderStyle = {
      width: frameWidth,
      height: frameHeight,
      left: 0,
      top: 0,
      borderWidth: `${borderH + deltaH + 1}px ${borderW - deltaW + 1}px ${borderH - deltaH}px ${borderW + deltaW}px`,
    };

    return ReactDOM.createPortal(
      <div className="render-frame-2d" style={borderStyle} />,
      this.editor3d
    ) as ReactPortal;
  }
}