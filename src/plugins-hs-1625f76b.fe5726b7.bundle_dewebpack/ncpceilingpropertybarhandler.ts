interface PropertyTreeNode {
  type?: string;
  title?: string;
  reactKey: string;
  level?: number;
  children?: PropertyTreeNode[];
  friendlyName?: string;
  value?: any;
  readonly?: boolean;
  limitType?: string;
  minMax?: [number, number];
  options?: string[];
  step?: number;
  boolInputData?: {
    value: boolean;
    [key: string]: any;
  };
}

interface Entity {
  parameters: {
    propertytree: PropertyTreeNode;
    rotation?: number;
  };
}

interface PropertyBarItem {
  id?: string;
  type?: string;
  label?: string;
  uniqueKey?: boolean;
  data?: any;
  items?: PropertyBarItem[];
  status?: boolean;
  onStatusChange?: (status: boolean) => void;
  resetItem?: {
    onResetClick: () => void;
  };
  disableShow?: boolean;
  getRenderItem?: () => any;
}

interface DropdownOption {
  id: string;
  title: string;
}

interface CatalogPlugin {
  [key: string]: any;
}

interface CommandManager {
  createCommand(type: string, args: any[]): any;
  execute(command: any): void;
  receive(event: string, data: any): void;
  complete(): void;
}

interface PluginManager {
  getPlugin(type: string): CatalogPlugin;
}

interface SelectionManager {
  selected(includeAll?: boolean): Entity[];
}

interface App {
  pluginManager: PluginManager;
  cmdManager: CommandManager;
  selectionManager: SelectionManager;
}

declare const HSApp: {
  App: {
    getApp(): App;
  };
};

declare const HSFPConstants: {
  PluginType: {
    Catalog: string;
  };
  PropertyBarType: {
    PropertyBar: string;
    FirstLevelNode: string;
    SecondLevelNode: string;
    DropdownInput: string;
    LengthInput: string;
    Switch: string;
    CheckBlock: string;
  };
  CommandType: {
    NEditParametricCeiling: string;
  };
};

declare const PropertyBarControlTypeEnum: {
  sliderInput: string;
};

declare const ResourceManager: {
  getString(key: string): string;
};

const SCALE_FACTOR = 1000;
const ROTATION_STEP = 90;
const FULL_ROTATION = 360;
const ROTATE_TYPE_UUID = "ddc8aaa2-1b65-4321-8393-373b42f666db";

export class NCPCeilingPropertyBarHandler {
  private app: App;
  private catalogPlugin: CatalogPlugin;
  private cmdMgr: CommandManager;
  private entity?: Entity;

  constructor() {
    this.app = HSApp.App.getApp();
    this.catalogPlugin = this.app.pluginManager.getPlugin(HSFPConstants.PluginType.Catalog);
    this.cmdMgr = this.app.cmdManager;
  }

  public getPropertyBarItems(entity: Entity | null): PropertyBarItem[] {
    if (!entity) {
      return [];
    }
    this.entity = entity;
    const propertyTree = this.entity.parameters.propertytree;
    return this.hookPropertyItem(propertyTree);
  }

  private hookPropertyItem(tree: PropertyTreeNode): PropertyBarItem[] {
    const items: PropertyBarItem[] = [];
    const defaultTitle = ResourceManager.getString("plugin_parametric_ceiling_title");
    const rootItem: PropertyBarItem = {
      type: HSFPConstants.PropertyBarType.PropertyBar,
      label: tree?.title && tree.title !== "root" ? tree.title : defaultTitle
    };
    items.push(rootItem);

    if (tree) {
      const childItems = tree.children?.map(child => this.hookPropertyChildItem(child, tree)).flat() ?? [];
      items.push(...childItems);
    }

    return items;
  }

  private hookPropertyChildItem(node: PropertyTreeNode, parent: PropertyTreeNode): PropertyBarItem | PropertyBarItem[] | undefined {
    if (!node) {
      return undefined;
    }

    switch (node.type) {
      case "FLOAT":
        return this._hookPropertyFLOAT(node);
      case "INTEGER":
        return this._hookPropertyINTEGER(node);
      case "BOOLEAN":
        return this._hookPropertyBOOLEAN(node);
      case ROTATE_TYPE_UUID:
        return this._hookPropertyRotate(node);
      case "STRING":
        return this._hookPropertySTRING(node);
      case "label":
        return this._hookPropertyLabel(node);
      default:
        if (node.children) {
          if (node.level === 2) {
            return this._hookPropertyLevelTwo(node, parent);
          }
          if (node.level === 3) {
            return this._hookPropertyLevelThree(node, parent);
          }
        }
        return undefined;
    }
  }

