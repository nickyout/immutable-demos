export type NodeState = {
    kind: "node",
    depth: number;
    children: TreeState[]
};

export type LeafState = {
    kind: "leaf",
    depth: number;
    color: string;
};

export type TreeState = NodeState | LeafState
