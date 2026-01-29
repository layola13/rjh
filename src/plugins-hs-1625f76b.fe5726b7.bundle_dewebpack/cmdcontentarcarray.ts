import { HSApp } from './518193';
import { getSelectedInJSON } from './300025';

interface Position {
  x: number;
  y: number;
  z: number;
}

interface Rotation {
  x: number;
  y: number;
  z: number;
}

interface ArcArrayData {
  position: Position[];
  rotation: Rotation[];
}

interface ContentData {
  id: string;
  [key: string]: unknown;
}

interface ContentsJSON {
  data: ContentData[];
  [key: string]: unknown;
}

interface ContentMetadata {
  id: string;
  [key: string]: unknown;
}

interface Content {
  id: string;
  metadata: ContentMetadata;
  [key: string]: unknown;
}

interface Context {
  app: Application;
  transManager: TransactionManager;
}

interface Application {
  appSettings: AppSettings;
  cmdManager: CommandManager;
  floorplan: Floorplan;
  pluginManager: PluginManager;
}

interface AppSettings {
  getViewItem(key: string): boolean;
  setViewItem(key: string, value: boolean): void;
}

interface TransactionManager {
  startSession(): Session;
  createRequest(type: string, args: unknown[]): Request;
  commit(request: Request): void;
}

interface Session {
  abort(): void;
  commit(): void;
}

interface Request {
  [key: string]: unknown;
}

interface CommandManager {
  cancel(command: CmdContentArcArray): void;
  complete(command: CmdContentArcArray): void;
}

interface Floorplan {
  [key: string]: unknown;
}

interface PluginManager {
  getPlugin(pluginType: string): Plugin | null;
}

interface Plugin {
  showSecondToolbar(show: boolean): void;
}

interface KeydownEvent {
  keyCode?: number;
}

interface NumChangeEvent {
  number?: number;
}

interface PasteContentRequest {
  dataContent: ContentData;
  contentsJSON: ContentsJSON;
  floorplan: Floorplan;
  productsMap: Map<string, ContentMetadata>;
  position: Position;
  entity: Content;
  rotation: Rotation;
}

const KEY_CODE_ESC = 27;
const KEY_CODE_ENTER = 13;
const DEFAULT_ARRAY_NUM = 4;

export class CmdContentArcArray extends HSApp.Cmd.Command {
  private app!: Application;
  private session!: Session;
  private arrayNum: number = DEFAULT_ARRAY_NUM;
  private requestArr: Request[] = [];
  private content: Content;
  private hasHideContentPrecisionLocation: boolean = false;

  constructor(content: Content) {
    super();
    this.content = content;
  }

  onExecute(): void {
    this.app = this.context.app;
    this.session = this.context.transManager.startSession();

    if (this.app.appSettings.getViewItem('contentPrecisionLocation')) {
      this.app.appSettings.setViewItem('contentPrecisionLocation', false);
      this.hasHideContentPrecisionLocation = true;
    }

    this.showSecondToolbar(false);
  }

  onReceive(event: string, data?: KeydownEvent | NumChangeEvent | ArcArrayData | unknown): boolean {
    switch (event) {
      case 'cancel':
        this.onESC();
        break;

      case 'keydown':
        if (data && (data as KeydownEvent).keyCode === KEY_CODE_ESC) {
          this.onESC();
        }
        if (data && (data as KeydownEvent).keyCode === KEY_CODE_ENTER) {
          this.handleComplete();
        }
        break;

      case 'numchange':
        if ((data as NumChangeEvent)?.number) {
          this.updateArrayNum((data as NumChangeEvent).number!);
        }
        break;

      case 'enter':
        this.applyArcArray(data as ArcArrayData);
        break;

      case 'complete':
        this.handleComplete();
        break;

      default:
        return super.onReceive(event, data);
    }

    return true;
  }

  private updateArrayNum(num: number): void {
    this.arrayNum = num;
  }

  private applyArcArray(data: ArcArrayData): void {
    const contentsJSON = getSelectedInJSON([this.content]);
    
    if (!contentsJSON) {
      return;
    }

    const metadata = this.content.metadata;
    const productsMap = new Map<string, ContentMetadata>();
    productsMap.set(metadata.id, metadata);

    const filteredData = contentsJSON.data.filter((item: ContentData) =>
      [this.content].find((content) => item.id === content.id)
    );

    this.addContents(filteredData, contentsJSON, productsMap, data);
  }

  private addContents(
    contentDataArray: ContentData[],
    contentsJSON: ContentsJSON,
    productsMap: Map<string, ContentMetadata>,
    data: ArcArrayData
  ): void {
    const floorplan = this.app.floorplan;
    const { position, rotation } = data;

    for (let i = 0; i < this.arrayNum - 1; i++) {
      contentDataArray.forEach((contentData) => {
        this.addContent(
          contentData,
          contentsJSON,
          floorplan,
          productsMap,
          position[i],
          rotation[i]
        );
      });
    }
  }

  private addContent(
    contentData: ContentData,
    contentsJSON: ContentsJSON,
    floorplan: Floorplan,
    productsMap: Map<string, ContentMetadata>,
    position: Position,
    rotation: Rotation
  ): void {
    const requestArgs: PasteContentRequest[] = [{
      dataContent: contentData,
      contentsJSON: contentsJSON,
      floorplan: floorplan,
      productsMap: productsMap,
      position: position,
      entity: this.content,
      rotation: rotation
    }];

    const request = this.context.transManager.createRequest(
      HSFPConstants.RequestType.PasteContent,
      requestArgs
    );

    this.requestArr.push(request);
    this.context.transManager.commit(request);
  }

  private onESC(): void {
    this.session.abort();
    this.app.cmdManager.cancel(this);
  }

  private handleComplete(): void {
    HSApp.Selection.Manager.unselectAll();

    if (this.requestArr.length > 0) {
      this.session.commit();
    }

    this.app.cmdManager.complete(this);
  }

  onCleanup(): void {
    if (this.hasHideContentPrecisionLocation) {
      this.app.appSettings.setViewItem('contentPrecisionLocation', true);
    }

    this.showSecondToolbar(true);
  }

  getDescription(): string {
    return '圆弧阵列';
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.ContentOperation;
  }

  getCurrentParams(): {
    activeSection: string;
    activeSectionName: string;
    clicksRatio: { id: string; name: string };
  } {
    return {
      activeSection: 'contentEdit',
      activeSectionName: '模型操作',
      clicksRatio: {
        id: 'contentArcArray',
        name: '圆弧阵列'
      }
    };
  }

  private showSecondToolbar(show: boolean): void {
    const toolbarPlugin = this.app.pluginManager.getPlugin(
      HSFPConstants.PluginType.Toolbar
    );

    if (toolbarPlugin) {
      toolbarPlugin.showSecondToolbar(show);
    }
  }
}