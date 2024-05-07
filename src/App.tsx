import { useState } from 'react';
import Page1 from './demo1';
import Page2 from './demo2';
import Page3 from './demo3';

const pages = [
  {
    label: "Test component rendering", 
    element: <Page1/>,
  }, {
    label: "Todo list",
    element: <Page2/>
  },
  {
    label: "State drawing component",
    element: <Page3/>
  }
];

function App() {
  const [pageIndex, setPageIndex] = useState(0);
  const currentPage = pages[pageIndex];
  return (
    <div style={{ display: 'flex', flex: 1 }}>
      <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'lightgray', padding: 8, minWidth: 220 }}>
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
