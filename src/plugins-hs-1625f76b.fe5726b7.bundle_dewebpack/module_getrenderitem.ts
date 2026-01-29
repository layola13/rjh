import { getLabelInputDisabledCom } from './services';

interface RenderItemProps {
  friendlyName: string;
  value: string;
}

function getRenderItem(e: RenderItemProps) {
  return getLabelInputDisabledCom({
    label: e.friendlyName,
    value: e.value
  });
}

export default getRenderItem;