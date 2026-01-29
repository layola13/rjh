interface GeometryEntity {
  geometry: unknown[];
  indices: number[];
}

const getPoint = (entity: GeometryEntity, index: number): unknown => 
  entity.geometry[entity.indices[index]];

export default getPoint;