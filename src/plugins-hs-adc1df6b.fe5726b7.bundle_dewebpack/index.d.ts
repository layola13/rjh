/**
 * Roof Design Drawing System - Type Definitions
 * A comprehensive 3D roof modeling and design application
 */

// ============================================================================
// Core Drawing Commands
// ============================================================================

/** Command: Draw rectangle shape */
export * from './cmddrawrectangle';

/** Command: Draw circle shape */
export * from './cmddrawcircle';

/** Command: Draw polygon shapes */
export * from './cmddrawpolygons';

/** Command: Draw lines */
export * from './cmddrawlines';

/** Command: Draw fillet (rounded corner) */
export * from './cmddrawfillet';

/** Command: Draw regular polygon */
export * from './cmddrawregularpolygon';

/** Command: Move point */
export * from './cmdmovepoint';

/** Command: Move curve */
export * from './cmdmovecurve';

/** Command: Move faces */
export * from './cmdmovefaces';

/** Command: Delete vertex */
export * from './cmddeletevertex';

/** Command: Rotate hole */
export * from './cmdrotatehole';

/** Command: Add split points */
export * from './cmdaddsplitpoints';

/** Command: Cut molding */
export * from './cmdcutmolding';

/** Command: Delete mitre molding */
export * from './cmddeletemitremolding';

/** Command: Connect molding */
export * from './cmdconnectmolding';

/** Command: Add guidelines */
export * from './cmdaddguidelines';

/** Command: Clear guidelines */
export * from './cmdclearguidelines';

/** Command: Delete roof region */
export * from './cmddeleteroofregion';

/** Command: Add roof by drawing */
export * from './cmdaddroofbydrawing';

/** Command: Replace parametric stair */
export * from './cmdreplaceparametricstair';

/** Command: Change parametric stair property */
export * from './changeparametricstairpropertycmd';

/** Command: Change pocket outer height */
export * from './cmdchangepocketouterheight';

// ============================================================================
// Request Types (Command Pattern)
// ============================================================================

/** Request: Draw rectangle */
export * from './drawrectanglerequest';

/** Request: Draw line */
export * from './drawlinerequest';

/** Request: Draw fillet */
export * from './drawfilletrequest';

/** Request: Draw polygons */
export * from './drawpolygonsrequest';

/** Request: Base draw request interface */
export * from './drawrequest';

/** Request: Base draw request abstract class */
export * from './basedrawrequest';

/** Request: Move point */
export * from './movepointrequest';

/** Request: Move curve */
export * from './movecurverequest';

/** Request: Move opening */
export * from './moveopeningrequest';

/** Request: Move roof opening */
export * from './moveroofopeningrequest';

/** Request: Rotate hole */
export * from './rotateholerequest';

/** Request: Add roof */
export * from './addroofrequest';

/** Request: Delete roof */
export * from './deleteroofrequest';

/** Request: Replace roof */
export * from './replaceroofrequest';

/** Request: Change roof parameters */
export * from './changeroofparamrequest';

/** Request: Update roof direction */
export * from './updateroofdirectionrequest';

/** Request: Update roof relation */
export * from './updateroofrelationrequest';

/** Request: Toggle generate roof */
export * from './togglegenerateroofrequest';

/** Request: End roof preview */
export * from './endroofpreviewrequest';

/** Request: Delete roof region */
export * from './deleteroofregionrequest';

/** Request: Add opening */
export * from './addopeningrequest';

/** Request: Add opening pocket */
export * from './addopeningpocketrequest';

/** Request: Delete vertex */
export * from './deletevertexrequest';

/** Request: Add split point */
export * from './addsplitpointrequest';

/** Request: Add guideline */
export * from './addguidelinerequest';

/** Request: Delete guideline */
export * from './deleteguidelinerequest';

/** Request: Add wall molding */
export * from './addwallmoldingrequest';

/** Request: Add mitre molding */
export * from './addmitremoldingrequest';

/** Request: Delete mitre molding */
export * from './deletemitremoldingrequest';

/** Request: Connect molding */
export * from './connectmoldingrequest';

/** Request: Cut molding */
export * from './cutmoldingrequest';

/** Request: Change molding offset */
export * from './changemoldingoffsetrequest';

/** Request: Change molding auto-fit */
export * from './changemoldingautofitrequest';

/** Request: Change pocket geometry */
export * from './changepocketgeometryrequest';

/** Request: Change pocket side */
export * from './changepocketsiderequest';

/** Request: Change pocket material */
export * from './changepocketmaterialrequest';

/** Request: Clear roof face material */
export * from './clearrooffacematerialrequest';

/** Request: Reset roof face material */
export * from './resetrooffacematerialrequest';

/** Request: Replace parametric stair */
export * from './replaceparametricstairrequest';

/** Request: Change parametric stair property */
export * from './changeparametricstairpropertyrequest';

// ============================================================================
// Gizmos (Interactive UI Controls)
// ============================================================================

/** Factory for creating gizmos */
export * from './gizmofactory';

/** Gizmo: Draw rectangle */
export * from './drawrectanglegizmo';

/** Gizmo: Draw circle */
export * from './drawcirclegizmo';

/** Gizmo: Draw fillet */
export * from './drawfilletgizmo';

/** Gizmo: Draw regular polygon */
export * from './drawregularpolygongizmo';

/** Gizmo: Triangle */
export * from './trianglegizmo';

/** Gizmo: Add guideline */
export * from './addguidelinegizmo';

/** Gizmo: Angle input */
export * from './angleinputgizmo';

// ============================================================================
// UI Components
// ============================================================================

/** Main UI module */
export * from './ui';

/** Toolbar component */
export * from './toolbar';

/** Header container */
export * from './headercontainer';

