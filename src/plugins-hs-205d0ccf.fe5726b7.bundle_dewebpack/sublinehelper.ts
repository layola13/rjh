import { Matrix3, Vector2, Curve2d } from './geometry';
import { PathItem } from './PathItem';
import { DashAttr, SnapAttr } from './attributes';
import {
  CircleSnapGeometry,
  ArcSnapGeometry,
  LineSnapGeometry,
  PointSnapGeometry,
  SnapGeometry
} from './SnapGeometry';
import { EndPointItem, EndPointType } from './EndPointItem';

interface TransformOptions {
  dx?: number;
  dy?: number;
  center?: Vector2;
  drotation?: number;
}

interface SnapPair {
  master: SnapGeometry;
  client: SnapGeometry;
}

interface SnapGeometryInfo {
  geo: Curve2d;
}

interface RenderContext {
  // Define context properties as needed
}

interface AuxiliaryItem {
  show(): void;
  hide(): void;
  dispose(): void;
}

/**
 * Helper class for managing subline auxiliary graphics during snap operations
 */
export class SublineHelper {
  private static _instance?: SublineHelper;

  private context?: RenderContext;
  private auxiliaries: AuxiliaryItem[];

  constructor() {
    this.auxiliaries = [];
  }

  /**
   * Get singleton instance of SublineHelper
   */
  static getInstance(): SublineHelper {
    if (!this._instance) {
      this._instance = new SublineHelper();
    }
    return this._instance;
  }

  /**
   * Execute snap visualization for given snap pairs
   */
  execute(
    pair1: SnapPair | null,
    pair2: SnapPair | null,
    transform: TransformOptions
  ): void {
    this.hideAll();
    this.updateContext();
    
    if (pair1) {
      this.handleSingle(pair1, transform);
    }
    if (pair2) {
      this.handleSingle(pair2, transform);
    }
    
    this.showAll();
  }

  /**
   * Show snap geometry visualization
   */
  showSnapGeometry(geometries: SnapGeometryInfo[]): void {
    this.hideAll();
    this.updateContext();

    for (const item of geometries) {
      const pathItem = new PathItem(this.context).attr(DashAttr);
      const geo = item.geo;
      
      if (geo instanceof Curve2d) {
        pathItem.path = geo;
      }
      
      this.auxiliaries.push(pathItem);
    }

    this.showAll();
  }

  /**
   * Show all auxiliary items
   */
  showAll(): void {
    for (const auxiliary of this.auxiliaries) {
      auxiliary.show();
    }
  }

  /**
   * Hide and dispose all auxiliary items
   */
  hideAll(): void {
    for (const auxiliary of this.auxiliaries) {
      auxiliary.hide();
      auxiliary.dispose();
    }
    this.auxiliaries = [];
  }

  /**
   * Update rendering context from active 2D view
   */
  updateContext(): void {
    const app = (window as any).HSApp.App.getApp();
    const activeView = app.getActive2DView();
    this.context = activeView.context;
  }

  /**
   * Handle single snap pair based on geometry types
   */
  private handleSingle(pair: SnapPair, transform: TransformOptions): void {
    const { master, client } = pair;

    if (master instanceof CircleSnapGeometry && client instanceof CircleSnapGeometry) {
      this.handle_C2C(master, client, transform);
    } else if (master instanceof CircleSnapGeometry && client instanceof ArcSnapGeometry) {
      this.handle_C2A(master, client, transform);
    } else if (master instanceof CircleSnapGeometry && client instanceof LineSnapGeometry) {
      this.handle_C2L(master, client, transform);
    } else if (master instanceof LineSnapGeometry && client instanceof CircleSnapGeometry) {
      this.handle_L2C(master, client, transform);
    } else if (master instanceof LineSnapGeometry && client instanceof ArcSnapGeometry) {
      this.handle_L2A(master, client, transform);
    } else if (master instanceof LineSnapGeometry && client instanceof LineSnapGeometry) {
      this.handle_L2L(master, client, transform);
    } else if (master instanceof PointSnapGeometry && client instanceof LineSnapGeometry) {
      this.handle_P2L(master, client, transform);
    } else if (master instanceof PointSnapGeometry && client instanceof PointSnapGeometry) {
      this.handle_P2P(master, client);
    }
  }

