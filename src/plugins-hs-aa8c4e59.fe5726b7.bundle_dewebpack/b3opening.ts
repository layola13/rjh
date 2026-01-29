import { B3Entity } from './B3Entity';
import { PocketPredicate, ParametricWindowPredicate, ParametricOpeningPredicate, ParametricPocketPredicate, FacePredicate, OpeningPredicate, NParametricWindowSillPredicate } from './Predicates';
import { turnEntityToBom3Entity, setObjectParameterValues } from './EntityUtils';
import { B3Pocket } from './B3Pocket';
import { B3ParametricPocket } from './B3ParametricPocket';
import { B3Face } from './B3Face';
import { B3Stone } from './B3Stone';

interface Entity {
  children: Entity[];
  instance: {
    id: string;
    getParameterValue(key: string): unknown;
    size?: number[];
  };
  getParameterValue(key: string): unknown;
}

interface Context {
  dbApi: {
    findAll(entities: Entity[], predicate: unknown): Entity[];
  };
}

interface Category {
  seekId: string;
  aliModelId: string;
  categoryType: string;
  displayName: string;
  textureUrl: string;
  attributeId?: string;
}

interface Material {
  category?: Category;
}

interface PaveInfo {
  material: Material[];
}

interface Region {
  paveInfo?: PaveInfo;
}

interface Sketch {
  regions: Region[];
}

interface TwoDimensional {
  sketches: Sketch[];
}

interface FaceData {
  entity: {
    instance: {
      id: string;
    };
    category?: Category;
  };
  '2D'?: TwoDimensional;
  material?: Material;
  side?: string;
  length?: number;
}

interface Bom3EntityData {
  instance: {
    id: string;
    size?: number[];
  };
}

interface Bom3Data {
  entity: Bom3EntityData;
  arcHole?: unknown;
  hostId?: unknown;
  moldings?: unknown[];
  faces?: FaceData[];
  stones?: unknown[];
}

export class B3Opening extends B3Entity {
  constructor(context: Context) {
    super(context);
  }

  buildBom3Data(entity: Entity): Bom3Data {
    const data: Bom3Data = {
      entity: turnEntityToBom3Entity(entity)
    };

    setObjectParameterValues(data, entity, {
      arcHole: 'arcHole',
      hostId: 'hostId'
    });

    const pockets = this.context.dbApi.findAll(entity.children, new PocketPredicate());
    if (pockets.length) {
      data.moldings = pockets.map(pocket => 
        new B3Pocket(this.context).buildBom3Data(pocket)
      );
    }

    const isParametricWindow = new ParametricWindowPredicate().execute(entity);
    const isParametricOpening = new ParametricOpeningPredicate().execute(entity);

    if (isParametricWindow || isParametricOpening) {
      const parametricPockets = this.context.dbApi
        .findAll(entity.children, new ParametricPocketPredicate())
        .map(pocket => new B3ParametricPocket(this.context).buildBom3Data(pocket));

      if (parametricPockets.length > 0) {
        data.moldings = parametricPockets;
      }
    }

    data.faces = this.context.dbApi
      .findAll(entity.children, new FacePredicate())
      .filter(face => {
        const faceType = face.getParameterValue('type');
        return !faceType || faceType === 'side';
      })
      .map(face => new B3Face(this.context).buildBom3Data(face));

    const stoneFaceId = entity.instance.getParameterValue('stoneFaceId');
    let stoneFaces = data.faces.filter(face => 
      face.entity.instance.id === stoneFaceId
    );

    if (stoneFaces.length > 0) {
      stoneFaces = stoneFaces.map(face => {
        face.entity.instance.id += '-stone';

        const firstMaterial = face['2D']?.sketches[0]?.regions[0]?.paveInfo?.material[0];
        const entitySize = face.entity.instance.size || [0];
        const maxLength = Math.max(...entitySize);

        const stoneData = {
          entity: {
            ...face.entity,
            category: {
              seekId: '6d15a4da-b6c2-40ef-a88c-309edc84b26c',
              aliModelId: '59504110',
              categoryType: '972cba12-99d7-4546-8639-63c2f41e987f',
              displayName: '过门石',
              textureUrl: ''
            }
          },
          material: firstMaterial,
          side: 'inner',
          length: maxLength
        };

        if (stoneData.material?.category) {
          stoneData.material.category.attributeId = 'attr-Quantity-Calculation-Material';
        }

        return stoneData;
      });

      data.stones = stoneFaces;
    }

    const isOpening = new OpeningPredicate().execute(entity);
    if (isOpening || isParametricOpening || isParametricWindow) {
      const windowSills = this.context.dbApi
        .findAll(entity.children, new NParametricWindowSillPredicate())
        .map(sill => new B3Stone(this.context).buildBom3Data(sill));

      if (windowSills.length > 0) {
        data.stones = windowSills;
      }
    }

    return data;
  }
}