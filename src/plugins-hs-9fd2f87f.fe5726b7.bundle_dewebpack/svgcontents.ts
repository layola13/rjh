import { SvgBase } from './SvgBase';
import { HSCore } from './HSCore';
import { HSCatalog } from './HSCatalog';
import { HSConstants } from './HSConstants';
import { HSApp } from './HSApp';
import { HSMath } from './HSMath';
import { Util } from './Util';

interface StrokeStyle {
  fill: string;
  stroke: string;
  'stroke-width': number;
  'fill-opacity': number;
}

interface VirtualStyle {
  fill: string;
  'fill-opacity': number;
  stroke: string;
  'stroke-width': number;
  'stroke-opacity': number;
}

interface Point {
  x?: number;
  y?: number;
  X?: number;
  Y?: number;
}

interface ContentBound {
  width: number;
  height: number;
  left: number;
  top: number;
}

interface ContentClipBound {
  offsetLeft: number;
  width: number;
  height: number;
}

interface ImageDataResult {
  dataType: 'svg' | 'path' | 'worldpath' | 'PAssPath' | 'pathString' | 'png' | 'error';
  img?: string | string[][] | any;
  content: any;
  error?: string;
}

export class SvgContents extends SvgBase {
  private isNoContents: boolean;
  private sucessCount: number;
  private errorCount: number;
  private paddingSet: Set<string>;
  private strokeStyle: StrokeStyle;
  private virtualStyle: VirtualStyle;
  private _node: any;

  constructor(context: any, app: any, isNoContents: boolean = true) {
    super(context, app);
    this.isNoContents = isNoContents;
    this.sucessCount = 0;
    this.errorCount = 0;
    this.paddingSet = new Set();
    this.strokeStyle = {
      fill: '#e7e7e7',
      stroke: '#333333',
      'stroke-width': 1,
      'fill-opacity': 1
    };
    this.virtualStyle = {
      fill: '#c5daeb',
      'fill-opacity': 0.01,
      stroke: '#4d9bd6',
      'stroke-width': 0.25,
      'stroke-opacity': 0.01
    };
  }

  private _isTargetContent(content: any): boolean {
    if (content instanceof HSCore.Model.NCustomizedStructure && content.isWallPart()) {
      return true;
    }

    if (this.isNoContents) {
      return false;
    }

    if (!this.isItemValid(content)) {
      return false;
    }

    if (!content.contentType) {
      return false;
    }

    const excludedTypes = [
      HSCatalog.ContentTypeEnum.ext_CeilingAttached,
      HSCatalog.ContentTypeEnum.CustomizedPersonalizedModel
    ];

    if (excludedTypes.some(type => content.contentType.isTypeOf(type))) {
      return false;
    }

    const excludedClasses = [
      HSCore.Model.Opening,
      HSCore.Model.CornerWindow,
      HSCore.Model.Door,
      HSCore.Model.Window,
      HSCore.Model.BayWindow,
      HSCore.Model.CornerFlatWindow,
      HSCore.Model.POrdinaryWindow,
      HSCore.Model.ParametricOpening
    ];

    return !excludedClasses.some(cls => content instanceof cls);
  }

  private getTargetContent(items: any | any[], targetList: any[]): void {
    if (items instanceof Array) {
      items.forEach(item => this.getTargetContent(item, targetList));
    } else if (items instanceof HSCore.Model.Group) {
      items.forEachMembers(member => this.getTargetContent(member, targetList));
    } else if (items.instanceOf(HSConstants.ModelClass.NgContent) && this._isTargetContent(items)) {
      targetList.push(items);
    }
  }

