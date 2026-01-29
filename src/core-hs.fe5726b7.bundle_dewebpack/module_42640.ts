import * as tesselatorModule from './tesselator';
import * as polygonModule from './polygon';

export const polygon = polygonModule;
export const tesselator = tesselatorModule;

if (typeof window !== 'undefined') {
  interface PolygonTools {
    polygon: typeof polygonModule;
    tesselator: typeof tesselatorModule;
    version: string;
    build: string;
  }

  declare global {
    interface Window {
      PolygonTools?: PolygonTools;
      polygon_tools_version?: string;
      polygon_tools_rev?: string;
    }
  }

  window.PolygonTools = {
    polygon: polygonModule,
    tesselator: tesselatorModule,
    version: window.polygon_tools_version ?? '',
    build: window.polygon_tools_rev ?? ''
  };
}