import { Component } from 'react';
import { Modal, Button } from './Modal';

interface Room {
  roomType?: string;
  [key: string]: any;
}

interface NameRoomPopupData {
  unnamedRooms: Room[];
}

interface NameRoomPopupComponentProps {
  data: NameRoomPopupData;
  tips?: string;
}

export class NameRoomPopup {
  static hasUnnamedRoom(): boolean {
    return this.getUnnamedRooms().length > 0;
  }

  static getUnnamedRooms(): Room[] {
    const unnamedRooms: Room[] = [];
    HSApp.App.getApp().floorplan.forEachRoom((room: Room) => {
      if (!room.roomType && !HSCore.Util.Room.isSmallRoom(room)) {
        unnamedRooms.push(room);
      }
    });
    return unnamedRooms;
  }

  static checkUnnamedRoomAndShowPopup(tips?: string): boolean {
    const unnamedRooms = this.getUnnamedRooms();
    if (unnamedRooms.length > 0) {
      this.show(unnamedRooms, tips);
      return true;
    }
    return false;
  }

  static show(unnamedRooms: Room[], tips?: string): void {
    const data: NameRoomPopupData = {
      unnamedRooms
    };

    Modal.simple({
      title: ResourceManager.getString('plugin_concealedwork_autowire_check_needroommarked'),
      content: React.createElement(NameRoomPopupComponent, {
        data,
        tips
      }),
      enableCheckbox: false,
      showFooter: false
    });
  }
}

class NameRoomPopupComponent extends Component<NameRoomPopupComponentProps> {
  private action: () => void;

  constructor(props: NameRoomPopupComponentProps) {
    super(props);
    this.action = this.handleAction.bind(this);
  }

  private handleAction(): void {
    const app = HSApp.App.getApp();
    app.selectionManager.unselectAll();
    app.switchTo2DView();

    const unnamedRooms = this.props.data.unnamedRooms;
    if (unnamedRooms?.length) {
      app.selectionManager.select(unnamedRooms[0]);
    }

    Modal.close('simple');
  }

  render() {
    const { tips } = this.props;
    const imagePath = `${HSApp.Config.RES_BASEPATH}v2/image/cad/${HSApp.App.getApp().appParams.locale}/tip.png`;

    return React.createElement('div', {
      className: 'name-room-popup'
    },
      React.createElement('div', {
        className: 'name-room-popup__tip-img'
      },
        React.createElement('img', {
          src: imagePath
        })
      ),
      React.createElement('p', {
        className: 'name-room-popup__tip-desc'
      }, tips),
      React.createElement(Button, {
        className: 'name-room-popup__action-btn',
        type: 'primary',
        onClick: this.action
      }, ResourceManager.getString('plugin_autostylerz_roomtype_setting_tip_action'))
    );
  }
}