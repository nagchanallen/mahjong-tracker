import React from 'react';
import GameBoard from './GameBoard/GameBoard';
import { Game } from '../../models/Game';
import './GameBoards.css';

interface Props {
  gameList: Game[];
}

const GameBoards: React.FC<Props> = (props) => {
  return (
    <div className="scrollable">
      {props.gameList.map((game) => {
        return (
          <GameBoard
            key={game.link}
            gameName={game.gameName}
            link={game.link}
            time={game.time}
            players={game.players}
          />
        );
      })}
    </div>
  );
};

export default GameBoards;
