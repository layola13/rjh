/**
 * plugins-hs-5c263204.bundle - Operation Tools Plugin
 * 
 * Core Purpose: Geometric operations, dimension annotation, parametric arrays, operation controls
 * Module Size: 46KB
 * 
 * Directory Structure:
 * - core/              Core Entry Modules (HomeGPT AI, Context Management)
 * - geometric/         Geometric Operation Tools (Gizmo Controls, Arrays, Transforms)
 * - dimensions/        Dimension Annotation System (20+ annotation modules)
 * - components/        UI Component Library (40+ React components)
 * - operations/        Operation Controls (Commands, Operations)
 * - utils/             Utility Functions & Helper Modules
 * 
 * NOTE: This file uses selective named exports to avoid type conflicts.
 * Some types are exported with aliases to prevent naming collisions.
 */

// ==================== core ====================
// Export from core/activecontext - use Core prefix for conflicting types
export {
  ActiveType as CoreActiveType,
  ActiveContext as CoreActiveContext,
  ContentLift,
  ContentLiftController
} from './core/activecontext';

export * from './core/historymsgmanager';

// Export from core/homegptentry - exclude conflicting types
export {
  HomeGPTEntry,
  NEW_TOOLTIP_KEY,
  Z_INDEX_OFFSET,
  DIALOG_DIMENSIONS,
  FLOATING_CONFIG,
  DEFAULT_AVATAR_URL,
  SESSION_TIMEOUT,
  type DialogueMessage,
  type MessageInteraction,
  type CustomComponentData as CoreCustomComponentData,
  type Position,
  type DragBounds,
  VoiceStatus as CoreVoiceStatus,
  type ArrowDirection,
  OperationId as CoreOperationId,
  type DialogDimensions,
  type FloatingButtonConfig,
  type ChatDialogueRequest,
  type ChatInputs,
  type ChatDialogueResponse,
  type AIGCBenefits,
  type HomeGPTEntryProps
} from './core/homegptentry';

// Export from core/homegptstateenum - exclude RoomInfo conflict (not exported, only used internally)
export {
  HomeGptStateEnum,
  markAutomatedStart,
  markAutomatedInfo,
  markAutomatedCreateInfo,
  markAutomatedMatchTemplate,
  markAutomatedLayoutInfo,
  markAutomatedRoomId
} from './core/homegptstateenum';
export * from './core/messagecenter';
export * from './core/messagemgr';

// ==================== geometric ====================
export * from './geometric/arcarraygizmo';
export * from './geometric/arcarrayparamscard';
export * from './geometric/arcarrayparamscardcontrol';

// Export from geometric/contentmovement - exclude conflicting types
export {
  ContentMovement,
  ContentMovementController
} from './geometric/contentmovement';

// Export from geometric/contentrotation - exclude conflicting types
export {
  ContentRotation,
  ContentRotationController
} from './geometric/contentrotation';

export * from './geometric/coordinateaxis';
export * from './geometric/multicontentselection';

// Skip opmodel to avoid OperationContext conflict with operations/opdebugselection
// If needed, import directly from './geometric/opmodel'

export * from './geometric/opsavedesign';

// Skip opviewcontrol to avoid RoomInfo conflict with core/homegptstateenum
// If needed, import directly from './geometric/opviewcontrol'

// Export from geometric/resizecontent - exclude conflicting DragEventParams
export {
  ResizeContent,
  style as ResizeContentStyle,
  getMatrix4FromTransform,
  getNodeBoundingBox,
  type GizmoStyle,
  type TransformParams,
  type LinearDimensionData
} from './geometric/resizecontent';

export * from './geometric/scalecontext';
export * from './geometric/threedmeasureaxis';
export * from './geometric/wfabase';
export * from './geometric/wfabox';
export * from './geometric/wfacompscoordinateaxis';
export * from './geometric/wfacompsmovement';
export * from './geometric/wfacompsresize';

