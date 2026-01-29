import { BaseOperation, OperationId } from './base-operation';
import { OperationContext, OperationReply } from './operation-types';
import { FloorplanApp } from './floorplan-app';
import { Floor } from './floor';
import { HSApp } from './hs-app';
import { HSFPConstants } from './constants';
import { TransactionSession } from './transaction-manager';

/**
 * Room type estimation result
 */
interface RoomTypeEstimation {
  /** The floor object to update */
  floor: Floor;
  /** Estimated room type identifier */
  estimatedRoomType: string;
}

/**
 * Floor information for room type estimation
 */
interface FloorInfo {
  /** The floor object without a room type */
  floor: Floor;
}

/**
 * Operation for renaming/identifying room types automatically.
 * Scans floors without assigned room types and uses the constraint layout plugin
 * to estimate appropriate room types based on floor geometry and constraints.
 */
export class OpRenameRoom extends BaseOperation {
  /**
   * Gets the unique identifier for this operation type
   * @returns The operation identifier for room renaming
   */
  public static getId(): string {
    return OperationId.RenameRooms;
  }

  /**
   * Executes the room renaming operation.
   * Collects all floors without room types, estimates appropriate types using AI/constraints,
   * and commits the changes in a transaction.
   * 
   * @param context - The operation execution context
   */
  public onExecute(context: OperationContext): void {
    // Mark function as completed immediately (async operation handled via promise)
    context.isFuncDone = true;

    // Collect all floors that don't have a room type assigned
    const floorsWithoutType: FloorInfo[] = [];
    this.app.floorplan.scene.activeLayer.forEachFloor((floor: Floor) => {
      if (!floor.roomType) {
        floorsWithoutType.push({ floor });
      }
    });

    // Get constraint layout plugin for room type estimation
    const constraintPlugin = HSApp.App.getApp()
      .pluginManager
      .getPlugin(HSFPConstants.PluginType.ConstraintLayout);

    // Request room type estimation from plugin
    constraintPlugin
      .handleEstimateRoomType(floorsWithoutType)
      .then((estimations: RoomTypeEstimation[]) => {
        // Start a transaction session to batch all room type changes
        const session: TransactionSession = this.app.transManager.startSession();

        // Apply estimated room types to each floor
        estimations.forEach((estimation: RoomTypeEstimation) => {
          const request = this.app.transManager.createRequest(
            HSFPConstants.RequestType.ChangeRoomType,
            [
              estimation.floor,
              {
                roomType: estimation.estimatedRoomType,
                roomTypeDisplayName: estimation.estimatedRoomType
              }
            ]
          );
          this.app.transManager.commit(request);
        });

        // Commit the transaction session
        session.commit();

        // Get recommended follow-up operations
        const recommendedOps = OpRenameRoom.getRecommendedOperationTypes(
          OpRenameRoom.getId()
        );
        context.recommendedOperationTypes = recommendedOps;

        // Finish with success
        this.onFinish('success', context.reply, context);
      })
      .catch(() => {
        // Handle estimation failure
        this.onFinish('fail', context.reply, context);
      });
  }
}