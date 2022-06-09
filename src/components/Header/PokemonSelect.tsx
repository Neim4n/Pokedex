import AsyncSelect from 'react-select/async';
import React from 'react';
import { useSelect } from '../../hooks/useSelect';
import '../../styles/components/PokemonSelect.css';

function PokemonSelect() {
  const {
    isLoading, value, defaultOptions, loadOptions, handleChange,
  } = useSelect();

  return (
    <AsyncSelect
      value={value}
      defaultOptions={defaultOptions}
      loadOptions={loadOptions}
      onChange={handleChange}
      isLoading={isLoading}
      placeholder={<div>Search Pokemon</div>}
      noOptionsMessage={() => 'There is no such Pokemon'}
      className="header__select-container"
      classNamePrefix="select"
    />
  );
}

export default PokemonSelect;
