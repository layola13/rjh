import { SvgPaveContext, SvgOutline } from './SvgPaveContext';
import { SvgOpenings } from './SvgOpenings';
import { SvgCornerWindows } from './SvgCornerWindows';
import { SvgRooms } from './SvgRooms';
import { SvgEmptyEntry } from './SvgEmptyEntry';
import { SvgWalls } from './SvgWalls';
import { SvgBuilder } from './SvgBuilder';

interface ISvgComponent {
  export(): Promise<void>;
}

interface IPositionInfo {
  [key: string]: unknown;
}

interface IApp {
  [key: string]: unknown;
}

export class SvgBuilderPave extends SvgBuilder {
  protected _svgoutline?: SvgOutline;
  protected _position?: IPositionInfo;
  protected _svg: ISvgComponent[] = [];
  protected _app: IApp;

  /**
   * Build SVG pave diagram with rooms, openings, windows, and walls
   * @param data - Input data for building the SVG
   * @returns Promise resolving to the outer HTML of the SVG context node
   */
  public build(data: unknown): Promise<string> {
    const context = new SvgPaveContext(data);
    
    this._svgoutline = new SvgOutline(this._app, context);
    this._svg.push(this._svgoutline);
    this._svg.push(new SvgRooms(this._app, context, data));
    this._svg.push(new SvgOpenings(this._app, context));
    this._svg.push(new SvgCornerWindows(this._app, context));
    this._svg.push(new SvgEmptyEntry(this._app, context));
    this._svg.push(new SvgWalls(this._app, context));

    const exportPromises = this._svg.map((component) => component.export());

    return Promise.all(exportPromises).then(() => {
      this._position = context.getPositionInfo();
      return context.context().node.outerHTML;
    });
  }
}