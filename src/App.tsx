import { useState } from 'react';
import { Page1 } from './page1/Page1';
import { Page2 } from './page2/Page2';

const pages = [
  {
    label: "Test component rendering", 
    element: <Page1/>,
  }, {
    label: "page2",
    element: <Page2/>
  }
];

function App() {
  const [pageIndex, setPageIndex] = useState(0);
  const currentPage = pages[pageIndex];
  return (
    <div style={{ display: 'flex', flex: 1 }}>
      <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'lightgray', padding: 8 }}>
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
