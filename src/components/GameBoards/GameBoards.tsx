import React from 'react';
import GameBoard from './GameBoard/GameBoard';
import { Game } from '../../models/Game';
import './GameBoards.css';
import { FilterOptions } from '../../types/index';

interface Props {
  gameList: Game[];
  favouritePlayers: string[];
  setFavouritePlayers: React.Dispatch<React.SetStateAction<string[]>>;
  filterOptions: FilterOptions;
}

const GameBoards: React.FC<Props> = ({
  gameList,
  filterOptions,
  favouritePlayers,
  setFavouritePlayers,
}): React.ReactElement => {
  return (
    <div className="scrollable">
      {gameList.map(({ link, gameName, players, time }) => {
        return (
          <GameBoard
            favouritePlayers={favouritePlayers}
            setFavouritePlayers={setFavouritePlayers}
            key={link}
            gameName={gameName}
            link={link}
            time={time}
            players={players}
            filterOptions={filterOptions}
          />
        );
      })}
    </div>
  );
};

export default GameBoards;
