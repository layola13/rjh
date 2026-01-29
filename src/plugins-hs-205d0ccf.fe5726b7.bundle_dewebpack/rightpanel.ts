import React, { Component, forwardRef, useRef, useImperativeHandle, RefObject } from 'react';
import classNames from 'classnames';
import { getString } from './stringUtils';
import { SPARK_PIC_RESIZE_WIDGET_EXTRA } from './constants';
import { CameraClip } from './CameraClip';
import { CameraTiltCorrection } from './CameraTiltCorrection';
import { CameraSettings } from './CameraSettings';
import { CameraPosition } from './CameraPosition';
import './styles.css';

interface RightPanelProps {
  visible?: boolean;
  frameBound?: DOMRect | null;
}

interface RightPanelState {
  showLargerView: boolean;
  opeFunc?: 'add' | 'remove';
}

interface LayoutConstraint {
  isModal: boolean;
  left?: number;
}

interface LayoutManager {
  isRegister(name: string): boolean;
  register(name: string, element: Element): void;
  unregister(name: string): void;
  addConstrain(
    source: string,
    target: string,
    callback: (constraint: LayoutConstraint) => void
  ): void;
}

interface HSApp {
  App: {
    getApp(): {
      layoutMgr: LayoutManager;
      activeEnvironmentId: string;
    };
  };
}

interface HSFPConstants {
  Environment: {
    SparkPicEnv: string;
  };
}

declare global {
  interface Window {
    HSApp: HSApp;
    HSFPConstants: HSFPConstants;
  }
}

export class RightPanel extends Component<RightPanelProps, RightPanelState> {
  private resizeWidget: Element | null = undefined;

  constructor(props: RightPanelProps) {
    super(props);
    this.state = {
      showLargerView: false,
    };
    this.resizeWidget = document.querySelector('.resizewidgetcontainer');
  }

  componentDidMount(): void {
    const layoutManager = window.HSApp.App.getApp().layoutMgr;
    const panelElement = document.querySelector('.spark_pic_right_panel');

    if (!layoutManager.isRegister('SparkPicLeftPanel') && panelElement) {
      layoutManager.register('SparkPicLeftPanel', panelElement);
      layoutManager.addConstrain('ThumbnailView', 'SparkPicLeftPanel', (constraint) => {
        const { isModal, left } = constraint;
        const clientWidth = document.documentElement.clientWidth;
        const opeFunc = left && left >= clientWidth ? 'add' : 'remove';
        const showLargerView = !!(isModal || (left && left >= clientWidth));

        this.setState({
          showLargerView,
          opeFunc,
        });
      });
    }
  }

  componentDidUpdate(prevProps: RightPanelProps, prevState: RightPanelState): void {
    const { opeFunc } = this.state;
    const app = window.HSApp.App.getApp();

    if (app.activeEnvironmentId === window.HSFPConstants.Environment.SparkPicEnv && opeFunc) {
      this.resizeWidget?.classList?.[opeFunc](SPARK_PIC_RESIZE_WIDGET_EXTRA);
    }
  }

  componentWillUnmount(): void {
    window.HSApp.App.getApp().layoutMgr.unregister('SparkPicLeftPanel');
    this.resizeWidget = null;
  }

  render(): React.ReactElement {
    const { showLargerView } = this.state;

    return (
      <div
        className={classNames('spark_pic_right_panel', {
          larger_panel: showLargerView,
        })}
      >
        <div className="header">{getString('camera_settings_title')}</div>
        <div className="camera_setting">
          <CameraClip />
          <CameraTiltCorrection />
          <CameraSettings />
          <CameraPosition visible={this.props.visible} frameBound={this.props.frameBound} />
        </div>
      </div>
    );
  }
}

export const RightPanelContainer = forwardRef<unknown, RightPanelProps>((props, ref) => {
  const componentRef = useRef<RightPanel>(null);

  useImperativeHandle(ref, () => ({}), []);

  return <RightPanel {...props} ref={componentRef} />;
});