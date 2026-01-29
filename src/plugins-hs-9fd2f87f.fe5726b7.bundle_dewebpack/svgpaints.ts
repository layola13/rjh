import { HSCore } from './HSCore';
import { HSCatalog } from './HSCatalog';
import { Matrix3, MatrixUtil } from './Matrix';
import { MathService } from './MathService';
import { SvgBase } from './SvgBase';
import { MetaDecorator } from './MetaDecorator';
import { ColorMode } from './ColorMode';
import { TileAndStoneCollector } from './TileAndStoneCollector';

interface Point {
  x: number;
  y: number;
}

interface PathData {
  outer: Point[];
  holes?: Point[][];
}

interface Material {
  seekId?: string;
  tileSize_x?: number;
  tileSize_y?: number;
  scaleX?: number;
  scaleY?: number;
  colorMode?: ColorMode;
  color?: string;
  blendColor?: string;
  textureUrl?: string;
}

interface Brick {
  outer: Point[];
  holes?: Point[][];
  material: Material;
}

interface Block {
  bricks: Brick[];
}

interface Seam {
  width: number;
  color: string;
}

interface Pattern {
  seam?: Seam;
}

interface Region {
  blocks: Block[];
  pattern?: Pattern;
}

interface WaterJetTile {
  material?: Material;
}

interface PaveDwgData {
  regions: Region[];
  waterJetTiles: WaterJetTile[];
}

interface DwgData {
  worldTransform: number[];
  paveDwgData: PaveDwgData;
}

interface Face {
  // Face interface properties
}

interface SvgNode {
  path(pathString: string): {
    stroke(options: { width: number; color: string }): void;
  };
}

interface Layers {
  paints: SvgNode;
}

interface Container {
  layers(): Layers;
}

export class SvgPaints extends SvgBase {
  private _face: Face;
  private _node: SvgNode;

  constructor(
    element: unknown,
    container: Container,
    face: Face,
    param4: unknown,
    param5: unknown
  ) {
    super(element, container);
    this._face = face;
    this._node = container.layers().paints;
  }

  public draw(): void {
    this._drawRegions();
  }

  private _drawRegions(): void {
    const dwgData = HSCore.Util.FaceDwg.getDwgData(this._face, {
      nonPicture: true,
      disableSoftOutlines: true
    }) as DwgData | null;

    if (!dwgData) {
      return;
    }

    const { worldTransform, paveDwgData } = dwgData;
    const { regions, waterJetTiles } = paveDwgData;
    const transformMatrix = new Matrix3(
      MatrixUtil.convertToMatrix3(worldTransform)
    );

    regions.forEach((region) => {
      this._drawRegion(region, transformMatrix);
    });

    waterJetTiles.forEach((tile) => {
      this._collectWaterJetTiles(tile);
    });
  }

  private _drawRegion(region: Region, transformMatrix: Matrix3): void {
    const { blocks, pattern } = region;
    const seam = pattern?.seam;

    blocks.forEach((block) => {
      block.bricks.forEach((brick) => {
        if (brick.outer.length === 0) {
          return;
        }

        this._collectBrickMaterialTable(brick, brick.material);

        if (!seam || seam.width === 0) {
          return;
        }

        brick.outer.forEach((point) => point.transform(transformMatrix));
        brick.holes?.forEach((hole) => {
          hole.forEach((point) => point.transform(transformMatrix));
        });

        const discretePath = MathService.ins.getDiscretePath(brick);
        const paths: Point[][] = [];
        paths.push(discretePath.outer);
        if (discretePath.holes) {
          paths.push(...discretePath.holes);
        }

        this._drawBrick(paths, seam);
      });
    });
  }

  private _collectBrickMaterialTable(brick: Brick, material: Material): void {
    if (!material.seekId) {
      return;
    }

    const meta = HSCatalog.MetaManager.instance().getBuildingProductMeta(
      material.seekId
    );

    if (new MetaDecorator(meta).isWaterJetTileMeta()) {
      return;
    }

    const area = HSCore.Util.TgWall.getArea([brick]);
    const tileWidth = material.tileSize_x ?? 1;
    const tileHeight = material.tileSize_y ?? 1;
    let count = area / (tileHeight * tileWidth);
    const fraction = count % 1;

    if (fraction > 1 / 3 && fraction < 0.5) {
      count = Math.floor(count) + 0.5;
    } else if (fraction > 0.6) {
      count = Math.ceil(count);
    }

    let color: string | undefined;
    if (material.colorMode === ColorMode.Color) {
      color = material.color;
    } else if (material.colorMode === ColorMode.Blend) {
      color = material.blendColor;
    }

    TileAndStoneCollector.get().addTileAndStone({
      seekId: material.seekId,
      name: meta?.name ?? '',
      size: {
        x: tileWidth,
        y: tileHeight
      },
      count,
      imageUrl: material.textureUrl,
      color,
      unit: ResourceManager.getString(
        'plugin_exportdwg_detailist_cutomized_tile_unit'
      )
    });
  }

  private _collectWaterJetTiles(tile: WaterJetTile): void {
    const material = tile.material;
    if (!material?.seekId) {
      return;
    }

    const meta = HSCatalog.MetaManager.instance().getBuildingProductMeta(
      material.seekId
    );

    const tileWidth = material.tileSize_x ?? 1;
    const tileHeight = material.tileSize_y ?? 1;
    const scaleX = material.scaleX ?? 1;
    const scaleY = material.scaleY ?? 1;

    TileAndStoneCollector.get().addTileAndStone({
      seekId: material.seekId,
      name: meta?.name ?? '',
      size: {
        x: tileWidth * scaleX,
        y: tileHeight * scaleY
      },
      count: 1,
      imageUrl: material.textureUrl,
      unit: ResourceManager.getString('unitType_ge')
    });
  }

  private _drawBrick(paths: Point[][], seam: Seam): void {
    const scale = this.unitScale();
    let pathString = '';

    paths.forEach((path) => {
      const coordinates = path
        .map((point) => ({
          x: point.x * scale,
          y: -point.y * scale
        }))
        .map((point) => `${point.x.toFixed(3)}, ${point.y.toFixed(3)}`)
        .join(', ');

      pathString += `M${coordinates.substring(0, coordinates.length - 1)} z `;
    });

    this._node.path(pathString).stroke({
      width: 0.001 * scale,
      color: `#${HSCore.Material.Util.convertColorToString(seam.color)}`
    });
  }
}