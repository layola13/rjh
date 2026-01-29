import { fromUUID } from './uuid-utils';

interface UploadOptions {
  key: string;
  resName: string;
  contentType: string;
}

interface FileMetadata {
  meta: string;
  url: string;
}

interface ShareModelPayload {
  id: string;
  files: FileMetadata[];
  productType: string;
}

interface ContentData {
  seekId: string;
  x: number;
  y: number;
  z: number;
}

interface DisplayLayerChild {
  entity: HSCore.Model.PAssembly;
  node: THREE.Object3D;
}

declare const HSApp: any;
declare const HSCatalog: any;
declare const HSCore: any;
declare const THREE: any;
declare const NWTK: any;
declare const adskUser: { sid: string };

export function refreshThumbnail(modelId: string): void {
  const displayChildren: DisplayLayerChild[] = HSApp.App.getApp()
    .getActive3DView()
    .displayLayers.content.getAllChildren();

  displayChildren.forEach((displayChild: DisplayLayerChild) => {
    const entity = displayChild.entity;
    const customFurnitureTypes = HSCatalog.ContentTypeEnum.ext_CustomizedFurniture;

    let isCustomFurniture =
      entity instanceof HSCore.Model.PAssembly &&
      customFurnitureTypes.find((type: any) => entity.contentType.isTypeOf(type)) &&
      !(Object.values(entity.parents)[0] instanceof HSCore.Model.PContent);

    if (isCustomFurniture) {
      const uniqueParent = entity.getUniqueParent();
      isCustomFurniture = uniqueParent && uniqueParent instanceof HSCore.Model.Floorplan;
    }

    if (isCustomFurniture) {
      const objExporter = new HSApp.Ext.Threejs.OBJExport();
      collectMeshesRecursively(entity, objExporter, displayChildren);

      let contentDataList: ContentData[] | undefined;
      if (entity.contents) {
        contentDataList = Object.values(entity.contents).map((content: any) => ({
          seekId: content.seekId,
          x: content.x,
          y: content.y,
          z: content.z,
        }));
      }

      objExporter.export((objData: string) => {
        return uploadThumbnailData(entity.seekId, objData, contentDataList);
      });
    }
  });
}

function collectMeshesRecursively(
  entity: any,
  exporter: any,
  displayChildren: DisplayLayerChild[]
): void {
  entity.forEachChild((childEntity: any) => {
    const displayChild = displayChildren.find(
      (item: DisplayLayerChild) => item.entity === childEntity
    );

    if (displayChild) {
      const node = displayChild.node;
      node.updateMatrixWorld(true);
      node.traverse((object: THREE.Object3D) => {
        if (object instanceof THREE.Mesh) {
          const clonedMesh = object.clone() as THREE.Mesh;
          clonedMesh.geometry = object.geometry.clone();
          clonedMesh.material = (object.material as THREE.Material).clone();
          exporter.addMesh(clonedMesh, node.matrix);
        }
      });
    }

    collectMeshesRecursively(childEntity, exporter, displayChildren);
  });
}

function uploadThumbnailData(
  seekId: string,
  objData: string,
  contentData?: ContentData[]
): Promise<void> {
  const objBlob = new Blob([objData], {
    type: `text/plain;charset=${document.characterSet}`,
  });
  const jsonString = JSON.stringify(contentData);
  const uuidString = fromUUID(seekId);

  const uploadPromises: Promise<string>[] = [];

  uploadPromises.push(
    uploadFile(objBlob, {
      key: 'thumb',
      resName: `${uuidString}.obj`,
      contentType: 'text/plain',
    })
  );

  uploadPromises.push(
    uploadFile(jsonString, {
      key: 'thumb',
      resName: `${uuidString}.json`,
      contentType: 'application/json',
    })
  );

  return Promise.all(uploadPromises).then((uploadedUrls: string[]) => {
    if (uploadedUrls && uploadedUrls.length > 0) {
      const files: FileMetadata[] = [
        {
          meta: 'obj',
          url: uploadedUrls[0],
        },
      ];

      if (uploadedUrls.length > 1) {
        files.push({
          meta: 'cabinet',
          url: uploadedUrls[1],
        });
      }

      return shareModelToServer('http://123.56.5.77:30001', {
        id: seekId,
        files: files,
        productType: '3D',
      }).then(() => {});
    }
  });
}

function uploadFile(
  fileData: Blob | string,
  options: UploadOptions
): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!adskUser.sid) {
      reject(new Error('User session ID not available'));
      return;
    }

    HSApp.Io.Request.Render.uploadFile(fileData, options)
      .then((url: string) => {
        resolve(url);
      })
      .catch((error: Error) => {
        reject(error);
      });
  });
}

function shareModelToServer(
  baseUrl: string,
  payload: ShareModelPayload
): Promise<any> {
  const endpoint = `${baseUrl}/mw/product/shareModel/iso/ezhome?channel=cabinet`;

  return NWTK.ajax
    .post(endpoint, payload, {
      headers: {
        'X-SID': `Bearer ${adskUser.sid}`,
        'Content-Type': 'application/json',
      },
    })
    .then((response: any) => {
      return response;
    })
    .catch((error: Error) => {
      console.error('Share model failed:', error);
      throw error;
    });
}