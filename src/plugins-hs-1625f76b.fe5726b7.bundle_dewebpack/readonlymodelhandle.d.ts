/**
 * Readonly model handle for collaborative editing
 * Manages read-only state and user permission changes in the editor
 */

import { HSCore } from './635589';
import { HSApp } from './518193';
import { callModelChange } from './212807';
import { lockState } from './295544';
import { ModelHandle } from './280387';

/**
 * Design initialization parameters
 */
interface DesignInitParams {
  /** Unique identifier for the design */
  designId: string;
  /** Current operator/editor username, if any */
  operator?: string;
  /** Management/admin username for permission requests */
  management?: string;
}

/**
 * Callback functions for design operations
 */
interface DesignCallbacks {
  /** Function to reload/refresh the design */
  reloadDesign?: () => void;
}

/**
 * Initialization result
 */
interface InitResult {
  /** Whether to cancel the operation */
  cancel: boolean;
  /** Text to display in page header */
  pageHeaderText: string;
}

/**
 * Model change result state
 */
type ModelChangeState = 'change' | 'keep' | 'newDesign';

/**
 * Model change response
 */
interface ModelChangeResponse {
  /** Result state of the model change */
  state: ModelChangeState;
}

/**
 * User change event data
 */
interface UserChangeEvent {
  /** Design identifier */
  designId: string;
}

/**
 * Lock state response
 */
interface LockStateResponse {
  /** Current edit status/model */
  state: HSApp.EditStatus.ENUM_EDIT_MODEL;
  /** Current operator username, if any */
  operator?: string;
  /** Management/admin username */
  management?: string;
}

/**
 * Handles read-only mode for collaborative editing
 * Manages permission changes, lock states, and user notifications
 */
export class ReadonlyModelHandle extends ModelHandle {
  /** Signal hook for event listening */
  private signalHook: HSCore.Util.SignalHook;
  
  /** Whether user can change to edit mode */
  private canChangeToEdit: boolean;
  
  /** Current design identifier */
  private designId?: string;
  
  /** Callback to reload the design */
  private reloadDesign?: () => void;
  
  /** Whether to send heartbeat signals */
  private isHeartbeat: boolean;
  
  /** Flag to temporarily ignore heartbeat checks */
  private ignoreHeartbeat: boolean;

  constructor() {
    super();
    this.isHeartbeat = true;
    this.canChangeToEdit = false;
    this.ignoreHeartbeat = false;
    this.signalHook = new HSCore.Util.SignalHook();
    this.onUserChange = this.onUserChange.bind(this);
  }

  /**
   * Initialize the readonly model handle
   * Sets up event listeners and displays appropriate notifications
   * 
   * @param params - Design initialization parameters
   * @param callbacks - Callback functions for design operations
   * @returns Initialization result with cancel flag and header text
   */
  init(params: DesignInitParams, callbacks: DesignCallbacks): InitResult {
    this.canChangeToEdit = false;
    this.designId = params.designId;
    this.reloadDesign = callbacks.reloadDesign;

    if (params.operator) {
      // Design is locked by another editor
      this.signalHook.unlistenAll();
      this.signalHook.listen(
        HSApp.App.getApp().signalDocumentOpened,
        () => {
          setTimeout(() => {
            const title = ResourceManager.getString(
              'plugin_collaborate_edit_to_readonly_title'
            ).replace(/{editor}/g, params.operator!);
            
            LiveHint.show(title, undefined, undefined, {
              status: LiveHint.statusEnum.canops,
              canclose: true
            });
          }, 500);
          
          this.signalHook.unlistenAll();
        }
      );
    } else {
      // User has viewer-only permissions
      this.signalHook.unlistenAll();
      this.signalHook.listen(
        HSApp.App.getApp().signalDocumentOpened,
        () => {
          setTimeout(() => {
            const title = ResourceManager.getString(
              'plugin_collaborate_edit_to_viewer_title'
            );
            
            LiveHint.show(title, undefined, undefined, {
              status: LiveHint.statusEnum.canops,
              canclose: true
            });
          }, 500);
          
          this.signalHook.unlistenAll();
        }
      );
    }

    return {
      cancel: false,
      pageHeaderText: params.operator
        ? ResourceManager.getString('plugin_collaborate_edit_design_lock')
        : ResourceManager.getString('pageHeader_readonly_btn')
    };
  }

  /**
   * Handle user change events (e.g., permission or lock state changes)
   * Checks lock state and prompts user for action based on new state
   * 
   * @param event - User change event data
   */
  onUserChange(event: UserChangeEvent): void {
    this.ignoreHeartbeat = true;
    
    lockState({
      designId: event.designId,
      lock: false
    }).then((response: LockStateResponse) => {
      if (response.state === HSApp.EditStatus.ENUM_EDIT_MODEL.EDIT) {
        // Design is now editable
        const title = ResourceManager.getString('plugin_collaborate_edit_model_change');
        const content = ResourceManager.getString('plugin_collaborate_edit_to_edit');
        const okButtonContent = ResourceManager.getString('plugin_collaborate_edit_edit_design');
        const cancelButtonContent = ResourceManager.getString('plugin_collaborate_edit_keep');
        
        callModelChange({
          title,
          content,
          okButtonContent,
          cancelButtonContent
        }).then((result) => {
          if (result.state === 'ok') {
            this.reloadDesign?.();
          }
          this.ignoreHeartbeat = false;
        });
      } else if (response.state === HSApp.EditStatus.ENUM_EDIT_MODEL.READONLY) {
        // Design remains readonly
        this.readonlyTitle(response).then(() => {
          this.ignoreHeartbeat = false;
        });
      }
    });
  }

