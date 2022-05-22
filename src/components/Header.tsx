import React, { useEffect, useState } from 'react';
import AsyncSelect from 'react-select/async';
import { IoMdArrowDropdown } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../images/header__logo.png';
import { useTypeSelector } from '../hooks/useTypeSelector';
import { useAction } from '../hooks/useAction';
import '../styles/components/Header.css';

function Header() {
  // eslint-disable-next-line max-len
  const { defaultPokemons, defaultTypes } = useTypeSelector((state) => state.pokemons);
  const { fetchTypeSortedPokemons, nullCurrentPokemons } = useAction();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const navigate = useNavigate();
  const changeSelectHandler = (e:any) => {
    nullCurrentPokemons();
    navigate(`/${e.value}`);
  };

  const typeButtonsHandler = (event :any) => {
    nullCurrentPokemons();
    fetchTypeSortedPokemons(event.currentTarget.id);
    navigate('/');
  };

  useEffect(() => {
    if (defaultPokemons) {
      setIsLoading(false);
    }
  }, [defaultPokemons]);

  const loadOptions = (inputValue: string, callback:any) => {
    callback(defaultPokemons.filter((e) => {
      if (inputValue.length > 2) return e.name.toLowerCase().includes(inputValue.toLowerCase());
      return false;
      // eslint-disable-next-line max-len
    }).map((e: { name: string }) => ({ label: e.name[0].toUpperCase() + e.name.slice(1), value: e.name })));
  };

  const headerClickHandler = (e:any) => {
    if (e.target.closest('.button__container')) {
      setIsOpen(!isOpen);
    }
    if (e.target.closest('.types__button')) {
      setIsOpen(false);
    }
  };

  return (
    <header className="header">
      <div className="header__container" aria-hidden onClick={headerClickHandler}>
        <div className="header__navigation">
          <Link to="/" className="header__logo" onClick={() => nullCurrentPokemons()}><img src={logo} alt="logo" /></Link>
          <AsyncSelect
            loadOptions={loadOptions}
            onChange={changeSelectHandler}
            placeholder={<div>Choose pokemon</div>}
            noOptionsMessage={() => 'There is no such Pokemon'}
            isLoading={isLoading}
            className="header__select-container"
            classNamePrefix="select"
          />
        </div>
        <div className={`header__types ${isOpen ? '' : 'closed'}`}>
          <span className="types__title">type</span>
          <div className="types__container">
            {
              defaultTypes.length ? defaultTypes.map((e:any) => <button type="button" className={`types__button ${e.name}`} onClick={typeButtonsHandler} key={e.name} id={e.code}>{e.name}</button>) : ''
            }
          </div>
        </div>
        <div className={`button__container ${isOpen ? '' : 'closed'}`}>
          <button type="button" aria-label="Open types"><IoMdArrowDropdown /></button>
        </div>
      </div>
    </header>
  );
}
export default Header;
