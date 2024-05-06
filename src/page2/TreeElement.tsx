import React, { CSSProperties } from 'react';
import { TreeState, LeafState, NodeState } from './reducer/types';

export const borderStyle = '1px solid gray';

const grid2x2Style: CSSProperties = {
  display: "grid",
  gridTemplateColumns: `repeat(2, min-content)`,
  gridTemplateRows: `repeat(2, min-content)`
};

const defaultLeafStyle: CSSProperties = {
  width: 4,
  height: 4,
  borderRight: borderStyle,
  borderBottom: borderStyle,
  cursor: 'crosshair'
  // transition: `background-color 0.5s ease`
};

type Props<T> = {
  value: T;
  onLeafClick: (address: number[]) => void;
};

/**
 * TreeElement is a recursive component that renders a tree of nodes and leaves.
 */
export const TreeElement = React.memo(({ value, ...restProps }: Props<TreeState>) => {
  return value.kind === "node" ? (
    <NodeElement value={value} {...restProps} />
  ) : (
    <LeafElement value={value} {...restProps} />
  );
});

/**
 * NodeElement is a component that renders its children in a grid of 2x2.
 */
function NodeElement({ value, onLeafClick }: Props<NodeState>) {
  return (
    <div style={grid2x2Style}>
      {value.children.map((child, index) => (
        <TreeElement
          key={index}
          value={child}
          onLeafClick={onLeafClick}
        />
      ))}
    </div>
  );
}

/**
 * LeafElement is a component that renders a single 'pixel' with a color.
 */
function LeafElement({ value, onLeafClick }: Props<LeafState>) {
  function onMouseEvent(event: React.MouseEvent) {
    // Triggers when mouse down
    if (event.buttons === 1) {
      onLeafClick(value.address);
      event.preventDefault();
    }
  }
  return (
    <div
      style={{ ...defaultLeafStyle, backgroundColor: value.color }}
      onMouseMove={onMouseEvent}
      onMouseDown={onMouseEvent}
    />
  );
}
