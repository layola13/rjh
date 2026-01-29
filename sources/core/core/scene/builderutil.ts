interface ErrorInfo {
  errorStack: Error;
  description?: string;
  errorInfo?: unknown;
}

interface FaceMap extends Map<string, unknown> {}

interface ModelDocument {
  docMgr: {
    transManager: {
      activeRequest: unknown;
    };
  };
}

interface ModelEntity {
  doc: ModelDocument;
  faces: Record<string, unknown>;
  auxFaces: Record<string, unknown>;
  children: Record<string, unknown>;
  removeChild(id: string): void;
}

interface FaceContainer {
  faceMap: FaceMap;
}

interface BatchRequest {
  getActiveRequest(): unknown;
}

interface StateRequest {
  isRestoring: boolean;
}

declare const log: {
  error(message: string, source: string, flag?: boolean, info?: ErrorInfo): void;
  warning(message: string, source: string): void;
};

declare namespace HSCore.Model {
  class Face {
    getMaster(): unknown;
  }
}

export class BuilderUtil {
  static logError(
    source: string,
    message: string,
    error: Error | string,
    description?: string,
    errorInfo?: unknown
  ): void {
    log.error(message, source, true, {
      errorStack: error instanceof Error ? error : new Error(error),
      description,
      errorInfo
    });
  }

  static logWarning(source: string, message: string): void {
    log.warning(message, source);
  }

  static cleanFreeFaces(entity: ModelEntity, container: FaceContainer): void {
    const freeFaceIds: string[] = [];
    const faces = entity.faces;
    const auxFaces = entity.auxFaces;
    const faceMap = container.faceMap;

    for (const [faceId] of faceMap) {
      const face = faces[faceId] || auxFaces[faceId];
      if (!(face instanceof HSCore.Model.Face && face.getMaster())) {
        freeFaceIds.push(faceId);
      }
    }

    if (freeFaceIds.length > 0) {
      const updatedFaceMap = new Map(faceMap);
      freeFaceIds.forEach((faceId) => {
        console.error("清理了游离面");
        updatedFaceMap.delete(faceId);
        entity.removeChild(faceId);
      });
      container.faceMap = updatedFaceMap;
    }
  }

  static validateFaceMap(
    entity: ModelEntity,
    faceMap: FaceMap,
    context: string,
    operation: string
  ): void {
    const activeRequest = entity.doc.docMgr.transManager.activeRequest;
    const actualRequest = this.isBatchRequest(activeRequest)
      ? activeRequest.getActiveRequest()
      : activeRequest;

    if (this.isStateRequest(actualRequest) && actualRequest.isRestoring) {
      return;
    }

    const unmatchedRecords: Array<[string, unknown]> = [];
    faceMap.forEach((value, faceId) => {
      if (!entity.children[faceId]) {
        unmatchedRecords.push([faceId, value]);
      }
    });

    if (unmatchedRecords.length > 0) {
      log.error(
        `[faceMap] ${context}-${operation} postSet unmatchedRecords: ${JSON.stringify(unmatchedRecords)}`,
        "faceMap"
      );
    }
  }

  private static isBatchRequest(request: unknown): request is BatchRequest {
    return (
      typeof request === "object" &&
      request !== null &&
      "getActiveRequest" in request
    );
  }

  private static isStateRequest(request: unknown): request is StateRequest {
    return (
      typeof request === "object" &&
      request !== null &&
      "isRestoring" in request
    );
  }
}