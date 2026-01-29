import { HSApp } from './app';
import { HSCore } from './core';
import { HSCatalog } from './catalog';
import { Meta } from './meta';
import { Message } from './message';
import { ResourceManager } from './resource-manager';
import { HSFPConstants } from './constants';

interface MoveParams {
  showDefaultTip: boolean;
  [key: string]: unknown;
}

interface CommandAction {
  type: string;
  params: unknown[] | unknown;
  completeSequenceOnCancel?: boolean;
}

interface ProductEntity {
  content: unknown;
  replaceTarget: unknown;
}

type CommandFactory = (entity: unknown) => CommandAction;

const { CommandType } = HSFPConstants;
const {
  MoveContent,
  MoveOpening,
  MoveStructure,
  MoveBeam,
  MoveParametricBackgroundWall,
  MoveNCPBackgroundWallUnit,
  AddProduct
} = CommandType;

export default function generateCommands(
  items: unknown[]
): [CommandFactory[], unknown[]] {
  const [firstItem, additionalParams] = items as [unknown, MoveParams | undefined];

  if (firstItem instanceof Meta && firstItem.contentType.isTypeOf('component')) {
    Message.warning(
      ResourceManager.getString('do_not_directly_add_parametricopening_subparts'),
      { duration: 4000 }
    );
    return [[], []];
  }

  const determineCommandType = (entity: unknown): string => {
    let commandType = MoveContent;

    if (
      HSApp.Util.Opening.isOpeningContentType(firstItem) ||
      HSCore.Util.Content.isParametricOpening(firstItem) ||
      (firstItem as { contentType: { isTypeOf: (pattern: RegExp) => boolean } }).contentType.isTypeOf(/slab*/)
    ) {
      commandType = MoveOpening;
    }

    if (entity instanceof HSCore.Model.NCustomizedStructure) {
      commandType = MoveStructure;
    }

    if (entity instanceof HSCore.Model.NCustomizedBeam) {
      commandType = MoveBeam;
    }

    if ((firstItem as { contentType: { isTypeOf: (type: string) => boolean } }).contentType.isTypeOf(HSCatalog.ContentTypeEnum.SmartCustomizedBackgroundWall)) {
      commandType = MoveParametricBackgroundWall;
    }

    if ((firstItem as { contentType: { isTypeOf: (type: string) => boolean } }).contentType.isTypeOf(HSCatalog.ContentTypeEnum.BackgroundWallUnit)) {
      commandType = MoveNCPBackgroundWallUnit;
    }

    return commandType;
  };

  const shouldCompleteOnCancel = (entity: unknown): boolean => {
    return !(entity instanceof HSCore.Model.NCustomizedStructure) &&
           !(entity instanceof HSCore.Model.NCustomizedBeam);
  };

  const commands: CommandFactory[] = [
    (entity: unknown): CommandAction => ({
      type: AddProduct,
      params: entity
    }),

    (entity: unknown): CommandAction => ({
      type: determineCommandType(entity),
      params: [
        entity,
        undefined,
        {
          showDefaultTip: true,
          ...additionalParams
        }
      ],
      completeSequenceOnCancel: shouldCompleteOnCancel(entity)
    }),

    (entity: ProductEntity): CommandAction => ({
      type: HSFPConstants.CommandType.CmdRequestWrap,
      params: [
        HSFPConstants.RequestType.OverwriteEntityRequest,
        [entity.content, entity.replaceTarget]
      ],
      completeSequenceOnCancel: shouldCompleteOnCancel(entity.content)
    })
  ];

  const processedItems = [firstItem, ...items.slice(2)];

  return [commands, processedItems];
}