  private _hookPropertyLevelTwo(node: PropertyTreeNode, parent: PropertyTreeNode): PropertyBarItem {
    const nodeIndex = parent.children?.findIndex(child => child.reactKey === node.reactKey) ?? -1;

    if (nodeIndex === 0 && parent.children?.length !== 0) {
      return {
        id: `parametric-backgroundwall-first-level-tab-${node.reactKey}`,
        label: ResourceManager.getString("plugin_propertybar_parameter_setting"),
        type: HSFPConstants.PropertyBarType.FirstLevelNode,
        items: node.children?.map(child => this.hookPropertyChildItem(child, parent)).filter(Boolean) as PropertyBarItem[]
      };
    }

    return {
      id: `parametric-backgroundwall-first-level-tab-${node.reactKey}`,
      label: nodeIndex === 1 ? ResourceManager.getString("plugin_propertybar_style_setting") : node.title,
      type: HSFPConstants.PropertyBarType.FirstLevelNode,
      items: node.children?.map(child => this.hookPropertyChildItem(child, parent)).filter(Boolean) as PropertyBarItem[]
    };
  }

  private _hookPropertyLevelThree(node: PropertyTreeNode, parent: PropertyTreeNode): PropertyBarItem {
    const baseItem: PropertyBarItem = {
      id: node.reactKey,
      label: node.title,
      type: HSFPConstants.PropertyBarType.SecondLevelNode,
      disableShow: node.children?.length === 0,
      resetItem: {
        onResetClick: this.onResetClick(node, parent)
      },
      items: node.children?.map(child => this.hookPropertyChildItem(child, parent)).filter(Boolean) as PropertyBarItem[]
    };

    if (node.boolInputData) {
      return {
        ...baseItem,
        status: node.boolInputData.value,
        onStatusChange: (status: boolean) => {
          const cmdManager = HSApp.App.getApp().cmdManager;
          const command = cmdManager.createCommand(HSFPConstants.CommandType.NEditParametricCeiling, [this.entity]);
          cmdManager.execute(command);
          cmdManager.receive("onBoolInputDataChange", {
            node: node.boolInputData,
            newValue: status
          });
          cmdManager.complete();
        }
      };
    }

    return baseItem;
  }

  private _setDropdownList(options: string[]): DropdownOption[] {
    const dropdownOptions: DropdownOption[] = [];
    for (const option of options) {
      dropdownOptions.push({
        id: option,
        title: option
      });
    }
    return dropdownOptions;
  }

  private _hookPropertyFLOAT(node: PropertyTreeNode): PropertyBarItem {
    switch (node.limitType) {
      case "INTERVAL":
      case "NONE":
        return {
          id: node.reactKey,
          type: PropertyBarControlTypeEnum.sliderInput,
          uniqueKey: true,
          data: {
            label: node.friendlyName,
            name: node.friendlyName,
            options: {
              rules: {
                range: {
                  min: (node.minMax?.[0] ?? 0) / SCALE_FACTOR,
                  max: (node.minMax?.[1] ?? SCALE_FACTOR) / SCALE_FACTOR
                }
              },
              includeUnit: true,
              readOnly: node.readonly
            },
            disabled: node.readonly,
            value: node.value / SCALE_FACTOR,
            onValueChangeEnd: (event: { detail: { value: number } }) => {
              const scaledValue = event.detail.value * SCALE_FACTOR;
              this.onValueChange(node, scaledValue);
            }
          }
        };

      case "OPTIONS":
        return {
          id: node.reactKey,
          type: HSFPConstants.PropertyBarType.DropdownInput,
          data: {
            title: node.friendlyName,
            defaultValue: `${node.value}`,
            editable: false,
            disabled: node.readonly,
            options: this._setDropdownList(node.options ?? []),
            onChange: (value: string) => {
              const numericValue = Number(value);
              this.onValueChange(node, numericValue);
            }
          }
        };

      case "INCREMENT":
        return {
          id: node.reactKey,
          type: HSFPConstants.PropertyBarType.LengthInput,
          data: {
            name: node.friendlyName,
            label: node.friendlyName,
            value: node.value / SCALE_FACTOR,
            disabled: node.readonly,
            lengthStep: node.step ?? 1,
            options: {
              rules: {
                range: {
                  min: (node.minMax?.[0] ?? 0) / SCALE_FACTOR,
                  max: (node.minMax?.[1] ?? SCALE_FACTOR) / SCALE_FACTOR
                }
              },
              includeUnit: false,
              displayDigits: 0,
              readOnly: node.readonly
            },
            onValueChange: (event: { detail: { value: number } }) => {
              const scaledValue = event.detail.value * SCALE_FACTOR;
              this.onValueChange(node, scaledValue);
            }
          }
        };

      case "FIXED":
        return {
          id: node.reactKey,
          type: PropertyBarControlTypeEnum.sliderInput,
          uniqueKey: true,
          data: {
            label: node.friendlyName,
            name: node.friendlyName,
            options: {
              rules: {
                range: {
                  min: (node.minMax?.[0] ?? 0) / SCALE_FACTOR,
                  max: (node.minMax?.[1] ?? SCALE_FACTOR) / SCALE_FACTOR
                }
              },
              includeUnit: true,
              readOnly: true
            },
            disabled: true,
            value: node.value / SCALE_FACTOR,
            onValueChangeEnd: (event: { detail: { value: number } }) => {
              const scaledValue = event.detail.value * SCALE_FACTOR;
              this.onValueChange(node, scaledValue);
            }
          }
        };

      default:
        return {};
    }
  }

