/**
 * Toekick request generation utilities
 * Handles creation and deletion of toekick and wrap toekick assemblies
 */

import { 
  getAllToeKicks, 
  calctoeKick, 
  fillInToekickParameters,
  getAllWrapToeKicks,
  calcWrapToeKick,
  fillInWrapToekickParameters
} from './toekick-utils';

import { CabinetStyle, StyleIds } from './cabinet-style';

/**
 * Request type enumeration from HSFPConstants
 */
declare const enum RequestType {
  AddPAssembly = 'AddPAssembly',
  DeletePAssembly = 'DeletePAssembly'
}

/**
 * Product data entry containing material and style metadata
 */
interface ProductData {
  seekId: string;
  [key: string]: unknown;
}

/**
 * Product data registry indexed by ID
 */
interface ProductDataById {
  [id: string]: ProductData;
}

/**
 * Child component of a user schema
 */
interface SchemaChild {
  localId: string;
  material: string;
  productId: string;
}

/**
 * User schema defining assembly structure
 */
interface UserSchema {
  resources: string[];
  children: SchemaChild[];
  material: string;
  userSchema?: UserSchema;
  [key: string]: unknown;
}

/**
 * Product data context with schema and product registry
 */
interface ProductDataContext {
  productDataById: ProductDataById;
  userSchema: UserSchema;
}

/**
 * Request creator interface
 */
interface RequestCreator {
  createRequest(type: RequestType, args: unknown[]): Request;
}

/**
 * Generic request object
 */
interface Request {
  type: RequestType;
  args: unknown[];
}

/**
 * Toekick calculation parameters
 */
interface ToekickParams {
  height?: ProductData;
  [key: string]: unknown;
}

/**
 * Cabinet style configuration with toekick parameters
 */
interface CabinetStyleConfig {
  toekickparam?: {
    wraptoekick?: boolean;
    [key: string]: unknown;
  };
  tag?: string;
  [key: string]: unknown;
}

/**
 * Generates requests to create or update toekick assemblies
 * 
 * @param requestCreator - Factory for creating assembly requests
 * @param productData - Product data context containing schema and materials
 * @param styleConfig - Cabinet style configuration, defaults to current style
 * @param targetContext - Target context for toekick operations
 * @returns Array of requests to delete old and add new toekick assemblies
 */
export function generateCreateToekickRequests(
  requestCreator: RequestCreator,
  productData: ProductDataContext,
  styleConfig: CabinetStyleConfig | null,
  targetContext: unknown
): Request[] {
  const requests: Request[] = [];
  const cabinetStyle = styleConfig || CabinetStyle.getCabinetStyle();

  // Delete existing toekicks
  getAllToeKicks(cabinetStyle.tag, targetContext).forEach((existingToekick) => {
    const deleteRequest = requestCreator.createRequest(
      RequestType.DeletePAssembly,
      [existingToekick]
    );
    requests.push(deleteRequest);
  });

  const toekickMaterial = cabinetStyle.getMetaById(StyleIds.ToekickMaterial);
  const toekickStyle = cabinetStyle.getMetaById(StyleIds.ToekickStyle);

  // Create new toekicks
  calctoeKick(targetContext).forEach((toekickParams) => {
    const userSchema = fillInToekickParameters(productData, toekickParams, 'toekick');

    userSchema.children.forEach((child) => {
      if (child.localId === 'toekick') {
        // Replace material
        const oldMaterialIndex = userSchema.resources.indexOf(child.material);
        if (oldMaterialIndex !== -1) {
          userSchema.resources.splice(oldMaterialIndex, 1);
        }
        delete productData.productDataById[child.material];
        
        child.material = toekickMaterial.seekId;
        userSchema.resources.push(toekickMaterial.seekId);
        productData.productDataById[toekickMaterial.seekId] = toekickMaterial;

        // Replace product
        const oldProductIndex = userSchema.resources.indexOf(child.productId);
        if (oldProductIndex !== -1) {
          userSchema.resources.splice(oldProductIndex, 1);
        }
        delete productData.productDataById[child.productId];
        
        child.productId = toekickStyle.seekId;
        if (userSchema.resources.indexOf(toekickStyle.seekId) === -1) {
          userSchema.resources.push(toekickStyle.seekId);
        }
        productData.productDataById[toekickStyle.seekId] = toekickStyle;
      }
    });

    userSchema.material = toekickMaterial.seekId;
    productData.userSchema = userSchema;

    const addRequest = requestCreator.createRequest(
      RequestType.AddPAssembly,
      [productData]
    );
    requests.push(addRequest);
  });

  return requests;
}

