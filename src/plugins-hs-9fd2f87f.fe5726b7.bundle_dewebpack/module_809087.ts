export default function handleDoorConfiguration(
  e: unknown,
  paramConfig: ParameterConfiguration | null | undefined,
  nodeConfig: NodeConfiguration | null | undefined
): void {
  if (!paramConfig) return;

  const config = paramConfig.json ?? paramConfig;
  if (!config) return;

  const handleFreeFlag = config.states.find(
    (state) => state.localId === "ID_handlefree_flag"
  );
  if (!handleFreeFlag) return;

  const doorOffsetState = config.states.find(
    (state) => state.localId === "ID_door_offset_h"
  );

  const doorHeightConstraint = config.constraints.find(
    (constraint) => constraint.localId === "id_doorAsm_h_eq"
  );

  if (doorOffsetState && doorHeightConstraint && handleFreeFlag.value === 1) {
    doorHeightConstraint.equation = "id_doorAsm_h = ID_H - ID_door_offset_h";
  }

  if (nodeConfig?.json && Array.isArray(nodeConfig.json.children)) {
    const handleChildIds: string[] = [];

    nodeConfig.json.children.forEach((child) => {
      if (child.localId && child.localId.toLowerCase().indexOf("id_handle") === 0) {
        handleChildIds.push(child.localId);
      }
    });

    if (!nodeConfig.excluded) {
      nodeConfig.excluded = {};
    }

    if (!nodeConfig.excluded.children) {
      nodeConfig.excluded.children = [];
    }

    handleChildIds.forEach((childId) => {
      if (nodeConfig.excluded!.children!.indexOf(childId) === -1) {
        nodeConfig.excluded!.children!.push(childId);
      }
    });
  }
}

interface State {
  localId: string;
  value?: number;
}

interface Constraint {
  localId: string;
  equation: string;
}

interface ConfigData {
  states: State[];
  constraints: Constraint[];
}

interface ParameterConfiguration {
  json?: ConfigData;
  states: State[];
  constraints: Constraint[];
}

interface ChildNode {
  localId?: string;
}

interface NodeData {
  children: ChildNode[];
}

interface ExcludedData {
  children?: string[];
}

interface NodeConfiguration {
  json?: NodeData;
  excluded?: ExcludedData;
}