import { Mesh, VertexFormat, Element, AttributeIndex, ComponentType, PrimitiveType, BoundingBox, IndexFormat, Vector3, App } from './core';

const DEFAULT_START_POSITION: [number, number, number] = [0, 0, 0];
const DEFAULT_END_POSITION: [number, number, number] = [0, 0, 0];
const DEFAULT_START_COLOR: [number, number, number, number] = [1, 1, 1, 1];
const DEFAULT_END_COLOR: [number, number, number, number] = [1, 1, 1, 1];

const tempStartVector = new Vector3();
const tempEndVector = new Vector3();

const VERTEX_STRIDE_WITHOUT_COLOR = 14;
const COLOR_COMPONENT_COUNT = 8;
const VERTICES_PER_SEGMENT = 8;
const INDICES_PER_SEGMENT = 18;
const FLOATS_PER_VERTEX_WITHOUT_COLOR = 22;
const FLOATS_PER_VERTEX_WITH_COLOR = 30;
const COLOR_RGB_SIZE = 3;
const COLOR_RGBA_SIZE = 4;
const INDEX_FORMAT_THRESHOLD = 65535;

export class Line2Mesh extends Mesh {
    static setFromPositions(
        positions: number[],
        colors: number[] = [],
        meshName: string = ""
    ): Line2Mesh | null {
        const totalPoints = positions.length / 3;
        const segmentCount = totalPoints / 2;

        let hasColors = colors.length !== 0;
        let colorComponentCount = 4;

        if (colors.length === positions.length) {
            hasColors = true;
            colorComponentCount = COLOR_RGB_SIZE;
        } else if (colors.length / 4 === positions.length / 3) {
            hasColors = true;
            colorComponentCount = COLOR_RGBA_SIZE;
        }

        const vertexFormat = new VertexFormat();
        vertexFormat.append(new Element(AttributeIndex.VET_POSITION, ComponentType.CT_FLOAT, 3));
        vertexFormat.append(new Element(AttributeIndex.VET_TEXCOORD2, ComponentType.CT_FLOAT, 4));
        vertexFormat.append(new Element(AttributeIndex.VET_TEXCOORD3, ComponentType.CT_FLOAT, 4));
        vertexFormat.append(new Element(AttributeIndex.VET_TEXCOORD0, ComponentType.CT_FLOAT, 2));
        vertexFormat.append(new Element(AttributeIndex.VET_COLOR0, ComponentType.CT_FLOAT, 4));
        vertexFormat.append(new Element(AttributeIndex.VET_COLOR1, ComponentType.CT_FLOAT, 4));
        vertexFormat.append(new Element(AttributeIndex.VET_MESHID, ComponentType.CT_FLOAT, 1));

        const lineMesh = new Line2Mesh();
        lineMesh.setPrimitiveType(PrimitiveType.PT_TriangleList);

        if (!lineMesh) {
            return null;
        }

        const meshPart = lineMesh.addPart();
        if (!meshPart) {
            return null;
        }

        meshPart.setVertexFormat(vertexFormat);

        const boundingBox = new BoundingBox();
        let indexBuffer: Uint16Array | Uint32Array;

        if (VERTICES_PER_SEGMENT * segmentCount > INDEX_FORMAT_THRESHOLD) {
            meshPart.setIndexFormat(IndexFormat.INDEX32);
            indexBuffer = new Uint32Array(INDICES_PER_SEGMENT * segmentCount);
        } else {
            meshPart.setIndexFormat(IndexFormat.INDEX16);
            indexBuffer = new Uint16Array(INDICES_PER_SEGMENT * segmentCount);
        }

        for (let segmentIndex = 0; segmentIndex < segmentCount; segmentIndex++) {
            const baseVertex = VERTICES_PER_SEGMENT * segmentIndex;
            const baseIndex = INDICES_PER_SEGMENT * segmentIndex;

            indexBuffer[baseIndex + 0] = baseVertex + 0;
            indexBuffer[baseIndex + 1] = baseVertex + 1;
            indexBuffer[baseIndex + 2] = baseVertex + 2;
            indexBuffer[baseIndex + 3] = baseVertex + 3;
            indexBuffer[baseIndex + 4] = baseVertex + 2;
            indexBuffer[baseIndex + 5] = baseVertex + 1;
            indexBuffer[baseIndex + 6] = baseVertex + 2;
            indexBuffer[baseIndex + 7] = baseVertex + 3;
            indexBuffer[baseIndex + 8] = baseVertex + 4;
            indexBuffer[baseIndex + 9] = baseVertex + 5;
            indexBuffer[baseIndex + 10] = baseVertex + 4;
            indexBuffer[baseIndex + 11] = baseVertex + 3;
            indexBuffer[baseIndex + 12] = baseVertex + 4;
            indexBuffer[baseIndex + 13] = baseVertex + 5;
            indexBuffer[baseIndex + 14] = baseVertex + 6;
            indexBuffer[baseIndex + 15] = baseVertex + 7;
            indexBuffer[baseIndex + 16] = baseVertex + 6;
            indexBuffer[baseIndex + 17] = baseVertex + 5;
        }

        const vertexDataSize = hasColors ? FLOATS_PER_VERTEX_WITH_COLOR : FLOATS_PER_VERTEX_WITHOUT_COLOR;
        const vertexBuffer = new Float32Array(vertexDataSize * VERTICES_PER_SEGMENT * segmentCount);

        let accumulatedDistance = 0;
        let startDistance = accumulatedDistance;
        let endDistance = accumulatedDistance;
        let vertexDataOffset = 0;

        const meshId = App.Instance.getMeshId(meshName);

        for (let pointIndex = 0; pointIndex < totalPoints; pointIndex += 2) {
            const startPos = DEFAULT_START_POSITION;
            startPos[0] = positions[3 * pointIndex + 0];
            startPos[1] = positions[3 * pointIndex + 1];
            startPos[2] = positions[3 * pointIndex + 2];

            const endPos = DEFAULT_END_POSITION;
            endPos[0] = positions[3 * pointIndex + 3];
            endPos[1] = positions[3 * pointIndex + 4];
            endPos[2] = positions[3 * pointIndex + 5];

            tempStartVector.set(startPos[0], startPos[1], startPos[2]);
            tempEndVector.set(endPos[0], endPos[1], endPos[2]);

            boundingBox.mergePoint(tempStartVector);
            boundingBox.mergePoint(tempEndVector);

            startDistance = accumulatedDistance;
            accumulatedDistance += Vector3.Distance(tempStartVector, tempEndVector);
            endDistance = accumulatedDistance;

            const startColor = DEFAULT_START_COLOR;
            const endColor = DEFAULT_END_COLOR;

            if (hasColors) {
                startColor[0] = colors[colorComponentCount * pointIndex + 0];
                startColor[1] = colors[colorComponentCount * pointIndex + 1];
                startColor[2] = colors[colorComponentCount * pointIndex + 2];
                if (colorComponentCount === COLOR_RGBA_SIZE) {
                    startColor[3] = colors[colorComponentCount * pointIndex + 3];
                }

                endColor[0] = colors[colorComponentCount * pointIndex + colorComponentCount + 0];
                endColor[1] = colors[colorComponentCount * pointIndex + colorComponentCount + 1];
                endColor[2] = colors[colorComponentCount * pointIndex + colorComponentCount + 2];
                if (colorComponentCount === COLOR_RGBA_SIZE) {
                    endColor[3] = colors[colorComponentCount * pointIndex + colorComponentCount + 3];
                }
            }

            writeSegmentVertices(
                startPos,
                endPos,
                startDistance,
                endDistance,
                startColor,
                endColor,
                vertexBuffer,
                vertexDataOffset,
                meshId
            );

            vertexDataOffset += vertexDataSize * VERTICES_PER_SEGMENT;
        }

        meshPart.setName(`${meshName}.part`);
        meshPart.setBoundingBox(boundingBox.clone());
        lineMesh.setBoundingBox(boundingBox.clone());

        const meshData = lineMesh.getMeshData();
        meshData.mVertexData = new Uint8Array(vertexBuffer.buffer);
        meshData.mIndexData = new Uint8Array(indexBuffer.buffer);

        meshPart.setVertexDataOffset(0);
        meshPart.setIndexDataOffset(0);
        meshPart.setIndexCount(segmentCount * 6 * 3);
        lineMesh.setName(meshName);

        return lineMesh;
    }
}

