import { Component, ReactElement } from 'react';
import { Modal, Button } from 'react-bootstrap';
import defaultImage from './assets/default.png';
import fpImage from './assets/fp.png';

interface TipData {
  callback?: () => void;
}

interface AutoStylerRoomTypeTipProps {
  data: TipData;
}

class AutoStylerRoomTypeTip extends Component<AutoStylerRoomTypeTipProps> {
  constructor(props: AutoStylerRoomTypeTipProps) {
    super(props);
    this.action = this.action.bind(this);
  }

  action(): void {
    const { data } = this.props;
    data.callback?.();
  }

  render(): ReactElement {
    const imageSrc = HSApp.Config.TENANT === 'fp' ? fpImage : defaultImage;

    return (
      <div className="autostyler-roomtype-tip">
        <div className="tip-img">
          <img src={imageSrc} alt="Room type setting" />
        </div>
        <p className="tip-desc">
          {ResourceManager.getString('plugin_autostylerz_roomtype_setting_description')}
        </p>
        <Button
          className="autostyler-roomtype-tip-action-btn"
          type="primary"
          onClick={this.action}
        >
          {ResourceManager.getString('plugin_autostylerz_roomtype_setting_tip_action')}
        </Button>
      </div>
    );
  }
}

interface RoomTypeSettingTipOptions {
  callback?: () => void;
}

export default class RoomTypeSettingTip {
  static show(callback?: () => void): void {
    const options: RoomTypeSettingTipOptions = {
      callback: () => {
        callback?.();
        Modal.close('simple');
      }
    };

    Modal.simple({
      title: ResourceManager.getString('plugin_autostylerz_roomtype_setting_tip'),
      content: <AutoStylerRoomTypeTip data={options} />,
      enableCheckbox: false,
      showFooter: false
    });
  }
}