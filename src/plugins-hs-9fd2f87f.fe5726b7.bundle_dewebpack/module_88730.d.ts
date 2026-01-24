/**
 * 3D模型缩略图刷新模块
 * 用于导出自定义家具的OBJ和元数据并上传生成缩略图
 */

/**
 * 文件上传配置选项
 */
interface UploadFileOptions {
  /** 上传资源的键名 */
  key: string;
  /** 资源文件名 */
  resName: string;
  /** MIME类型 */
  contentType: string;
}

/**
 * 共享模型文件元数据
 */
interface ShareModelFile {
  /** 元数据类型标识 */
  meta: 'obj' | 'cabinet';
  /** 文件访问URL */
  url: string;
}

/**
 * 共享模型请求参数
 */
interface ShareModelRequest {
  /** 模型唯一标识符 */
  id: string;
  /** 文件列表 */
  files: ShareModelFile[];
  /** 产品类型 */
  productType: '3D';
}

/**
 * 内容元数据（柜体组件信息）
 */
interface ContentMetadata {
  /** 内容的唯一标识 */
  seekId: string;
  /** X坐标 */
  x: number;
  /** Y坐标 */
  y: number;
  /** Z坐标 */
  z: number;
}

/**
 * 显示层节点信息
 */
interface DisplayLayerNode {
  /** 关联的实体对象 */
  entity: HSCore.Model.PAssembly;
  /** Three.js场景节点 */
  node: THREE.Object3D;
}

/**
 * 全局用户对象（来自Autodesk用户系统）
 */
declare const adskUser: {
  /** 会话ID令牌 */
  sid: string;
};

/**
 * 上传文件到服务器
 * @param data - 要上传的文件数据（Blob或JSON字符串）
 * @param options - 上传配置选项
 * @returns Promise，解析为文件访问URL
 */
function uploadFile(
  data: Blob | string,
  options: UploadFileOptions
): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    if (!adskUser.sid) {
      reject(new Error('User session ID is missing'));
      return;
    }

    HSApp.Io.Request.Render.uploadFile(data, options)
      .then((url: string) => {
        resolve(url);
      })
      .catch((error: Error) => {
        reject(error);
      });
  });
}

/**
 * 提交共享模型到服务器
 * @param baseUrl - API基础URL
 * @param payload - 共享模型请求数据
 * @returns Promise，解析为服务器响应
 */
function submitShareModel(
  baseUrl: string,
  payload: ShareModelRequest
): Promise<unknown> {
  const endpoint = `${baseUrl}/mw/product/shareModel/iso/ezhome?channel=cabinet`;

  return NWTK.ajax.post(endpoint, payload, {
    headers: {
      'X-SID': `Bearer ${adskUser.sid}`,
      'Content-Type': 'application/json'
    }
  })
    .then((response: unknown) => response)
    .catch((error: Error) => {
      // 静默处理错误
      console.error('Share model submission failed:', error);
    });
}

/**
 * 递归遍历实体子节点并将网格添加到OBJ导出器
 * @param entity - 要遍历的实体
 * @param exporter - OBJ导出器实例
 * @param displayNodes - 显示层节点映射表
 */
function traverseEntityAndExport(
  entity: HSCore.Model.PAssembly,
  exporter: HSApp.Ext.Threejs.OBJExport,
  displayNodes: DisplayLayerNode[]
): void {
  entity.forEachChild((childEntity: HSCore.Model.PAssembly) => {
    const displayNode = displayNodes.find(
      (node) => node.entity === childEntity
    );

    if (displayNode) {
      const sceneNode = displayNode.node;
      sceneNode.updateMatrixWorld(true);

      sceneNode.traverse((object: THREE.Object3D) => {
        if (object instanceof THREE.Mesh) {
          const clonedMesh = object.clone() as THREE.Mesh;
          clonedMesh.geometry = object.geometry.clone();
          clonedMesh.material = (object.material as THREE.Material).clone();
          exporter.addMesh(clonedMesh, sceneNode.matrix);
        }
      });
    }

    // 递归处理子实体
    traverseEntityAndExport(childEntity, exporter, displayNodes);
  });
}

