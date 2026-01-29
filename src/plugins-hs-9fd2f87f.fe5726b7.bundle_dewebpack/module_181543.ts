import { CommandType, RequestType } from './HSFPConstants';
import { ContentTypeEnum } from './HSCatalog';

interface Position {
  x: number;
  y: number;
  z?: number;
}

interface ContentMetadata {
  contentType: {
    isTypeOf: (type: string | RegExp) => boolean;
  };
  z?: number;
}

interface Content {
  contentType?: {
    isTypeOf: (type: string | RegExp) => boolean;
  };
  z?: number;
  metadata?: ContentMetadata;
  length?: number;
}

interface PasteEvent {
  content: Content | Content[];
  replaceTarget?: unknown;
}

interface MoveOptions {
  onPasteSequence?: boolean;
  [key: string]: unknown;
}

interface CommandResult {
  type: string;
  params: unknown[];
  completeSequenceOnCancel: boolean;
}

interface UserInputPlugin {
  getMousePosition: () => Position;
}

interface FloorplanApp {
  activeView: {
    pick: (position: Position) => Position;
  };
  is3DViewActive: () => boolean;
}

interface Plugins {
  userinputPlugin: UserInputPlugin;
  catalogPlugin: unknown;
  floorplan: unknown;
  app: FloorplanApp;
}

export default function createPasteCommandSequence(
  userInputPlugin: UserInputPlugin,
  catalogPlugin: unknown,
  floorplan: unknown,
  app: FloorplanApp,
  additionalOptions: MoveOptions
): [Array<(param: unknown) => CommandResult | null>, [Plugins]] {
  
  const getPickedPosition = (): Position => {
    const mousePosition = userInputPlugin.getMousePosition();
    return app.activeView.pick(mousePosition);
  };

  const getTargetPosition = (content: Content): Position => {
    if (
      content.contentType?.isTypeOf(ContentTypeEnum.ext_CeilingAttachedLighting) &&
      app.is3DViewActive()
    ) {
      const mousePosition = userInputPlugin.getMousePosition();
      const pickedPosition = app.activeView.pick(mousePosition);
      return {
        ...pickedPosition,
        z: content.z
      };
    }

    if (content.contentType?.isTypeOf(ContentTypeEnum.ext_window)) {
      const pickedPosition = getPickedPosition();
      return {
        ...pickedPosition,
        z: content.z
      };
    }

    return getPickedPosition();
  };

  const pasteCommand = (contents: Content[]): CommandResult => {
    return {
      type: CommandType.Paste,
      params: contents,
      completeSequenceOnCancel: false
    };
  };

  const moveAfterPaste = (contents: Content[]): CommandResult | null => {
    const moveOptions: MoveOptions = {
      onPasteSequence: true,
      ...additionalOptions
    };

    if (contents.length === 1) {
      return {
        type: CommandType.MoveContent,
        params: [contents[0], getTargetPosition(contents[0]), moveOptions],
        completeSequenceOnCancel: false
      };
    }

    if (contents.length > 1) {
      return {
        type: CommandType.MoveContents,
        params: [contents, getPickedPosition(), moveOptions],
        completeSequenceOnCancel: false
      };
    }

    return null;
  };

  const moveContentCommand = (event: PasteEvent): CommandResult | null => {
    const content = event.content;

    if (Array.isArray(content)) {
      if (content.length === 1) {
        return {
          type: CommandType.MoveContent,
          params: [content[0], undefined, additionalOptions],
          completeSequenceOnCancel: true
        };
      }

      if (content.length > 1) {
        return {
          type: CommandType.MoveContents,
          params: [content, undefined, additionalOptions],
          completeSequenceOnCancel: true
        };
      }
    }

    if (!content.length) {
      const metadata = content.metadata;
      
      if (
        HSApp.Util.Opening.isOpeningContentType(metadata) ||
        HSCore.Util.Content.isParametricOpening(metadata) ||
        metadata?.contentType.isTypeOf(/slab*/)
      ) {
        return {
          type: CommandType.MoveOpening,
          params: [content, undefined, additionalOptions],
          completeSequenceOnCancel: true
        };
      }

      return {
        type: CommandType.MoveContent,
        params: [content, undefined, additionalOptions],
        completeSequenceOnCancel: true
      };
    }

    return null;
  };

  const overwriteEntityCommand = (event: PasteEvent): CommandResult => {
    return {
      type: CommandType.CmdRequestWrap,
      params: [RequestType.OverwriteEntityRequest, [event.content, event.replaceTarget]],
      completeSequenceOnCancel: true
    };
  };

  return [
    [pasteCommand, moveAfterPaste, moveContentCommand, overwriteEntityCommand],
    [{
      userinputPlugin,
      catalogPlugin,
      floorplan,
      app
    }]
  ];
}