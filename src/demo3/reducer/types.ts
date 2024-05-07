// Action types and constants

export const INITIALIZE = "initialize";

export type InitializeAction = {
    type: typeof INITIALIZE,
    depth: number;
    color: string;
};

export const MODIFY_COLOR = "modify color";

export type ModifyColorAction = {
    type: typeof MODIFY_COLOR,
    color: string;
    address: number[];
}

export type Action = InitializeAction | ModifyColorAction;

// Tree state types

export type NodeState = {
    kind: "node",
    address: number[];
    children: TreeState[]
};

export type LeafState = {
    kind: "leaf",
    address: number[];
    color: string;
};

export type TreeState = NodeState | LeafState
