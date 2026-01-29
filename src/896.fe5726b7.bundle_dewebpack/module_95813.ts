interface RoomStyleValue {
  id: string;
  value: string;
}

interface RoomStyleAttribute {
  id: string;
  name: string;
  values: RoomStyleValue[];
}

interface RoomStyleAttributeSubset {
  id: string;
  name: string;
  values: RoomStyleValue[];
}

interface StyleData {
  code: string;
  name: string;
}

interface DesignMetadataAttributes {
  style?: {
    code: string;
  };
}

interface CustomizedUIResultContainer {
  ezhomeRoomStyle?: string;
}

interface DataToServer {
  attributes: RoomStyleAttributeSubset[];
}

interface SignalData {
  customizedUIResultContainer?: CustomizedUIResultContainer;
  dataToServer: DataToServer;
}

interface SignalEvent {
  data: SignalData;
}

interface CatalogManager {
  getAttribute(name: string): Promise<RoomStyleAttribute | undefined>;
}

interface DesignMetadata {
  get(key: string): DesignMetadataAttributes | undefined;
}

interface Context {
  catalogManager: CatalogManager;
  designMetadata: DesignMetadata;
}

interface Signal {
  listen(callback: (event: SignalEvent) => void): void;
}

interface Signals {
  signalSendingStylerTemplate: Signal;
  addEditingPanelCustomizedUI(ui: unknown): void;
}

class RoomStyleMetaProcessor {
  private roomStyleAttrName: string;
  private roomStyleNone: string;
  private roomStyleAttributeId?: string;

  constructor(config: { roomStyleAttrName: string; roomStyleNone: string }) {
    this.roomStyleAttrName = config.roomStyleAttrName;
    this.roomStyleNone = config.roomStyleNone;
  }

  setRoomStyleAttributeId(id: string): void {
    this.roomStyleAttributeId = id;
  }

  process(metadata: unknown, context: unknown): unknown {
    return metadata;
  }
}

class RoomStyleEditor {
  constructor(styles: StyleData[]) {
    // Implementation for room style editor UI
  }
}

declare const HSCatalog: {
  Builder: {
    addMetaProcessor(processor: (metadata: unknown, context: unknown) => unknown): void;
  };
};

declare const ResourceManager: {
  getString(key: string): string;
};

export default function initializeRoomStyleModule(context: Context, signals: Signals): void {
  const ROOM_STYLE_NONE = 'ezhome_room_style_none';
  const ROOM_STYLE_ATTR_NAME = 'Room Styles';

  const metaProcessor = new RoomStyleMetaProcessor({
    roomStyleAttrName: ROOM_STYLE_ATTR_NAME,
    roomStyleNone: ROOM_STYLE_NONE,
  });

  HSCatalog.Builder.addMetaProcessor((metadata, processorContext) => {
    return metaProcessor.process(metadata, processorContext);
  });

  let styleOptions: StyleData[] = [];
  let roomStyleEditor: RoomStyleEditor | undefined;
  let facetManager: { addFacet(id: string): void } | undefined;
  let roomStyleAttribute: RoomStyleAttribute | undefined;

  context.catalogManager.getAttribute(ROOM_STYLE_ATTR_NAME).then((attribute) => {
    if (attribute) {
      roomStyleAttribute = attribute;
      metaProcessor.setRoomStyleAttributeId(attribute.id);
      if (facetManager && roomStyleAttribute) {
        facetManager.addFacet(roomStyleAttribute.id);
      }
    }
  });

  const findAttributeSubset = (valueId: string): RoomStyleAttributeSubset | undefined => {
    if (!roomStyleAttribute) {
      return undefined;
    }

    const matchedValue = roomStyleAttribute.values.find((val) => val.id === valueId);
    if (matchedValue) {
      return {
        id: roomStyleAttribute.id,
        name: roomStyleAttribute.name,
        values: [matchedValue],
      };
    }

    return undefined;
  };

  signals.signalSendingStylerTemplate.listen((event) => {
    const { customizedUIResultContainer, dataToServer } = event.data;

    if (customizedUIResultContainer) {
      const selectedStyle = customizedUIResultContainer.ezhomeRoomStyle;
      if (selectedStyle && selectedStyle !== ROOM_STYLE_NONE) {
        const attributeSubset = findAttributeSubset(selectedStyle);
        if (attributeSubset) {
          dataToServer.attributes.push(attributeSubset);
        }
      }
    } else {
      const attributes = context.designMetadata.get('attributes');
      if (attributes) {
        const styleMetadata = attributes.style;
        if (styleMetadata) {
          const attributeSubset = findAttributeSubset(styleMetadata.code);
          if (attributeSubset) {
            dataToServer.attributes.push(attributeSubset);
          }
        }
      }
    }
  });

  context.catalogManager
    .getAttribute(ROOM_STYLE_ATTR_NAME)
    .then((attribute) => {
      const styles: StyleData[] = [
        {
          code: ROOM_STYLE_NONE,
          name: ResourceManager.getString('EZHome_roomstyle_none'),
        },
      ];

      attribute?.values.forEach((value) => {
        styles.push({
          code: value.id,
          name: value.value,
        });
      });

      return styles;
    })
    .then((styles) => {
      styleOptions = styles;
      roomStyleEditor = styleOptions.length === 0 ? undefined : new RoomStyleEditor(styleOptions);
      if (roomStyleEditor) {
        signals.addEditingPanelCustomizedUI(roomStyleEditor);
      }
    });
}