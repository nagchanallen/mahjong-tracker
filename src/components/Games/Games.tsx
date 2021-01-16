import React from 'react';
import Game from './Game/Game';
import './Games.css';

const Games: React.FC = () => {
  return (
    <div className="scrollable">
      <Game />
      <Game />
      <Game />
      <Game />
      <Game />
      <Game />
      <Game />
      <Game />
      <Game />
      <Game />
    </div>
  );
};

export default Games;
