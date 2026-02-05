// @ts-nocheck
import { ActiveContext, ActiveType, ContentLift } from './289659';
import { ContentRotation } from './449406';
import { ContentMovement } from './770439';
import { CoordinateAxis } from './247160';
import { ResizeContent } from './151452';
import { isCustomDoor } from './55766';
import { ContentBox } from './155747';
import { CWContentDimension } from './505268';
import { HSCore, HSConstants } from './635589';

interface GizmoManager {
  getSelectionType(): number;
  setSelectionType(type: number): void;
}

interface Canvas3D {
  gizmoManager: GizmoManager;
}

interface View3D {
  gizmoManager: GizmoManager;
}

interface SelectionManager {
  selected(): Array<{ isScalable: boolean }>;
}

interface CommandManager {
  current?: { type: string };
  createCommand(type: string, args: unknown[]): unknown;
  execute(command: unknown): void;
  receive(event: string, data?: unknown): void;
  complete(): void;
}

interface HotkeyManager {
  registerHotkey(
    key: string,
    callback: () => void,
    options?: { description?: string; group?: string }
  ): void;
  unregisterHotkey(
    key: string,
    callback: () => void,
    context?: unknown,
    environmentId?: string
  ): void;
}

interface AppSettings {
  getViewItem(key: string): boolean;
}

interface Application {
  appSettings: AppSettings;
}

interface HSAppInstance {
  selectionManager: SelectionManager;
  cmdManager: CommandManager;
  hotkey: HotkeyManager;
  activeEnvironmentId: string;
  getMain3DView(): View3D;
  getActive3DView(): View3D;
}

interface Context {
  hscanvas: Canvas3D;
  application: Application;
}

interface Content extends HSCore.Model.Content {
  Class: string;
  XSize: number;
  YSize: number;
  ZSize: number;
  ZLength: number;
  contentType: {
    isTypeOf(type: string): boolean;
  };
  getProxyObject?(): { getDoor(content: Content): unknown } | null;
  instanceOf?(modelClass: string): boolean;
}

declare namespace HSApp {
  namespace View {
    enum GizmoSelectionType {
      Select = 1,
      Move = 2,
      Rotate = 4,
      Scale = 8,
      RotateAndMove = 6,
      Reset = 16,
    }

    namespace Base {
      class Gizmo {
        context: Context;
        content: Content;
        constructor(context: Context, parent: unknown, content: Content);
        addChildGizmo(gizmo: unknown): void;
      }
    }
  }

  namespace App {
    function getApp(): HSAppInstance;
  }

  namespace Util {
    namespace Content {
      function isDiyModel(content: Content): boolean;
      function isCWUniqueContent(content: Content): boolean;
    }
  }
}

declare namespace HSFPConstants {
  enum CommandType {
    AddMultiProducts = 'AddMultiProducts',
    RotateContent = 'RotateContent',
  }

  enum LogGroupTypes {
    ContentOperation = 'ContentOperation',
  }
}

declare namespace HSCatalog {
  enum ContentTypeEnum {
    ext_wardrobeMetals = 'ext_wardrobeMetals',
  }
}

export default class ContentGizmo extends HSApp.View.Base.Gizmo {
  private app: HSAppInstance;
  private activeEnvironmentId: string;

