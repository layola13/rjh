import { Layer } from '../objects/base/spaceinfo';
import { Scene } from '../types/ContentType';
import { Hole } from '../types/HoleParameter';
import { WallMolding } from '../objects/structural/wallmolding_io';
import { Pocket } from '../building/opening/types';
import { CornerWindow } from '../objects/opening/cornerwindow';
import { Content } from '../types/LineSegment';
import { CustomizedModel } from '../lighting/customizedmodellightband';
import { CustomizedPMModel } from '../parametric/CustomizedPMModel';
import { PMolding } from '../parametric/PMolding';
import { PSegmentLoft } from '../parametric/PSegmentLoft';
import { PExtruding } from '../parametric/PExtruding';
import { PBox } from '../parametric/PBox';
import { PContent } from '../parametric/PContent';
import { PAssembly } from '../parametric/PAssembly';
import { SoftCloth } from '../objects/soft/SoftCloth';
import { DContent } from '../objects/DContent';
import { Window } from '../objects/opening/Window';
import { DHole } from '../objects/opening/DHole';
import { GussetGroup } from '../objects/pattern';
import { DExtruding } from '../kernel/dextruding_io';
import { DSweep } from '../kernel/dsweep_io';
import { TgFaceGeometry } from '../geometry/tgfacegeometry';
import { WindowSill } from '../objects/opening/windowsill';
import { DWindow } from '../objects/opening/dwindow_io';
import { ParametricOpening } from '../objects/opening/ParametricOpening';
import { NCustomizedFeatureModel } from '../building/iroofloopbaseinfo';
import { ConcealedWork } from '../mep/Node';
import { ConcealedWorkTubeTree } from '../mep/TubeTree';
import { ConcealedWorkTube } from '../mep/TubeTree';
import { JunctionBox } from '../mep/junctionbox';
import { NCPContent } from '../objects/ncpcontent';
import { MeshContent } from '../objects/meshcontent';

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