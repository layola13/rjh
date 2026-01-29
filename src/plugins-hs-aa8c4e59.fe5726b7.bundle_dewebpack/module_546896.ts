interface SoftModelData {
  meta?: {
    id?: string;
  };
}

interface MultiProductParam {
  softModelData: SoftModelData[];
  customizeProxyData: unknown[];
  diyProxyData: unknown[];
}

interface MoveContentParams {
  ignoreSnapOffset: boolean;
  defaultGround: boolean;
  lightingMatrixArrangedEnable: boolean | undefined;
}

interface CommandResult {
  type: string;
  params: unknown[];
  completeSequenceOnCancel?: boolean;
}

interface OverwriteCommandParams {
  content: unknown;
  replaceTarget: unknown;
}

type CommandAdapter = (data: unknown) => CommandResult;

export function addMultiProductParamAdapter(
  params: MultiProductParam[]
): [CommandAdapter[], MultiProductParam[]] {
  const [firstParam] = params;
  const is2DView = HSApp.App.getApp().is2DViewActive();

  const moveContentParams: MoveContentParams = {
    ignoreSnapOffset: true,
    defaultGround: is2DView,
    lightingMatrixArrangedEnable: is2DView ? undefined : undefined,
  };

  let moveCommandBuilder = (data: unknown): CommandResult => ({
    type: HSFPConstants.CommandType.MoveContents,
    params: [data, undefined, moveContentParams],
    completeSequenceOnCancel: true,
  });

  const softModelData = firstParam.softModelData;
  const customizeProxyData = firstParam.customizeProxyData;
  const diyProxyData = firstParam.diyProxyData;

  const isSingleProduct =
    softModelData.length + customizeProxyData.length + diyProxyData.length === 1;

  const hasNoSoftModel = isSingleProduct && softModelData.length === 0;
  const hasValidMetaId =
    isSingleProduct && softModelData[0]?.meta?.id !== 'none';

  if (hasNoSoftModel || hasValidMetaId) {
    if (softModelData[0]?.meta) {
      HSApp.Catalog.Utils.switchEnvironment(softModelData[0].meta);
    }

    moveCommandBuilder = (data: unknown[]): CommandResult => ({
      type: HSFPConstants.CommandType.MoveContent,
      params: [data[0], undefined, moveContentParams],
      completeSequenceOnCancel: true,
    });
  }

  const addProductsCommand = (data: unknown): CommandResult => ({
    type: HSFPConstants.CommandType.CmdAddProducts,
    params: data,
  });

  const overwriteCommand = (data: OverwriteCommandParams): CommandResult => ({
    type: HSFPConstants.CommandType.CmdRequestWrap,
    params: [
      HSFPConstants.RequestType.OverwriteEntityRequest,
      [data.content, data.replaceTarget],
    ],
    completeSequenceOnCancel: true,
  });

  return [
    [addProductsCommand, moveCommandBuilder, overwriteCommand],
    [firstParam],
  ];
}