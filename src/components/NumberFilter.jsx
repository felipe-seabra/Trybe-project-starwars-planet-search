import React, { useContext, useState } from 'react';
import { Mycontext } from '../context/MyContext';

function NumberFilter() {
  const { filterNumeric, setFilterNumeric } = useContext(Mycontext);

  const [numberFilters, setNumberFilters] = useState({
    column: 'population',
    comparison: 'maior que',
    value: '0',
  });

  const { column, comparison, value } = numberFilters;

  const [columnFilter, setcolumnFilter] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);

  const comparisonFilter = [
    'maior que',
    'menor que',
    'igual a',
  ];

  const filter = () => {
    setFilterNumeric([...filterNumeric, numberFilters]);
    const newColumn = columnFilter.filter((e) => e !== numberFilters.column);
    setcolumnFilter([
      ...newColumn,
    ]);
    console.log(newColumn);
  };

  return (
    <form className="container">
      <select
        className="select-inputs"
        data-testid="column-filter"
        name="column"
        value={ column }
        onChange={
          (e) => setNumberFilters({ ...numberFilters, column: e.target.value })
        }
      >
        {columnFilter.map((columnMap) => (
          <option key={ columnMap } value={ columnMap }>
            {columnMap}
          </option>
        ))}
      </select>

      <select
        className="select-inputs"
        data-testid="comparison-filter"
        name="comparison"
        value={ comparison }
        onChange={
          (e) => setNumberFilters({ ...numberFilters, comparison: e.target.value })
        }
      >
        {comparisonFilter.map((comparisonMap) => (
          <option key={ comparisonMap } value={ comparisonMap }>
            {comparisonMap}
          </option>
        ))}
      </select>

      <input
        className="select-inputs"
        data-testid="value-filter"
        type="number"
        value={ value }
        onChange={
          (e) => setNumberFilters({ ...numberFilters, value: e.target.value })
        }
      />

      <button
        className="btn-filter"
        type="button"
        data-testid="button-filter"
        onClick={ filter }
      >
        Filtrar
      </button>
    </form>
  );
}

export default NumberFilter;
