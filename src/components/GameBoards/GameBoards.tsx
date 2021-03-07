import React from 'react';
import GameBoard from './GameBoard/GameBoard';
import { Game } from '../../models/Game';
import './GameBoards.css';

interface Props {
  gameList: Game[];
}

const GameBoards: React.FC<Props> = ({ gameList }) => {
  return (
    <div className="scrollable">
      {gameList.map(({ link, gameName, players, time }) => {
        return (
          <GameBoard
            key={link}
            gameName={gameName}
            link={link}
            time={time}
            players={players}
          />
        );
      })}
    </div>
  );
};

export default GameBoards;
