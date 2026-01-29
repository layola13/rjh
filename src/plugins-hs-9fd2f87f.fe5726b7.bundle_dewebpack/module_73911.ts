interface ExportOptions {
  withPaint?: boolean;
  isNoContent?: boolean;
  output?: string;
  template?: unknown;
  thumbnail2D?: boolean;
  seekId?: string;
  colorMode?: number;
  color?: string;
  blendColor?: string;
  textureUrl?: string;
  textureURI?: string;
  scaleX?: number;
  scaleY?: number;
}

interface MaterialInfo {
  seekId?: string;
  textureUrl?: string;
  textureURI?: string;
  colorMode?: number;
  color?: string;
  blendColor?: string;
  scaleX?: number;
  scaleY?: number;
}

interface SeamInfo {
  seekId?: string;
  textureUrl?: string;
  colorMode?: number;
  color?: string;
  blendColor?: string;
}

interface MaterialsTable {
  materials: MaterialInfo[];
  seams: SeamInfo[];
}

interface TileAndStoneConfig {
  seekId?: string;
  name: string;
  size: { x: number; y: number };
  imageUrl?: string;
  color?: string;
  count: number;
  unit: string;
}

interface ExportResult {
  value?: string;
  erMessage?: string;
  data?: unknown;
  ret?: string[];
}

interface App {
  floorplan: unknown;
  designMetadata: {
    get(key: string): string;
    set(key: string, value: string): void;
  };
  userTrackLogger: {
    push(eventName: string, data: unknown, options: { sendNow: boolean; triggerType: string }): void;
  };
  errorLogger: {
    push(message: string, error: unknown, options: unknown): void;
  };
}

interface InitConfig {
  app: App;
}

export default class ExportHandler {
  private _app?: App;

  init(config: InitConfig): void {
    this._app = config.app;
  }

  uninit(): void {}

  executeLocal(options: ExportOptions): Promise<void> {
    return this._executeLocal(options, c.SvgBuilder);
  }

  executeLocalMobile(options: ExportOptions): Promise<void> {
    return this._executeLocal(options, c.SvgMinimapBuilder);
  }

  executeLocalRaw(options: ExportOptions): Promise<void> {
    return this._executeLocal(options, c.SvgRawBuilder);
  }

  private _executeLocal(options: ExportOptions, BuilderClass: unknown): Promise<void> {
    return new Promise((resolve, reject) => {
      p.default.get().load(options, p.default.toDataURL);
    })
      .then(() => {
        if (options.withPaint) {
          p.default.get().clearTilesAndStones();
          const materialPromises = this._getMaterialsTable().map((materialUrl) => {
            return new Promise((resolve, reject) => {
              if (materialUrl) {
                p.default.get().loadBrickMaterialByUrl(resolve, materialUrl);
              }
            });
          });
          const timeout = new Promise((resolve) => {
            setTimeout(() => {
              resolve(undefined);
            }, 20000);
          });
          return Promise.race([Promise.all(materialPromises), timeout]);
        }
      })
      .then(() => {
        return new BuilderClass(HSApp.App.getApp()).build(options, options.template);
      })
      .then((svgData: string) => {
        if (options.withPaint) {
          p.default.get().clearTilesAndStones();
        }
        u.Util.logger.debug("begin save to file");
        const outputFormat = options.output || "svg";
        if (outputFormat === "svg") {
          u.Util.logger.debug("save data to svg");
          const blob = new Blob([svgData], { type: "text/xml" });
          this._saveToLocalFile(blob, "svg");
        } else {
          u.Util.logger.debug(`save data to ${outputFormat}`);
          const dataUrl = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
          this._downloadAndSave(dataUrl, outputFormat);
        }
      })
      .catch((error) => {
        if (options.withPaint) {
          p.default.get().clearTilesAndStones();
        }
      });
  }

