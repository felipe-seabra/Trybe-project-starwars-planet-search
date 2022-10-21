import React from 'react';
import './App.css';
import Table from './components/Table';
import NameFilter from './components/NameFilter';
import Provider from './context/MyContext';

function App() {
  return (
    <Provider>
      <NameFilter />
      <Table />
    </Provider>
  );
}

export default App;