  /**
   * Handle circle to circle snap
   */
  private handle_C2C(
    master: CircleSnapGeometry,
    client: CircleSnapGeometry,
    transform: TransformOptions
  ): void {
    const masterGeo = master.geo.clone();
    const clientGeo = client.geo.clone();

    const translateMatrix = Matrix3.makeTranslate({
      x: transform.dx ?? 0,
      y: transform.dy ?? 0
    });
    masterGeo.transform(translateMatrix);

    if (transform.center && transform.drotation) {
      const rotateMatrix = Matrix3.makeRotate(transform.center, transform.drotation);
      masterGeo.transform(rotateMatrix);
    }

    const masterPath = new PathItem(this.context).attr(SnapAttr);
    const clientPath = new PathItem(this.context).attr(SnapAttr);
    
    masterPath.path = masterGeo;
    clientPath.path = clientGeo;
    
    this.auxiliaries.push(masterPath);
    this.auxiliaries.push(clientPath);
  }

  /**
   * Handle circle to arc snap
   */
  private handle_C2A(
    master: CircleSnapGeometry,
    client: ArcSnapGeometry,
    transform: TransformOptions
  ): void {
    const masterGeo = master.geo.clone();
    const clientGeo = client.geo.clone();

    const translateMatrix = Matrix3.makeTranslate({
      x: transform.dx ?? 0,
      y: transform.dy ?? 0
    });
    masterGeo.transform(translateMatrix);

    if (transform.center && transform.drotation) {
      const rotateMatrix = Matrix3.makeRotate(transform.center, transform.drotation);
      masterGeo.transform(rotateMatrix);
    }

    const masterPath = new PathItem(this.context).attr(SnapAttr);
    const clientPath = new PathItem(this.context).attr(SnapAttr);
    
    masterPath.path = masterGeo;
    clientPath.path = clientGeo;
    
    this.auxiliaries.push(masterPath);
    this.auxiliaries.push(clientPath);
  }

  /**
   * Handle line to circle snap
   */
  private handle_L2C(
    master: LineSnapGeometry,
    client: CircleSnapGeometry,
    transform: TransformOptions
  ): void {
    const pathItem = new PathItem(this.context).attr(SnapAttr);
    const masterGeo = master.geo.clone();

    const translateMatrix = Matrix3.makeTranslate({
      x: transform.dx ?? 0,
      y: transform.dy ?? 0
    });
    masterGeo.transform(translateMatrix);

    if (transform.center && transform.drotation) {
      const rotateMatrix = Matrix3.makeRotate(transform.center, transform.drotation);
      masterGeo.transform(rotateMatrix);
    }

    const circleCenter = client.geo.getCenter();
    const param = masterGeo.getParamAt(circleCenter);
    masterGeo.getRange().expandByPt(param);
    
    pathItem.path = masterGeo;
    this.auxiliaries.push(pathItem);

    const circlePath = new PathItem(this.context).attr(SnapAttr);
    const clientGeo = client.geo.clone();
    circlePath.path = clientGeo;
    this.auxiliaries.push(circlePath);
  }

  /**
   * Handle line to arc snap
   */
  private handle_L2A(
    master: LineSnapGeometry,
    client: ArcSnapGeometry,
    transform: TransformOptions
  ): void {
    const pathItem = new PathItem(this.context).attr(SnapAttr);
    const masterGeo = master.geo.clone();

    const translateMatrix = Matrix3.makeTranslate({
      x: transform.dx ?? 0,
      y: transform.dy ?? 0
    });
    masterGeo.transform(translateMatrix);

    if (transform.center && transform.drotation) {
      const rotateMatrix = Matrix3.makeRotate(transform.center, transform.drotation);
      masterGeo.transform(rotateMatrix);
    }

    const arcCenter = client.geo.getCenter();
    const param = masterGeo.getParamAt(arcCenter);
    masterGeo.getRange().expandByPt(param);
    
    pathItem.path = masterGeo;
    this.auxiliaries.push(pathItem);

    const arcPath = new PathItem(this.context).attr(SnapAttr);
    const clientGeo = client.geo.clone();
    arcPath.path = clientGeo;
    this.auxiliaries.push(arcPath);
  }

