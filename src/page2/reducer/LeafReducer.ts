import { Action, MODIFY_COLOR } from "./Action";
import { LeafState } from "./State";

export function LeafReducer(state: LeafState, action: Action) {
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
