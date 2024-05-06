import { InitializeAction, NodeState, TreeState } from "./types";

export function initializeChildren(state: NodeState, action: InitializeAction): TreeState {
    const childDepth = state.address.length + 1;
    const isLastDepth = childDepth === action.depth;
    const children: NodeState["children"] = [];
    const numChildren = 4;
    for (let i = 0; i < numChildren; i++) {
        let child: TreeState;
        if (isLastDepth) {
            child = {
                kind: "leaf",
                address: [...state.address, i],
                color: action.color
            };
        } else {
            child = initializeChildren({
                kind: "node",
                address: [...state.address, i],
                children: []
            }, action);
        }
        children.push(child);
    }
    return {
        ...state,
        children
    };
}