function writeVertexData(
    cornerOffset: [number, number],
    startPos: [number, number, number],
    endPos: [number, number, number],
    startDistance: number,
    endDistance: number,
    uvOffset: [number, number],
    startColor: [number, number, number, number] | null,
    endColor: [number, number, number, number] | null,
    vertexBuffer: Float32Array,
    bufferOffset: number,
    meshId: number
): void {
    vertexBuffer[bufferOffset + 0] = cornerOffset[0];
    vertexBuffer[bufferOffset + 1] = cornerOffset[1];
    vertexBuffer[bufferOffset + 2] = 0;
    vertexBuffer[bufferOffset + 3] = startPos[0];
    vertexBuffer[bufferOffset + 4] = startPos[1];
    vertexBuffer[bufferOffset + 5] = startPos[2];
    vertexBuffer[bufferOffset + 6] = startDistance;
    vertexBuffer[bufferOffset + 7] = endPos[0];
    vertexBuffer[bufferOffset + 8] = endPos[1];
    vertexBuffer[bufferOffset + 9] = endPos[2];
    vertexBuffer[bufferOffset + 10] = endDistance;
    vertexBuffer[bufferOffset + 11] = uvOffset[0];
    vertexBuffer[bufferOffset + 12] = uvOffset[1];

    if (startColor && endColor) {
        vertexBuffer[bufferOffset + 13] = startColor[0];
        vertexBuffer[bufferOffset + 14] = startColor[1];
        vertexBuffer[bufferOffset + 15] = startColor[2];
        vertexBuffer[bufferOffset + 16] = startColor[3];
        vertexBuffer[bufferOffset + 17] = endColor[0];
        vertexBuffer[bufferOffset + 18] = endColor[1];
        vertexBuffer[bufferOffset + 19] = endColor[2];
        vertexBuffer[bufferOffset + 20] = endColor[3];
    }

    vertexBuffer[bufferOffset + 21] = meshId;
}

