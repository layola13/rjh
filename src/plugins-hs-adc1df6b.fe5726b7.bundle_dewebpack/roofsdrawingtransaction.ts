interface TransactionSession {
  abort(): void;
  commit(): void;
  end(): void;
}

interface TransactionManager {
  startSession(options: SessionOptions): TransactionSession;
  canUndo(): boolean;
}

interface SessionOptions {
  maxUndoStep: number;
  toRequestFilter: (request: unknown) => boolean;
}

interface App {
  transManager: TransactionManager;
}

interface HSAppNamespace {
  App: {
    getApp(): App;
  };
  ExtraordinarySketch2d: {
    Request: {
      MoveFacesRequest: new (...args: any[]) => unknown;
    };
  };
}

declare const HSApp: HSAppNamespace;

import { DrawRectangleRequest } from './DrawRectangleRequest';
import { DrawPolygonsRequest } from './DrawPolygonsRequest';
import { MovePointRequest } from './MovePointRequest';
import { MoveCurveRequest } from './MoveCurveRequest';
import { UpdateRoofRelationRequest } from './UpdateRoofRelationRequest';
import { DeleteRoofRegionRequest } from './DeleteRoofRegionRequest';

/**
 * Transaction manager for roof drawing operations.
 * Manages undo/redo sessions and filters specific request types.
 */
export class RoofsDrawingTransaction {
  private _internalSession?: TransactionSession;

  /**
   * Enters a new transaction session with undo support.
   */
  enter(): void {
    const app = HSApp.App.getApp();
    this._internalSession = app.transManager.startSession({
      maxUndoStep: 100,
      toRequestFilter: this._sessionToRequestFilter.bind(this)
    });
  }

  /**
   * Aborts the current session and starts a new one.
   */
  recover(): void {
    this._internalSession?.abort();
    this.enter();
  }

  /**
   * Aborts the current transaction session.
   */
  abort(): void {
    this._internalSession?.abort();
  }

  /**
   * Exits the transaction session, committing if there are undoable actions.
   */
  exit(): void {
    if (HSApp.App.getApp().transManager.canUndo()) {
      this._internalSession!.commit();
    } else {
      this._internalSession!.end();
    }
    this._internalSession = undefined;
  }

  /**
   * Filters requests to exclude specific drawing and manipulation operations.
   * @param request - The request to filter
   * @returns false if the request should be excluded from the session
   */
  private _sessionToRequestFilter(request: unknown): boolean {
    return !(
      request instanceof DrawRectangleRequest ||
      request instanceof DrawPolygonsRequest ||
      request instanceof MovePointRequest ||
      request instanceof MoveCurveRequest ||
      request instanceof UpdateRoofRelationRequest ||
      request instanceof DeleteRoofRegionRequest ||
      request instanceof HSApp.ExtraordinarySketch2d.Request.MoveFacesRequest
    );
  }
}