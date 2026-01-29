interface Face {
  id: string;
  path: string;
}

interface OutterFace {
  path: string;
}

interface InputModel {
  innerFaces: Face[];
  outterFaces: OutterFace[];
}

interface BoundingBox {
  width: number;
  height: number;
  x: number;
  y: number;
  x2: number;
  y2: number;
  cx: number;
  cy: number;
}

interface InstanceModel {
  template: Face[];
  outterFaces: string[];
}

interface InstanceModelResult {
  mdl: InstanceModel;
  instancedBBox: BoundingBox;
}

interface Dimensions {
  width: number;
  height: number;
  cx: number;
  cy: number;
}

interface PathCommand {
  0: string;
  [key: number]: number | string;
  length: number;
}

type PathArray = PathCommand[];

interface PathItem {
  id: string;
  path: PathArray;
}

interface ModelWithTemplate {
  mdl: {
    template: PathItem[];
  };
}

declare global {
  var SVG: {
    pathBBox(path: string): BoundingBox | null;
    transformPath(path: string | PathArray, matrix: any): PathArray;
    Matrix: {
      new (): {
        scale(x: number, y: number, cx: number, cy: number): any;
        translate(x: number, y: number): any;
      };
    };
  };
}

const modelUtils = {
  getBoundingBox(model: InputModel | null): BoundingBox | null {
    if (!model) return null;

    const innerFaces = model.innerFaces;
    let concatenatedPath = "";

    for (let index = 0, length = innerFaces.length; index < length; index++) {
      concatenatedPath += innerFaces[index].path + " ";
    }

    return SVG.pathBBox(concatenatedPath);
  },

  getInstanceModel(
    model: InputModel | null,
    dimensions: Dimensions
  ): InstanceModelResult | undefined {
    if (!model) {
      return undefined;
    }

    const width = Number(dimensions.width);
    const height = Number(dimensions.height);
    const halfWidth = width / 2;
    const halfHeight = height / 2;

    const instancedBBox: BoundingBox = {
      width,
      height,
      x: dimensions.cx - halfWidth,
      y: dimensions.cy - halfHeight,
      x2: dimensions.cx + halfWidth,
      y2: dimensions.cy + halfHeight,
      cx: dimensions.cx,
      cy: dimensions.cy,
    };

    const instanceModel: InstanceModel = {
      template: [],
      outterFaces: [],
    };

    const scaleMatrix = new SVG.Matrix().scale(
      -1,
      -1,
      dimensions.cx,
      dimensions.cy
    );
    const translateMatrix = new SVG.Matrix().translate(
      0 - instancedBBox.x,
      0 - instancedBBox.y
    );
    const combinedMatrix = new SVG.Matrix()
      .scale(-1, -1, dimensions.cx, dimensions.cy)
      .translate(0 - instancedBBox.x, 0 - instancedBBox.y);

    model.innerFaces.forEach((face) => {
      const faceId = face.id;
      let transformedPath = SVG.transformPath(face.path, scaleMatrix);
      transformedPath = SVG.transformPath(transformedPath, translateMatrix);
      SVG.transformPath(face.path, combinedMatrix);

      instanceModel.template.push({
        id: faceId,
        path: transformedPath,
      });
    });

    model.outterFaces.forEach((face) => {
      let transformedPath = SVG.transformPath(face.path, scaleMatrix);
      transformedPath = SVG.transformPath(transformedPath, translateMatrix);
      SVG.transformPath(face.path, combinedMatrix);

      instanceModel.outterFaces.push(transformedPath);
    });

    return {
      mdl: instanceModel,
      instancedBBox,
    };
  },

  pathsSeperate(modelData: ModelWithTemplate): void {
    const separatedPaths: PathItem[] = [];
    let faceCounter = 0;

    modelData.mdl.template.forEach((item) => {
      const pathArray = item.path;

      for (let i = 0, length = pathArray.length; i < length; i++) {
        const segmentPath: PathCommand[] = [];

        if (pathArray[i][0] === "M") {
          segmentPath.push(pathArray[i]);

          for (
            let j = i + 1;
            j < pathArray.length && pathArray[j][0] !== "M";
            j++
          ) {
            segmentPath.push(pathArray[j]);
          }

          i = segmentPath.length + i - 1;
        } else if (i === 0) {
          break;
        }

        const newFace: PathItem = {
          id: "face" + ++faceCounter,
          path: segmentPath.slice(0),
        };

        separatedPaths.push(newFace);
      }
    });

    modelData.mdl.template = separatedPaths;
  },
};

export default modelUtils;