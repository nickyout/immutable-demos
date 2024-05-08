import { useState } from 'react';
import Demo1 from './demo1';
import Demo2 from './demo2';
import Demo3 from './demo3';

const pages = [
  {
    label: "1: Test component rendering", 
    element: <Demo1/>,
  }, {
    label: "2: Todo list",
    element: <Demo2/>
  },
  {
    label: "3: State drawing component",
    element: <Demo3/>
  }
];

function App() {
  const [pageIndex, setPageIndex] = useState(0);
  const currentPage = pages[pageIndex];
  return (
    <div style={{ display: 'flex', flex: 1 }}>
      <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'lightgray', padding: 8, minWidth: 240 }}>
        {pages.map((page, index) => (
          <button key={index} style={{ display: 'block', fontWeight: page === currentPage ? 'bold' : undefined, margin: 8 }} onClick={() => setPageIndex(index)}>
            {page.label}
          </button>
        ))}
      </div>
      {pages.map((page, index) => (
        <div key={index} style={{ flex: 1, display: page === currentPage ? 'flex' : 'none', overflow: 'auto' }}>
          {page.element}
        </div>
      ))}
    </div>
  );
}

export default App;
