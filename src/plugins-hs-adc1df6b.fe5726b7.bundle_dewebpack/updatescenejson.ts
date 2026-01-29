export class UpdateSceneJson {
  /**
   * Execute the scene JSON update process
   * @param _param1 - First parameter (unused in implementation)
   * @param _param2 - Second parameter (unused in implementation)
   * @returns Promise resolving to execution status
   */
  async execute(_param1: unknown, _param2: unknown): Promise<{ status: string }> {
    try {
      await this.updateJson();
    } catch (error) {
      // Error is caught but not handled
    }
    return { status: "success" };
  }

  /**
   * Update the scene JSON data by uploading to OSS
   * @returns Promise resolving to status result
   */
  private async updateJson(): Promise<{ status: string; res?: unknown }> {
    const app = HSApp.App.getApp();
    const designId = app.designMetadata.get("designId");

    const response = await NWTK.mtop.Design.sceneJsonUrl({
      data: {
        designId
      }
    });

    const aclUrl = response?.data?.aclUrl;
    
    if (!aclUrl) {
      return {
        status: "error",
        res: response
      };
    }

    await app.pluginManager
      .getPlugin("hsw.plugin.render.Plugin")
      .getHandler()
      .uploadSceneData(aclUrl, {
        oss: {
          headers: {
            "x-oss-object-acl": "public-read",
            "Content-Type": "application/json; charset=UTF-8"
          }
        }
      });

    return { status: "success" };
  }
}