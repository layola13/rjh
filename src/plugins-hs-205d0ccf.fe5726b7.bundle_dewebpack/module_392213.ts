const TOOLBAR_IDS = {
  DEFAULT_TOOLBAR_ID: "default",
  PLANE_TOOLBAR_ID: "plane",
  RCP_TOOLBAR_ID: "rcp",
  MIXPAINT_TOOLBAR_ID: "mixpaint",
  CONCEALEDWORKV2_TOOLBAR_ID: "concealedworkv2",
  FIRST_PERSON_3D_TOOLBAR_ID: "firstperson3d",
  ORBIT_VIEW_3D_TOOLBAR_ID: "orbitview3d",
  ORTH_VIEW_3D_TOOLBAR_ID: "orthview3d",
  CONCEALEDWORKV2_FIRST_PERSON_3D_TOOLBAR_ID: "concealedworkfp3dv2",
  CONCEALEDWORKV2_ORBIT_VIEW_3D_TOOLBAR_ID: "concealedworkov3dv2",
  CONCEALEDWORKV2_ORTH_VIEW_3D_TOOLBAR_ID: "concealedworkorth3dv2",
  TPZZ_TOOLBAR_ID: "iHomeEditor"
} as const;

export type ToolbarId = typeof TOOLBAR_IDS[keyof typeof TOOLBAR_IDS];

export default TOOLBAR_IDS;