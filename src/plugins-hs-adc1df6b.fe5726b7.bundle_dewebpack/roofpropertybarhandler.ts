enum PropertyType {
  FLOAT = "FLOAT",
  INTEGER = "INTEGER",
  BOOLEAN = "BOOLEAN",
  STRING = "STRING"
}

interface PropertyBarItem {
  id: string;
  type?: string;
  label?: string;
  enableDetailsInfo?: boolean;
  parentId?: string;
  items?: PropertyBarItem[];
  order?: number;
  className?: string;
  data?: any;
  getRenderItem?: () => React.ReactElement;
}

interface RoofParamNode {
  name: string;
  value: number | string;
  type?: PropertyType;
  minMax?: [number, number];
  reactKey: string;
}

interface ParamChange {
  name: string;
  value: number | string;
  oldValue: number | string;
}

interface Roof {
  id: string;
  parameters: {
    propertytree?: any;
  };
}

interface RoofRegion {
  id: string;
  roof?: Roof;
}

interface GeneratePropertyParams {
  data: PropertyBarItem[];
}

export class RoofPropertyBarHandler {
  private _faceMaterialHanler: import('./RoofFacePropertyBarHandler').RoofFacePropertyBarHandler;
  private _roofFacesMaterialHandler: import('./RoofFacesPropertyBarHandler').RoofFacesPropertyBarHandler;

  constructor() {
    this._faceMaterialHanler = new (require('./RoofFacePropertyBarHandler').RoofFacePropertyBarHandler)();
    this._roofFacesMaterialHandler = new (require('./RoofFacesPropertyBarHandler').RoofFacesPropertyBarHandler)();
  }

  generateProperty(params: GeneratePropertyParams): void {
    const { data } = params;
    const roof = this.getRoof();

    if (roof) {
      const displayObject = HSApp.App.getApp().getActive3DView().displayList[roof.id];
      const choiceFaceName = typeof displayObject?.getChoiceFaceName === 'function' 
        ? displayObject.getChoiceFaceName() 
        : null;

      if (choiceFaceName) {
        data.push(...this._faceMaterialHanler.getPropertyItems(roof, choiceFaceName));
      } else {
        data.push(...this._generateByRoof(roof));
      }
    } else {
      this.clearData();
    }
  }

  generatePropertyByRoof(roof: Roof): PropertyBarItem[] {
    return this._generateByRoof(roof);
  }

  generatePropertyByRoofRegion(roofRegion: RoofRegion): PropertyBarItem[] {
    return this._generateByRoofRegion(roofRegion);
  }

  clearData(): void {
    this._roofFacesMaterialHandler.clearData();
  }

  private _generateByRoofRegion(roofRegion: RoofRegion): PropertyBarItem[] {
    const items: PropertyBarItem[] = [];

    items.push({
      id: `propertybar-${roofRegion.id}`,
      type: HSFPConstants.PropertyBarType.PropertyBar,
      label: ResourceManager.getString("plugin_right_propertybar_roof_setting"),
      enableDetailsInfo: false
    });

    items.push(this._getRoofTypeSettingPropertyBarItems(roofRegion.roof, roofRegion));

    if (roofRegion.roof) {
      items.push(this._roofFacesMaterialHandler.getStylePropertyBarItems(roofRegion.roof));
    }

    return items;
  }

  private _generateByRoof(roof: Roof): PropertyBarItem[] {
    const items: PropertyBarItem[] = [];

    items.push({
      id: `propertybar-${roof.id}`,
      type: HSFPConstants.PropertyBarType.PropertyBar,
      label: ResourceManager.getString("plugin_right_propertybar_roof_setting"),
      enableDetailsInfo: false
    });

    items.push(this._getRoofTypeSettingPropertyBarItems(roof));
    items.push(this._roofFacesMaterialHandler.getStylePropertyBarItems(roof));

    return items;
  }

