import { Layer } from './62193';
import { Scene } from './1316';
import { Hole } from './13264';
import { WallMolding } from './99856';
import { Pocket } from './79668';
import { CornerWindow } from './17123';
import { Content } from './50265';
import { CustomizedModel } from './81634';
import { CustomizedPMModel } from './97088';
import { PMolding } from './96482';
import { PSegmentLoft } from './69712';
import { PExtruding } from './99044';
import { PBox } from './79699';
import { PContent } from './36851';
import { PAssembly } from './2164';
import { SoftCloth } from './44540';
import { DContent } from './47391';
import { Window } from './7782';
import { DHole } from './21766';
import { GussetGroup } from './75806';
import { DExtruding } from './91808';
import { DSweep } from './61526';
import { TgFaceGeometry } from './2066';
import { WindowSill } from './36881';
import { DWindow } from './55944';
import { ParametricOpening } from './78453';
import { NCustomizedFeatureModel } from './63417';
import { ConcealedWork } from './62947';
import { ConcealedWorkTubeTree } from './90241';
import { ConcealedWorkTube } from './49449';
import { JunctionBox } from './81063';
import { NCPContent } from './17004';
import { MeshContent } from './61602';

interface ModelData {
  Class: string;
  [key: string]: unknown;
}

type ViewModel =
  | Layer
  | Scene
  | Hole
  | WallMolding
  | Pocket
  | CornerWindow
  | Content
  | CustomizedModel
  | CustomizedPMModel
  | PMolding
  | PSegmentLoft
  | PExtruding
  | PBox
  | PContent
  | PAssembly
  | SoftCloth
  | DContent
  | Window
  | DHole
  | GussetGroup
  | DExtruding
  | DSweep
  | TgFaceGeometry
  | WindowSill
  | DWindow
  | ParametricOpening
  | NCustomizedFeatureModel
  | ConcealedWork
  | ConcealedWorkTubeTree
  | ConcealedWorkTube
  | JunctionBox
  | NCPContent
  | MeshContent;

