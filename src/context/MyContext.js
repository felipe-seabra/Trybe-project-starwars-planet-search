import React, { createContext, useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import fetchAPI from '../services/fetchAPI';

export const Mycontext = createContext();

function Provider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [nameFilter, setNameFilter] = useState('');

  useEffect(() => {
    const fetchPlanets = async () => {
      const data = await fetchAPI();
      const { results } = data;
      const excludeResidents = results.map((element) => {
        delete element.residents; // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/delete
        return element;
      });
      setPlanets(excludeResidents);
    };

    fetchPlanets();
  }, []);

  const contextValue = useMemo(() => ({ // https://pt-br.reactjs.org/docs/hooks-reference.html#usememo (estava dando erro no lint e pesquisei um pouco)
    planets,
    nameFilter,
    setNameFilter,
  }), [planets, nameFilter]);

  return (
    <Mycontext.Provider value={ contextValue }>
      {children}
    </Mycontext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default Provider;