  private _hookPropertyINTEGER(node: PropertyTreeNode): PropertyBarItem {
    switch (node.limitType) {
      case "OPTIONS":
        return {
          id: node.reactKey,
          type: HSFPConstants.PropertyBarType.DropdownInput,
          data: {
            title: node.friendlyName,
            defaultValue: `${node.value}`,
            editable: false,
            disabled: node.readonly,
            options: this._setDropdownList(node.options ?? []),
            onChange: (value: string) => {
              const numericValue = Number(value);
              this.onValueChange(node, numericValue);
            }
          }
        };

      case "INTERVAL":
      case "NONE":
        return {
          id: node.reactKey,
          type: HSFPConstants.PropertyBarType.LengthInput,
          data: {
            name: node.friendlyName,
            label: node.friendlyName,
            value: node.value / SCALE_FACTOR,
            disabled: node.readonly,
            options: {
              rules: {
                range: {
                  min: (node.minMax?.[0] ?? 0) / SCALE_FACTOR,
                  max: (node.minMax?.[1] ?? SCALE_FACTOR) / SCALE_FACTOR
                }
              },
              includeUnit: false,
              displayDigits: 0,
              readOnly: node.readonly
            },
            onValueChange: (event: { detail: { value: number } }) => {
              const scaledValue = event.detail.value * SCALE_FACTOR;
              this.onValueChange(node, scaledValue);
            }
          }
        };

      case "INCREMENT":
        return {
          id: node.reactKey,
          type: HSFPConstants.PropertyBarType.LengthInput,
          data: {
            name: node.friendlyName,
            label: node.friendlyName,
            value: node.value / SCALE_FACTOR,
            disabled: node.readonly,
            lengthStep: node.step ?? 1,
            options: {
              rules: {
                range: {
                  min: (node.minMax?.[0] ?? 0) / SCALE_FACTOR,
                  max: (node.minMax?.[1] ?? SCALE_FACTOR) / SCALE_FACTOR
                }
              },
              includeUnit: false,
              displayDigits: 0,
              readOnly: node.readonly
            },
            onValueChange: (event: { detail: { value: number } }) => {
              const scaledValue = event.detail.value * SCALE_FACTOR;
              this.onValueChange(node, scaledValue);
            }
          }
        };

      case "FIXED":
        return {
          id: node.reactKey,
          type: HSFPConstants.PropertyBarType.LengthInput,
          data: {
            name: node.friendlyName,
            label: node.friendlyName,
            value: node.value / SCALE_FACTOR,
            disabled: true,
            options: {
              rules: {
                range: {
                  min: (node.minMax?.[0] ?? 0) / SCALE_FACTOR,
                  max: (node.minMax?.[1] ?? SCALE_FACTOR) / SCALE_FACTOR
                }
              },
              includeUnit: false,
              displayDigits: 0,
              readOnly: true
            },
            onValueChange: (event: { detail: { value: number } }) => {
              const scaledValue = event.detail.value * SCALE_FACTOR;
              this.onValueChange(node, scaledValue);
            }
          }
        };

      default:
        return {};
    }
  }

