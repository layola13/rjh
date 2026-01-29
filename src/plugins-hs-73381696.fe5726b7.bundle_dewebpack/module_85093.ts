abstract class Strategy {
  readonly type: string = "Strategy";

  /**
   * Determines if the material can be extracted from the given element
   * @param element - The element to check for material extraction
   * @returns Whether the element's material is suckable
   */
  isSuckable(element: unknown): boolean {
    throw new Error("isSuckable method needs to be implemented");
  }

  /**
   * Extracts material data from the given element
   * @param element - The element to extract material from
   * @returns The extracted material data
   */
  suck(element: unknown): unknown {
    throw new Error("suck method needs to be implemented");
  }

  /**
   * Checks if the strategy can be applied to the given element with the provided data
   * @param element - The target element
   * @param data - The data to apply
   * @returns Whether the strategy is applicable
   */
  isAppliable(element: unknown, data: unknown): boolean {
    throw new Error("isAppliable method needs to be implemented");
  }

  /**
   * Applies the material data to the given element
   * @param element - The target element to apply material to
   * @param data - The material data to apply
   */
  apply(element: unknown, data: unknown): void {
    throw new Error("apply method needs to be implemented");
  }

  /**
   * Gets the data needed for undo operation
   * @param element - The element to get undo data from
   * @returns The undo data
   */
  getUndoData(element: unknown): unknown {
    throw new Error("getUndoData method needs to be implemented");
  }

  /**
   * Gets the data needed for redo operation
   * @param element - The element to get redo data from
   * @returns The redo data
   */
  getRedoData(element: unknown): unknown {
    throw new Error("getRedoData method needs to be implemented");
  }

  /**
   * Reverts the changes made to the element
   * @param element - The element to undo changes on
   * @param data - The undo data
   */
  undo(element: unknown, data: unknown): void {
    throw new Error("undo method needs to be implemented");
  }

  /**
   * Reapplies the changes to the element
   * @param element - The element to redo changes on
   * @param data - The redo data
   */
  redo(element: unknown, data: unknown): void {
    throw new Error("redo method needs to be implemented");
  }

  /**
   * Extracts and clones material data from a material or element
   * @param materialOrElement - The material or element to extract data from
   * @returns Cloned material data
   */
  protected _getMaterialData(materialOrElement: any): any {
    if (materialOrElement && materialOrElement instanceof HSCore.Material.Material) {
      return materialOrElement.getMaterialData().clone();
    }
    return materialOrElement.clone();
  }

  /**
   * Extracts material data from suck information object
   * @param suckInfo - The suck information object
   * @returns Cloned material data if available
   */
  protected _getMaterialDataFromSuckInfo(suckInfo: { materialData?: any }): any | undefined {
    if (suckInfo.materialData) {
      return suckInfo.materialData.clone();
    }
    return undefined;
  }

  /**
   * Prepares brick pattern for pave materials
   * @param pattern - The brick pattern to prepare
   * @param materialData - The material data to update
   * @returns Promise that resolves when pattern is prepared
   */
  protected _prepareBrickPattern(pattern: any, materialData: any): Promise<void> {
    if (!pattern || !materialData) {
      return Promise.resolve();
    }

    if (pattern instanceof HSPaveSDK.DefaultPattern) {
      return Promise.resolve(materialData);
    }

    return new Promise<void>((resolve) => {
      HSApp.PaintPluginHelper.Pave.MixPaintPluginHelper.prepareBrickPattern(pattern).then(
        (generatedMaterial: any) => {
          const paveMeta = HSCore.Util.Meta.createPaveMetaFromGeneratedMaterial(generatedMaterial);
          materialData.seekId = paveMeta.seekId;
          materialData.normalTexture = "";
          resolve();
        }
      );
    });
  }

  /**
   * Commits a material brush request to the transaction manager
   * @param element - The element being modified
   * @param data - The modification data
   */
  commitRequest(element: unknown, data: unknown): void {
    const transactionManager = HSCore.Doc.getDocManager().transManager;
    const request = transactionManager.createRequest(
      HSFPConstants.RequestType.MaterialBrush,
      [this.type, element, data]
    );
    transactionManager.commitAsync(request);
  }
}

export default Strategy;