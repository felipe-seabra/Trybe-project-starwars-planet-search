import React, { useContext } from 'react';
import { Mycontext } from '../context/MyContext';

function NameFilter() {
  const { nameFilter, setNameFilter } = useContext(Mycontext);
  return (
    <div className="name-filter">
      <input
        data-testid="name-filter"
        id="nameFilter"
        type="text"
        placeholder="Buscar por nome"
        value={ nameFilter }
        onChange={ (e) => setNameFilter(e.target.value) }
      />
    </div>
  );
}

export default NameFilter;
