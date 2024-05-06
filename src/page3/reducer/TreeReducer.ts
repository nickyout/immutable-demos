import { TreeState, Action, INITIALIZE, MODIFY_COLOR } from "./types";
import { initializeChildren } from "./initializeChildren";

export function TreeReducer(state: TreeState = { kind: "node", address: [], children: [] }, action: Action): TreeState {
    if (state.kind === "node") {
        // Node
        switch (action.type) {
            case INITIALIZE:
                return initializeChildren(state, action);
            case MODIFY_COLOR:
                const index = action.address[state.address.length];
                const nextChildren = [...state.children];
                nextChildren[index] = TreeReducer(nextChildren[index], action);
                return {
                    ...state,
                    children: nextChildren
                };
            default:
                return state;
        }
    } else {
       // Leaf 
        switch (action.type) {
            case MODIFY_COLOR:
                return {
                    ...state,
                    color: action.color
                };
            default:
                return state;
        }
    }
}
