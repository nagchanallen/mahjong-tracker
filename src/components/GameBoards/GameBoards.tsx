import React from 'react';
import GameBoard from './GameBoard/GameBoard';
import { Game } from '../../models/Game';
import '../../styles/GameBoards.css';
import { FilterOptions } from '../../types/index';

interface GameBoardsProps {
  gameList: Game[];
  favouritePlayers: string[];
  setFavouritePlayers: React.Dispatch<React.SetStateAction<string[]>>;
  filterOptions: FilterOptions;
}

const GameBoards = ({
  gameList,
  filterOptions,
  favouritePlayers,
  setFavouritePlayers,
}: GameBoardsProps): React.ReactElement => {
  return (
    <div className="scrollable">
      {gameList.map(({ link, getGameTypeName, players, time }) => {
        const gameName = getGameTypeName();
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