  /**
   * Handle circle to line snap
   */
  private handle_C2L(
    master: CircleSnapGeometry,
    client: LineSnapGeometry,
    transform: TransformOptions
  ): void {
    const pathItem = new PathItem(this.context).attr(SnapAttr);
    const clientGeo = client.geo.clone();
    
    const circleCenter = master.geo.getCenter();
    const translateMatrix = Matrix3.makeTranslate({
      x: transform.dx ?? 0,
      y: transform.dy ?? 0
    });
    circleCenter.transform(translateMatrix);

    if (transform.center && transform.drotation) {
      const rotateMatrix = Matrix3.makeRotate(transform.center, transform.drotation);
      circleCenter.transform(rotateMatrix);
    }

    const param = clientGeo.getParamAt(circleCenter);
    clientGeo.getRange().expandByPt(param);
    
    pathItem.path = clientGeo;
    this.auxiliaries.push(pathItem);
  }

  /**
   * Handle line to line snap
   */
  private handle_L2L(
    master: LineSnapGeometry,
    client: LineSnapGeometry,
    transform: TransformOptions
  ): void {
    const masterGeo = master.geo.clone();
    const clientGeo = client.geo.clone();

    const translateMatrix = Matrix3.makeTranslate({
      x: transform.dx ?? 0,
      y: transform.dy ?? 0
    });
    masterGeo.transform(translateMatrix);

    if (transform.center && transform.drotation) {
      const rotateMatrix = Matrix3.makeRotate(transform.center, transform.drotation);
      masterGeo.transform(rotateMatrix);
    }

    const startParam = clientGeo.getParamAt(masterGeo.getStartPt());
    const endParam = clientGeo.getParamAt(masterGeo.getEndPt());
    
    clientGeo.getRange().expandByPt(startParam);
    clientGeo.getRange().expandByPt(endParam);

    const pathItem = new PathItem(this.context).attr(SnapAttr);
    pathItem.path = clientGeo;
    this.auxiliaries.push(pathItem);
  }

  /**
   * Handle point to line snap
   */
  private handle_P2L(
    master: PointSnapGeometry,
    client: LineSnapGeometry,
    transform: TransformOptions
  ): void {
    const point = new Vector2(master.geo);
    
    const translateMatrix = Matrix3.makeTranslate({
      x: transform.dx ?? 0,
      y: transform.dy ?? 0
    });
    point.transform(translateMatrix);

    if (transform.center && transform.drotation) {
      const rotateMatrix = Matrix3.makeRotate(transform.center, transform.drotation);
      point.transform(rotateMatrix);
    }

    const endPointItem = new EndPointItem(this.context);
    endPointItem.updateData({
      position: point,
      hoverOn: true,
      type: EndPointType.Active
    });
    this.auxiliaries.push(endPointItem);

    const clientGeo = client.geo.clone();
    const pathItem = new PathItem(this.context).attr(SnapAttr);
    pathItem.path = clientGeo;
    this.auxiliaries.push(pathItem);
  }

  /**
   * Handle point to point snap
   */
  private handle_P2P(master: PointSnapGeometry, client: PointSnapGeometry): void {
    const point = new Vector2(client.geo);
    const endPointItem = new EndPointItem(this.context);
    
    endPointItem.updateData({
      position: point,
      hoverOn: true,
      type: EndPointType.Active
    });
    
    this.auxiliaries.push(endPointItem);
  }
}