import React, { useContext } from 'react';
import { Mycontext } from '../context/MyContext';

function Table() {
  const { planets, nameFilter, filterNumeric } = useContext(Mycontext);

  const dataFiltered = planets
    // Filtro de texto
    .filter((planet) => planet.name.toLowerCase().includes(nameFilter.toLowerCase()))
    // Filtro Numérico
    .filter((planet) => filterNumeric.every(({ column, comparison, value }) => {
      /*
      + Está verificando se o valor é numérico. Quando o unário +for aplicado,
      ele retornará a representação numérica de um objeto ou NaN, que será a base para que
      a comparação seja aprovada ou reprovada.
      (https://stackoverflow.com/questions/14108008/javascript-comparison-value-value)
      */
      switch (comparison) {
      case 'maior que':
        return +planet[column] > +value;
      case 'menor que':
        return +planet[column] < +value;
      case 'igual a':
        return +planet[column] === +value;
      default:
        return planet;
      }
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