function writeSegmentVertices(
    startPos: [number, number, number],
    endPos: [number, number, number],
    startDistance: number,
    endDistance: number,
    startColor: [number, number, number, number],
    endColor: [number, number, number, number],
    vertexBuffer: Float32Array,
    baseOffset: number,
    meshId: number
): void {
    let vertexStride = VERTEX_STRIDE_WITHOUT_COLOR;

    if (startColor && endColor && startColor.length === 4 && endColor.length === 4) {
        vertexStride += COLOR_COMPONENT_COUNT;
    }

    const hasValidColors = startColor && endColor && startColor.length === 4 && endColor.length === 4;
    const colorStart = hasValidColors ? startColor : null;
    const colorEnd = hasValidColors ? endColor : null;

    writeVertexData([-1, -1], startPos, endPos, startDistance, endDistance, [-1, -2], colorStart, colorEnd, vertexBuffer, baseOffset + 0 * vertexStride, meshId);
    writeVertexData([1, -1], startPos, endPos, startDistance, endDistance, [1, -2], colorStart, colorEnd, vertexBuffer, baseOffset + 1 * vertexStride, meshId);
    writeVertexData([-1, 0], startPos, endPos, startDistance, endDistance, [-1, -1], colorStart, colorEnd, vertexBuffer, baseOffset + 2 * vertexStride, meshId);
    writeVertexData([1, 0], startPos, endPos, startDistance, endDistance, [1, -1], colorStart, colorEnd, vertexBuffer, baseOffset + 3 * vertexStride, meshId);
    writeVertexData([-1, 1], startPos, endPos, startDistance, endDistance, [-1, 1], colorStart, colorEnd, vertexBuffer, baseOffset + 4 * vertexStride, meshId);
    writeVertexData([1, 1], startPos, endPos, startDistance, endDistance, [1, 1], colorStart, colorEnd, vertexBuffer, baseOffset + 5 * vertexStride, meshId);
    writeVertexData([-1, 2], startPos, endPos, startDistance, endDistance, [-1, 2], colorStart, colorEnd, vertexBuffer, baseOffset + 6 * vertexStride, meshId);
    writeVertexData([1, 2], startPos, endPos, startDistance, endDistance, [1, 2], colorStart, colorEnd, vertexBuffer, baseOffset + 7 * vertexStride, meshId);
}