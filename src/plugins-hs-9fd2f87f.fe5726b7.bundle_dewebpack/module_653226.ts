import { getAllToeKicks, calctoeKick, fillInToekickParameters, getAllWrapToeKicks, calcWrapToeKick, fillInWrapToekickParameters } from './toe-kick-utils';
import { CabinetStyle, StyleIds } from './cabinet-style';

interface Request {
  type: string;
  params: unknown[];
}

interface RequestCreator {
  createRequest(type: string, params: unknown[]): Request;
}

interface ProductData {
  seekId: string;
  [key: string]: unknown;
}

interface ProductDataMap {
  [id: string]: ProductData;
}

interface Child {
  localId: string;
  material: string;
  productId: string;
}

interface UserSchema {
  children: Child[];
  resources: string[];
  material: string;
  userSchema?: UserSchema;
}

interface SchemaData {
  productDataById: ProductDataMap;
  userSchema: UserSchema;
}

interface ToekickParameters {
  height?: ProductData;
  [key: string]: unknown;
}

interface CabinetConfig {
  toekickparam?: {
    wraptoekick?: boolean;
  };
  [key: string]: unknown;
}

enum RequestType {
  DeletePAssembly = 'DeletePAssembly',
  AddPAssembly = 'AddPAssembly'
}

/**
 * Generates requests to create toekick assemblies
 */
export function generateCreateToekickRequests(
  requestCreator: RequestCreator,
  schemaData: SchemaData,
  cabinetStyle: CabinetStyle | undefined,
  assemblies: unknown[]
): Request[] {
  const requests: Request[] = [];
  const style = cabinetStyle ?? CabinetStyle.getCabinetStyle();

  getAllToeKicks(style.tag, assemblies).forEach((toekick) => {
    const deleteRequest = requestCreator.createRequest(RequestType.DeletePAssembly, [toekick]);
    requests.push(deleteRequest);
  });

  const toekickMaterial = style.getMetaById(StyleIds.ToekickMaterial);
  const toekickStyleMeta = style.getMetaById(StyleIds.ToekickStyle);

  calctoeKick(assemblies).forEach((calculatedToekick) => {
    const schema = fillInToekickParameters(schemaData, calculatedToekick, 'toekick');

    schema.children.forEach((child) => {
      if (child.localId === 'toekick') {
        const oldMaterialIndex = schema.resources.indexOf(child.material);
        schema.resources.splice(oldMaterialIndex, 1);
        delete schemaData.productDataById[child.material];
        
        child.material = toekickMaterial.seekId;
        schema.resources.push(toekickMaterial.seekId);
        schemaData.productDataById[toekickMaterial.seekId] = toekickMaterial;

        const oldProductIndex = schema.resources.indexOf(child.productId);
        schema.resources.splice(oldProductIndex, 1);
        delete schemaData.productDataById[child.productId];
        
        child.productId = toekickStyleMeta.seekId;
        if (schema.resources.indexOf(toekickStyleMeta.seekId) === -1) {
          schema.resources.push(toekickStyleMeta.seekId);
        }
        schemaData.productDataById[toekickStyleMeta.seekId] = toekickStyleMeta;
      }
    });

    schema.material = toekickMaterial.seekId;
    schemaData.userSchema = schema;

    const addRequest = requestCreator.createRequest(RequestType.AddPAssembly, [schemaData]);
    requests.push(addRequest);
  });

  return requests;
}

/**
 * Generates requests to create wrap toekick assemblies
 */
export function generateCreateWrapToekickRequests(
  requestCreator: RequestCreator,
  schemaData: SchemaData,
  config: CabinetConfig,
  calculationData: unknown[],
  assemblies: unknown[]
): Request[] {
  const requests: Request[] = [];

  getAllWrapToeKicks(assemblies).forEach((wrapToekick) => {
    const deleteRequest = requestCreator.createRequest(RequestType.DeletePAssembly, [wrapToekick]);
    requests.push(deleteRequest);
  });

  if (config.toekickparam?.wraptoekick) {
    const style = config as unknown as CabinetStyle ?? CabinetStyle.getCabinetStyle();
    const toekickMaterial = style.getMetaById(StyleIds.ToekickMaterial);
    const toekickHeight = style.getMetaById(StyleIds.ToekickHeight);
    const toekickStyleMeta = style.getMetaById(StyleIds.ToekickStyle);

    calcWrapToeKick(calculationData).forEach((calculatedWrapToekick: ToekickParameters) => {
      if (toekickHeight !== null) {
        calculatedWrapToekick.height = toekickHeight;
      }

      const schema = fillInWrapToekickParameters(schemaData, calculatedWrapToekick, 'wraptoekick');

      schema.children.forEach((child) => {
        if (child.localId === 'wraptoekick') {
          const oldMaterialIndex = schema.resources.indexOf(child.material);
          schema.resources.splice(oldMaterialIndex, 1);
          delete schemaData.productDataById[child.material];
          
          child.material = toekickMaterial.seekId;
          schema.resources.push(toekickMaterial.seekId);
          schemaData.productDataById[toekickMaterial.seekId] = toekickMaterial;

          const oldProductIndex = schema.resources.indexOf(child.productId);
          schema.resources.splice(oldProductIndex, 1);
          delete schemaData.productDataById[child.productId];
          
          child.productId = toekickStyleMeta.seekId;
          if (schema.resources.indexOf(toekickStyleMeta.seekId) === -1) {
            schema.resources.push(toekickStyleMeta.seekId);
          }
          schemaData.productDataById[toekickStyleMeta.seekId] = toekickStyleMeta;
        }
      });

      schema.material = toekickMaterial.seekId;
      schemaData.userSchema = schema;

      const addRequest = requestCreator.createRequest(RequestType.AddPAssembly, [schemaData]);
      requests.push(addRequest);
    });
  }

  return requests;
}