  async initialized(): Promise<void> {
    this._node = this._ctx.layers().contents;
    const unitScale = this.unitScale();
    const promises: Promise<ImageDataResult>[] = [];
    const targetContents: any[] = [];

    const contents = Object.values(this._app.floorplan.scene.activeLayer.contents);
    const structures = Object.values(this._app.floorplan.scene.activeLayer.structures);

    this.getTargetContent([...contents, ...structures], targetContents);

    targetContents.sort((a, b) => (a.z + a.ZSize) - (b.z + b.ZSize)).forEach(content => {
      promises.push(
        this.getTopImageDataUrl(content).then(result => {
          this.paddingSet.delete(result.content.ID);
          const status = result.dataType === 'error' ? result.error : 'success';
          if (result.dataType === 'error') {
            this.errorCount++;
          } else {
            this.sucessCount++;
          }
          Util.logger.debug(
            `fetch status ${status} ID ${result.content.ID} data errorNum${this.errorCount} successNum${this.sucessCount}, the padding ${JSON.stringify([...this.paddingSet])}`
          );
          return result;
        })
      );
    });

    Util.logger.debug(`fetch data start, total ${promises.length}`);

    const results = await Promise.all(promises);
    Util.logger.debug('fetch data end');

    results.forEach(result => {
      const { dataType, img, content } = result;

      if (!img) return;

      if (dataType === 'svg') {
        this.renderSvg(content, img, unitScale);
      } else if (dataType === 'path') {
        this.renderPath(content, img, unitScale);
      } else if (dataType === 'worldpath') {
        this.renderWorldPath(content, img);
      } else if (dataType === 'PAssPath') {
        this.renderPAssPath(content, img, unitScale);
      } else if (dataType === 'pathString') {
        this.renderPathString(content, img, unitScale);
      } else if (dataType === 'png') {
        this.renderPng(content, img, unitScale);
      } else {
        Util.logger.debug(`draw data type error contentID${content.ID} error:${result.error}`);
      }
    });

    Util.logger.debug('draw data end');
  }

  private renderSvg(content: any, img: string, unitScale: number): void {
    const group = this._node.group().id(content.ID);
    group.svg(img);
    group.attr({ preserveAspectRatio: 'none' });
    group.move(content.x * unitScale, -content.y * unitScale);
    group.transform({ scale: 0.7352941176470589, relative: true });
    group.transform({ rotation: content.rotation, relative: true });
  }

  private renderPath(content: any, img: string[][], unitScale: number): void {
    const group = this._node.group().id(content.ID);
    const [solidPaths, virtualPaths] = img;

    solidPaths.forEach(pathData => {
      const pathString = this.buildSvgString(pathData, true);
      group.path(pathString).attr(this.strokeStyle);
    });

    virtualPaths.forEach(pathData => {
      const pathString = this.buildSvgString(pathData, true);
      group.path(pathString).attr(this.virtualStyle);
    });

    group.attr({ preserveAspectRatio: 'none' });
    group.move(content.x * unitScale, -content.y * unitScale);
    group.transform({ rotation: content.rotation, relative: true });
  }

  private renderWorldPath(content: any, img: string[][]): void {
    const group = this._node.group().id(content.ID);
    const [solidPaths, virtualPaths] = img;

    solidPaths.forEach(pathData => {
      const pathString = this.buildSvgString(pathData, true);
      group.path(pathString).attr(this.strokeStyle);
    });

    virtualPaths.forEach(pathData => {
      const pathString = this.buildSvgString(pathData, true);
      group.path(pathString).attr(this.virtualStyle);
    });

    group.attr({ preserveAspectRatio: 'none' });
  }

  private renderPAssPath(content: any, img: string[][], unitScale: number): void {
    const group = this._node.group().id(content.ID);
    const [solidPaths, virtualPaths] = img;

    solidPaths.forEach(pathData => {
      const pathString = this.buildSvgString(pathData, true);
      group.path(pathString).attr(this.strokeStyle);
    });

    virtualPaths.forEach(pathData => {
      const pathString = this.buildSvgString(pathData, true);
      group.path(pathString).attr(this.virtualStyle);
    });

    group.attr({ preserveAspectRatio: 'none' });
    group.move(content.x * unitScale, -content.y * unitScale);
  }

  private renderPathString(content: any, img: string, unitScale: number): void {
    const group = this._node.group().id(content.ID);
    group.path(img).attr({
      stroke: '#333333',
      'stroke-width': 1
    });
    group.attr({ preserveAspectRatio: 'none' });
    group.move(content.x * unitScale, -content.y * unitScale);
    group.transform({ rotation: content.rotation, relative: true });
  }

  private renderPng(content: any, img: string, unitScale: number): void {
    const contentBound = HSApp.View.SVG.Util.buildSVGContentBound(content, unitScale);
    const clipBound = HSApp.View.SVG.Util.buildSVGContentClipBound(content, unitScale);
    const image = this._node.image(img, contentBound.width, contentBound.height).move(contentBound.left, contentBound.top);

    image.attr({ preserveAspectRatio: 'none' });

    const modelPoint = HSApp.View.SVG.Util.ModelPointToCanvas(content, unitScale);
    const flipScale = content.flip === 0 ? 1 : -1;
    const matrix = new (SVG as any).Matrix()
      .rotate(content.rotation, modelPoint.x, modelPoint.y)
      .translate(2 * content.flip * modelPoint.x, 0)
      .scale(flipScale, 1, 0, 0);

    image.attr({ transform: matrix });

    if (clipBound) {
      image.attr({
        'clip-rect': [contentBound.left + clipBound.offsetLeft, contentBound.top, clipBound.width, clipBound.height]
      });
      image._clip.removeAttribute('transform');
    } else {
      image.attr('clip-path', null);
    }
  }

