import { Entity, Parameter, InstanceData } from './entity-models';

interface SerializedParameter {
  n: string;
  v: unknown;
  t: string;
}

interface SerializedInstanceData {
  id: string;
  parameters: SerializedParameter[];
}

interface CategoryData {
  [key: string]: unknown;
}

interface TypeData {
  [key: string]: unknown;
}

interface SerializedEntity {
  prefix?: string;
  children: SerializedEntity[];
  category?: CategoryData;
  type: TypeData;
  instance?: SerializedInstanceData;
}

interface BomData {
  getRootEntities(): Entity[];
}

/**
 * Serializes a Parameter instance to a plain object
 */
export function dumpParameter(parameter: Parameter): SerializedParameter {
  return {
    n: parameter.name,
    v: parameter.value,
    t: parameter.type
  };
}

/**
 * Serializes InstanceData to a plain object
 */
export function dumpInstanceData(instanceData: InstanceData): SerializedInstanceData {
  return {
    id: instanceData.id,
    parameters: Array.from(instanceData.parameters.values()).map(dumpParameter)
  };
}

/**
 * Recursively serializes an Entity to a plain object
 */
export function dumpEntity(entity: Entity): SerializedEntity {
  const serialized: SerializedEntity = {
    children: [],
    type: {}
  };

  if (entity.prefix !== "") {
    serialized.prefix = entity.prefix;
  }

  serialized.children = entity.children.map(dumpEntity);

  if (entity.category) {
    serialized.category = { ...entity.category };
  }

  serialized.type = { ...entity.type };

  if (entity.instance) {
    serialized.instance = dumpInstanceData(entity.instance);
  }

  return serialized;
}

/**
 * Deserializes a plain object to a Parameter instance
 */
export function loadParameter(data: SerializedParameter): Parameter {
  return new Parameter(data.n, data.v, data.t);
}

/**
 * Deserializes a plain object to an InstanceData instance
 */
export function loadInstanceData(data: SerializedInstanceData): InstanceData {
  const instanceData = new InstanceData(data.id);
  data.parameters.forEach((paramData) => {
    instanceData.addParameter(loadParameter(paramData));
  });
  return instanceData;
}

/**
 * Recursively deserializes a plain object to an Entity instance
 */
export function loadEntity(data: SerializedEntity): Entity {
  const entity = new Entity();

  if (data.prefix) {
    entity.setPrefix(data.prefix);
  }

  entity.setInstanceData(loadInstanceData(data.instance));
  entity.setType({ ...data.type });

  if (data.category) {
    entity.setCategory({ ...data.category });
  }

  if (data.children) {
    data.children.forEach((childData) => {
      entity.addChild(loadEntity(childData));
    });
  }

  return entity;
}

declare global {
  interface Window {
    dumpBomData(bomData: BomData): SerializedEntity[];
  }
}

window.dumpBomData = function(bomData: BomData): SerializedEntity[] {
  return bomData.getRootEntities().map((entity) => dumpEntity(entity));
};