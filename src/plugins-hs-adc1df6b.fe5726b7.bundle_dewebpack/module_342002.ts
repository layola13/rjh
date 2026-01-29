import PropertyBarItem from './PropertyBarItem';

interface SecondLevelNodeProps {
  status: unknown;
  onStatusChange: (() => void) | undefined;
  onDelete: (() => void) | undefined;
  resetItem: (() => void) | undefined;
  customizedTitleContent: unknown;
}

class SecondLevelNode extends PropertyBarItem {
  status: unknown;
  onStatusChange: (() => void) | undefined;
  onDelete: (() => void) | undefined;
  resetItem: (() => void) | undefined;
  customizedTitleContent: unknown;
  type: string;

  constructor(props: SecondLevelNodeProps) {
    super(props);
    
    this.type = HSFPConstants.PropertyBarType.SecondLevelNode;
    this.status = props.status;
    this.onStatusChange = props.onStatusChange;
    this.resetItem = props.resetItem;
    this.customizedTitleContent = props.customizedTitleContent;
    this.onDelete = props.onDelete;
  }
}

export default SecondLevelNode;