import * as tesselator from './tesselator';
import * as polygon from './polygon';

export { polygon, tesselator };

if (typeof window !== 'undefined') {
  (window as Window & { 
    PolygonTools?: {
      polygon: typeof polygon;
      tesselator: typeof tesselator;
      version: string;
      build: string;
    };
    polygon_tools_version?: string;
    polygon_tools_rev?: string;
  }).PolygonTools = {
    polygon,
    tesselator,
    version: (window as typeof window & { polygon_tools_version?: string }).polygon_tools_version ?? '',
    build: (window as typeof window & { polygon_tools_rev?: string }).polygon_tools_rev ?? ''
  };
}