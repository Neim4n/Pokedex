import React, { useEffect, useState } from 'react';
import '../styles/components/ErrorPage.css';
import { Link, useNavigate } from 'react-router-dom';

function ErrorPage() {
  const [seconds, setSeconds] = useState(5);

  function startTimer() {
    setInterval(() => setSeconds(seconds - 1), 1000);
  }

  startTimer();

  const navigate = useNavigate();
  useEffect(() => {
    if (seconds === 0) {
      navigate('/');
    }
  }, [seconds]);

  return (
    <div className="error-page">
      <div className="error-page__content">
        <h1 className="error-page__title">Ouch...</h1>
        <span className="error-page__text">Something went wrong with your PokeDex.</span>
        <p className="error-page__paragraph">
          Redirect
          <Link to="/" className="error-page__link"> to the main </Link>
          page after
          {` ${seconds} `}
          seconds...
        </p>
      </div>
      <div className="error-page__img-container">
        <img
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/54.png"
          alt=""
          className="error-page__img"
        />
      </div>
    </div>
  );
}

export default ErrorPage;
