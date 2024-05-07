import React, { memo, useEffect, useRef, useState } from 'react';
import { borderStyle } from './TreeElement';
import { NodeState } from './reducer/types';

const sideBorderStyleHighlight = '1px solid black';
const sideBorderRadius = 4;

export const SideViewLines = memo(({ highlightOnChange }: { highlightOnChange: NodeState; }) => {
  return (
    <>
      <SideViewLine top="12.5%" highlightOnChange={highlightOnChange.children[0]} />
      <SideViewLine bottom="12.5%" highlightOnChange={highlightOnChange.children[3]} />
      <SideViewLine top="37.5%" highlightOnChange={highlightOnChange.children[1]} />
      <SideViewLine bottom="37.5%" highlightOnChange={highlightOnChange.children[2]} />
      <SideViewDot highlightOnChange={highlightOnChange} />
    </>
  );
});

const SideViewLine = memo(({ top, bottom, highlightOnChange }: { top?: string; bottom?: string; highlightOnChange: any; }) => {
  const highlight = useHighlightOnChange(highlightOnChange);
  const currentBorderStyle = highlight ? sideBorderStyleHighlight : borderStyle;
  return (
    <div style={{
      position: 'absolute',
      top: top ?? '50%',
      bottom: bottom ?? '50%',
      left: 0,
      width: 24,
      borderLeft: currentBorderStyle,
      borderTop: top ? currentBorderStyle : undefined,
      borderTopLeftRadius: top ? sideBorderRadius : undefined,
      borderBottom: bottom ? currentBorderStyle : undefined,
      borderBottomLeftRadius: bottom ? sideBorderRadius : undefined
    }} />
  );
});

function SideViewDot({ highlightOnChange }: { highlightOnChange: NodeState; }) {
  const highlight = useHighlightOnChange(highlightOnChange);
  const currentBorderStyle = highlight ? sideBorderStyleHighlight : borderStyle;
  const [mouseOver, setMouseOver] = useState(false);
  const { children, ...node } = highlightOnChange;
  return (
    <div
      style={{
        position: 'absolute',
        top: 'calc(50% - 3px)',
        left: -3,
        backgroundColor: 'white',
        borderRadius: 3,
        border: currentBorderStyle,
        minWidth: 6,
        minHeight: 6,
        zIndex: mouseOver ? 1 : undefined,
        boxShadow: mouseOver ? '2px 2px 4px 2px rgba(0, 0, 0, 0.5)' : undefined
      }}
      onMouseOver={() => setMouseOver(true)}
      onMouseOut={() => setMouseOver(false)}
    >
      {mouseOver && (
        <span style={{ whiteSpace: 'pre', fontFamily: 'monospace', fontSize: 12, lineHeight: '100%', display: 'inline-block', padding: 8 }}>
          {JSON.stringify(node, null, 2)}
        </span>
      )}
    </div>
  );
}

const useHighlightOnChange = (highlightOnChange: any) => {
  const [highlight, setHighlight] = useState(false);
  const skipInitialRender = useRef(true);
  useEffect(() => {
    if (skipInitialRender.current) {
      skipInitialRender.current = false;
      return;
    } else {
      setHighlight(true);
      const id = setTimeout(() => {
        setHighlight(false);
      }, 500);
      return () => clearTimeout(id);
    }
  }, [highlightOnChange]);
  return highlight;
};
