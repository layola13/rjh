import { HSCore } from './hs-core';
import { Utils } from './utils';

interface EventPayload {
  entities: HSCore.Model.Entity[];
  app: HSApp.Application;
  openOption?: Record<string, unknown>;
  seekId?: string;
}

interface FavoriteInfo {
  materialChanged: boolean;
  hasSeekId: boolean;
  favAddFlag: boolean;
}

interface Application {
  cmdManager: CommandManager;
  transManager: TransactionManager;
  selectionManager: SelectionManager;
  pluginManager: PluginManager;
  userTrackLogger: UserTrackLogger;
}

interface CommandManager {
  createCommand(type: string, args?: unknown[]): Command;
  execute(command: Command): void;
  complete(command?: Command): void;
  receive(event: string, data: unknown): void;
}

interface TransactionManager {
  createRequest(type: string, args: unknown[]): Request;
  commit(request: Request): void;
}

interface SelectionManager {
  unselectAll(): void;
  select(entity: HSCore.Model.Entity): void;
}

interface PluginManager {
  getPlugin(pluginType: string): Plugin;
}

interface Plugin {
  actions?: {
    deleteSelectedItems(): void;
  };
  uploaderModelWithMaterial?(entity: HSCore.Model.Entity): void;
  removeFavorite?(seekId: string): void;
  showPopupGroupPanel?(seekId: string): void;
}

interface Command {
  output?: HSCore.Model.Entity;
}

interface Request {}

interface UserTrackLogger {
  push(event: string, data: Record<string, unknown>, options: Record<string, unknown>): void;
}

export function replaceEvent(payload: EventPayload): void {
  const { entities, app, openOption = {} } = payload;
  const entity = entities[0];
  const cmdManager = app.cmdManager;

  const executeReplace = (): void => {
    const command = cmdManager.createCommand(HSFPConstants.CommandType.SmartReplaceContent, [entity, openOption]);
    cmdManager.execute(command);
  };

  const shouldDisconnect = HSApp.PaintPluginHelper.Util.MixPaintUtil.disconnectFaceGroupWithPrompt(
    [entity],
    undefined,
    executeReplace.bind(undefined)
  );

  if (!shouldDisconnect) {
    executeReplace();
  }
}

export function flipEvent(payload: EventPayload): void {
  const { entities, app } = payload;
  const cmdManager = app.cmdManager;
  const command = cmdManager.createCommand(HSFPConstants.CommandType.FlipContent, [entities[0]]);
  cmdManager.execute(command);
}

export function duplicateEvent(payload: EventPayload): void {
  const { app } = payload;
  Utils.showDuplicateTip();
  const cmdManager = app.cmdManager;
  const command = cmdManager.createCommand(HSFPConstants.CommandType.Duplicate, [{}]);
  cmdManager.execute(command);
}

export function lockEvent(payload: EventPayload): void {
  const { entities } = payload;
  const app = HSApp.App.getApp();
  const transManager = app.transManager;

  const requests = entities.map((entity: HSCore.Model.Entity) => {
    const isCurrentlyFrozen = entity.isFlagOn(HSCore.Model.EntityFlagEnum.freezed);
    return transManager.createRequest(HSConstants.RequestType.ChangeFlag, [
      entity,
      HSCore.Model.EntityFlagEnum.freezed,
      !isCurrentlyFrozen
    ]);
  });

  const compositeRequest = transManager.createRequest(HSConstants.RequestType.Composite, [requests]);
  transManager.commit(compositeRequest);
  app.selectionManager.unselectAll();
}

export function hideEvent(payload: EventPayload): void {
  const { entities, app } = payload;
  const cmdManager = app.cmdManager;
  const command = cmdManager.createCommand(HSFPConstants.CommandType.DisplayContents, [entities, false]);
  cmdManager.execute(command);
  cmdManager.complete(command);
}

export function deleteEvent(payload: EventPayload): void {
  const { app } = payload;
  const userInputPlugin = app.pluginManager.getPlugin(HSFPConstants.PluginType.UserInput);
  userInputPlugin.actions?.deleteSelectedItems();
}

export function favButtonEvent(payload: EventPayload): void {
  const { entities, seekId } = payload;
  const entity = entities?.[0];
  const app = HSApp.App.getApp();
  const favoritePlugin = app.pluginManager.getPlugin(HSFPConstants.PluginType.Favorite);
  const favoriteInfo: FavoriteInfo = Utils.getFavoriteInfo(entity, seekId);
  const { materialChanged, hasSeekId, favAddFlag } = favoriteInfo;

  if (!adskUser.sid) {
    adskUser.openLoginWindow();
    return;
  }

  if (materialChanged) {
    favoritePlugin.uploaderModelWithMaterial?.(entity);
  } else if (hasSeekId) {
    favoritePlugin.removeFavorite?.(seekId);
  } else {
    favoritePlugin.showPopupGroupPanel?.(seekId);
  }

  app.userTrackLogger.push('favorite.Content', {
    description: `${favAddFlag ? '取消' : '收藏'}模型seekId: ${seekId}`,
    activeSection: 'leftmenu',
    type: favAddFlag ? 'remove' : 'add',
    group: HSFPConstants.LogGroupTypes.ContentOperation
  }, {});
}

export function unGroupButtonEvent(payload: EventPayload): void {
  const { entities, app } = payload;
  const cmdManager = app.cmdManager;
  const command = cmdManager.createCommand(HSFPConstants.CommandType.RemoveGroup, [entities[0]]);
  cmdManager.execute(command);
}

export function groupButtonEvent(payload: EventPayload): void {
  const { entities, app } = payload;
  const { cmdManager, selectionManager } = app;
  const command = cmdManager.createCommand(HSFPConstants.CommandType.AddGroup, [entities]);
  cmdManager.execute(command);

  const output = command.output;
  if (output) {
    selectionManager.select(output);
  }
}

export function rotateXYPlaneEvent(payload: EventPayload): void {
  const { entities, app } = payload;
  const cmdManager = app.cmdManager;
  const entity = entities[0];

  if (entity instanceof HSCore.Model.Entity) {
    const command = cmdManager.createCommand(HSFPConstants.CommandType.RotateContent, [entity, 'xy', false]);
    cmdManager.execute(command);
    cmdManager.receive('hotkey', { delta: 90 });
    cmdManager.complete();
  }
}

export function showAllEvent(payload: EventPayload): void {
  const { app } = payload;
  HSApp.Util.EventTrack.instance().track(HSApp.Util.EventGroupEnum.Rightmenu, 'toolbar_toggleShowAll', {});
  const cmdManager = app.cmdManager;
  const command = cmdManager.createCommand(HSFPConstants.CommandType.DisplayAllContent);
  cmdManager.execute(command);
}