  private getTopImageDataUrl(content: any): Promise<ImageDataResult> {
    return new Promise((resolve, reject) => {
      this.paddingSet.add(content.ID);
      Util.logger.debug(`fetch ${content.ID} data start`);

      if (content instanceof HSCore.Model.PAssembly) {
        resolve({
          dataType: 'PAssPath',
          img: this.getPAssemblyElementView(content),
          content
        });
      } else if (content instanceof HSCore.Model.CustomizedModel) {
        resolve({
          dataType: 'path',
          img: this.getDIYData(content),
          content
        });
      } else if (content instanceof HSCore.Model.NCustomizedStructure) {
        resolve({
          dataType: 'worldpath',
          img: this.getStructureData(content),
          content
        });
      } else {
        if (!content.topView) {
          resolve({
            dataType: 'error',
            error: 'content.topView is not defined',
            content
          });
          return;
        }

        const imageUrl = (content.metadata.model?.topviewcolorUrl ?? content.topView.replace('Top', 'Top_color')) + '?x-oss-process=style/iso-normal';

        if (HSCore.IsNodeVersion) {
          let response: any;
          fetch(imageUrl)
            .then(res => {
              response = res;
              return res.buffer();
            })
            .then(buffer => {
              const base64Data = `data:${response.headers.get('content-type') ?? 'image/png'};base64,${buffer.toString('base64')}`;
              resolve({
                dataType: 'png',
                img: base64Data,
                content
              });
            })
            .catch(error => {
              resolve({
                dataType: 'error',
                error,
                content
              });
            });
        } else {
          fetch(imageUrl)
            .then(res => res.blob())
            .then(blob => {
              const reader = new FileReader();
              reader.onloadend = () => {
                resolve({
                  dataType: 'png',
                  img: reader.result as string,
                  content
                });
              };
              reader.readAsDataURL(blob);
            })
            .catch(error => {
              resolve({
                dataType: 'error',
                error,
                content
              });
            });
        }
      }
    });
  }

  private buildSvgString(points: Point[], closePath: boolean): string {
    let pathString = '';

    for (let i = 0; i < points.length; i++) {
      const point = {
        x: points[i].x ?? points[i].X,
        y: points[i].y ?? points[i].Y
      };

      if (isNaN(point.x!) || isNaN(point.y!)) {
        throw new Error('Invalid point coordinates');
      }

      const command = i === 0 ? 'M' : 'L';
      pathString += `${command}${(100 * point.x!).toFixed(2)}, ${(100 * -point.y!).toFixed(2)}`;
    }

    if (closePath) {
      pathString += 'Z ';
    }

    return pathString;
  }

  private getPAssemblyElementView(content: any): string[][] {
    const virtualPaths: any[] = [];
    const solidPaths = HSApp.Util.Content.getPAssemblyElementPaths(content, virtualPaths);
    return [solidPaths, virtualPaths];
  }

  private getDIYData(content: any): string[][] | undefined {
    const topProjection = content.getTopProjection(false);

    if (!topProjection) {
      return undefined;
    }

    let paths: any[] = [];
    topProjection.forEach((item: any) => {
      paths = paths.concat(item.paths[0].paths);
    });

    return [paths, []];
  }

  private getStructureData(content: any): string[][] | undefined {
    const profile = content.profile;

    if (!profile) {
      return undefined;
    }

    if (content instanceof HSCore.Model.NCustomizedFlue || content instanceof HSCore.Model.NCustomizedRiser) {
      const loop = new HSMath.Loop(profile);
      const scaleMatrix = HSMath.Matrix3.makeScale(new HSMath.Vector2(content.middle), 0.7);
      const transformedLoop = loop.transformed(scaleMatrix);
      return [[loop.toPath(), transformedLoop.toPath()], []];
    }

    return [[content.geometry], []];
  }

  build(): void {
    // Implementation placeholder
  }
}