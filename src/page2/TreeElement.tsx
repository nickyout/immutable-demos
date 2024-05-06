import React, { CSSProperties } from 'react';
import { TreeState, LeafState, NodeState } from './reducer/types';
import { SideViewLines } from './SideViewLines';

export const borderStyle = '1px solid gray';

const nodeGridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: `repeat(2, min-content)`,
  gridTemplateRows: `repeat(2, min-content)`
};

const leafGridStyle: CSSProperties = {
  width: 4,
  height: 4,
  borderRight: borderStyle,
  borderBottom: borderStyle,
  cursor: 'crosshair'
  // transition: `background-color 0.5s ease`
};

const nodeSideStyle: CSSProperties = {
  display: "flex",
  position: "relative",
  flexDirection: "column",
  alignItems: "end",
  paddingLeft: 24,
}

const leafSideStyle: CSSProperties = {
  width: 16,
  height: 2,
  borderRight: borderStyle,
  borderLeft: borderStyle,
  cursor: 'crosshair'
  // transition: `background-color 0.5s ease`
};

type Props<T> = {
  viewType: 'grid' | 'side';
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
function NodeElement({ value, viewType, onLeafClick }: Props<NodeState>) {
  return (
    <div style={viewType === 'grid' ? nodeGridStyle : nodeSideStyle}>
      {viewType === 'side' && (
        <SideViewLines highlightOnChange={value}/>
      )}
      {value.children.map((child, index) => (
        <TreeElement
          key={index}
          value={child}
          viewType={viewType}
          onLeafClick={onLeafClick}
        />
      ))}
    </div>
  );
}

/**
 * LeafElement is a component that renders a single 'pixel' with a color.
 */
function LeafElement({ value, viewType, onLeafClick }: Props<LeafState>) {
  function onMouseEvent(event: React.MouseEvent) {
    // Triggers when mouse down
    if (event.buttons === 1) {
      onLeafClick(value.address);
      event.preventDefault();
    }
  }
  return (
    <div
      style={{ ...viewType === 'grid' ? leafGridStyle : leafSideStyle, backgroundColor: value.color }}
      onMouseMove={onMouseEvent}
      onMouseDown={onMouseEvent}
    />
  );
}
