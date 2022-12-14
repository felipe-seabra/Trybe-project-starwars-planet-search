import React, { useContext } from 'react';
import { Mycontext } from '../context/MyContext';

function Table() {
  const { planets, nameFilter, filterNumeric } = useContext(Mycontext);

  const dataFiltered = planets
    // Filtro de texto
    .filter((planet) => planet.name.toLowerCase().includes(nameFilter.toLowerCase()))
    // Filtro Numérico
    .filter((planet) => filterNumeric.every(({ column, comparison, value }) => {
      if (comparison === 'maior que') {
        return Number(planet[column]) > Number(value);
      }
      if (comparison === 'menor que') {
        return Number(planet[column]) < Number(value);
      }
      return Number(planet[column]) === Number(value);
    }));

  return (
    <div className="container">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital_period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>Url</th>
          </tr>
        </thead>
        <tbody>
          {dataFiltered.map((planet) => (
            <tr key={ planet.name } className="planet-name">
              {Object.values(planet).map((element) => (
                <td key={ element } className="planet-element">
                  {element}
                </td>))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
