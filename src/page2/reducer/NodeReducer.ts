import { Action, INITIALIZE, InitializeAction, MODIFY_COLOR } from "./Action";
import { TreeState, NodeState } from "./State";
import { TreeReducer } from "./TreeReducer";

export function NodeReducer(state: NodeState, action: Action): TreeState {
    switch (action.type) {
        case INITIALIZE:
            return createInitialState(state, action);
        case MODIFY_COLOR:
            const index = action.address[state.depth];
            const nextChildren = [...state.children];
            nextChildren[index] = TreeReducer(nextChildren[index], action);
            return {
                ...state,
                children: nextChildren
            };
        default:
            return state;
    }
}
function createInitialState(state: NodeState, action: InitializeAction) {
    const nextDepth = state.depth + 1;
    const child: TreeState = nextDepth < action.depth ? {
        kind: "node",
        depth: nextDepth,
        children: []
    } : {
        kind: "leaf",
        depth: nextDepth,
        color: action.color
    };
    const children: NodeState["children"] = [];
    const sizeSquared = action.size * action.size;
    for (let i = 0; i < sizeSquared; i++) {
        children.push(TreeReducer(child, action));
    }
    return {
        ...state,
        children
    };
}
