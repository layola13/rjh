import { wrapMapToPropsFunc, wrapMapToPropsConstant } from './module_97147';

type MapStateToProps = (...args: any[]) => any;

export function whenMapStateToPropsIsFunction(mapStateToProps: unknown): MapStateToProps | undefined {
  return typeof mapStateToProps === 'function' 
    ? wrapMapToPropsFunc(mapStateToProps, 'mapStateToProps') 
    : undefined;
}

export function whenMapStateToPropsIsMissing(mapStateToProps: unknown): MapStateToProps | undefined {
  return mapStateToProps 
    ? undefined 
    : wrapMapToPropsConstant(() => ({}));
}

export default [
  whenMapStateToPropsIsFunction,
  whenMapStateToPropsIsMissing
];