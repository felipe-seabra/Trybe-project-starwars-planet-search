import React from 'react';
import './App.css';
import Table from './components/Table';
import NameFilter from './components/NameFilter';
import Provider from './context/MyContext';
import NumberFilter from './components/NumberFilter';

function App() {
  return (
    <Provider>
      <NameFilter />
      <NumberFilter />
      <Table />
    </Provider>
  );
}

export default App;
