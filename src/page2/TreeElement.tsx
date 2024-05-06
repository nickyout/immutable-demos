import React, { useMemo } from 'react';
import { TreeState, LeafState, NodeState } from './reducer/State';

export const borderStyle = `1px solid gray`;
export const highlightColor = "#000000";

type Props<T> = {
  value: T;
  onLeafClick: (address: number[]) => void;
};

export const TreeElement = React.memo(function InnerGridElement({ value, ...restProps }: Props<TreeState>) {
  return value.kind === "node" ? (
    <NodeElement value={value} {...restProps} />
  ) : (
    <LeafElement value={value} {...restProps} />
  );
});
function NodeElement({ value, onLeafClick }: Props<NodeState>) {
  const childCallbacks = useMemo(() => Array.from({ length: value.children.length })
    .fill(undefined)
    .map((_, index) => (address: number[]) => onLeafClick([index, ...address])), [value.children.length, onLeafClick]);

  const style = useMemo(() => ({
    display: "grid",
    gridTemplateColumns: `repeat(${Math.sqrt(value.children.length)}, min-content)`,
    gridTemplateRows: `repeat(${Math.sqrt(value.children.length)}, min-content)`
  }), [value.children.length]);
  return (
    <div style={style}>
      {value.children.map((childState, index) => (
        <TreeElement
          key={index}
          value={childState}
          onLeafClick={childCallbacks[index]} />
      ))}
    </div>
  );
}
function LeafElement({ value, onLeafClick }: Props<LeafState>) {
  return (
    <div
      className={value.color === highlightColor ? "color" : undefined}
      style={{ width: 4, height: 4, borderRight: borderStyle, borderBottom: borderStyle, transition: `background-color 0.5s ease` }}
      onMouseMove={(event) => {
        onLeafClick([]);
        event.preventDefault();
      }} />
  );
}
