import { useCallback, useReducer, useState } from "react";
import { TreeReducer } from "./reducer/TreeReducer";
import { INITIALIZE, InitializeAction, MODIFY_COLOR } from "./reducer/types";
import { TreeElement, borderStyle } from "./TreeElement";

const initializeAction: InitializeAction = {
  type: INITIALIZE,
  color: '#ffffff',
  depth: 7
};

const colorOptions = [
  { label: "Black", value: "#000000" },
  { label: "White", value: "#ffffff" },
  { label: "Red", value: "#ff0000" },
  { label: "Green", value: "#00ff00" },
  { label: "Blue", value: "#0000ff" }
];

export const Page2 = () => {
  const [color, setColor] = useState('#000000');
  const [viewType, setViewType] = useState<'grid' | 'side'>('grid');
  const [state, dispatch] = useReducer(
    TreeReducer,
    undefined,
    (initialState) => TreeReducer(initialState, initializeAction)
  );
  /**
   * Apply the color to the leaf node in the state at the given address.
   */
  const handleLeafClick = useCallback((address: number[]) => {
    dispatch({
      type: MODIFY_COLOR,
      address: address,
      color: color
    });
  }, [color]);
  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1, overflow: 'auto' }}>
      <div style={{ padding: 8, display: 'flex' }}>
        <select value={color} onChange={(event) => setColor(event.target.value)}>
          {colorOptions.map(({ label, value }) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
        <select value={viewType} onChange={(event) => setViewType(event.target.value as 'grid' | 'side')}>
          <option value="grid">Grid</option>
          <option value="side">Side</option>
        </select>
        <button onClick={() => dispatch(initializeAction)}>Clear</button>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <div style={{ borderTop: borderStyle, borderLeft: borderStyle }}>
          <TreeElement viewType={viewType} value={state} onLeafClick={handleLeafClick}/>
        </div>
      </div>
    </div>
  );
  
};