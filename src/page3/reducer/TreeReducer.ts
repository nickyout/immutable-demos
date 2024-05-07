import { TreeState, Action, INITIALIZE, MODIFY_COLOR } from "./types";
import { initializeChildren } from "./initializeChildren";

export function TreeReducer(state: TreeState = { kind: "node", address: [], children: [] }, action: Action): TreeState {
    if (state.kind === "node") {
        // Node
        switch (action.type) {
            case INITIALIZE:
                return initializeChildren(state, action);
            case MODIFY_COLOR:
                // get the index of the child to modify
                const index = action.address[state.address.length];
                /** --------- Start of assignment --------- */

                // modify the child
                TreeReducer(state.children[index], action);
                // return the modified state
                return state;

                /** --------- End of assignment --------- */
                default:
                return state;
        }
    } else {
       // Leaf 
        switch (action.type) {
            case MODIFY_COLOR:
                /** --------- Start of assignment --------- */

                state.color = action.color;
                return state;

                /** --------- End of assignment --------- */
                default:
                return state;
        }
    }
}
