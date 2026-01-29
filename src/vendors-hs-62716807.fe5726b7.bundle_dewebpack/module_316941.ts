import getIntrinsic from './module_833324';
import callBind from './module_899679';

const stringIndexOf = callBind([getIntrinsic("%String.prototype.indexOf%")]);

export default function getIntrinsicWithBind(
  intrinsicName: string,
  allowMissing?: boolean
): unknown {
  const intrinsic = getIntrinsic(intrinsicName, !!allowMissing);
  
  return typeof intrinsic === "function" && stringIndexOf(intrinsicName, ".prototype.") > -1
    ? callBind([intrinsic])
    : intrinsic;
}