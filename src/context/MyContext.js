import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import fetchAPI from '../services/fetchAPI';

export const Mycontext = createContext();

function Provider({ children }) {
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    const fetchPlanets = async () => {
      const data = await fetchAPI();
      const { results } = data;
      const excludeResidents = results.map((element) => {
        delete element.residents; // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/delete
        return element;
      });
      // console.log(excludeResidents);
      setPlanets(excludeResidents);
    };

    fetchPlanets();
  }, []);

  return (
    <Mycontext.Provider value={ planets }>
      {children}
    </Mycontext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default Provider;
