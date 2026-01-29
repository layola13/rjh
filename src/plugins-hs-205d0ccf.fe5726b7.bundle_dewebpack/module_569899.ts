import { HSCore } from './HSCore';
import { ResourceManager } from './ResourceManager';
import { MessageBox } from './MessageBox';
import { HSApp } from './HSApp';
import { HSFPConstants } from './HSFPConstants';

interface Room {
  // Define room properties based on your application context
  [key: string]: unknown;
}

/**
 * Validates room data and handles deprecated space upgrades
 * @param room - The room data to validate
 * @param callback - Optional callback to execute after successful upgrade
 * @returns true if room data is valid, false otherwise
 */
export function isRoomDataValid(
  room: Room | null | undefined,
  callback?: () => void
): boolean {
  if (!room) {
    return false;
  }

  const splitHelper = new HSCore.Model.Geom.SplitHelper(room);
  
  if (splitHelper.isDeprecatedSpaceByRoom()) {
    const upgradeTitle = ResourceManager.getString('plugin_propertybar_room_upgrade');
    const upgradeHint = ResourceManager.getString('plugin_propertybar_room_upgrade_hint');
    const cancelText = ResourceManager.getString('cancel');
    const confirmText = ResourceManager.getString('plugin_propertybar_room_upgrade_confirm');

    MessageBox.create(
      upgradeHint,
      [cancelText, confirmText],
      1,
      { title: upgradeTitle },
      false
    ).show((buttonIndex: number) => {
      if (buttonIndex === 0) {
        const app = HSApp.App.getApp();
        const resetSpaceRequest = app.transManager.createRequest(
          HSFPConstants.RequestType.ResetSpace,
          [room, false]
        );
        app.transManager.commit(resetSpaceRequest);
        
        if (callback) {
          callback();
        }
      }
    });

    return false;
  }

  return true;
}