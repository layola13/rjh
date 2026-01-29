import React from 'react';
import { Row, Button } from 'antd';

interface CameraViewPopupData {
  top: number;
  left: number;
}

interface PopupMenuItem {
  label: string;
  onClick: () => void;
}

interface CameraViewPopupProps {
  data: CameraViewPopupData;
  items: PopupMenuItem[];
}

interface PopupStyle {
  bottom: number;
  left: number;
}

export default class CameraViewPopup extends React.Component<CameraViewPopupProps> {
  render(): React.ReactElement {
    const popupStyle: PopupStyle = {
      bottom: window.innerHeight - this.props.data.top + 4,
      left: this.props.data.left - 20
    };

    const menuItems: React.ReactElement[] = this.props.items.map((item, index) => (
      <Row key={index}>
        <Button type="primary" onClick={item.onClick}>
          {item.label}
        </Button>
      </Row>
    ));

    return (
      <div className="camera-view-popup" style={popupStyle}>
        {menuItems}
      </div>
    );
  }
}