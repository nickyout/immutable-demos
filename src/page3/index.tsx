import { useCallback, useState } from "react";
import { Action, INITIALIZE, InitializeAction, MODIFY_COLOR, TreeState } from "./reducer/types";
import { TreeElement, borderStyle } from "./TreeElement";
import { ConnectedProps, connect } from "react-redux";

export const initializeAction: InitializeAction = {
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

const Page3 = ({ state, dispatch }: ConnectedProps<typeof connector>) => {
  const [color, setColor] = useState('#000000');
  const [viewType, setViewType] = useState<'grid' | 'side'>('grid');
  /**
   * Apply the color to the leaf node in the state at the given address.
   */
  const handleLeafClick = useCallback((address: number[]) => {
    dispatch({
      type: MODIFY_COLOR,
      address: address,
      color: color
    });
  }, [dispatch, color]);
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

const connector = connect(
  (state: TreeState) => ({
    state
  }),
  (dispatch) => ({
    dispatch: (action: Action) => dispatch(action),
  })
);

export default connector(Page3);