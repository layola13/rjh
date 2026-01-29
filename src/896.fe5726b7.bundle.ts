interface RoomStyleMetaProcessorConfig {
  roomStyleAttrName: string;
  roomStyleNone: string;
}

interface RoomStyleMetaProcessor {
  process(metadata: any, product: any): any;
}

class RoomStyleMetaProcessorImpl implements RoomStyleMetaProcessor {
  private roomStyleAttributeId?: string;
  private readonly roomStyleAttributeName: string;
  private readonly roomStyleNone: string;

  constructor(config: RoomStyleMetaProcessorConfig) {
    this.roomStyleAttributeName = config.roomStyleAttrName;
    this.roomStyleNone = config.roomStyleNone;
  }

  setRoomStyleAttributeId(id: string): void {
    this.roomStyleAttributeId = id;
  }

  process(metadata: any, product: any): any {
    if (product.productType !== HSCatalog.ProductTypeEnum.StylerTemplate) {
      return metadata;
    }

    const attributes = product.attributes;
    let roomStyleAttribute: any;

    if (this.roomStyleAttributeId) {
      roomStyleAttribute = attributes.find((attr: any) => attr.id === this.roomStyleAttributeId);
    } else {
      roomStyleAttribute = attributes.find((attr: any) => attr.name === this.roomStyleAttributeName);
    }

    if (roomStyleAttribute && roomStyleAttribute.values.length > 0) {
      metadata.roomStyle = roomStyleAttribute.values[0].id;
    } else {
      metadata.roomStyle = this.roomStyleNone;
    }

    return metadata;
  }
}

interface StyleType {
  code: string;
  name: string;
}

interface CustomizedUIResultContainer {
  ezhomeRoomStyle?: string;
}

interface DataToServer {
  attributes: any[];
}

interface TemplateSignalData {
  customizedUIResultContainer?: CustomizedUIResultContainer;
  dataToServer: DataToServer;
}

class StyleSelectUI {
  private readonly styleTypeList: StyleType[];
  private resultValue?: string;
  private originValue?: string;
  private styleSelectViewElem?: React.ReactElement;
  private savedDomNode?: HTMLElement;

  constructor(styleTypeList: StyleType[]) {
    this.styleTypeList = styleTypeList;
  }

  bindData(data: { roomStyle: string }): void {
    this.resultValue = this.originValue = data.roomStyle;
    this.styleSelectViewElem = React.createElement(StyleSelectView, {
      styleTypeId: data.roomStyle,
      styleTypeList: this.styleTypeList,
      styleTypeChangedNotify: (newValue: string) => {
        if (this.resultValue !== newValue) {
          this.resultValue = newValue;
        }
      }
    });
  }

  show(domNode: HTMLElement): void {
    this.savedDomNode = domNode;
    ReactDOM.render(this.styleSelectViewElem, domNode);
  }

  hide(): void {
    if (this.savedDomNode) {
      ReactDOM.unmountComponentAtNode(this.savedDomNode);
      this.savedDomNode = undefined;
    }
  }

  isChanged(): boolean {
    return this.resultValue !== this.originValue;
  }

  writeResult(container: any): void {
    container.ezhomeRoomStyle = this.resultValue;
  }

  needPostProcess(): boolean {
    return false;
  }
}

interface StyleSelectViewProps {
  styleTypeId: string;
  styleTypeList: StyleType[];
  styleTypeChangedNotify: (value: string) => void;
}

const StyleSelectView: React.FC<StyleSelectViewProps> = (props) => {
  const { styleTypeId, styleTypeList, styleTypeChangedNotify } = props;

  const options = styleTypeList.map((style, index) => (
    React.createElement(Option, {
      title: style.name,
      key: index,
      value: style.code
    }, style.name)
  ));

  const handleChange = (value: string): void => {
    styleTypeChangedNotify(value);
  };

  return React.createElement(Select, {
    dropdownClassName: "model-select-dropdown",
    onChange: handleChange,
    className: "model-select",
    defaultValue: styleTypeId
  }, options);
};

function initializeRoomStylePlugin(app: any, autostylerPlugin: any): void {
  const ROOM_STYLE_NONE = "ezhome_room_style_none";
  
  const metaProcessor = new RoomStyleMetaProcessorImpl({
    roomStyleAttrName: "Room Styles",
    roomStyleNone: ROOM_STYLE_NONE
  });

  HSCatalog.Builder.addMetaProcessor((metadata: any, product: any) => {
    return metaProcessor.process(metadata, product);
  });

  let styleTypeList: StyleType[] = [];
  let styleSelectUI: StyleSelectUI | undefined;
  let catalogFacet: any;
  let roomStyleAttribute: any;

  app.catalogManager.getAttribute("Room Styles").then((attribute: any) => {
    if (attribute) {
      roomStyleAttribute = attribute;
      metaProcessor.setRoomStyleAttributeId(attribute.id);
      if (catalogFacet && roomStyleAttribute) {
        catalogFacet.addFacet(roomStyleAttribute.id);
      }
    }
  });

  const findAttributeValue = (styleId: string) => {
    if (roomStyleAttribute) {
      const value = roomStyleAttribute.values.find((val: any) => val.id === styleId);
      if (value) {
        return {
          id: roomStyleAttribute.id,
          name: roomStyleAttribute.name,
          values: [value]
        };
      }
    }
    return undefined;
  };

  autostylerPlugin.signalSendingStylerTemplate.listen((signal: { data: TemplateSignalData }) => {
    const { customizedUIResultContainer, dataToServer } = signal.data;
    
    if (customizedUIResultContainer) {
      const roomStyle = customizedUIResultContainer.ezhomeRoomStyle;
      if (roomStyle && roomStyle !== ROOM_STYLE_NONE) {
        const attributeValue = findAttributeValue(roomStyle);
        if (attributeValue) {
          dataToServer.attributes.push(attributeValue);
        }
      }
    } else {
      const attributes = app.designMetadata.get("attributes");
      if (attributes?.style) {
        const attributeValue = findAttributeValue(attributes.style.code);
        if (attributeValue) {
          dataToServer.attributes.push(attributeValue);
        }
      }
    }
  });

  app.catalogManager.getAttribute("Room Styles").then((attribute: any) => {
    const styles: StyleType[] = [{
      code: ROOM_STYLE_NONE,
      name: ResourceManager.getString("EZHome_roomstyle_none")
    }];
    
    attribute.values.forEach((value: any) => {
      styles.push({
        code: value.id,
        name: value.value
      });
    });
    
    return styles;
  }).then((styles: StyleType[]) => {
    styleTypeList = styles;
    if (styleTypeList.length > 0) {
      styleSelectUI = new StyleSelectUI(styleTypeList);
      autostylerPlugin.addEditingPanelCustomizedUI(styleSelectUI);
    }
  });
}

export { initializeRoomStylePlugin, RoomStyleMetaProcessorImpl, StyleSelectUI };