export class GeometryFactory {
  /**
   * Creates a view model instance based on the model class type
   * @param modelData - The model data containing class information
   * @param param2 - Second constructor parameter
   * @param param3 - Third constructor parameter
   * @returns The created view model instance or null if class type is not recognized
   */
  createViewModel(
    modelData: ModelData,
    param2: unknown,
    param3: unknown
  ): ViewModel | null {
    let viewModel: ViewModel | null = null;
    const ModelClass = HSConstants.ModelClass;

    switch (modelData.Class) {
      case ModelClass.Layer:
        viewModel = new Layer(modelData, param2, param3);
        break;
      case ModelClass.NgWindow:
        viewModel = new Window(modelData, param2, param3);
        break;
      case ModelClass.NgHole:
      case ModelClass.NgDoor:
        viewModel = new Hole(modelData, param2, param3);
        break;
      case ModelClass.Scene:
        viewModel = new Scene(modelData, param2, param3);
        break;
      case ModelClass.NgBaseboard:
      case ModelClass.NgCornice:
      case ModelClass.NgWallBoardWaistLine:
      case ModelClass.NgWallBoardBaseboard:
      case ModelClass.Mitre:
        viewModel = new WallMolding(modelData, param2, param3);
        break;
      case ModelClass.NgPocket:
        viewModel = new Pocket(modelData, undefined, param2, param3);
        break;
      case ModelClass.NgCornerWindow:
      case ModelClass.NgCornerFlatWindow:
      case ModelClass.NgBayWindow:
      case ModelClass.NgPOrdinaryWindow:
        viewModel = new CornerWindow(modelData, param2, param3);
        break;
      case ModelClass.NgPMolding:
        viewModel = new PMolding(modelData, param2, param3);
        break;
      case ModelClass.DSweep:
        viewModel = new DSweep(modelData, param2, param3);
        break;
      case ModelClass.NgPSegmentLoft:
        viewModel = new PSegmentLoft(modelData, param2, param3);
        break;
      case ModelClass.NgPExtruding:
        viewModel = new PExtruding(modelData, param2, param3);
        break;
      case ModelClass.NgPBox:
        viewModel = new PBox(modelData, param2, param3);
        break;
      case ModelClass.NgPContent:
        viewModel = new PContent(modelData, param2, param3);
        break;
      case ModelClass.NgPAssembly:
      case ModelClass.NgPSlidingDoor:
      case ModelClass.NgPSlidingDoorLeaf:
        viewModel = new PAssembly(modelData, param2, param3);
        break;
      case ModelClass.NgCustomizedModel:
      case ModelClass.NgBeam:
      case ModelClass.NgColumn:
      case ModelClass.NgObstacle:
      case ModelClass.NgFlue:
      case ModelClass.NgSewerPipe:
      case ModelClass.CustomizedBackgroundWall:
      case ModelClass.CustomizedCeilingModel:
      case ModelClass.CustomizedPlatform:
        viewModel = new CustomizedModel(modelData, param2, param3);
        break;
      case ModelClass.NCustomizedCeilingModel:
      case ModelClass.NCustomizedParametricCeiling:
      case ModelClass.NCustomizedParametricRoof:
      case ModelClass.NCustomizedParametricStairs:
      case ModelClass.NCustomizedParametricBackgroundWall:
      case ModelClass.NCPBackgroundWallUnit:
      case ModelClass.NCPBackgroundWallSubpart:
      case ModelClass.NCustomizedBackgroundWall:
      case ModelClass.NCustomizedPlatform:
      case ModelClass.ParametricContentBase:
      case ModelClass.ParametricCurtain:
      case ModelClass.ParametricBathroomCabinet:
      case ModelClass.ParametricContentSubpart:
        viewModel = new NCustomizedFeatureModel(modelData, param2, param3);
        break;
      case ModelClass.ParametricOpening:
      case ModelClass.ParametricDoor:
        viewModel = new ParametricOpening(modelData, param2, param3);
        break;
      case ModelClass.NCPBackgroundWallContent:
      case ModelClass.ParametricModelContent:
        viewModel = new NCPContent(modelData, param2, param3);
        break;
      case ModelClass.NgContent:
      case ModelClass.NgCurtain:
        viewModel = new Content(modelData, param2, param3);
        break;
      case ModelClass.NgSoftCloth:
        viewModel = new SoftCloth(modelData, param2, param3);
        break;
      case ModelClass.DOpening:
      case ModelClass.DAssembly:
      case ModelClass.DMolding:
        viewModel = new PAssembly(modelData, param2, param3);
        break;
      case ModelClass.CustomizedPMModel:
        viewModel = new CustomizedPMModel(modelData, param2, param3);
        break;
      case ModelClass.DExtruding:
        viewModel = new DExtruding(modelData, param2, param3);
        break;
      case ModelClass.DContent:
        viewModel = new DContent(modelData, param2, param3);
        break;
      case ModelClass.DHole:
        viewModel = new DHole(modelData, param2, param3);
        break;
      case ModelClass.DWindow:
        viewModel = new DWindow(modelData, param2, param3);
        break;
      case ModelClass.NgParametricWindowSill:
        viewModel = new WindowSill(modelData, undefined, param2, param3);
        break;
      case ModelClass.GussetGroup:
        viewModel = new GussetGroup(modelData, param2, param3);
        break;
      case ModelClass.NgFace:
      case ModelClass.NgCeiling:
      case ModelClass.NgFloor:
        viewModel = new TgFaceGeometry(modelData, param2, param3);
        break;
      case ModelClass.ConcealedWork:
        viewModel = new ConcealedWork(modelData, param2, param3);
        break;
      case ModelClass.ConcealedWorkTubeTree:
        viewModel = new ConcealedWorkTubeTree(modelData, param2, param3);
        break;
      case ModelClass.ConcealedWorkTube:
        viewModel = new ConcealedWorkTube(modelData, param2, param3);
        break;
      case ModelClass.ConcealedWorkNode:
        viewModel = new JunctionBox(modelData, param2, param3);
        break;
      case ModelClass.MeshContent:
        viewModel = new MeshContent(modelData, param2, param3);
        break;
    }

    return viewModel;
  }
}