export enum EntityTransactionType {
  // Enum members would need to be derived from module 55173
}

export enum FieldValueType {
  // Enum members would need to be derived from module 40193
}

export class FieldValueWrapper {
  // Implementation would need to be derived from module 74106
}

export interface IMessage {
  // Interface definition would need to be derived from module 46382
}

export class Manager {
  // Implementation would need to be derived from module 23464
}

export class Session {
  // Implementation would need to be derived from module 48711
}

export class Request {
  // Implementation would need to be derived from module 46382
}

export class BatchRequest {
  // Implementation would need to be derived from module 70498
}

export class CompositeRequest {
  // Implementation would need to be derived from module 17535
}

export class CompositeStateRequest {
  // Implementation would need to be derived from module 81366
}

export class DataRequest {
  // Implementation would need to be derived from module 30590
}

export * as Common from './Common';

type RequestType = typeof HSConstants.RequestType;

type RequestClassPair = [number, new (...args: unknown[]) => unknown];

interface Registrar {
  register(pairs: RequestClassPair[]): void;
}

export const Api = {
  register(registrar: Registrar): void {
    const requestType = HSConstants.RequestType;
    const requestMappings: RequestClassPair[] = [
      [requestType.Batch, BatchRequest],
      [requestType.Composite, CompositeRequest],
      [requestType.CompositeState, CompositeStateRequest],
      [requestType.Data, DataRequest]
    ];
    registrar.register(requestMappings);
  }
};