import { HSCore } from './path/to/HSCore';

interface MoldingProfile {
  contentType: {
    getTypeString(): string | null;
  };
  [key: string]: unknown;
}

interface MoldingParameters {
  pathCoedge3dsTags?: string[];
  [key: string]: unknown;
}

interface PreviewMoldingType {
  parameters?: MoldingParameters;
  previewMode?: boolean;
  init(profile: Record<string, unknown>, path: PathData): void;
  dirtyGeometry(): void;
  getUniqueParent(): ParentNode | null;
}

interface PathData {
  pathCoedge3dsTags: string[];
  [key: string]: unknown;
}

interface SlotElement {
  parent: ParentNode;
}

interface ParentNode {
  id: string;
  addChild(child: PreviewMoldingType): void;
  removeChild(child: PreviewMoldingType): void;
}

interface ProfileData {
  profile: MoldingProfile;
  [key: string]: unknown;
}

export class PreviewNCustomizedMoldingRequest extends HSCore.Transaction.Common.StateRequest {
  private previewMolding: PreviewMoldingType;

  constructor() {
    super();
    this.previewMolding = HSCore.Util.CustomizedModel.createNCustomizedModelMolding();
  }

  onAbort(): void {
    this.removePreviewMolding();
  }

  updatePreviewMolding(
    element: SlotElement,
    pathData: PathData | null,
    profileData: ProfileData,
    fallbackContentType: string
  ): void {
    if (!pathData) {
      return;
    }

    let parent = element.parent;

    if (parent instanceof HSCore.Model.NCustomizedModelLightSlot) {
      parent = parent.parent;
    }

    const currentParent = this.previewMolding.getUniqueParent();

    if (parent.id !== currentParent?.id) {
      currentParent?.removeChild(this.previewMolding);
      parent.addChild(this.previewMolding);
    } else if (
      this._isSamePath(
        pathData.pathCoedge3dsTags,
        this.previewMolding.parameters?.pathCoedge3dsTags
      )
    ) {
      return;
    }

    const profileWithContentType = {
      ...profileData.profile,
      contentTypeStr:
        profileData.profile.contentType.getTypeString() ?? fallbackContentType,
    };

    this.previewMolding.init(profileWithContentType, pathData);
    this.previewMolding.previewMode = true;
    this.previewMolding.dirtyGeometry();
  }

  removePreviewMolding(): void {
    const parent = this.previewMolding?.getUniqueParent();
    parent?.removeChild(this.previewMolding);
  }

  private _isSamePath(
    path1: string[] | undefined,
    path2: string[] | undefined
  ): boolean {
    if (!path1 || !path2 || path1.length !== path2.length) {
      return false;
    }

    for (let i = 0; i < path1.length; i++) {
      if (path1[i] !== path2[i]) {
        return false;
      }
    }

    return true;
  }

  canTransactField(): boolean {
    return true;
  }
}