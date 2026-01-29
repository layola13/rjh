import { HSCore } from './HSCore';
import { HSApp } from './HSApp';
import { HSCatalog } from './HSCatalog';
import { HSFPConstants } from './HSFPConstants';

interface UserInputPlugin {
  getMousePosition(): { x: number; y: number };
}

interface PickResult {
  x: number;
  y: number;
  z?: number;
}

interface ContentWithPosition extends PickResult {
  contentType?: ContentType;
  metadata?: unknown;
}

interface ContentType {
  isTypeOf(type: string | RegExp): boolean;
}

interface PasteOptions {
  onPasteSequence?: boolean;
  from?: HSCore.Model.Content[];
  originSelections?: HSCore.Model.Content[];
  [key: string]: unknown;
}

interface CommandStep {
  type: string;
  params: unknown[];
  completeSequenceOnCancel: boolean;
}

interface StepResult {
  lastResult?: HSCore.Model.Content;
  length?: number;
  content?: HSCore.Model.Content | HSCore.Model.Content[] | HSCore.Model.Opening;
  replaceTarget?: unknown;
  [index: number]: HSCore.Model.Content;
}

type CommandSequence = Array<(result: StepResult) => CommandStep | null>;

export default function createPasteCommandSequence(
  selectedContents: HSCore.Model.Content[],
  userInputPlugin: UserInputPlugin,
  options: PasteOptions
): [CommandSequence, Array<{ options: PasteOptions }>] {
  const app = HSApp.App.getApp();

  const pickAtPosition = (zCoordinate?: number): PickResult | undefined => {
    const mousePosition = userInputPlugin.getMousePosition();
    const pickResult = app.activeView.pick(mousePosition);
    
    if (zCoordinate !== undefined && pickResult) {
      pickResult.z = zCoordinate;
    }
    
    return pickResult;
  };

  const pickPositionForContent = (content: ContentWithPosition): PickResult | undefined => {
    if (
      content.contentType?.isTypeOf(HSCatalog.ContentTypeEnum.ext_CeilingAttachedLighting) &&
      app.is3DViewActive()
    ) {
      const mousePosition = userInputPlugin.getMousePosition();
      const pickResult = app.activeView.pick(mousePosition);
      return Object.assign(pickResult, { z: content.z });
    }

    if (content.contentType?.isTypeOf(HSCatalog.ContentTypeEnum.ext_window)) {
      const pickResult = pickAtPosition();
      if (pickResult) {
        pickResult.z = content.z;
      }
      return pickResult;
    }

    return pickAtPosition(content.z);
  };

  const determineCopyPasteCommandType = (contents: HSCore.Model.Content[]): string => {
    if (contents[0] instanceof HSCore.Model.NCustomizedStructure) {
      return HSFPConstants.CommandType.CopyPasteStructure;
    }
    if (contents[0] instanceof HSCore.Model.NCustomizedBeam) {
      return HSFPConstants.CommandType.CopyPasteBeam;
    }
    return HSFPConstants.CommandType.Paste;
  };

  const determineMoveCommandType = (content: HSCore.Model.Content): string => {
    if (
      HSApp.Util.Opening.isOpening(content) ||
      HSCore.Util.Content.isParametricOpening(content.metadata) ||
      content.contentType.isTypeOf(/slab*/)
    ) {
      return HSFPConstants.CommandType.MoveOpening;
    }
    if (content instanceof HSCore.Model.NCustomizedStructure) {
      return HSFPConstants.CommandType.MoveStructure;
    }
    if (content instanceof HSCore.Model.NCustomizedBeam) {
      return HSFPConstants.CommandType.MoveBeam;
    }
    if (content instanceof HSCore.Model.NCustomizedParametricBackgroundWall) {
      return HSFPConstants.CommandType.MoveParametricBackgroundWall;
    }
    if (content instanceof HSCore.Model.NCPBackgroundWallUnit) {
      return HSFPConstants.CommandType.MoveNCPBackgroundWallUnit;
    }
    return HSFPConstants.CommandType.MoveContent;
  };

  const commandSequence: CommandSequence = [
    (result: StepResult): CommandStep => {
      const position = result.lastResult instanceof HSCore.Model.Content ? result.lastResult : undefined;
      
      return {
        type: determineCopyPasteCommandType(selectedContents),
        params: [{
          userinputPlugin: userInputPlugin,
          selectedContents: selectedContents,
          position: position
        }],
        completeSequenceOnCancel: false
      };
    },

    (result: StepResult): CommandStep | null => {
      const pasteOptions: PasteOptions = {
        onPasteSequence: true,
        from: selectedContents,
        ...options
      };

      if (result.length === 1) {
        return {
          type: determineMoveCommandType(result[0]),
          params: [result[0], pickPositionForContent(result[0]), pasteOptions],
          completeSequenceOnCancel: false
        };
      }

      if (result.length && result.length > 1) {
        return {
          type: HSFPConstants.CommandType.MoveContents,
          params: [result, pickAtPosition(), pasteOptions],
          completeSequenceOnCancel: false
        };
      }

      return null;
    },

    (result: StepResult): CommandStep | null => {
      const content = result.content;

      if (!content) {
        return null;
      }

      if (Array.isArray(content)) {
        if (content.length === 1) {
          return {
            type: determineMoveCommandType(content[0]),
            params: [content[0], undefined, options],
            completeSequenceOnCancel: false
          };
        }

        if (content.length > 1) {
          return {
            type: HSFPConstants.CommandType.MoveContents,
            params: [content, undefined, options],
            completeSequenceOnCancel: false
          };
        }

        return null;
      }

      if (content instanceof HSCore.Model.Opening) {
        const openingOptions: PasteOptions = {
          originSelections: selectedContents,
          ...options
        };
        
        return {
          type: determineMoveCommandType(content),
          params: [content, undefined, openingOptions],
          completeSequenceOnCancel: false
        };
      }

      return {
        type: determineMoveCommandType(content),
        params: [content, undefined, options],
        completeSequenceOnCancel: false
      };
    },

    (result: StepResult): CommandStep => {
      return {
        type: HSFPConstants.CommandType.CmdRequestWrap,
        params: [
          HSFPConstants.RequestType.OverwriteEntityRequest,
          [result.content, result.replaceTarget]
        ],
        completeSequenceOnCancel: true
      };
    }
  ];

  return [commandSequence, [{ options }]];
}