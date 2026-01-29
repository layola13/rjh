interface Geometry {
  id: string | number;
  index: {
    array: number[] | Uint16Array | Uint32Array;
  } | null;
  attributes: {
    position: {
      array: number[] | Float32Array;
    };
  };
}

interface BufferAttribute {
  array: Uint16Array | Uint32Array;
  itemSize: number;
}

const UINT16_MAX = 65535;
const ELEMENT_ARRAY_BUFFER = 0x8893;

const wireframeCache: Map<string | number, BufferAttribute> = new Map();

function getMaxValue(array: number[] | Uint16Array | Uint32Array): number {
  return Math.max(...Array.from(array));
}

function createUint16Attribute(array: number[], itemSize: number): BufferAttribute {
  return {
    array: new Uint16Array(array),
    itemSize
  };
}

function createUint32Attribute(array: number[], itemSize: number): BufferAttribute {
  return {
    array: new Uint32Array(array),
    itemSize
  };
}

function updateBufferAttribute(attribute: BufferAttribute, bufferType: number): void {
  // Buffer update logic
}

/**
 * Generates wireframe indices from a geometry
 * Converts triangles to lines by duplicating edges
 */
function getWireframeAttribute(geometry: Geometry): BufferAttribute {
  const cached = wireframeCache.get(geometry.id);
  if (cached) {
    return cached;
  }

  const indices: number[] = [];
  const geometryIndex = geometry.index;
  const positionAttribute = geometry.attributes.position;

  if (geometryIndex !== null) {
    const indexArray = geometryIndex.array;
    const indexCount = indexArray.length;

    for (let i = 0; i < indexCount; i += 3) {
      const vertexA = indexArray[i + 0];
      const vertexB = indexArray[i + 1];
      const vertexC = indexArray[i + 2];

      indices.push(vertexA, vertexB, vertexB, vertexC, vertexC, vertexA);
    }
  } else {
    const positionArray = positionAttribute.array;
    const vertexCount = positionArray.length / 3 - 1;

    for (let i = 0; i < vertexCount; i += 3) {
      const vertexA = i + 0;
      const vertexB = i + 1;
      const vertexC = i + 2;

      indices.push(vertexA, vertexB, vertexB, vertexC, vertexC, vertexA);
    }
  }

  const maxIndex = getMaxValue(indices);
  const wireframeAttribute = maxIndex > UINT16_MAX
    ? createUint32Attribute(indices, 1)
    : createUint16Attribute(indices, 1);

  updateBufferAttribute(wireframeAttribute, ELEMENT_ARRAY_BUFFER);
  wireframeCache.set(geometry.id, wireframeAttribute);

  return wireframeAttribute;
}