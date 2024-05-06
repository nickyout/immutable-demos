import { useCallback, useReducer } from "react";
import { TreeReducer } from "./reducer/TreeReducer";
import { INITIALIZE, InitializeAction, MODIFY_COLOR } from "./reducer/Action";
import { TreeElement, borderStyle, highlightColor } from "./TreeElement";

const initialColor = "#FFFFFF";

const initializeAction: InitializeAction = {
  type: INITIALIZE,
  color: initialColor,
  size: 2,
  depth: 7
};

export const Page2 = () => {
    const [state, dispatch] = useReducer(TreeReducer, { kind: "node", depth: 0, children: [] }, (initialState) => TreeReducer(initialState, initializeAction));
    const onLeafClick = useCallback((address: number[]) => {
      dispatch({
        type: MODIFY_COLOR,
        address: address,
        color: highlightColor
      });
    }, []);
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <button onClick={() => dispatch(initializeAction)}>Reset</button>
        <div style={{ borderTop: borderStyle, borderLeft: borderStyle }}>
          <TreeElement value={state} onLeafClick={onLeafClick}/>
        </div>
      </div>
    );
  
};