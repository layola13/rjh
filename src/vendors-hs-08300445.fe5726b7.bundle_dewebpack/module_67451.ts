import camelCase from 'lodash/camelCase';
import identity from 'lodash/identity';
import isPlainObject from 'lodash/isPlainObject';
import isArray from 'lodash/isArray';
import last from 'lodash/last';
import isString from 'lodash/isString';
import defaults from 'lodash/defaults';
import isFunction from 'lodash/isFunction';
import isUndefined from 'lodash/isUndefined';
import invariant from 'invariant';
import reduce from 'lodash/reduce';
import { flattenActionMap, unflattenActionCreators, defaultNamespace } from './utils';

interface ActionCreatorOptions {
  namespace?: string;
}

type PayloadCreator<T = any> = (...args: any[]) => T;
type MetaCreator<T = any> = (...args: any[]) => T;

type ActionCreatorDefinition = 
  | PayloadCreator
  | undefined
  | [PayloadCreator | undefined, MetaCreator];

interface ActionCreatorMap {
  [key: string]: ActionCreatorDefinition;
}

interface ActionCreators {
  [key: string]: (...args: any[]) => any;
}

function createActionCreator(
  actionType: string,
  payloadCreator?: PayloadCreator,
  metaCreator?: MetaCreator
): (...args: any[]) => any {
  const finalPayloadCreator = payloadCreator ?? identity;
  const action = (...args: any[]) => {
    const payload = finalPayloadCreator(...args);
    const baseAction: any = { type: actionType, payload };
    
    if (metaCreator) {
      baseAction.meta = metaCreator(...args);
    }
    
    return baseAction;
  };
  
  return action;
}

function validateActionCreatorDefinition(definition: ActionCreatorDefinition): boolean {
  if (isFunction(definition)) {
    return true;
  }
  
  if (isArray(definition)) {
    const [payloadCreator = identity, metaCreator] = definition;
    return isFunction(payloadCreator) && isFunction(metaCreator);
  }
  
  return false;
}

function buildActionCreators(actionMap: Record<string, ActionCreatorDefinition>): ActionCreators {
  return reduce(
    Object.keys(actionMap),
    (result: ActionCreators, actionType: string) => {
      const definition = actionMap[actionType];
      
      invariant(
        validateActionCreatorDefinition(definition),
        `Expected function, undefined, or array with payload and meta functions for ${actionType}`
      );
      
      const actionCreator = isArray(definition)
        ? createActionCreator(actionType, definition[0], definition[1])
        : createActionCreator(actionType, definition as PayloadCreator | undefined);
      
      return {
        ...result,
        [actionType]: actionCreator
      };
    },
    {}
  );
}

function buildActionCreatorsFromTypes(actionTypes: string[]): ActionCreators {
  const typeMap = reduce(
    actionTypes,
    (result: Record<string, undefined>, actionType: string) => ({
      ...result,
      [actionType]: identity
    }),
    {}
  );
  
  const creators = buildActionCreators(typeMap);
  
  return reduce(
    Object.keys(creators),
    (result: ActionCreators, actionType: string) => ({
      ...result,
      [camelCase(actionType)]: creators[actionType]
    }),
    {}
  );
}

export default function createActions(
  actionMapOrFirstActionType: ActionCreatorMap | string,
  ...args: Array<string | ActionCreatorOptions>
): ActionCreators {
  const options = isPlainObject(last(args))
    ? (args.pop() as ActionCreatorOptions)
    : {};
  
  const finalOptions = defaults(options, {
    namespace: defaultNamespace
  });
  
  const namespace = finalOptions.namespace;
  const actionTypes = args as string[];
  
  invariant(
    actionTypes.every(isString) && (isString(actionMapOrFirstActionType) || isPlainObject(actionMapOrFirstActionType)),
    'Expected optional object followed by string action types'
  );
  
  if (isString(actionMapOrFirstActionType)) {
    return buildActionCreatorsFromTypes([actionMapOrFirstActionType, ...actionTypes]);
  }
  
  const flattenedMap = flattenActionMap(actionMapOrFirstActionType, namespace);
  const actionCreatorsFromMap = buildActionCreators(flattenedMap);
  const unflattenedCreators = unflattenActionCreators(actionCreatorsFromMap, namespace);
  const actionCreatorsFromTypes = buildActionCreatorsFromTypes(actionTypes);
  
  return {
    ...unflattenedCreators,
    ...actionCreatorsFromTypes
  };
}