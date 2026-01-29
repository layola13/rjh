import { Component } from 'react';
import React from 'react';
import { getString } from './i18n';
import { Tooltip, IconfontView } from './components';

interface CameraBarProps {
  // Add specific props if needed
}

interface RoomCenter {
  room: any;
  point: [number, number];
}

interface Size {
  width: number;
  height: number;
}

class BrepBound {
  top: number;
  left: number;
  width: number;
  height: number;

  constructor(top: number, left: number, width: number, height: number) {
    this.top = top;
    this.left = left;
    this.width = width;
    this.height = height;
  }

  appendPoint(point: [number, number]): void {
    const [x, y] = point;
    const right = this.left + this.width;
    const bottom = this.top + this.height;
    
    this.left = Math.min(this.left, x);
    this.top = Math.min(this.top, y);
    this.width = Math.max(right, x) - this.left;
    this.height = Math.max(bottom, y) - this.top;
  }
}

export class CameraBar extends Component<CameraBarProps> {
  constructor(props: CameraBarProps) {
    super(props);
    this.onCameraFit = this.onCameraFit.bind(this);
  }

  onCameraFit(): void {
    const roomCenter: RoomCenter = HSApp.Util.Room.getLargestRoomCenter();
    
    if (roomCenter.room) {
      this.fitViewBoxToRoom(roomCenter.room);
    }

    const activeCamera = HSApp.App.getApp().floorplan.active_camera;
    const commandManager = HSApp.App.getApp().cmdManager;
    const command = commandManager.createCommand(
      HSFPConstants.CommandType.MoveCamera,
      [activeCamera]
    );
    
    commandManager.execute(command);
    commandManager.receive('moveto', {
      position: roomCenter.point
    });
  }

  fitViewBoxToRoom(room: any): void {
    if (!room) {
      return;
    }

    const app = HSApp.App.getApp();
    const geometry = app.geometryManager.getGeometry(room);

    if (geometry == null || !geometry.floor) {
      return;
    }

    const bound = new BrepBound(Infinity, Infinity, 0, 0);
    geometry.floor.forEach((point: [number, number]) => {
      bound.appendPoint(point);
    });

    const resizePlugin = app.pluginManager.getPlugin('hsw.plugin.resizewidget.Plugin');
    if (!resizePlugin) {
      return;
    }

    const size: Size = resizePlugin.getSize();
    const aspectRatio = size.width / size.height;
    const boundAspectRatio = bound.width / bound.height;

    let viewBoxWidth: number;
    let viewBoxHeight: number;

    if (boundAspectRatio > aspectRatio) {
      viewBoxWidth = bound.width;
      viewBoxHeight = viewBoxWidth / aspectRatio;
    } else {
      viewBoxHeight = bound.height;
      viewBoxWidth = viewBoxHeight * aspectRatio;
    }

    const viewBoxTop = bound.top + bound.height / 2 + viewBoxHeight / 2;
    const viewBoxLeft = bound.left + bound.width / 2 - viewBoxWidth / 2;

    const canvasPoint = HSApp.View.SVG.Util.ModelPointToCanvas([viewBoxLeft, viewBoxTop]);
    const canvasWidth = viewBoxWidth * HSFPConstants.Constants.PIXEL_TO_M_FACTOR;
    const canvasHeight = viewBoxHeight * HSFPConstants.Constants.PIXEL_TO_M_FACTOR;

    app.getActive2DView().setViewBox(
      canvasPoint[0],
      canvasPoint[1],
      canvasWidth,
      canvasHeight
    );
  }

  render(): React.ReactElement {
    return (
      <div className="camera-bar-container">
        <Tooltip
          placement="top"
          color="dark"
          title={getString('plugin_render_reset_view')}
        >
          <div className="camera-fit" onClick={this.onCameraFit}>
            <IconfontView
              showType="hs_mian_juzhongshitu"
              customStyle={{
                fontSize: '20px',
                color: 'rgba(255, 255, 255, 0.66)'
              }}
              hoverColor="#fff"
            />
          </div>
        </Tooltip>
      </div>
    );
  }
}