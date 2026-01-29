import { PureComponent } from 'react';
import React from 'react';
import { HSCore } from './HSCore';
import { Switch } from './Switch';
import { InfoPopover } from './InfoPopover';
import { getString, getTiltCorrectionSignal, setTiltCorrection } from './CameraUtils';
import { userTrackId } from './UserTrack';
import iconOff from './icon-off.svg';
import iconOn from './icon-on.svg';

declare global {
  const HSApp: any;
  const HSFPConstants: any;
  const LiveHint: any;
  const ResourceManager: any;
}

interface CameraTiltCorrectionState {
  tiltCorrection: boolean;
}

interface CameraTiltCorrectionProps {}

interface HintItem {
  icon: string;
  label: string;
}

interface HintConfig {
  text: string;
  anchor: string;
  items: HintItem[];
}

const storage = new HSApp.Util.Storage(HSFPConstants.PluginType.SparkPic);

const HINT_CONFIG: HintConfig = {
  text: "plugin_render_camera_tilt_correction_tip",
  anchor: "topRight",
  items: [
    {
      icon: iconOff,
      label: "plugin_render_camera_tilt_correction_off"
    },
    {
      icon: iconOn,
      label: "plugin_render_camera_tilt_correction_on"
    }
  ]
};

export class CameraTiltCorrection extends PureComponent<CameraTiltCorrectionProps, CameraTiltCorrectionState> {
  private signalHook: HSCore.Util.SignalHook;

  constructor(props: CameraTiltCorrectionProps) {
    super(props);
    this.signalHook = new HSCore.Util.SignalHook();
    this.state = {
      tiltCorrection: false
    };
  }

  componentDidMount(): void {
    this.signalHook.listen(getTiltCorrectionSignal(), (signal: { data: boolean }) => {
      this.setState({
        tiltCorrection: signal.data
      });
    });
  }

  componentWillUnmount(): void {
    this.signalHook.unlistenAll();
  }

  private _onChangeVerticalTiltCorrection = (enabled: boolean): void => {
    if (enabled && storage.get("render_cam_vertical_tilt_correction") !== true) {
      LiveHint.show(
        ResourceManager.getString("plugin_render_camera_tilt_correction_warning"),
        undefined,
        () => {
          LiveHint.hide();
          storage.set("render_cam_vertical_tilt_correction", "true");
        },
        {
          canclose: true
        }
      );
    }

    setTiltCorrection(enabled);

    HSApp.App.getApp().userTrackLogger.push(
      userTrackId,
      {
        description: `设置相机垂直校正:${enabled ? "开" : "关"}`,
        activeSection: "SparkPic.RightPanel",
        group: HSFPConstants.LogGroupTypes.SparkPic
      },
      {}
    );
  };

  render(): React.ReactElement {
    const { tiltCorrection } = this.state;

    return (
      <div className="camera-switch-bar">
        <div className="switch-bar-title">
          {getString("plugin_render_camera_tilt_correction")}
          <InfoPopover
            data={HINT_CONFIG}
            overlayClassName="camera-correction-overwrap"
          />
        </div>
        <Switch
          className="camera-clip-switch"
          checked={tiltCorrection}
          onChange={this._onChangeVerticalTiltCorrection}
        />
      </div>
    );
  }
}