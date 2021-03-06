import React from 'react';
import TreeItems from './components/TreeItems';
import data from './utils/data.json';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <>
        <h1
          style={{ textAlign: 'center' }}
          data-testid="page-title"
        >
          Tree Items
        </h1>
        <section
          className="application-container"
          data-testid="application-section"
        >
          {Object.values(data).map((item) => (
            <TreeItems
              key={item.id}
              id={item.id}
              name={item.name}
              children={item.children}
            />
          ))}
        </section>
      </>
    );
  }
}

export default App;
