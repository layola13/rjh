export enum WebGLPointMarkerType {
  // Add specific enum values based on HSApp.View.T3d.PointMarkerType definition
}

export class WebGLPointMarker extends HSApp.View.T3d.PointMarker {
  constructor(...args: any[]) {
    super(...args);
  }
}

export default WebGLPointMarker;

export { WebGLPointMarkerType };