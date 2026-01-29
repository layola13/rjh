import { Entity, Entity_IO } from './Entity';
import { EntityField } from './EntityField';
import { Loader, Vector3 } from './Loader';
import { StrongElecComp } from './StrongElecComp';
import { WeakElecComp } from './WeakElecComp';
import { CWTubeDiameterEnum } from './CWTubeDiameterEnum';

export enum CWFlagEnum {
  Moving = 256
}

interface RouteSegment {
  dump(): unknown;
  getLength(): number;
  getMidPt(): Vector3;
}

interface ConcealedWorkTubeData {
  nds?: number[];
  rte?: unknown[];
}

interface TreeNode {
  diameter?: CWTubeDiameterEnum;
  findById(id: number): unknown;
  getComponent(type: string): unknown;
}

export class ConcealedWorkTube_IO extends Entity_IO {
  private static _instance?: ConcealedWorkTube_IO;

  static instance(): ConcealedWorkTube_IO {
    if (!this._instance) {
      this._instance = new ConcealedWorkTube_IO();
    }
    return this._instance;
  }

  dump(
    entity: ConcealedWorkTube,
    context?: unknown,
    includeDefaults: boolean = true,
    options: Record<string, unknown> = {}
  ): unknown[] {
    const result = super.dump(entity, undefined, includeDefaults, options);
    const data = result[0] as Record<string, unknown>;

    if (entity.nodeIds.length) {
      data.nds = entity.nodeIds.map((id) => id);
    }

    if (entity.route.length) {
      data.rte = entity.route.map((segment) => segment.dump());
    }

    return result;
  }

  load(entity: ConcealedWorkTube, data: ConcealedWorkTubeData, context?: unknown): void {
    super.load(entity, data, context);

    if (data.rte) {
      Entity_IO.setEntityFields(entity, {
        route: data.rte.map((segmentData) => Loader.load(segmentData) as RouteSegment)
      });
    }

    if (data.nds) {
      Entity_IO.setEntityFields(entity, {
        nodeIds: data.nds
      });
    }
  }
}

export class ConcealedWorkTube extends Entity {
  @EntityField()
  nodeIds: number[] = [];

  @EntityField()
  route: RouteSegment[] = [];

  getIO(): ConcealedWorkTube_IO {
    return ConcealedWorkTube_IO.instance();
  }

  get tree(): TreeNode | undefined {
    return this.getUniqueParent() as TreeNode | undefined;
  }

  get nodes(): unknown[] {
    const treeNode = this.tree;
    const foundNodes = this.nodeIds
      .map((id) => treeNode?.findById(id))
      .filter((node) => node);

    return foundNodes.length === this.nodeIds.length ? foundNodes : [];
  }

  get startNode(): unknown | undefined {
    const nodeList = this.nodes;
    return nodeList && nodeList.length > 0 ? nodeList[0] : undefined;
  }

  get endNode(): unknown | undefined {
    const nodeList = this.nodes;
    return nodeList && nodeList.length > 0 ? nodeList[nodeList.length - 1] : undefined;
  }

  get diameter(): CWTubeDiameterEnum {
    let diameter = CWTubeDiameterEnum.D25;
    const treeNode = this.tree;

    if (treeNode) {
      const treeDiameter = treeNode.diameter;

      if (treeDiameter !== undefined) {
        diameter = treeDiameter;
      } else if (
        treeNode.getComponent(StrongElecComp.Type) ||
        treeNode.getComponent(WeakElecComp.Type)
      ) {
        diameter = CWTubeDiameterEnum.D16;
      }
    }

    return diameter;
  }

  get length(): number {
    return this.route.reduce((total, segment) => total + segment.getLength(), 0);
  }

  getCenter(): Vector3 {
    const uniqueRoute = this.getUniqueRoute();
    return uniqueRoute ? uniqueRoute.getMidPt() : Vector3.O();
  }

  getUniqueRoute(): RouteSegment | undefined {
    return this.route.length ? this.route[0] : undefined;
  }

  getDirsWithWeight(): unknown[] {
    return [];
  }
}

Entity.registerClass(HSConstants.ModelClass.ConcealedWorkTube, ConcealedWorkTube);