import PropertyBarNodeBase from './PropertyBarNodeBase';

export enum PropertyBarType {
  ThirdLevelNode = 'ThirdLevelNode'
}

export interface ThirdLevelNodeConfig {
  status?: string | number;
  rightStatus?: string | number;
  onStatusChange?: (status: string | number) => void;
  onRightStatusChange?: (status: string | number) => void;
  resetItem?: () => void;
  disableClose?: boolean;
  icon?: string;
  customIcon?: React.ReactNode;
  disableStatusClick?: boolean;
}

export default class ThirdLevelPropertyBarNode extends PropertyBarNodeBase {
  public status?: string | number;
  public rightStatus?: string | number;
  public reset?: () => void;
  public onStatusChange?: (status: string | number) => void;
  public onRightStatusChange?: (status: string | number) => void;
  public resetItem?: () => void;
  public disableClose?: boolean;
  public icon?: string;
  public customIcon?: React.ReactNode;
  public disableStatusClick?: boolean;
  public readonly type: string;

  constructor(config: ThirdLevelNodeConfig) {
    super(config);
    
    this.type = PropertyBarType.ThirdLevelNode;
    this.status = config.status;
    this.rightStatus = config.rightStatus;
    this.onStatusChange = config.onStatusChange;
    this.onRightStatusChange = config.onRightStatusChange;
    this.resetItem = config.resetItem;
    this.disableClose = config.disableClose;
    this.icon = config.icon;
    this.customIcon = config.customIcon;
    this.disableStatusClick = config.disableStatusClick;
  }
}