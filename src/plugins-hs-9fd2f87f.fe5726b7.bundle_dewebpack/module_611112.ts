import { HSApp } from './HSApp';
import { HSFPConstants } from './HSFPConstants';
import { HSCore } from './HSCore';
import { HSCatalog } from './HSCatalog';
import { HSConstants } from './HSConstants';

export default class DuplicateCommand extends HSApp.Cmd.Command {
    private _userinputPlugin: any;
    private _isComplete: boolean;

    constructor(manager: any) {
        super(manager);
        this._userinputPlugin = HSApp.App.getApp().pluginManager.getPlugin(HSFPConstants.PluginType.UserInput);
        this._isComplete = true;
    }

    onExecute(): void {
        const selectedItems = HSApp.Selection.Manager.selected();
        
        if (this._isValid(selectedItems)) {
            const manager = this.mgr;
            let isCyclicExecutive = false;

            if (selectedItems.length === 1) {
                const item = selectedItems[0];
                const isTubeLampContent = item instanceof HSCore.Model.Content && 
                    item.contentType.isTypeOf(HSCatalog.ContentTypeEnum.ext_tubeLamp);
                const isDoor = item instanceof HSCore.Model.Door;
                const isWindow = item instanceof HSCore.Model.Window;
                const isCornerWindow = item instanceof HSCore.Model.CornerWindow;
                const isParametricOpening = item instanceof HSCore.Model.ParametricOpening;

                if (isTubeLampContent || isDoor || isWindow || isCornerWindow || isParametricOpening) {
                    isCyclicExecutive = true;
                }
            }

            const commandOptions = {
                ignoreSnapOffset: true,
                cyclicExecutive: isCyclicExecutive,
                completeSequenceOnCancel: isCyclicExecutive
            };

            const duplicateCommand = manager.createCommand(
                HSFPConstants.CommandType.DuplicateSequence,
                [selectedItems, this._userinputPlugin, commandOptions]
            );

            manager.execute(duplicateCommand);
            this.mgr.complete(this);
        } else {
            this.mgr.cancel(this);
        }
    }

    private _isValid(items: any[]): boolean {
        if (!items || items.length === 0) {
            return false;
        }

        return items.every((item) => {
            return item.instanceOf(HSConstants.ModelClass.NgContent) ||
                   item.instanceOf(HSConstants.ModelClass.NgSoftCloth) ||
                   item.instanceOf(HSConstants.ModelClass.NgGroup);
        });
    }

    canUndoRedo(): boolean {
        return false;
    }

    canSuspend(): boolean {
        return false;
    }

    getDescription(): string {
        return "复制物品";
    }

    getCategory(): string {
        return HSFPConstants.LogGroupTypes.ContentOperation;
    }
}