  executePaveCapture(options: ExportOptions, targetWidth: number): Promise<string> {
    return new Promise((resolve, reject) => {
      new d.SvgBuilderPave(HSApp.App.getApp())
        .build(options)
        .then((svgData: string) => {
          const dataUrl = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
          ResourceManager.load(dataUrl, HSApp.Io.Load.LoadTypeEnum.PluginImage)
            .then((image: any) => {
              let processedImage = image;
              const width = image.width;
              const height = image.height;
              const scale = targetWidth / width;
              if (scale !== 1) {
                const resizedImage = HSApp.Util.Image.resize(image, targetWidth, Math.round(height * scale));
                if (resizedImage !== image) {
                  image.xRelease();
                }
                processedImage = resizedImage;
              }
              const resultDataUrl = HSApp.Util.Image.toDataURL(processedImage, "image/" + options.output);
              processedImage.xRelease();
              resolve(resultDataUrl);
            })
            .catch((error) => {
              reject(error);
            });
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  private _getMaterialsTable(): string[] {
    if (!this._app) {
      return [];
    }
    const { materials, seams } = u.Util.getFloorMaterialTextureUrls(this._app.floorplan);
    const materialUrls: string[] = [];
    this._getMaterials(materials, materialUrls);
    this._getSeams(seams, materialUrls);
    return materialUrls;
  }

  private _getMaterials(materials: MaterialInfo[], urlList: string[]): void {
    materials.forEach((material) => {
      const textureUrl = material.textureUrl || material.textureURI;
      if (material.seekId) {
        const meta = l.HSCatalog.MetaManager.instance().getBuildingProductMeta(material.seekId);
        const decorator = new l.HSPaveSDK.MetaDecorator(meta);
        const isWaterJetTile = decorator.isWaterJetTileMeta();
        const tileSize = {
          x: meta?.tileSize_x || 1,
          y: meta?.tileSize_y || 1
        };
        if (isWaterJetTile) {
          const scaleX = material.scaleX || 1;
          const scaleY = material.scaleY || 1;
          tileSize.x *= scaleX;
          tileSize.y *= scaleY;
        }
        const name = meta?.name ? meta.name : "";
        let color: string | undefined = undefined;
        if (material.colorMode === s.ColorMode.Color) {
          color = material.color;
        } else if (material.colorMode === s.ColorMode.Blend) {
          color = material.blendColor;
        } else if (material.colorMode === s.ColorMode.Texture && textureUrl) {
          urlList.push(textureUrl);
        }
        p.default.get().addTileAndStone({
          seekId: material.seekId,
          name: name,
          size: tileSize,
          imageUrl: textureUrl,
          color: color,
          count: 0,
          unit: ResourceManager.getString(isWaterJetTile ? "unitType_ge" : "plugin_exportdwg_detailist_cutomized_tile_unit")
        });
        if (decorator.isOneStoneMultiFace()) {
          decorator.getOneStoneMultiFace().forEach((face: any) => {
            if (material.colorMode === s.ColorMode.Texture && face.textureUrl) {
              urlList.push(face.textureUrl);
            }
            p.default.get().addTileAndStone({
              seekId: face.seekId,
              name: name,
              size: tileSize,
              imageUrl: face.textureUrl,
              color: color,
              count: 0,
              unit: ResourceManager.getString("plugin_exportdwg_detailist_cutomized_tile_unit")
            });
          });
        }
      }
    });
  }

  private _getSeams(seams: SeamInfo[], urlList: string[]): void {
    seams.forEach((seam) => {
      if (seam.seekId) {
        const meta = l.HSCatalog.MetaManager.instance().getBuildingProductMeta(seam.seekId);
        let color: string | undefined = undefined;
        if (seam.colorMode === s.ColorMode.Color) {
          color = seam.color;
        } else if (seam.colorMode === s.ColorMode.Blend) {
          color = seam.blendColor;
        } else if (seam.colorMode === s.ColorMode.Texture && seam.textureUrl) {
          urlList.push(seam.textureUrl);
        }
        const name = seam.colorMode === s.ColorMode.Texture 
          ? (meta?.name ? meta.name : "")
          : ResourceManager.getString("plugin_right_propertybar_paint_color");
        p.default.get().addTileAndStone({
          seekId: seam.seekId,
          name: ResourceManager.getString("plugin_style_seam_material") + " " + name,
          size: {
            x: meta?.tileSize_x || 1,
            y: meta?.tileSize_y || 1
          },
          imageUrl: seam.textureUrl,
          color: color,
          count: 0,
          unit: ""
        });
      }
    });
  }

  private _downloadAndSave(dataUrl: string, format: string): void {
    ResourceManager.load(dataUrl, HSApp.Io.Load.LoadTypeEnum.PluginImage)
      .then((image: any) => {
        const width = image.width;
        const height = image.height;
        const resizedImage = HSApp.Util.Image.resize(image, width, height);
        if (resizedImage !== image) {
          image.xRelease();
        }
        const imageDataUrl = HSApp.Util.Image.toDataURL(resizedImage, `image/${format}`);
        resizedImage.xRelease();
        const parts = imageDataUrl.split(";base64,");
        const mimeType = parts[0].replace("data:", "");
        const bytes = new Uint8Array(HSApp.Util.Base64.decodeStringToByteArray(parts[1], false));
        const blob = new Blob([bytes], { type: mimeType });
        u.Util.logger.debug("return blob data");
        return blob;
      })
      .then((blob: Blob) => {
        this._saveToLocalFile(blob, format);
      });
  }

  private _saveToLocalFile(blob: Blob, extension: string): void {
    u.Util.logger.debug("save to file");
    const designName = this._app?.designMetadata.get("designName") || ResourceManager.getString("plugin_exportdwg_design_name");
    const timestamp = new Date().toUTCString();
    const filename = `${designName}-${timestamp}.${extension}`;
    saveAs(blob, filename);
    const hint = ResourceManager.getString("plugin_exportdwgpng_done_hint");
    LiveHint.show(hint, 5000);
  }

  executeNoWatch(options: ExportOptions): Promise<string> {
    return this.export(options).then(
      (result) => {
        if (result?.value) {
          return result.value;
        }
        throw result.erMessage;
      },
      (error) => {
        throw new Error("Error while send the request job for png." + error);
      }
    );
  }

  export(options: ExportOptions): Promise<ExportResult> {
    if (!this._app) {
      return Promise.reject("App not initialized");
    }
    const designId = this._app.designMetadata.get("designId");
    const requestData = { id: designId, ...options };
    return NWTK.mtop.Design.exportDesignDWG({ data: requestData })
      .then((response: any) => {
        const data = response.data;
        if (response?.ret?.[0]?.includes("SUCCESS")) {
          return data;
        }
        return Promise.reject(data);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }

  execute(options: ExportOptions): Promise<void> {
    const trackData = {
      description: options.withPaint ? "导出:铺贴彩图" : options.isNoContent ? "导出:不带家具户型图" : "导出:带家具户型图",
      group: HSFPConstants.LogGroupTypes.ExportOperation,
      type: "designPng",
      withPaint: options.withPaint,
      hasFurniture: !options.withPaint && !options.isNoContent,
      validOperation: false
    };

    const handleDownload = (imageUrl: string): void => {
      ResourceManager.load(imageUrl, HSApp.Io.Load.LoadTypeEnum.PluginImage)
        .then((image: any) => {
          const width = image.width;
          const height = image.height;
          const resizedImage = HSApp.Util.Image.resize(image, width, height);
          if (resizedImage !== image) {
            image.xRelease();
          }
          const dataUrl = HSApp.Util.Image.toDataURL(resizedImage, "image/png");
          resizedImage.xRelease();
          const parts = dataUrl.split(";base64,");
          const mimeType = parts[0].replace("data:", "");
          const bytes = new Uint8Array(HSApp.Util.Base64.decodeStringToByteArray(parts[1], false));
          return new Blob([bytes], { type: mimeType });
        })
        .then((blob: Blob) => {
          this._saveToLocalFile(blob, "png");
        })
        .catch((error) => {
          u.Util.logger.error("[exportDWG] DWG Error - Failed to download dwg: " + error);
          HSApp.App.getApp().errorLogger.push("[exportDWG] DWG Error - Failed to download dwg", {
            errorStack: new Error(error),
            description: "[exportDWG] DWG Error - Failed to download dwg",
            type: "HSFPConstants.PluginType.ExportSVG",
            errorInfo: {
              info: error,
              path: {
                file: "homestyler-tools-web/web/plugin/lite/LiteRender/handler4vs.js",
                functionName: "handleRender()"
              }
            }
          }, {});
        });
    };

    const isThumbnail = options.thumbnail2D;

    return this.export(options)
      .then((result) => {
        if (isThumbnail && result.value) {
          const metadata = HSApp.App.getApp().designMetadata;
          if (metadata) {
            metadata.set("image2d", result.value);
          }
        } else if (result.value) {
          handleDownload(result.value);
        }
        trackData.validOperation = true;
        this._app?.userTrackLogger.push("exportDesignPicture", trackData, {
          sendNow: true,
          triggerType: "end"
        });
      })
      .catch((error) => {
        if (!isThumbnail) {
          LiveHint.hide();
          MessageBox.create(
            ResourceManager.getString("plugin_exportdwg_error_hint"),
            [ResourceManager.getString("plugin_exportdwg_error_ok")],
            0
          ).show();
        }
        const errorMessage = "generate thumbnail2d or user download image";
        u.Util.logger.error("[exportSVG] Export Error - " + error);
        HSApp.App.getApp().errorLogger.push(errorMessage, {
          errorStack: new Error(errorMessage),
          description: errorMessage,
          errorInfo: {
            info: error,
            path: {
              file: "homestyler-tools-web/web/plugin/lite/LiteRender/handler4vs.js",
              functionName: "handleRender()"
            }
          }
        }, {});
        trackData.validOperation = false;
        this._app?.userTrackLogger.push("exportDesignPicture", trackData, {
          sendNow: true,
          triggerType: "end"
        });
      });
  }
}