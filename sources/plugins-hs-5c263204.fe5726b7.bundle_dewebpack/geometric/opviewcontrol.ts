import { OperationId, BaseOperation } from './base-operation';
import { getRoomsByIdOrType, cameraMoveToRoom, selectedTargetRoom } from './room-utils';

interface ViewControlParams {
  subType: ViewSubType;
  isSelected?: number;
  roomId?: string;
  roomType?: string;
  inputRoomId?: string;
  selectedId?: string;
}

interface ExecuteContext {
  params: ViewControlParams;
  isFuncDone?: boolean;
  reply?: string;
  recommendedOperationTypes?: string[];
}

interface Room {
  id: string;
  roomType: string;
  roomTypeDisplayName?: string;
}

interface SelectOption<T = unknown> {
  label: string;
  value: T;
  room?: Room;
}

interface RadioControl {
  type: 'radio';
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
}

interface ButtonOption {
  index: number;
  label: string;
}

type ViewSubType = '2D' | '3D' | 'Roam' | 'Ceiling' | 'Others';

const VIEW_MODE_MAP: Record<ViewSubType, HSApp.View.ViewModeEnum | 'Others'> = {
  '2D': HSApp.View.ViewModeEnum.Plane,
  '3D': HSApp.View.ViewModeEnum.OrbitView,
  Roam: HSApp.View.ViewModeEnum.FirstPerson,
  Ceiling: HSApp.View.ViewModeEnum.RCP,
  Others: 'Others'
};

const CONFIRM_BUTTON_INDEX = 1;
const CANCEL_BUTTON_INDEX = 0;

export class OpViewControl extends BaseOperation {
  public static getId(): string {
    return OperationId.ViewControl;
  }

  public onExecute(context: ExecuteContext): void {
    const { params } = context;

    if (params.subType === 'Others') {
      this.onFinish('success', context.reply ?? '', context);
      return;
    }

    context.isFuncDone = true;

    const renderImagePlugin = this.app.pluginManager.getPlugin('hsw.plugin.renderImageBrowserPlugin.Plugin');
    const isInImageBrowser = renderImagePlugin?.getIsInImageBrowserEnv?.call(renderImagePlugin);

    if (isInImageBrowser) {
      this.onFinish(
        'success',
        ResourceManager.getString('homegpt_switch_perspective_env_tip'),
        context
      );
      return;
    }

    const isRenderEnvironment = this.app.activeEnvironmentId === HSFPConstants.Environment.Render;
    const isCeilingView = params.subType === 'Ceiling';

    if (isRenderEnvironment && isCeilingView) {
      this.onFinish(
        'success',
        ResourceManager.getString('homegpt_switch_perspective_upspport_tip'),
        context
      );
      return;
    }

    const hasRoomFilter = params.roomId || params.roomType;
    const isItemSelected = params.isSelected === 1;

    if (isItemSelected || !hasRoomFilter || getRoomsByIdOrType(params.roomId, params.roomType).length !== 0) {
      this.switchViewModeAndFinish(params, context);
    } else {
      this.onFinish(
        'fail',
        ResourceManager.getString('homegpt_switch_perspective_empty_rooms'),
        context
      );
    }
  }

  private switchViewModeAndFinish(params: ViewControlParams, context: ExecuteContext): void {
    this.app.switchPrimaryViewMode(VIEW_MODE_MAP[params.subType]);

    const recommendedOps = OpViewControl.getRecommendedOperationTypes(OpViewControl.getId());
    context.recommendedOperationTypes = recommendedOps;

    if (params.isSelected === 1) {
      this.handleSelectedItem(params);
      this.finishSuccess(context);
      return;
    }

    if (params.roomId || params.roomType) {
      this.handleRoomNavigation(params, context);
    } else {
      this.finishSuccess(context);
    }
  }

  private handleSelectedItem(params: ViewControlParams): void {
    if (params.inputRoomId) {
      cameraMoveToRoom(params.inputRoomId);
    } else if (params.selectedId) {
      const activeCamera = this.app.floorplan.active_camera;
      const moveCommand = this.app.cmdManager.createCommand(
        HSFPConstants.CommandType.MoveCamera3D,
        [activeCamera]
      );
      this.app.cmdManager.execute(moveCommand);
      this.app.cmdManager.receive('fitCameraToEntity');
      this.app.cmdManager.complete(moveCommand);
    }
  }

  private handleRoomNavigation(params: ViewControlParams, context: ExecuteContext): void {
    const rooms = getRoomsByIdOrType(params.roomId, params.roomType);

    if (rooms.length > 1) {
      this.showSameRoomTypeSelect(rooms, context);
    } else {
      if (rooms.length > 0) {
        cameraMoveToRoom(rooms[0].id);
      }
      this.finishSuccess(context);
    }
  }

  private showSameRoomTypeSelect(rooms: Room[], context: ExecuteContext): void {
    const buttons: ButtonOption[] = [
      {
        index: CONFIRM_BUTTON_INDEX,
        label: ResourceManager.getString('homegpt_layout_room_confirm')
      },
      {
        index: CANCEL_BUTTON_INDEX,
        label: ResourceManager.getString('homegpt_render_cam_point_cancel_tip')
      }
    ];

    const options: SelectOption[] = rooms.map((room) => ({
      label: room.roomTypeDisplayName ?? 
             ResourceManager.getString(`model_roomtype_${room.roomType.replace(/\s/g, '')}`),
      value: room.id,
      room
    }));

    let selectedRooms: Room[] = rooms.filter((room) => room.id === options[0].value);
    selectedTargetRoom(options[0].room!);

    const radioControl: RadioControl = {
      type: 'radio',
      options,
      value: options[0].value,
      onChange: (selectedValue: string) => {
        const matchedRooms = rooms.filter((room) => selectedValue === room.id);
        selectedTargetRoom(matchedRooms[0]);
        selectedRooms = matchedRooms;
      }
    };

    this.onQuerySelection(
      ResourceManager.getString('homegpt_switch_perspective_mutiple_room_type_tip'),
      buttons,
      (buttonIndex: number) => {
        if (buttonIndex === CONFIRM_BUTTON_INDEX) {
          if (selectedRooms.length > 0) {
            this.app.switchPrimaryViewMode(VIEW_MODE_MAP[context.params.subType]);
            cameraMoveToRoom(selectedRooms[0].id);
            this.finishSuccess(context);
          } else {
            this.onFinish(
              'success',
              ResourceManager.getString('homegpt_layout_mutiple_room_type_not_choose'),
              context
            );
          }
        } else if (buttonIndex === CANCEL_BUTTON_INDEX || buttonIndex === -1) {
          this.onFinish(
            'success',
            ResourceManager.getString('homegpt_layout_mutiple_room_type_cancel_choose'),
            context
          );
        }
      },
      radioControl
    );
  }

  private finishSuccess(context: ExecuteContext): void {
    this.onFinish(
      'success',
      context.reply ?? ResourceManager.getString('homegpt_switch_perspective_default_reply'),
      context
    );
  }
}