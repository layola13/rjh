import { getAllTopLines, calctopLine, fillInParameters } from './topline-utils';
import { getTopLineOffset } from './offset-calculator';
import { CabinetStyle, StyleIds } from './cabinet-style';

interface Request {
  type: string;
  params: unknown[];
}

interface RequestCreator {
  createRequest(type: string, params: unknown[]): Request;
  commit(request: Request): void;
}

interface MetaData {
  id: string;
  seekId: string;
  profileSizeX?: number;
  profileSizeY?: number;
}

interface CabinetStyleData {
  tag: string;
  getMetaById(styleId: string): MetaData | null;
}

interface ChildElement {
  localId: string;
  material: string;
  productId: string;
}

interface StateElement {
  localId: string;
  value?: number;
}

interface AssemblyParameters {
  children: ChildElement[];
  resources: string[];
  states: StateElement[];
  material: string;
  host?: unknown;
}

interface ProductData {
  productDataById: Record<string, MetaData>;
  userSchema?: AssemblyParameters;
}

interface TopLinePosition {
  host: unknown;
}

const TOPLINE_STYLE_OFFSETS: Record<string, number> = {
  '71579603-1f07-440f-bf46-cfc5023b7e80': 0.0613,
  '6cf72b84-d5f7-4432-b468-815ab08c73ba': 0.0647,
  '9e6b1862-4c97-480e-b38d-ae88b83716ff': 0.0602
};

const DEFAULT_CABINET_TOP_LINE_OFFSET = 0.065;

const TOPLINE_LOCAL_ID = 'topline';
const TOPLINE_ORIGIN_WIDTH_ID = 'id_topline_origin_width';
const TOPLINE_ORIGIN_HEIGHT_ID = 'id_topline_origin_height';

enum RequestType {
  DeletePAssembly = 'DeletePAssembly',
  AddPAssembly = 'AddPAssembly'
}

export default function processTopLines(
  requestCreator: RequestCreator,
  productData: ProductData,
  cabinetStyle?: CabinetStyleData,
  positions?: TopLinePosition[]
): Request[] {
  const requests: Request[] = [];
  const style = cabinetStyle ?? CabinetStyle.getCabinetStyle();

  getAllTopLines(style.tag, positions).forEach((topLine) => {
    const deleteRequest = requestCreator.createRequest(RequestType.DeletePAssembly, [topLine]);
    requestCreator.commit(deleteRequest);
  });

  let materialMeta = style.getMetaById(StyleIds.ToplineMaterial);
  if (!materialMeta) {
    materialMeta = style.getMetaById(StyleIds.DoorMaterial);
  }

  const toplineStyleMeta = style.getMetaById(StyleIds.ToplineStyle);

  let topLineOffset = DEFAULT_CABINET_TOP_LINE_OFFSET;
  if (toplineStyleMeta && TOPLINE_STYLE_OFFSETS[toplineStyleMeta.id]) {
    topLineOffset = TOPLINE_STYLE_OFFSETS[toplineStyleMeta.id];
  }

  const customOffset = getTopLineOffset(toplineStyleMeta);
  if (customOffset !== 0) {
    topLineOffset = customOffset;
  }

  calctopLine(topLineOffset, positions).forEach((position) => {
    const assemblyParams = fillInParameters(productData, position);

    assemblyParams.children.forEach((child) => {
      if (child.localId === TOPLINE_LOCAL_ID) {
        const materialIndex = assemblyParams.resources.indexOf(child.material);
        if (materialIndex !== -1) {
          assemblyParams.resources.splice(materialIndex, 1);
        }
        delete productData.productDataById[child.material];

        child.material = materialMeta.seekId;
        assemblyParams.resources.push(materialMeta.seekId);
        productData.productDataById[materialMeta.seekId] = materialMeta;

        if (toplineStyleMeta) {
          const productIndex = assemblyParams.resources.indexOf(child.productId);
          if (productIndex !== -1) {
            assemblyParams.resources.splice(productIndex, 1);
          }
          delete productData.productDataById[child.productId];

          child.productId = toplineStyleMeta.seekId;
          if (assemblyParams.resources.indexOf(toplineStyleMeta.seekId) === -1) {
            assemblyParams.resources.push(toplineStyleMeta.seekId);
          }
          productData.productDataById[toplineStyleMeta.seekId] = toplineStyleMeta;
        }
      }
    });

    if (toplineStyleMeta) {
      assemblyParams.states.forEach((state) => {
        if (state.localId === TOPLINE_ORIGIN_WIDTH_ID && toplineStyleMeta.profileSizeX) {
          state.value = toplineStyleMeta.profileSizeX;
        } else if (state.localId === TOPLINE_ORIGIN_HEIGHT_ID && toplineStyleMeta.profileSizeY) {
          state.value = toplineStyleMeta.profileSizeY;
        }
      });
    }

    assemblyParams.material = materialMeta.seekId;
    productData.userSchema = assemblyParams;

    const addRequest = requestCreator.createRequest(RequestType.AddPAssembly, [
      productData,
      null,
      null,
      null,
      position.host
    ]);
    requests.push(addRequest);
  });

  return requests;
}