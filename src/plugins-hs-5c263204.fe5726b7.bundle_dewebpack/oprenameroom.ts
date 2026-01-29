import { BaseOperation, OperationId } from './BaseOperation';
import type { OperationExecuteContext } from './types';

interface FloorWithoutRoomType {
  floor: any;
}

interface EstimatedRoomTypeResult {
  floor: any;
  estimatedRoomType: string;
  estimatedRoomType?: string;
}

interface RoomTypeChangeData {
  roomType: string;
  roomTypeDisplayName: string;
}

export class OpRenameRoom extends BaseOperation {
  public static getId(): string {
    return OperationId.RenameRooms;
  }

  public onExecute(context: OperationExecuteContext): void {
    context.isFuncDone = true;

    const floorsWithoutRoomType: FloorWithoutRoomType[] = [];

    this.app.floorplan.scene.activeLayer.forEachFloor((floor: any) => {
      if (!floor.roomType) {
        floorsWithoutRoomType.push({ floor });
      }
    });

    const constraintLayoutPlugin = HSApp.App.getApp()
      .pluginManager
      .getPlugin(HSFPConstants.PluginType.ConstraintLayout);

    constraintLayoutPlugin
      .handleEstimateRoomType(floorsWithoutRoomType)
      .then((results: EstimatedRoomTypeResult[]) => {
        const session = this.app.transManager.startSession();

        results.forEach((result: EstimatedRoomTypeResult) => {
          const roomTypeData: RoomTypeChangeData = {
            roomType: result.estimatedRoomType,
            roomTypeDisplayName: result.estimatedRoomType
          };

          const request = this.app.transManager.createRequest(
            HSFPConstants.RequestType.ChangeRoomType,
            [result.floor, roomTypeData]
          );

          this.app.transManager.commit(request);
        });

        session.commit();

        const recommendedOperations = OpRenameRoom.getRecommendedOperationTypes(
          OpRenameRoom.getId()
        );
        context.recommendedOperationTypes = recommendedOperations;

        this.onFinish('success', context.reply, context);
      })
      .catch(() => {
        this.onFinish('fail', context.reply, context);
      });
  }
}