  private _hookPropertyBOOLEAN(node: PropertyTreeNode): PropertyBarItem {
    switch (node.limitType) {
      case "NONE":
        return {
          id: node.reactKey,
          type: HSFPConstants.PropertyBarType.Switch,
          data: {
            label: node.friendlyName,
            name: node.friendlyName,
            checked: node.value,
            disabled: node.readonly,
            onChange: (value: boolean) => {
              this.onValueChange(node, value);
            }
          }
        };

      case "FIXED":
        return {
          id: node.reactKey,
          type: HSFPConstants.PropertyBarType.Switch,
          data: {
            label: node.friendlyName,
            name: node.friendlyName,
            checked: node.value,
            disabled: true,
            onChange: (value: boolean) => {
              this.onValueChange(node, value);
            }
          }
        };

      default:
        return {};
    }
  }

  private _hookPropertyRotate(node: PropertyTreeNode): PropertyBarItem {
    return {
      id: node.reactKey,
      type: HSFPConstants.PropertyBarType.CheckBlock,
      data: {
        label: ResourceManager.getString("plugin_ceiling_make_grid_property_rotate"),
        blocks: [
          {
            icon: "hs_shuxingmianban_xuanzhuan90",
            checked: undefined
          }
        ],
        onChange: () => {
          const app = HSApp.App.getApp();
          const selectedEntity = app.selectionManager.selected(true)[0];
          const currentRotation = selectedEntity.parameters.rotation ?? 0;
          const newRotation = currentRotation + ROTATION_STEP === FULL_ROTATION ? 0 : currentRotation + ROTATION_STEP;
          const cmdManager = app.cmdManager;
          const command = cmdManager.createCommand(HSFPConstants.CommandType.NEditParametricCeiling, [selectedEntity]);
          cmdManager.execute(command);
          cmdManager.receive("rotationchangeend", {
            node,
            newValue: newRotation
          });
          cmdManager.complete();
        },
        disabled: node.readonly
      }
    };
  }

  private _hookPropertySTRING(node: PropertyTreeNode): PropertyBarItem {
    switch (node.limitType) {
      case "OPTIONS":
        return {
          id: node.reactKey,
          type: HSFPConstants.PropertyBarType.DropdownInput,
          data: {
            title: node.friendlyName,
            defaultValue: node.value,
            editable: false,
            disabled: node.readonly,
            options: this._setDropdownList(node.options ?? []),
            onChange: (value: string) => {
              this.onValueChange(node, value);
            }
          }
        };

      case "FIXED":
        return {
          id: node.reactKey,
          type: HSFPConstants.PropertyBarType.DropdownInput,
          data: {
            title: node.friendlyName,
            defaultValue: node.value,
            editable: false,
            disabled: true,
            options: this._setDropdownList([node.value]),
            onChange: (value: string) => {
              this.onValueChange(node, value);
            }
          }
        };

      default:
        return {};
    }
  }

  private _hookPropertyLabel(node: PropertyTreeNode): PropertyBarItem {
    return {
      id: `property-text-${node.reactKey}`,
      getRenderItem: () => {
        return node.value;
      }
    };
  }

  private onResetClick(node: PropertyTreeNode, parent: PropertyTreeNode): () => void {
    let hasRotateType = false;

    const checkForRotateType = (nodes: PropertyTreeNode[]): void => {
      for (const childNode of nodes) {
        if (childNode?.type === ROTATE_TYPE_UUID) {
          hasRotateType = true;
          break;
        }
        if (childNode?.children) {
          checkForRotateType(childNode.children);
        }
      }
    };

    checkForRotateType(parent.children ?? []);

    if (hasRotateType) {
      return () => {
        const selectedEntity = this.app.selectionManager.selected()[0];
        const cmdManager = HSApp.App.getApp().cmdManager;
        const command = cmdManager.createCommand(HSFPConstants.CommandType.NEditParametricCeiling, [selectedEntity]);
        cmdManager.execute(command);
        cmdManager.receive("ceilingResetIncludeRotate", { node });
        cmdManager.complete();
      };
    }

    return () => {
      const selectedEntity = this.app.selectionManager.selected()[0];
      const cmdManager = HSApp.App.getApp().cmdManager;
      const command = cmdManager.createCommand(HSFPConstants.CommandType.NEditParametricCeiling, [selectedEntity]);
      cmdManager.execute(command);
      cmdManager.receive("ceilingReset", { node });
      cmdManager.complete();
    };
  }

  private onValueChange(node: PropertyTreeNode, newValue: any): void {
    const cmdManager = HSApp.App.getApp().cmdManager;
    const command = cmdManager.createCommand(HSFPConstants.CommandType.NEditParametricCeiling, [this.entity]);
    cmdManager.execute(command);
    cmdManager.receive("ceilingchangeend", {
      node,
      newValue
    });
    cmdManager.complete();
  }
}