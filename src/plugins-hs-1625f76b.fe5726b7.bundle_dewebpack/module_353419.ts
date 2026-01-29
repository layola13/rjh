import React from 'react';

interface State {
  guideReaded: boolean;
}

interface Props {}

interface RefType {
  handleCancelClick: () => void;
}

interface GuideProps {
  onLoad: () => void;
  needGuide: () => void;
}

interface UploadProps {
  next: () => void;
}

interface ModalProps {
  ref: (instance: RefType | null) => void;
  windowname: string;
  headername: string;
  contents: React.ReactElement;
  winwidth: number;
}

const COOKIE_KEY = "pinhua-userguidereaded";

class PinhuaUserGuide extends React.Component<Props, State> {
  private ref?: RefType;

  constructor(props: Props) {
    super(props);
    this.state = {
      guideReaded: this.getCookieValue()
    };
  }

  private getCookieValue(): boolean {
    return $.cookie(COOKIE_KEY) === 'true';
  }

  private onGuideFinish = (): void => {
    $.cookie(COOKIE_KEY, true);
    this.setState({
      guideReaded: true
    });
  };

  private resetGuideReadState = (): void => {
    $.cookie(COOKIE_KEY, false);
    this.setState({
      guideReaded: false
    });
  };

  private close = (): void => {
    this.ref?.handleCancelClick();
  };

  render(): React.ReactElement {
    const { guideReaded } = this.state;
    
    let contents: React.ReactElement;
    let headerName: string;

    if (guideReaded) {
      contents = React.createElement<GuideProps>('LoadComponent' as any, {
        onLoad: this.close,
        needGuide: this.resetGuideReadState
      });
      headerName = ResourceManager.getString("plugin_catalog_diytiles_upload_title");
    } else {
      contents = React.createElement<UploadProps>('GuideComponent' as any, {
        next: this.onGuideFinish
      });
      headerName = ResourceManager.getString("plugin_catalog_diytiles_guide_title");
    }

    return React.createElement<ModalProps>('ModalComponent' as any, {
      ref: (instance: RefType | null) => {
        this.ref = instance ?? undefined;
      },
      windowname: "create-new-wishlist",
      headername: headerName,
      contents: contents,
      winwidth: 500
    });
  }
}

export default PinhuaUserGuide;