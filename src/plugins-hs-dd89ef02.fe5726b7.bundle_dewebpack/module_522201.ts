import { HSCore } from './635589';
import { Line2d } from './815362';
import { HSApp } from './518193';

interface Wall {
  curve: Line2d;
  from: Point;
  to: Point;
}

interface WallJoint {
  type: string;
  walls: Wall[];
}

interface Point {
  x: number;
  y: number;
}

type DialogCallback = (result: number) => void;

export function getConstraintLine(wall: Wall, endPoint: Point): Line2d | undefined {
  const wallJoint = HSApp.App.getApp().floorplan.wallJointManager.getWallEndJoint(wall, endPoint);
  
  if (!wallJoint) {
    return undefined;
  }
  
  const adjacentWalls = wallJoint.walls.filter((w) => w !== wall);
  const adjacentWall = adjacentWalls[0];
  
  if (!adjacentWall) {
    return undefined;
  }
  
  if (HSCore.Util.Joint.isTType(wallJoint.type)) {
    return adjacentWall.curve;
  }
  
  return new Line2d(adjacentWall.from, adjacentWall.to);
}

export function showCeilingGeoChangeDiag(callback: DialogCallback): void {
  const content = ResourceManager.getString("plugin_ceiling_divide_geo_change_content");
  const cancelText = ResourceManager.getString("plugin_ceiling_divide_geo_change_cancel");
  const okText = ResourceManager.getString("plugin_ceiling_divide_geo_change_ok");
  const title = ResourceManager.getString("plugin_ceiling_divide_geo_change_title");
  
  const messageBox = MessageBox.create(
    content,
    [cancelText, okText],
    0,
    {
      title: title,
      disablemask: true,
      dontShowAgain: false
    }
  );
  
  messageBox.show((result: number) => {
    callback(result);
  });
}