  constructor(context: Context, parent: unknown, content: Content) {
    super(context, parent, content);

    this.app = HSApp.App.getApp();

    // Skip initialization for specific content types or commands
    if (
      (content instanceof HSCore.Model.Content &&
        content.isFlagOn(HSCore.Model.ContentFlagEnum.EditLight)) ||
      this.app.cmdManager.current?.type === HSFPConstants.CommandType.AddMultiProducts
    ) {
      return;
    }

    this.app.hotkey.registerHotkey('alt+r', this.changeSelectionType);
    this.activeEnvironmentId = this.app.activeEnvironmentId;

    const selectionType = context.hscanvas.gizmoManager.getSelectionType() || 0;
    const GizmoType = HSApp.View.GizmoSelectionType;

    const nonScalableModelClasses = [
      HSConstants.ModelClass.DAssembly,
      HSConstants.ModelClass.DContent,
      HSConstants.ModelClass.DExtruding,
      HSConstants.ModelClass.DMolding,
      HSConstants.ModelClass.DHole,
    ];

    const hasFlag = (flag: number): boolean => (selectionType & flag) !== 0;

    const activeContext = new ActiveContext();

    // Add scale gizmo
    if (
      hasFlag(GizmoType.Scale) &&
      !hasFlag(GizmoType.Reset) &&
      content &&
      !nonScalableModelClasses.includes(content.Class) &&
      content.Class !== HSConstants.ModelClass.DOpening
    ) {
      this._addScaleGizmo(context, parent, content);
    }

    // Add rotate gizmo
    if (hasFlag(GizmoType.Rotate | GizmoType.Reset)) {
      this._addRotateGizmo(context, parent, content, activeContext);
      this._registerHotkey();
    }

    // Add move gizmo
    if (hasFlag(GizmoType.Move | GizmoType.Reset)) {
      this._addMoveGizmo(context, parent, content, activeContext);
    }

    // Add coordinate axis
    if (hasFlag(GizmoType.Rotate | GizmoType.Reset) || hasFlag(GizmoType.Move | GizmoType.Reset)) {
      this._addCoordinateAxisGizmo(context, parent, content, activeContext);
    }

    // Add bounding box
    if (
      !HSApp.Util.Content.isDiyModel(content) &&
      (!hasFlag(GizmoType.Rotate | GizmoType.Reset | GizmoType.Move) || hasFlag(GizmoType.Select)) &&
      !nonScalableModelClasses.includes(content.Class)
    ) {
      this._addBoundingBox(context, parent, content);
    }

    // Add dimension
    this._addDimension(context, parent, content);
  }

  private changeSelectionType = (): void => {
    const selected = this.app.selectionManager.selected();
    if (!selected[0]?.isScalable) {
      return;
    }

    const currentType = this.app.getMain3DView().gizmoManager.getSelectionType();
    const GizmoType = HSApp.View.GizmoSelectionType;

    if ((currentType & GizmoType.Scale) !== 0) {
      this.app.getActive3DView().gizmoManager.setSelectionType(GizmoType.RotateAndMove);
    } else if (
      (currentType & GizmoType.RotateAndMove) !== 0 ||
      (currentType & GizmoType.Reset) !== 0
    ) {
      this.app.getActive3DView().gizmoManager.setSelectionType(GizmoType.Scale);
    }
  };

  public onCleanup(): void {
    this._unregisterHotkey();
  }

  private _addBoundingBox(context: Context, parent: unknown, content: Content): void {
    this.addChildGizmo(new ContentBox(context, parent, content));
  }

  private _addScaleGizmo(context: Context, parent: unknown, content: Content): void {
    this.addChildGizmo(new ResizeContent(context, parent, content));
  }

  private _addRotateGizmo(
    context: Context,
    parent: unknown,
    content: Content,
    activeContext: ActiveContext
  ): void {
    const maxSize = Math.max(content.XSize, content.YSize, content.ZSize);
    const scale = Math.min(Math.max(1, maxSize), 1);

    const planeTypes = [ActiveType.xy, ActiveType.xz, ActiveType.yz];
    planeTypes.forEach((planeType) => {
      this.addChildGizmo(
        new ContentRotation(context, parent, content, scale, undefined, planeType, activeContext)
      );
    });
  }

