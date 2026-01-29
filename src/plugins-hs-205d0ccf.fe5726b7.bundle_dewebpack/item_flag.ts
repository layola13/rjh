const FLAG_EDIT_DUPLATE = 16;
const FLAG_EDIT_MIRROR = 32;
const FLAG_EDIT_HIDE = 256;
const FLAG_EDIT_RESET = 512;
const FLAG_EDIT_DELETE = 1024;
const FLAG_EDIT_EMPLETY_FURNITURE = 2048;
const FLAG_EDIT_EMPLETY_FLOORPLAN = 4096;

export const ITEM_FLAG = Object.freeze({
    FLAG_EDIT_REPLEASE: 1,
    FLAG_EDIT_CUT: 2,
    FLAG_EDIT_COPY: 4,
    FLAG_EDIT_PASTE: 8,
    FLAG_EDIT_DUPLATE: FLAG_EDIT_DUPLATE,
    FLAG_EDIT_MIRROR: FLAG_EDIT_MIRROR,
    FLAG_EDIT_GROUP: 64,
    FLAG_EDIT_UNGROUP: 128,
    FLAG_EDIT_HIDE: FLAG_EDIT_HIDE,
    FLAG_EDIT_RESET: FLAG_EDIT_RESET,
    FLAG_EDIT_DELETE: FLAG_EDIT_DELETE,
    FLAG_EDIT_EMPLETY_FURNITURE: FLAG_EDIT_EMPLETY_FURNITURE,
    FLAG_EDIT_EMPLETY_FLOORPLAN: FLAG_EDIT_EMPLETY_FLOORPLAN
});

const STATUS_FLAGS = Object.freeze({
    FLAG_STATUS_NONE_CONTENT_SELECT: 6144,
    FLAG_STATUS_COMMON_CONTENT_SELECT: 7999,
    FLAG_STATUS_DIY_CONTENT: 7999,
    FLAG_STATUS_WALL_CONTENT: 7424,
    FLAG_STATUS_OPENING_CONTENT: 7967,
    FLAG_STATUS_ROOM_CONTENT: 7168,
    FLAG_STATUS_CUSTOM_CONTENT: 7486,
    FLAG_STATUS_MULTISELECT: 7518,
    FLAG_STATUS_GROUP_SELECT: 7615,
    FLAG_STATUS_CORNER_WINDOW: 7967,
    FLAG_STATUS_WALL_FACE_SELECT: 7936,
    FLAG_STATUS_ROOM_FACE_SELECT: 7680,
    FLAG_STATUS_FP_CABINET: 1301
});

interface ToolbarItem {
    enable(): void;
    disable(): void;
}

interface Toolbar {
    _getItemOnDefaultToolbar(path: string): ToolbarItem | null;
}

interface Metadata {
    categories?: unknown[];
}

interface SelectableItem {
    metadata?: Metadata;
}

interface SelectionManager {
    selected(): SelectableItem[];
}

interface App {
    selectionManager: SelectionManager;
    activeEnvironmentId: string;
}

declare const HSApp: {
    App: {
        getApp(): App;
    };
};

declare const HSCore: {
    Model: {
        PAssembly: new (...args: any[]) => any;
        CornerWindow: new (...args: any[]) => any;
        Opening: new (...args: any[]) => any;
        Group: new (...args: any[]) => any;
        CustomizedModel: new (...args: any[]) => any;
    };
};

declare const HSFPConstants: {
    Environment: {
        Cabinet: string;
    };
};

/**
 * Toolbar status manager for handling edit operations
 */
export default class ToolbarStatusManager {
    /**
     * Updates toolbar status based on current selection
     */
    static updateToolbarStatus(toolbar: Toolbar): void {
        const app = HSApp.App.getApp();
        const editCase = ToolbarStatusManager.getEditCase(app);
        ToolbarStatusManager.updateStatues(toolbar, editCase);
    }

    /**
     * Determines the edit case based on current selection
     */
    static getEditCase(app: App): number {
        const selectedItems = app.selectionManager.selected();

        if (selectedItems.length > 1) {
            return STATUS_FLAGS.FLAG_STATUS_MULTISELECT;
        }

        if (selectedItems.length === 0) {
            return STATUS_FLAGS.FLAG_STATUS_NONE_CONTENT_SELECT;
        }

        const selectedItem = selectedItems[0];
        let statusFlag = 0;

        if (selectedItem instanceof HSCore.Model.PAssembly) {
            statusFlag = app.activeEnvironmentId.includes(HSFPConstants.Environment.Cabinet)
                ? FLAG_EDIT_DELETE
                : STATUS_FLAGS.FLAG_STATUS_FP_CABINET;
        } else if (selectedItem instanceof HSCore.Model.CornerWindow) {
            statusFlag = STATUS_FLAGS.FLAG_STATUS_CORNER_WINDOW;
        } else if (selectedItem instanceof HSCore.Model.Opening) {
            statusFlag = STATUS_FLAGS.FLAG_STATUS_OPENING_CONTENT;
        } else if (selectedItem instanceof HSCore.Model.Group) {
            statusFlag = STATUS_FLAGS.FLAG_STATUS_GROUP_SELECT;
        } else if (selectedItem instanceof HSCore.Model.CustomizedModel) {
            statusFlag = STATUS_FLAGS.FLAG_STATUS_DIY_CONTENT;
        } else {
            statusFlag = STATUS_FLAGS.FLAG_STATUS_COMMON_CONTENT_SELECT;
        }

        if (!selectedItem?.metadata?.categories || selectedItem.metadata.categories.length === 0) {
            statusFlag &= ~1;
        }

        return statusFlag;
    }

    /**
     * Updates toolbar item statuses based on flags
     */
    static updateStatues(toolbar: Toolbar, statusFlags: number = STATUS_FLAGS.FLAG_STATUS_NONE_CONTENT_SELECT): void {
        ToolbarStatusManager.setStatus(toolbar, 'toolBar_edit_replace', !!(statusFlags & 1));
        ToolbarStatusManager.setStatus(toolbar, 'toolBar_edit_copy', !!(statusFlags & 4));
        ToolbarStatusManager.setStatus(toolbar, 'toolBar_edit_cut', !!(statusFlags & 2));
        ToolbarStatusManager.setStatus(toolbar, 'toolBar_edit_flip', !!(statusFlags & FLAG_EDIT_MIRROR));
        ToolbarStatusManager.setStatus(toolbar, 'toolBar_edit_duplicate', !!(statusFlags & FLAG_EDIT_DUPLATE));
        ToolbarStatusManager.setStatus(toolbar, 'toolBar_edit_hide', !!(statusFlags & FLAG_EDIT_HIDE));
        ToolbarStatusManager.setStatus(toolbar, 'toolBar_edit_delete', !!(statusFlags & FLAG_EDIT_DELETE));
        ToolbarStatusManager.setStatus(toolbar, 'toolBar_edit_emptyFurniture', !!(statusFlags & FLAG_EDIT_EMPLETY_FURNITURE));
        ToolbarStatusManager.setStatus(toolbar, 'toolBar_edit_group', !!(statusFlags & 64));
        ToolbarStatusManager.setStatus(toolbar, 'toolBar_edit_ungroup', !!(statusFlags & 128));
    }

    /**
     * Enables or disables a specific toolbar item
     */
    static setStatus(toolbar: Toolbar, itemName: string, enabled: boolean): void {
        const item = toolbar._getItemOnDefaultToolbar(`toolBar_edit/${itemName}`);
        if (item) {
            enabled ? item.enable() : item.disable();
        }
    }
}