  /**
   * Display readonly notification based on lock state
   * Shows different messages for locked designs vs. no permission
   * 
   * @param response - Lock state response data
   * @returns Promise resolving when user dismisses the dialog
   */
  private async readonlyTitle(response: LockStateResponse): Promise<void> {
    if (!response.operator) {
      // No permission to edit
      const title = ResourceManager.getString('plugin_collaborate_edit_apply_permission');
      const content = ResourceManager.getString(
        'plugin_collaborate_edit_to_readonly_error'
      ).replace(/{admin}/g, response.management ?? '');
      const okButtonContent = ResourceManager.getString('plugin_collaborate_edit_know');
      
      return callModelChange({
        title,
        content,
        okButtonContent
      });
    }

    // Design is locked by another user
    const title = ResourceManager.getString('plugin_collaborate_edit_design_lock_title');
    const content = ResourceManager.getString(
      'plugin_collaborate_edit_to_edit_error'
    ).replace(/{editor}/g, response.operator ?? '');
    const okButtonContent = ResourceManager.getString('plugin_collaborate_edit_know');
    
    return callModelChange({
      title,
      content,
      okButtonContent
    });
  }

  /**
   * Initialize state transition handlers for different edit modes
   * Returns a map of handlers for transitioning between edit states
   * 
   * @returns Map of edit mode handlers
   */
  initChangeToMap(): Record<
    HSApp.EditStatus.ENUM_EDIT_MODEL,
    (response: LockStateResponse) => Promise<ModelChangeResponse>
  > {
    this.canChangeToEdit = false;

    return {
      // Transition to EDIT mode
      [HSApp.EditStatus.ENUM_EDIT_MODEL.EDIT]: async (
        response: LockStateResponse
      ): Promise<ModelChangeResponse> => {
        const title = ResourceManager.getString('plugin_collaborate_edit_model_change');
        const content = ResourceManager.getString('plugin_collaborate_edit_to_edit');
        const okButtonContent = ResourceManager.getString('plugin_collaborate_edit_edit_design');
        const cancelButtonContent = ResourceManager.getString('plugin_collaborate_edit_keep');

        const result = await callModelChange({
          title,
          content,
          okButtonContent,
          cancelButtonContent
        });

        if (result.state === 'ok') {
          const lockResponse = await lockState({
            designId: response.designId,
            lock: true
          });

          if (lockResponse.state === HSApp.EditStatus.ENUM_EDIT_MODEL.EDIT) {
            return { state: 'change' };
          } else if (lockResponse.state === HSApp.EditStatus.ENUM_EDIT_MODEL.READONLY) {
            await this.readonlyTitle(lockResponse);
            return { state: 'keep' };
          }
          
          return { state: 'keep' };
        } else if (result.state === 'cancel') {
          this.canChangeToEdit = true;
          return { state: 'keep' };
        }
        
        return { state: 'change' };
      },

      // Transition to VIEWER mode
      [HSApp.EditStatus.ENUM_EDIT_MODEL.VIEWER]: async (
        response: LockStateResponse
      ): Promise<ModelChangeResponse> => {
        const title = ResourceManager.getString('plugin_collaborate_edit_permission_change');
        const content = ResourceManager.getString(
          'plugin_collaborate_edit_to_viewer'
        ).replace(/{admin}/g, response.management ?? '');
        const okButtonContent = ResourceManager.getString('plugin_collaborate_edit_goto_readonly');
        const cancelButtonContent = ResourceManager.getString('plugin_collaborate_edit_new_design');

        const result = await callModelChange({
          title,
          content,
          okButtonContent,
          cancelButtonContent
        });

        if (result.state === 'ok') {
          return { state: 'change' };
        } else if (result.state === 'cancel') {
          return { state: 'newDesign' };
        }
        
        return { state: 'change' };
      },

      // Transition to NO_PERMISSION mode
      [HSApp.EditStatus.ENUM_EDIT_MODEL.NO_PERMISSION]: async (
        response: LockStateResponse
      ): Promise<ModelChangeResponse> => {
        const title = ResourceManager.getString('plugin_collaborate_edit_permission_change');
        const content = ResourceManager.getString(
          'plugin_collaborate_edit_to_no_permission'
        ).replace(/{admin}/g, response.management ?? '');
        const okButtonContent = ResourceManager.getString('plugin_collaborate_edit_new_design');

        await callModelChange({
          title,
          content,
          okButtonContent
        });

        return { state: 'newDesign' };
      }
    };
  }
}