/**
 * Generates requests to create or update wrap toekick assemblies
 * 
 * @param requestCreator - Factory for creating assembly requests
 * @param productData - Product data context containing schema and materials
 * @param styleConfig - Cabinet style configuration with wrap toekick settings
 * @param calcContext - Context for toekick calculations
 * @param targetContext - Target context for wrap toekick operations
 * @returns Array of requests to delete old and add new wrap toekick assemblies
 */
export function generateCreateWrapToekickRequests(
  requestCreator: RequestCreator,
  productData: ProductDataContext,
  styleConfig: CabinetStyleConfig,
  calcContext: unknown,
  targetContext: unknown
): Request[] {
  const requests: Request[] = [];

  // Delete existing wrap toekicks
  getAllWrapToeKicks(targetContext).forEach((existingWrapToekick) => {
    const deleteRequest = requestCreator.createRequest(
      RequestType.DeletePAssembly,
      [existingWrapToekick]
    );
    requests.push(deleteRequest);
  });

  // Only create new wrap toekicks if enabled in configuration
  if (styleConfig.toekickparam?.wraptoekick) {
    const cabinetStyle = styleConfig || CabinetStyle.getCabinetStyle();
    const toekickMaterial = cabinetStyle.getMetaById(StyleIds.ToekickMaterial);
    const toekickHeight = cabinetStyle.getMetaById(StyleIds.ToekickHeight);
    const toekickStyle = cabinetStyle.getMetaById(StyleIds.ToekickStyle);

    calcWrapToeKick(calcContext).forEach((wrapToekickParams: ToekickParams) => {
      // Apply height override if specified
      if (toekickHeight !== null) {
        wrapToekickParams.height = toekickHeight;
      }

      const userSchema = fillInWrapToekickParameters(
        productData,
        wrapToekickParams,
        'wraptoekick'
      );

      userSchema.children.forEach((child) => {
        if (child.localId === 'wraptoekick') {
          // Replace material
          const oldMaterialIndex = userSchema.resources.indexOf(child.material);
          if (oldMaterialIndex !== -1) {
            userSchema.resources.splice(oldMaterialIndex, 1);
          }
          delete productData.productDataById[child.material];
          
          child.material = toekickMaterial.seekId;
          userSchema.resources.push(toekickMaterial.seekId);
          productData.productDataById[toekickMaterial.seekId] = toekickMaterial;

          // Replace product
          const oldProductIndex = userSchema.resources.indexOf(child.productId);
          if (oldProductIndex !== -1) {
            userSchema.resources.splice(oldProductIndex, 1);
          }
          delete productData.productDataById[child.productId];
          
          child.productId = toekickStyle.seekId;
          if (userSchema.resources.indexOf(toekickStyle.seekId) === -1) {
            userSchema.resources.push(toekickStyle.seekId);
          }
          productData.productDataById[toekickStyle.seekId] = toekickStyle;
        }
      });

      userSchema.material = toekickMaterial.seekId;
      productData.userSchema = userSchema;

      const addRequest = requestCreator.createRequest(
        RequestType.AddPAssembly,
        [productData]
      );
      requests.push(addRequest);
    });
  }

  return requests;
}