/** Header item */
export * from './headeritem';

/** Multi-select button */
export * from './multiselectbutton';

/** Rotate button */
export * from './rotatebutton';

/** Read-only button */
export * from './readonlybtn';

/** Price bar component */
export * from './pricebar';

/** Edit group panel */
export * from './editgrouppanel';

/** Roof choose layer UI */
export * from './roofchooselayer';

/** Left menu for roofs drawing */
export * from './roofsdrawingleftmenu';

/** Login component */
export * from './logincomp';

/** Community share component */
export * from './communityshare';

/** Privacy component */
export * from './privacy';

/** Help component */
export * from './help';

/** Schematic diagram */
export * from './schematicdiagram';

/** Design info display */
export * from './designinfo';

/** Styles */
export * from './styles';

// ============================================================================
// Controllers
// ============================================================================

/** View controller */
export * from './viewcontroller';

/** Input view controller */
export * from './inputviewcontroller';

/** Mode controller */
export * from './modecontroller';

/** Init edge view controller */
export * from './initedgeviewcontroller';

/** Property bar handler */
export * from './propertybarhandler';

/** Roof property bar handler */
export * from './roofpropertybarhandler';

/** Roof face property bar handler */
export * from './rooffacepropertybarhandler';

/** Roof faces property bar handler */
export * from './rooffacespropertybarhandler';

/** Create property bar node utility */
export * from './createpropertybarnode';

/** Property bar edit parametric opening hold action interface */
export * from './ipropertybareditparametricopeingholdaction';

// ============================================================================
// Drawing Environment & Canvas
// ============================================================================

/** Roofs drawing environment */
export * from './roofsdrawingenvironment';

/** Outdoor drawing environment */
export * from './outdoordrawingenvironment';

/** Roofs drawing main module */
export * from './roofsdrawing';

/** Roofs drawing transaction */
export * from './roofsdrawingtransaction';

/** Outdoor drawing transaction */
export * from './outdoordrawingtransaction';

/** Canvas wrapper */
export * from './canvaswrapper';

/** Background component */
export * from './background';

/** Sketch module */
export * from './sketch';

/** Roofs drawing background sketch */
export * from './roofsdrawingbkgsketch';

/** Roof drawing region sketch */
export * from './roofdrawingregionsketch';

/** Roof drawing region */
export * from './roofdrawingregion';

// ============================================================================
// Geometry & Math
// ============================================================================

/** Point class */
export * from './point';

/** Line class */
export * from './line';

/** Circle class */
export * from './circle';

/** Circle arc */
export * from './circlearc';

/** Face class */
export * from './face';

/** Interactive face */
export * from './interactiveface';

/** Interactive ex-sketchable */
export * from './interactiveexsketchable';

/** Reshape face 2D */
export * from './reshapeface2d';

/** Axial rotation */
export * from './axialrotation';

// ============================================================================
// Dimensions
// ============================================================================

/** Line 2D dimension */
export * from './line2ddimension';

/** Background edge dimension */
export * from './backgroundedgedimension';

// ============================================================================
// Utilities
// ============================================================================

/** General utilities */
export * from './util';

/** Utilities module */
export * from './utils';

/** Edge utilities */
export * from './edgeutil';

/** Opening utilities */
export * from './openingutil';

/** Outdoor drawing utilities */
export * from './outdoordrawingutil';

/** Hole snap helper */
export * from './holesnaphelper';

/** Draw lines utility */
export * from './drawlines';

/** Draw line utility */
export * from './drawline';

/** Update scene JSON */
export * from './updatescenejson';

/** Add roof environment */
export * from './addroofenv';

/** NWTK user */
export * from './nwtkuser';

/** Change parametric opening meta adapter */
export * from './changeparametricopeningmetaadapter';

// ============================================================================
// Enums & Types
// ============================================================================

/** Enum: Parametric roof type */
export * from './enparamrooftype';

/** Enum: Parametric opening request type */
export * from './parametricopeingrequesttype';

/** Enum: Parametric opening command type */
export * from './parametricopeingcommandtype';

/** Enum: Save stage */
export * from './savestageenum';

// ============================================================================
// Save System
// ============================================================================

/** Base save service */
export * from './basesaveservice';

/** Auto-save service */
export * from './autosaveservice';

/** Save service */
export * from './saveservice';

/** Save signal */
export * from './savesignal';

/** Save process plugin */
export * from './saveprocessplugin';

/** Save check stage */
export * from './savecheckstage';

/** Save post data stage */
export * from './savepostdatastage';

/** Save get data stage */
export * from './savegetdatastage';

/** Save has task stage */
export * from './savehastaskstage';

// ============================================================================
// Task System
// ============================================================================

/** Task: Read-only check */
export * from './readonlychecktask';

/** Task: Read-only mode check */
export * from './readonlymodechecktask';

/** Task: Room closed check */
export * from './roomclosedchecktask';

/** Task: Version check */
export * from './versionchecktask';

/** Task: Upload thumbnail */
export * from './uploadthumbtask';

/** Task: Loading check */
export * from './loadingchecktask';

/** Task: Login check */
export * from './loginchecktask';

/** Task: Save form check */
export * from './saveformchecktask';

/** Task: Save-as check */
export * from './saveaschecktask';

/** Task: Design edit state */
export * from './designeditstatetask';

/** Task: Auto local persister */
export * from './autolocalpersistertask';

/** Task: Auto remote persister */
export * from './autoremotepersistertask';

/** Task: Export room info */
export * from './exportroominfotask';

// ============================================================================
// Handlers
// ============================================================================

/** Generic handler */
export * from './handler';

/** Export handler */
export * from './exporthandler';

/** Open design handler */
export * from './opendesignhandler';