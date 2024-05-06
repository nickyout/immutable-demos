import { Action } from "./Action";
import { LeafReducer } from "./LeafReducer";
import { NodeReducer } from "./NodeReducer";
import { TreeState } from "./State";

export function TreeReducer(state: TreeState, action: Action): TreeState {
    if (state.kind === "node") {
        return NodeReducer(state, action);
    } else {
        return LeafReducer(state, action);
    }
}