  private _addMoveGizmo(
    context: Context,
    parent: unknown,
    content: Content,
    activeContext: ActiveContext
  ): void {
    const maxSize = Math.max(content.XSize, content.YSize, content.ZSize);
    const scale = Math.min(Math.max(1, maxSize), 1);

    this.addChildGizmo(
      new ContentLift(
        context,
        parent,
        content,
        content.ZLength,
        scale,
        undefined,
        ActiveType.top,
        activeContext
      )
    );

    const rotations = [
      { angle: 0, type: ActiveType.near },
      { angle: 0.5 * Math.PI, type: ActiveType.far },
      { angle: Math.PI, type: ActiveType.left },
      { angle: -0.5 * Math.PI, type: ActiveType.right },
    ];

    rotations.forEach(({ angle, type }) => {
      this.addChildGizmo(
        new ContentMovement(this.context, parent, angle, content, scale, undefined, type, activeContext)
      );
    });
  }

  private _addCoordinateAxisGizmo(
    context: Context,
    parent: unknown,
    content: Content,
    activeContext: ActiveContext
  ): void {
    this.addChildGizmo(new CoordinateAxis(this.context, parent, content, activeContext));
  }

  private _addDimension(context: Context, parent: unknown, content: Content): void {
    const isWardrobeMetals = content.contentType.isTypeOf(
      HSCatalog.ContentTypeEnum.ext_wardrobeMetals
    );

    if (
      HSCore.Util.Content.isCWUniqueContent(content) &&
      context.application.appSettings.getViewItem('contentPrecisionLocation3d')
    ) {
      this.addChildGizmo(new CWContentDimension(context, parent, content));
    } else if (isWardrobeMetals) {
      // Add wardrobe metals dimension gizmo (imported component not shown)
      // this.addChildGizmo(new WardrobeMetalsDimension(context, parent, content));
    } else if (content instanceof HSCore.Model.DAssembly || content instanceof HSCore.Model.DContent) {
      if (!isCustomDoor(content)) {
        const proxyObject = content.getProxyObject?.();
        const door = proxyObject?.getDoor(content);
        // Add default dimension gizmo (imported component not shown)
        // this.addChildGizmo(new DefaultDimension(context, parent, content, undefined, door));
      }
    } else if (content instanceof HSCore.Model.Group) {
      const assemblyClasses = [HSConstants.ModelClass.DAssembly, HSConstants.ModelClass.DContent];
      const hasAssemblyMember = content.members?.find((member: Content) =>
        assemblyClasses.includes(member.Class)
      );
      if (hasAssemblyMember) {
        // this.addChildGizmo(new DefaultDimension(context, parent, content));
      }
    } else if (
      (!HSApp.Util.Content.isDiyModel(content) &&
        context.application.appSettings.getViewItem('contentPrecisionLocation3d')) ||
      content instanceof HSCore.Model.NCustomizedParametricBackgroundWall ||
      content instanceof HSCore.Model.NCPBackgroundWallUnit ||
      content.instanceOf?.(HSConstants.ModelClass.MeshContent)
    ) {
      // Add generic dimension gizmo (imported component not shown)
      // this.addChildGizmo(new GenericDimension(context, parent, content));
    }
  }

  private _registerHotkey(): void {
    HSApp.App.getApp().hotkey.registerHotkey('space', this.onRotate45Deg, {
      description: '旋转模型',
      group: HSFPConstants.LogGroupTypes.ContentOperation,
    });
  }

  private _unregisterHotkey(): void {
    this.app.hotkey.unregisterHotkey('space', this.onRotate45Deg, undefined, this.activeEnvironmentId);
    this.app.hotkey.unregisterHotkey('alt+r', this.changeSelectionType, undefined, this.activeEnvironmentId);
  }

  private onRotate45Deg = (): void => {
    const cmdManager = this.app.cmdManager;
    const command = cmdManager.createCommand(HSFPConstants.CommandType.RotateContent, [
      this.content,
      'xy',
      false,
    ]);
    cmdManager.execute(command);
    cmdManager.receive('hotkey', { delta: 45 });
    cmdManager.receive('hotkeyend');
    cmdManager.complete();
  };
}