/**
 * 上传模型数据（OBJ和元数据JSON）
 * @param modelId - 模型唯一标识符
 * @param objContent - OBJ文件内容
 * @param metadata - 柜体组件元数据（可选）
 * @returns Promise，完成所有上传和提交操作
 */
function uploadModelData(
  modelId: string,
  objContent: string,
  metadata?: ContentMetadata[]
): Promise<void> {
  const objBlob = new Blob([objContent], {
    type: `text/plain;charset=${document.characterSet}`
  });

  const metadataJson = JSON.stringify(metadata);
  const resourceId = a.fromUUID(modelId); // 从UUID工具模块转换ID

  const uploadPromises: Promise<string>[] = [];

  // 上传OBJ文件
  uploadPromises.push(
    uploadFile(objBlob, {
      key: 'thumb',
      resName: `${resourceId}.obj`,
      contentType: 'text/plain'
    })
  );

  // 上传元数据JSON
  uploadPromises.push(
    uploadFile(metadataJson, {
      key: 'thumb',
      resName: `${resourceId}.json`,
      contentType: 'application/json'
    })
  );

  return Promise.all(uploadPromises).then((urls: string[]) => {
    if (urls && urls.length > 0) {
      const files: ShareModelFile[] = [
        {
          meta: 'obj',
          url: urls[0]
        }
      ];

      if (urls.length > 1) {
        files.push({
          meta: 'cabinet',
          url: urls[1]
        });
      }

      // 提交到服务器生成缩略图
      return submitShareModel('http://123.56.5.77:30001', {
        id: modelId,
        files,
        productType: '3D'
      }).then(() => {
        // 完成
      });
    }
  });
}

/**
 * 刷新3D模型缩略图
 * 导出场景中所有自定义家具的OBJ模型和元数据，上传并生成缩略图
 * @param _unused - 未使用的参数（保留用于API兼容性）
 */
export function refreshThumbnail(_unused?: unknown): void {
  const activeView = HSApp.App.getApp().getActive3DView();
  const displayNodes: DisplayLayerNode[] = activeView.displayLayers.content.getAllChildren();

  const customFurnitureTypes = HSCatalog.ContentTypeEnum.ext_CustomizedFurniture;

  displayNodes.forEach((displayNode) => {
    const entity = displayNode.entity;

    // 检查是否为自定义家具类型
    const isCustomFurniture =
      entity instanceof HSCore.Model.PAssembly &&
      customFurnitureTypes.find((type: HSCatalog.ContentType) =>
        entity.contentType.isTypeOf(type)
      ) &&
      !(Object.values(entity.parents)[0] instanceof HSCore.Model.PContent);

    let shouldExport = isCustomFurniture;

    // 确保父级是Floorplan
    if (shouldExport) {
      const uniqueParent = entity.getUniqueParent();
      shouldExport = Boolean(
        uniqueParent && uniqueParent instanceof HSCore.Model.Floorplan
      );
    }

    if (shouldExport) {
      const exporter = new HSApp.Ext.Threejs.OBJExport();
      traverseEntityAndExport(entity, exporter, displayNodes);

      // 提取内容元数据
      let contentMetadata: ContentMetadata[] | undefined;
      if (entity.contents) {
        contentMetadata = Object.values(entity.contents).map((content) => ({
          seekId: content.seekId,
          x: content.x,
          y: content.y,
          z: content.z
        }));
      }

      // 导出并上传
      exporter.export((objContent: string) => {
        return uploadModelData(entity.seekId, objContent, contentMetadata);
      });
    }
  });
}

/**
 * UUID转换工具模块（来自外部依赖）
 */
const a = n(325289)();