  private _getRoofTypeSettingPropertyBarItems(roof?: Roof, roofRegion?: RoofRegion): PropertyBarItem {
    const firstLevelNode: PropertyBarItem = {
      id: "parameter-setting-first-level",
      label: ResourceManager.getString("plugin_propertybar_parameter_setting"),
      type: HSFPConstants.PropertyBarType.FirstLevelNode,
      items: [],
      order: 1,
      className: "parameter-setting-first-level"
    };

    const secondLevelNode: PropertyBarItem = {
      id: "parameter-setting-second-level-types",
      label: ResourceManager.getString("plugin_right_propertybar_roof_type"),
      type: HSFPConstants.PropertyBarType.SecondLevelNode,
      parentId: firstLevelNode.id,
      items: []
    };

    secondLevelNode.items!.push(this._getRoofTypes(secondLevelNode.id, roof, roofRegion));

    if (roof) {
      const thirdLevelNode: PropertyBarItem = {
        id: "parameter-setting-second-level-params",
        label: ResourceManager.getString("plugin_right_propertybar_roof_parameters"),
        type: HSFPConstants.PropertyBarType.ThirdLevelNode,
        parentId: secondLevelNode.id,
        items: []
      };

      secondLevelNode.items!.push(thirdLevelNode);

      if (roof.parameters.propertytree) {
        thirdLevelNode.items!.push(...this._parseTree(roof, thirdLevelNode.id));
      }
    }

    firstLevelNode.items!.push(secondLevelNode);
    return firstLevelNode;
  }

  private _getRoofTypes(parentId: string, roof?: Roof, roofRegion?: RoofRegion): PropertyBarItem {
    const roofMetaList = HSApp.App.getApp()
      .pluginManager
      .getPlugin(HSFPConstants.PluginType.ParametricRoof)
      .handler
      .getResource().roofMetaList;

    return {
      id: "roof-type-list",
      parentId,
      getRenderItem: () => {
        return React.createElement(require('./RoofTypeList').default, {
          data: roofMetaList,
          roofRegion,
          roof
        });
      }
    };
  }

  private _createComplexAngleItem(
    angleNodes: RoofParamNode[], 
    roof: Roof, 
    parentId: string
  ): PropertyBarItem | undefined {
    if (angleNodes.length === 0) {
      return undefined;
    }

    const firstNode = angleNodes[0];
    const itemId = `parameter-setting-item-${firstNode.reactKey}`;
    const allSameValue = angleNodes.every(node => node.value === firstNode.value);
    
    const nodeData = {
      value: allSameValue ? firstNode.value : "-",
      minMax: firstNode.minMax
    };

    const originalValue = nodeData.value;

    return {
      id: itemId,
      parentId,
      getRenderItem: () => {
        return React.createElement(require('./AngleInput').default, {
          data: {
            node: nodeData,
            onValueChange: (newValue: number | string) => {
              if (typeof newValue === 'number') {
                if (!isNaN(newValue) && newValue !== originalValue) {
                  this.onValueChange(roof, angleNodes.map(node => ({
                    name: node.name,
                    value: newValue,
                    oldValue: node.value
                  })));
                }
              } else if (typeof newValue === 'string') {
                const parsedValue = parseFloat(newValue);
                if (!isNaN(parsedValue) && newValue !== originalValue) {
                  this.onValueChange(roof, angleNodes.map(node => ({
                    name: node.name,
                    value: parsedValue,
                    oldValue: node.value
                  })));
                }
              }
            }
          }
        });
      }
    };
  }

  private _parseTree(roof: Roof, parentId: string): PropertyBarItem[] {
    const paramNodes = HSCore.Util.Roof.getRoofParamNodes(roof);
    const items: PropertyBarItem[] = [];
    
    const angleNodes = paramNodes.filter(node => node.name.startsWith("angle"));

    if (angleNodes.length > 1 && !angleNodes.some(node => node.name === "angle")) {
      const complexAngleItem = this._createComplexAngleItem(angleNodes, roof, parentId);
      if (complexAngleItem) {
        items.push(complexAngleItem);
      }
    }

    paramNodes.forEach(node => {
      const item = this._createItem(node, roof, parentId);
      if (item) {
        items.push(item);
      }
    });

    return items;
  }