// Skip wfacompsrotation to avoid RotationColor, RotationScaleFactor conflicts with utils/axiscolorenum
// If needed, import directly from './geometric/wfacompsrotation'

export * from './geometric/wfaselectbound';

// ==================== dimensions ====================
export * from './dimensions/basedimension';

// Skip contentdimension to avoid LinearDimensionGizmoData conflict with lightinglocationdimension
// export * from './dimensions/contentdimension';

// Export from dimensions/contentdimensioncontroller - exclude conflicting types
export {
  ContentDimensionController as DimensionContentController,
  type DimensionFaceType as DimensionControllerFaceType
} from './dimensions/contentdimensioncontroller';

export * from './dimensions/cutmoldingdimension';

// Skip cwcontentdimension to avoid SettingChangedEventData conflict with lightinglocationdimension
// export * from './dimensions/cwcontentdimension';

export * from './dimensions/dimensionhandler';

// Skip furnituredimension to avoid SettingChangedEventData conflict
// (if needed, import directly from './dimensions/furnituredimension')

// Export from dimensions/lightdimension - selective export
export * from './dimensions/lightdimension';

// Export from lightinglocationdimension - only exports LightingLocationDimension class
export {
  LightingLocationDimension
} from './dimensions/lightinglocationdimension';
export * from './dimensions/newconcealedworkdimension';

// Skip newfurnituredimension to avoid multiple conflicts:
// - SettingChangedEventData (with cwcontentdimension)
// - BoundInfo, CurveInfo, DimensionInfo, HelperLinearData, OverlapInfo (with lightdimension)
// (if needed, import directly from './dimensions/newfurnituredimension')

export * from './dimensions/openingcalculateddimension';
export * from './dimensions/openingcalculateddimensionbase';
export * from './dimensions/openingdimension';
export * from './dimensions/parametricopeningcalculateddimension';
export * from './dimensions/parametricopeningdimension';
export * from './dimensions/roofobstacledimension';
export * from './dimensions/svgdimensiontype';
export * from './dimensions/tubelineardimension';

// ==================== components ====================
export * from './components/attachmentform';
export * from './components/blockoptionscomponent';

// Skip checkboxcomponent to avoid CheckboxOption conflict with feedbackcheckboxblock
// If needed, import directly from './components/checkboxcomponent'

export * from './components/checkboxlist';
export * from './components/contentbox';

// Skip dialogue to avoid CustomComponentData conflict with core/homegptentry
// CustomComponentData is already exported as CoreCustomComponentData from core/homegptentry
// If needed, import other exports directly from './components/dialogue'

export * from './components/dropdown';
export * from './components/facematerialcatalog';
export * from './components/facematerialenv';

// Skip favgroup, favinput, favlistpanel to avoid FavoriteGroup conflicts
// These three modules all export FavoriteGroup type - choose one or none
// export * from './components/favgroup';
// export * from './components/favinput';
// export * from './components/favlistpanel';
export * from './components/feedbackblock';
export * from './components/feedbackblocklabel';
export * from './components/feedbackblockwrapper';
export * from './components/feedbackbuttonitemblock';
// Skip feedbackcheckboxblock to avoid CheckboxOption conflict with checkboxcomponent
// export * from './components/feedbackcheckboxblock';
export * from './components/feedbackentry';
export * from './components/feedbackform';
export * from './components/feedbacklist';
export * from './components/feedbacklistrow';
export * from './components/feedbacklistrowcontent';
export * from './components/feedbackradioblock';
export * from './components/feedbackreplycontent';
export * from './components/feedbackswitchblock';
export * from './components/feedbacktextareablock';
export * from './components/feedbacktextareaeditblock';
export * from './components/feedbacktextblock';
export * from './components/feedbackuploaderblock';
export * from './components/feedbackuploadvideo';
export * from './components/feedbackvalueblock';
export * from './components/globalbeginner';

