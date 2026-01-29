import { getAllLightLines, calclightLine, fillInParameters } from './lightLineUtils';
import { CabinetStyle, StyleIds } from './cabinetStyleModule';

interface Request {
  type: string;
  params: unknown[];
}

interface RequestManager {
  createRequest(type: string, params: unknown[]): Request;
  commit(request: Request): void;
}

interface MetaData {
  seekId: string;
  profileSizeX?: number;
  profileSizeY?: number;
  profile?: string;
  clone(): MetaData;
}

interface ProductChild {
  productId: string;
  localId: string;
  material?: string;
}

interface StateItem {
  localId: string;
  value?: number;
}

interface ProductData {
  productId: string;
  seekId: string;
  children: ProductChild[];
  resources: string[];
  states: StateItem[];
  material?: string;
}

interface UserSchema {
  productDataById: Record<string, MetaData | ProductData>;
  userSchema?: ProductData;
}

interface LightLineSegment {
  lightstrip?: unknown;
  host?: unknown;
}

interface CabinetStyleInstance {
  tag: string;
  getMetaById(styleId: string): MetaData | undefined;
}

declare const HSFPConstants: {
  RequestType: {
    DeletePAssembly: string;
    AddPAssembly: string;
  };
};

export default function processLightLines(
  requestManager: RequestManager,
  userSchema: UserSchema,
  cabinetStyle: CabinetStyleInstance | undefined,
  layoutData: unknown,
  context: unknown
): Request[] {
  const requests: Request[] = [];
  const style = cabinetStyle || CabinetStyle.getCabinetStyle();

  getAllLightLines(style.tag, context).forEach((lightLineId: string) => {
    const deleteRequest = requestManager.createRequest(
      HSFPConstants.RequestType.DeletePAssembly,
      [lightLineId]
    );
    requestManager.commit(deleteRequest);
  });

  let materialMeta = style.getMetaById(StyleIds.LightlineMaterial);
  if (!materialMeta) {
    materialMeta = style.getMetaById(StyleIds.DoorMaterial);
  }

  const lightlineStyleMeta = style.getMetaById(StyleIds.LightlineStyle);
  const profileWidth = lightlineStyleMeta?.profileSizeX ?? 0;
  const lightLineSegments = calclightLine(layoutData, profileWidth);
  const lightStripSegments = calclightLine(layoutData, profileWidth + 0.004);

  lightLineSegments.forEach((segment: LightLineSegment, index: number) => {
    lightLineSegments[index].lightstrip = lightStripSegments[index].lightstrip;

    const productData = fillInParameters(userSchema, segment);

    productData.children.forEach((child: ProductChild) => {
      const updateProductReference = (newMeta: MetaData): void => {
        const resourceIndex = productData.resources.indexOf(child.productId);
        if (resourceIndex !== -1) {
          productData.resources.splice(resourceIndex, 1);
        }
        delete userSchema.productDataById[child.productId];

        child.productId = newMeta.seekId;

        if (productData.resources.indexOf(newMeta.seekId) === -1) {
          productData.resources.push(newMeta.seekId);
        }
        userSchema.productDataById[newMeta.seekId] = newMeta;
      };

      if (child.localId === 'lightline') {
        const materialResourceIndex = productData.resources.indexOf(child.material!);
        if (materialResourceIndex !== -1) {
          productData.resources.splice(materialResourceIndex, 1);
        }
        delete userSchema.productDataById[child.material!];

        child.material = materialMeta!.seekId;
        productData.resources.push(materialMeta!.seekId);
        userSchema.productDataById[materialMeta!.seekId] = materialMeta!;

        if (lightlineStyleMeta) {
          updateProductReference(lightlineStyleMeta);
        }
      }

      if (child.localId === 'lightstrip' && lightlineStyleMeta) {
        const clonedStyleMeta = lightlineStyleMeta.clone();
        clonedStyleMeta.seekId = 'local_lightstrip_id';
        clonedStyleMeta.profile = 'M0, -1 L1, -1 L1, 0';
        updateProductReference(clonedStyleMeta);
      }
    });

    if (lightlineStyleMeta) {
      productData.states.forEach((state: StateItem) => {
        if (state.localId === 'id_lightline_origin_width' && lightlineStyleMeta.profileSizeX) {
          state.value = lightlineStyleMeta.profileSizeX;
        } else if (state.localId === 'id_lightline_origin_height' && lightlineStyleMeta.profileSizeY) {
          state.value = lightlineStyleMeta.profileSizeY;
        }
      });
    }

    productData.material = materialMeta!.seekId;
    userSchema.userSchema = productData;

    const addRequest = requestManager.createRequest(
      HSFPConstants.RequestType.AddPAssembly,
      [userSchema, null, null, null, segment.host]
    );
    requests.push(addRequest);
  });

  return requests;
}