  private _createItem(node: RoofParamNode, roof: Roof, parentId: string): PropertyBarItem | undefined {
    const itemId = `parameter-setting-item-${node.reactKey}`;

    if (node.name.startsWith("angle")) {
      if (node.name === "angle") {
        const originalValue = node.value;
        return {
          id: itemId,
          parentId,
          getRenderItem: () => {
            return React.createElement(require('./AngleInput').default, {
              data: {
                node,
                onValueChange: (newValue: number | string) => {
                  if (newValue !== originalValue) {
                    this.onValueChange(roof, [{
                      name: node.name,
                      value: newValue,
                      oldValue: originalValue
                    }]);
                  }
                }
              }
            });
          }
        };
      }
    } else if (node.name === "thickness") {
      const unitParam = this.getUnitParam();
      const displayValue = parseFloat((0.001 * (node.value as number) * unitParam).toFixed(2));
      const minMaxArray = node.minMax?.map(val => (0.001 * val * unitParam).toFixed(2)) ?? [];
      const minValue = parseFloat(minMaxArray[0]);
      const maxValue = parseFloat(minMaxArray[1]);

      return {
        id: itemId,
        parentId,
        type: HSFPConstants.PropertyBarType.DropdownInput,
        data: {
          className: "property-bar-roof-thickness-input",
          title: this.getShowNameByNode(node),
          defaultValue: displayValue,
          editable: true,
          suffix: HSApp.App.getApp().floorplan.displayLengthUnit,
          options: this.getThicknessOptions(unitParam),
          validOptions: {
            checkValid: (value: string) => {
              const numValue = parseFloat(value);
              return !isNaN(numValue) && numValue >= minValue && numValue <= maxValue;
            },
            errorTip: `${minValue} ~ ${maxValue}`
          },
          onChange: (newValue: string) => {
            const numValue = parseFloat(newValue);
            if (!isNaN(numValue) && numValue !== displayValue) {
              const oldValueInMM = displayValue / unitParam * 1000;
              const newValueInMM = numValue / unitParam * 1000;

              HSApp.Util.EventTrack.instance().track(
                HSApp.Util.EventGroupEnum.Roof,
                "propertybar_thickness_adjust_event",
                {
                  IF_env: HSApp.App.getApp().activeEnvironmentId,
                  value: newValueInMM
                }
              );

              this.onValueChange(roof, [{
                name: node.name,
                value: newValueInMM,
                oldValue: oldValueInMM
              }]);
            }
          }
        }
      };
    } else if (node.type === PropertyType.FLOAT) {
      const app = HSApp.App.getApp();
      const minMaxInMeters = node.minMax?.map(val => 0.001 * val) ?? [];
      const valueInMeters = 0.001 * (node.value as number);

      return {
        id: itemId,
        type: HSFPConstants.PropertyBarType.LengthInput,
        parentId,
        data: {
          className: "property-bar-roof-normal-input",
          label: this.getShowNameByNode(node),
          value: valueInMeters,
          options: {
            displayDigits: app.floorplan.displayLengthPrecisionDigits,
            rules: {
              range: {
                min: minMaxInMeters[0],
                max: minMaxInMeters[1]
              },
              positiveOnly: true
            },
            includeUnit: true,
            readOnly: false
          },
          onValueChange: (event: { detail: { value: number } }) => {
            if (event.detail.value !== valueInMeters) {
              HSApp.Util.EventTrack.instance().track(
                HSApp.Util.EventGroupEnum.Roof,
                "propertybar_offset_adjust_event",
                {
                  IF_env: HSApp.App.getApp().activeEnvironmentId,
                  value: 1000 * event.detail.value
                }
              );

              this.onValueChange(roof, [{
                name: node.name,
                value: 1000 * event.detail.value,
                oldValue: 1000 * valueInMeters
              }]);
            }
          }
        }
      };
    }

    return undefined;
  }

  onValueChange(roof: Roof | undefined, changes: ParamChange[]): void {
    const commandManager = HSApp.App.getApp().cmdManager;

    if (roof) {
      const command = commandManager.createCommand(
        HSFPConstants.CommandType.ChangeRoofParam,
        [roof, changes]
      );
      commandManager.execute(command);
    }
  }

  private getRoof(): Roof | null {
    return (window as any).default?.getRoof() ?? null;
  }

  private getUnitParam(): number {
    return (require('./utils') as any).getUnitParam();
  }

  private getShowNameByNode(node: RoofParamNode): string {
    return (window as any).default?.getShowNameByNode(node) ?? node.name;
  }

  private getThicknessOptions(unitParam: number): any[] {
    return (window as any).default?.getThicknessOptions(unitParam) ?? [];
  }
}