// Skip guide to avoid conflicts with utils/common (PopupPlacement, TipType, Tip, Rect)
// If needed, import directly from './components/guide'

export * from './components/historicalversionframe';
export * from './components/linkcomponent';
export * from './components/listviewframe';
export * from './components/newguidehandle';
export * from './components/popup';
export * from './components/radiocomponent';
export * from './components/themecontext';

// Skip tooltipwrapper to avoid ToolTipWrapperProps conflict with utils/common
// ToolTipWrapperProps is exported from utils/common (canonical source)
// If needed, import other members directly from './components/tooltipwrapper'
export * from './components/tutoriallist';
export * from './components/uguide';
export * from './components/ui';
export * from './components/uploader';
export * from './components/userguidefinispopup';

// Skip voicerecorder to avoid VoiceStatus conflict with core/homegptentry
// VoiceStatus is already exported as CoreVoiceStatus from core/homegptentry
// If needed, import other exports directly from './components/voicerecorder'

// ==================== operations ====================
// Export from operations/baseoperation - exclude OperationId conflict
export * from './operations/baseoperation';

// Skip cmdadddiymaterial and cmdaddmaterial to avoid MaterialData, MeshHandler conflicts
// These modules have similar functionality - only one should be exported

export * from './operations/cmdmirror';
export * from './operations/opcreatefloorplan';

// Skip opdebugselection to avoid OperationContext conflict with geometric/opmodel
// If needed, import directly from './operations/opdebugselection'

// Export OperationId from the canonical source
export {
  OperationId,
  RecommendedOperationTypes,
  OperationParamType
} from './operations/operationid';

export * from './operations/opexitcontrol';
export * from './operations/opimageto3dmodelcontrol';

// Skip oplayoutrooms and oprender to avoid MessageObject conflict
// These modules have similar messaging functionality

export * from './operations/opredocontrol';
export * from './operations/oprenameroom';

export * from './operations/opundocontrol';
export * from './operations/opunspportedcontrol';
export * from './operations/opviewalbum';
export * from './operations/tubebox';
export * from './operations/tubelift';
export * from './operations/tubemovement';

// ==================== utils ====================
// Enums - these are the canonical sources
export * from './utils/applytypeenum';

// Export RotationColor and RotationScaleFactor from canonical source
export {
  RotationScaleFactor,
  RotationColor,
  ResizeBoxColor,
  MoveArrowScaleFactor,
  MoveArrowColor,
  ConstantVector,
  AxisScaleFactor,
  AxisColorEnum
} from './utils/axiscolorenum';

// Export StateEnum and BlockTypeEnum from blocktypeenum (has more complete definition)
export {
  BlockTypeEnum,
  StateEnum,
  feedbackEntryDataTypeMap,
  feedbackStateMap,
  feedbackEntryModalData,
  clientRecordingChannel,
  feedbackEntryModalName,
  feedbackListModalName,
  feedbackListLimit
} from './utils/blocktypeenum';

// Export EditModeEnum from canonical source
export {
  EditModeEnum,
  FaceMeshHandler
} from './utils/editmodeenum';

export * from './utils/webglpointmarkertype';

// Requests
export * from './utils/applycustomizedmodelmaterialrequest';
export * from './utils/applyncustomizedmodelmaterialrequest';
export * from './utils/applyncustomizedmodelmoldingmaterialrequest';
export * from './utils/applyncustomizedparametricbackgroundwallrequest';
export * from './utils/clearcustomizedmodelmaterialrequest';
export * from './utils/mirrorrequest';

// Common utilities
export * from './utils/alixiaomi';

// Export common utils - canonical source for PopupPlacement, TipType, Tip, Rect, ToolTipWrapperProps
export * from './utils/common';

export * from './utils/handler';
export * from './utils/limit';
export * from './utils/storage';

// Note: utils/ contains 700+ additional module files (module_xxxxx.ts)
// These are webpack-decompiled modules and should be imported as needed
// Full export list can be generated if required
